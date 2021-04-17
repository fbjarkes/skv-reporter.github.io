import { Fade } from '@material-ui/core';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parser from 'fast-xml-parser';
import { TradeType } from '../types/trade';

const FQ_DATETIME_FORMAT = 'yyyyMMdd HHmmss'; // TODO: To be configurable in .env?
const FQ_DATE_FORMAT = 'yyyyMMdd';
const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm';
const DATE_FORMAT = 'yyyy-MM-dd';

interface FQTrade {
    _accountId: string;
    _assetCategory: string;
    _currency: string;
    _fxRateToBase: number;
    _symbol: string;
    _description: string;
    _tradeDate: string;
    _tradeTime: string;
    _quantity: number;
    _tradePrice: number;
    _proceeds: number;
    _ibCommission: number;
    _ibCommissionCurrency: number;
    _closePrice: number;
    _openCloseIndicator: string;
    _buySell: string;
    _orderTime: string;
    _netCash: number;
    _orderType: string;
    _transactionType: string;
    _cost: number;
    _fifoPnlRealized: number;
    _multiplier: number;
    _strike: number;
    _putCall: string;
    _exchange: string;
}

interface FQRate {
    _reportDate: string;
    _fromCurrency: string;
    _toCurrency: string;
    _rate: number;
}

export class FlexQueryParser {
    options = {
        attributeNamePrefix: '_',
        ignoreAttributes: false,
        parseNodeValue: true,
        parseAttributeValue: false,
    };

    private rates: Map<string, Map<string, number>> = new Map();
    private trades: TradeType[] = [];
    private openTradesMap: Map<string, TradeType> = new Map(); //TODO: use TradeType for tracking open trades?

    toDateString(tradeDate: string, tradeTime: string): string {
        // TODO: default to 'New_York/America' tz?
        const t = tradeDate + ' ' + tradeTime;
        const dt = parse(t, FQ_DATETIME_FORMAT, new Date());
        const str = format(dt, DATETIME_FORMAT);
        return str;
    }

    public getClosingTrades(): TradeType[] {
        return [];
    }

    public getConversionRates(): Map<string, Map<string, number>> {
        return this.rates;
    }

    public parse(fileData: string): TradeType[] {
        const xmlData = parser.parse(fileData, this.options);

        if (xmlData.FlexQueryResponse.FlexStatements.FlexStatement.Trades.Trade) {
            xmlData.FlexQueryResponse.FlexStatements.FlexStatement.Trades.Trade.forEach((item: FQTrade) => {
                if (item._openCloseIndicator == 'C') {
                    let t = new TradeType();
                    t.symbol = item._symbol;
                    t.securityType = item._assetCategory;
                    t.quantity = Number(item._quantity);
                    t.pnl = Number(item._fifoPnlRealized);
                    t.exitPrice = Number(item._tradePrice);
                    t.exitDateTime = this.toDateString(item._tradeDate, item._tradeTime);
                    t.direction = item._quantity < 0 ? 'LONG' : 'SHORT';
                    t.quantity = Math.abs(item._quantity);
                    t.description = item._description;
                    t.proceeds = Number(item._proceeds);
                    t.cost = Number(item._cost);
                    t.commission = Number(item._ibCommission);
                    t.currency = item._currency;
                    t.transactionType = item._transactionType;
                    this.trades.push(t);
                }
            });
        }

        if (xmlData.FlexQueryResponse.FlexStatements.FlexStatement.ConversionRates) {
            xmlData.FlexQueryResponse.FlexStatements.FlexStatement.ConversionRates.ConversionRate.forEach(
                (item: FQRate) => {
                    const dateString = format(parse(item._reportDate, FQ_DATE_FORMAT, new Date()), DATE_FORMAT);
                    if (this.rates.has(dateString)) {
                        this.rates
                            .get(dateString)
                            ?.set(`${item._fromCurrency}/${item._toCurrency}`, Number(item._rate));
                    } else {
                        const pairs = new Map();
                        pairs.set(`${item._fromCurrency}/${item._toCurrency}`, Number(item._rate));
                        this.rates.set(dateString, pairs);
                    }
                },
            );
            // TODO: add CUR/SEK for all rates
            // CAD/SEK = 0.15SEK/1USD * 1USD/0.8CAD
            // EUR/SEK = 0.15SEK/1USD * 1USD/1.36EUR
            //this.convertPairs(this.rates);
        }

        return this.trades;
    }
}

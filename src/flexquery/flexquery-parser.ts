import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parser from 'fast-xml-parser';
import { logger } from '../logging';
import { TradeType } from '../types/trade';
import { setTradeEntryDates } from './utils';

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

const addCalculatedPairs = (ratesByDate:  Map<string, Map<string, number>>) => {
    // For each day:
    //  1. get SEK/USD rate
    //  2. iterate over every other pair, <CURR>/USD and calculate <CURR>/SEK using SEK/USD
    ratesByDate.forEach((pairs: Map<string, number>) => {
        const sekUsd = pairs.get('SEK/USD');
        if (sekUsd) {            
            const calculated = new Map();
            pairs.forEach((val: number, key: string) => {                
                if (key !== 'SEK/USD') {                    
                    const numerator = key.substr(0,3);
                    const rate = sekUsd/val;
                    calculated.set('SEK/'+numerator, rate);
                    calculated.set(numerator+'/SEK', 1/rate);
                }                
            });
            calculated.forEach((v, k) => {
                pairs.set(k, v.toFixed(4));
            })
            pairs.set('USD/SEK', 1 / sekUsd);
        }
    });
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

    toDateString(tradeDate: string, tradeTime: string): string {
        // TODO: default to 'New_York/America' tz?
        if (!tradeTime) {
            tradeTime = '160000';
        }
        const t = tradeDate + ' ' + tradeTime;
        const dt = parse(t, FQ_DATETIME_FORMAT, new Date());
        const str = format(dt, DATETIME_FORMAT);
        return str;
    }

    public getClosingTrades(): TradeType[] {
        return this.trades.filter(t => t.openClose === 'C');
    }

    public getAllTrades(): TradeType[] {
        return this.trades;
    }

    public getConversionRates(): Map<string, Map<string, number>> {
        return this.rates;
    }

    public parse(fileData: string): TradeType[] {
        const xmlData = parser.parse(fileData, this.options);

        if (xmlData.FlexQueryResponse.FlexStatements.FlexStatement.Trades.Trade) {
            xmlData.FlexQueryResponse.FlexStatements.FlexStatement.Trades.Trade.forEach((item: FQTrade) => {
                if (item._openCloseIndicator === 'C' || item._openCloseIndicator === 'O') {
                    const t = new TradeType();
                    t.symbol = item._symbol;
                    t.securityType = item._assetCategory;
                    t.quantity = Number(item._quantity);
                    t.pnl = Number(item._fifoPnlRealized);
                    
                    
                    t.quantity = Number(item._quantity);
                    t.description = item._description;
                    t.proceeds = Number(item._proceeds);
                    t.cost = Number(item._cost);
                    t.commission = Number(item._ibCommission);
                    t.currency = item._currency;
                    t.transactionType = item._transactionType;
                    t.openClose = item._openCloseIndicator;

                    if (item._openCloseIndicator === 'C') {
                        t.exitPrice = Number(item._tradePrice);
                        t.exitDateTime = this.toDateString(item._tradeDate, item._tradeTime);
                        t.direction = item._quantity < 0 ? 'LONG' : 'SHORT';
                    } else {
                        t.entryPrice = Number(item._tradePrice);
                        t.entryDateTime = this.toDateString(item._tradeDate, item._tradeTime);
                        t.direction = item._quantity > 0 ? 'LONG' : 'SHORT';
                    }
                    this.trades.push(t);
                } else {
                    logger.info(`Not handling FQTrade: ${item}`);
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
            addCalculatedPairs(this.rates);
        }

        // Add Entry dates for closing trades
        setTradeEntryDates(this.trades);

        return this.trades.filter(t => t.openClose === 'C');
    }
}

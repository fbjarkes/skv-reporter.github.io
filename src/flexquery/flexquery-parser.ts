import { Fade } from '@material-ui/core';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parser from 'fast-xml-parser';
import { TradeType } from '../types/trade';

const FQ_FORMAT = 'yyyyMMdd HHmmss'; // TODO: To be configurable in .env?
const DT_FORMAT = 'yyyy-MM-dd HH:mm';

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

export class FlexQueryParser {
    options = {
        attributeNamePrefix: '_',
        ignoreAttributes: false,
        parseNodeValue: true,
        parseAttributeValue: false,
    };

    toDateString(tradeDate: string, tradeTime: string): string {
        // TODO: default to 'New_York/America' tz?
        const t = tradeDate + ' ' + tradeTime;
        const dt = parse(t, FQ_FORMAT, new Date());
        //const dt = parse(toParse, 'yyyy-MM-dd HH:mm:ss', new Date());

        // const d = new Date(
        //     `${tradeDate.substring(0, 4)}-${tradeDate.substring(4, 6)}-${tradeDate.substring(
        //         6,
        //         8,
        //     )} ${tradeTime.substring(0, 2)}:${tradeTime.substring(2, 4)}:${tradeTime.substring(4, 6)}`,
        // );
        // return d.toISOString().substring(0, 10);
        const str = format(dt, DT_FORMAT);
        return str;
    }

    public async parse(fileData: string): Promise<TradeType[]> {
        const trades: TradeType[] = [];
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
                    trades.push(t);
                }
            });
        }
        return trades;
    }
}

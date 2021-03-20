import { Fade } from '@material-ui/core';
import parser from 'fast-xml-parser';
import { TradeType } from '../types/trade';

interface FQTrade {
    _accountId: string;
    _assetCategory: string;
    _currency: string;
    _fxRateToBase: number;
    _symbol: string;
    _tradeDate: string;
    _tradeTime: string;
    _quantity: number;
    _tradePrice: number;
    _proceed: number;
    _ibCommission: number;
    _ibCommissionCurrency: number;
    _closePrice: number;
    _openCloseIndicator: string;
    _buySell: string;
    _orderTime: string;
    _netCash: number;
    _orderType: string;
    _transactionType: string;
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
        // TODO: create date with 'New_York/America' tz
        const d = new Date(
            `${tradeDate.substring(0, 4)}-${tradeDate.substring(4, 6)}-${tradeDate.substring(
                6,
                8,
            )} ${tradeTime.substring(0, 2)}:${tradeTime.substring(2, 4)}:${tradeTime.substring(4, 6)}`,
        );
        return d.toISOString().substring(0, 10);
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
                    t.exitDate = this.toDateString(item._tradeDate, item._tradeTime);
                    trades.push(t);
                }
            });
        }
        return trades;
    }
}

import { K4_TYPE, Statement } from "../types/statement";
import { TradeType } from "../types/trade";
import { logger } from '../logging';

export class SRUFile {

    trades: TradeType[];
    fxRates: Map<string, Map<string, number>>;
    
    constructor(fxRates: Map<string, Map<string, number>>, trades: TradeType[]) {
        this.fxRates = fxRates;
        this.trades = trades;
    }

    toK4Type(trade: TradeType): K4_TYPE {
        switch(trade.securityType) {
            case 'STK': {
                return K4_TYPE.TYPE_A;
            }
            case 'FUT': {
                // TODO: FX/Bond futures: TYPE_C
                // TODO: Commodity futures: TYPE_D
                return K4_TYPE.TYPE_A;
            }
            case 'OPT': {
                return K4_TYPE.TYPE_A;
            }
            // Crypto: TYPE_D
        }        
        throw new Error(`Unexpected trade security type: ${trade.securityType}`);
    }

    getStatements(): Statement[] {
        const statements: Statement[] = [];
        this.trades.forEach((trade: TradeType) => {
            const rate = this.fxRates.get(trade.exitDateTime)?.get('USD/SEK');
            if (!rate) {
                throw new Error(`Missing USD/SEK rate for ${trade.exitDateTime}`);
            }
            const cost = (trade.cost + trade.commission) * rate;
            const proceeds = trade.proceeds * rate;
            const pnl = trade.pnl * rate;
            const statement = new Statement(`${trade.symbol} ${trade.description}`, cost, proceeds, pnl, this.toK4Type(trade))
            logger.info(`Adding: ${statement}`)
            statements.push(statement)
        });
        return statements;
    }
}
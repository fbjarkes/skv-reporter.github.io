import parse from 'date-fns/parse';
import { logger } from '../logging';
import { TradeType } from "../types/trade";


class OpenTrade {
    
    symbol = '';
    costBasis = 0;
    tradeOpenPrice = 0;
    quantity = 0
    date = '';
    id = 0;
    trades: TradeType[] = [];

    constructor(trade: TradeType, id = 0) {
        this.date = trade.entryDateTime;
        this.symbol = trade.symbol;
        this.quantity = trade.quantity;
        this.costBasis = trade.quantity * trade.entryPrice;
        this.tradeOpenPrice = trade.entryPrice;
        this.id = id;
        this.trades.push(trade);
    }

    finalize(): void {
        this.trades.forEach(t => {
            t.positionId = this.id
            if (t.entryDateTime && t.exitDateTime) {
                const t0 = parse(t.entryDateTime, 'yyyy-MM-dd HH:mm', new Date());
                const t1 = parse(t.exitDateTime, 'yyyy-MM-dd HH:mm', new Date());
                t.durationMin = Math.abs(t1.getTime() - t0.getTime()) / (1000 * 60);
            }
        })
    }

    addTrade(t: TradeType):  void {
        this.quantity += t.quantity;
        this.trades.push(t);
    }
}


export const connectTrades = (trades: TradeType[]): void => {
    const openTrades: Map<string, OpenTrade> = new Map();
    let positions = 1;
    trades.forEach(t => {
        if (t.openClose === 'O') {                        
            const ot = openTrades.get(t.symbol);
            if (ot) {
                ot.addTrade(t);
            } else {             
                const newOpen = new OpenTrade(t, positions++);
                openTrades.set(t.symbol, newOpen);
            }                        
        }
        if (t.openClose === 'C') {
            const open = openTrades.get(t.symbol);
            if (open) {
                t.entryDateTime = open.date;
                t.entryPrice = open.tradeOpenPrice;
                t.positionId = open.id;                
                t.durationMin = Number.MAX_SAFE_INTEGER; // To denote trades not closed (finalized)
                open.addTrade(t);
                if (open.quantity === 0) {
                    open.finalize();
                    openTrades.delete(t.symbol);
                }               
            }            
        }
    })
    if (openTrades.size > 0) {
        logger.info(`Found ${openTrades.size} trades still open`);
    }    
}
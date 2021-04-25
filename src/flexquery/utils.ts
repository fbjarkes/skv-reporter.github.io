import { TradeType } from "../types/trade";


class OpenTrade {
    
    symbol = '';
    costBasis = 0;
    quantity = 0
    date = '';

    constructor(date = '', symbol = '', quantity = 0, costBasis = 0) {
        this.date = date;
        this.symbol = symbol;
        this.quantity = quantity;
        this.costBasis = costBasis;
    }
}


export const setTradeEntryDates = (trades: TradeType[]): void => {
    const openTrades: Map<string, OpenTrade> = new Map();
    trades.forEach(t => {
        if (t.openClose === 'O') {                        
            const ot = openTrades.get(t.symbol);
            if (ot) {
                ot.quantity += t.quantity;
            } else {
                const newOpen: OpenTrade = {
                    symbol: t.symbol,
                    costBasis: t.quantity * t.entryPrice,
                    quantity: t.quantity,
                    date: t.entryDateTime
                }
                openTrades.set(t.symbol, newOpen);
            }                        
        }
        if (t.openClose === 'C') {
            const open = openTrades.get(t.symbol);
            if (open) {
                t.entryDateTime = open.date;
                open.quantity += t.quantity;
                if (open.quantity === 0) {
                    openTrades.delete(t.symbol);        
                }
                // if (t.direction === 'SHORT') {                    
                //     if (open.quantity > 0) {
                //         // TODO: flip to LONG
                //     }                    
                //     // if (open.quantity + t.quantity >= 0) {
                //     //     openTrades.delete(t.symbol);
                //     // } 
                // } else {
                //     if (open.quantity + t.quantity <= 0) {
                //         openTrades.delete(t.symbol);
                //     } 
                // }                
            }            
        }
    })
}
import parse from 'date-fns/parse';
import { TradeType } from "../types/trade";



export const filterTrades = (t: TradeType, filters: any, start?: Date, end?: Date, duration?: number) : boolean=> {
    if (!filters.long && t.direction === 'LONG') {
        return false;
    }
    if (!filters.short && t.direction === 'SHORT') {
        return false;
    }
    if (!filters.options && t.securityType === 'OPT'){
        return false;
    }
    if (!filters.equities && t.securityType === 'STK'){
        return false;
    }
    if (!filters.futures && t.securityType === 'FUT'){
        return false;
    }
    
    
    if (start) {
        const tradeStart = parse(t.entryDateTime.substring(0, 10),'yyyy-MM-dd', new Date());
        if (tradeStart < start) {
            return false;
        }
    }
    if (end) {
        const tradeEnd = parse(t.exitDateTime.substring(0, 10),'yyyy-MM-dd', new Date());
        if (tradeEnd > end) {
            return false;
        }
    }
    if (duration && duration < 100) {
        if (t.durationMin > duration) {
            return false;
        }
    }
    
    return true;
}

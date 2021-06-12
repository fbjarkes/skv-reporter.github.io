import parse from 'date-fns/parse';
import { TradeType } from "../types/trade";
import { TradeStats } from '../types/tradestats';

export type TradeFilters = {
    long: boolean,
    short: boolean,
    equities: boolean,
    options: boolean,
    futures: boolean,
    duration: number,
    start?: Date,
    end?: Date,
  }


export const filterTrades = (t: TradeType, filters: TradeFilters) : boolean => {
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
    
    
    if (filters.start) {
        const tradeStart = parse(t.entryDateTime.substring(0, 10),'yyyy-MM-dd', new Date());
        if (tradeStart < filters.start) {
            return false;
        }
    }
    if (filters.end) {
        const tradeEnd = parse(t.exitDateTime.substring(0, 10),'yyyy-MM-dd', new Date());
        if (tradeEnd > filters.end) {
            return false;
        }
    }
    if (filters.duration && filters.duration < 100) {
        if (t.durationMin > filters.duration) {
            return false;
        }
    }
    
    return true;
}


export const calculateStates = (trades: TradeType[]) : TradeStats => {
    const stats = new TradeStats();    
    trades.forEach(t => {
        if (t.pnl > 0) {
            stats.winners++;
            stats.totalWin += t.pnl
        } else {
            stats.losers++;
            stats.totalLoss += t.pnl;
        }
    });

    return stats;
}
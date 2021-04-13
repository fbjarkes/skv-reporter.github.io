export class TradeType {
    entryDateTime?: string;
    exitDateTime?: string;
    symbol?: string;
    description?: string;
    quantity?: number;
    entryPrice?: number;
    exitPrice?: number;
    pnl?: number;
    securityType?: string;
    currency?: string;
    proceeds?: number;
    cost?: number; // Does not include commission
    direction?: string;
    commission?: number;
    transactionType?: string;
}

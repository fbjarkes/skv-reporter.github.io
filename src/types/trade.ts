export class TradeType {
    entryDateTime = '';
    exitDateTime = '';
    symbol = '';
    description = '';
    quantity = 0;
    entryPrice = 0;
    exitPrice = 0;
    pnl = 0;
    securityType = '';
    currency = '';
    proceeds = 0;
    cost = 0; // Does not include commission
    direction = '';
    commission = 0;
    transactionType = '';
    openClose = '';
    id = 0;

    constructor(symbol = '', qty = 0, entry = 0, exit= 0, entryDate = '', exitDate = '', openClose = '', direction = '') {
        this.symbol = symbol;
        this.quantity = qty;
        this.entryPrice = entry;
        this.exitPrice = exit;
        this.entryDateTime = entryDate;
        this.exitDateTime = exitDate;
        this.openClose = openClose;
        this.direction = direction;
        this.id = Math.random();
    }

    public toString(): string {
        return `${this.symbol}: ${this.entryDateTime} - ${this.exitDateTime}, qty=${this.quantity}, entry=${this.entryPrice}, exit=${this.exitPrice}, pnl=${this.pnl}`;
    }
}
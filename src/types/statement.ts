export enum K4_TYPE {
    TYPE_A,
    TYPE_B,
    TYPE_C,
    TYPE_D
}

export class Statement {

    symbol: string; // TODO: max 80 chars
    quantity = 0;
    received: number;
    paid: number;
    pnl: number;
    type: K4_TYPE;
    
    constructor(quantity: number, symbol: string, paid: number, received: number, pnl: number, type: K4_TYPE) {
        this.quantity = quantity;
        this.symbol = symbol;
        this.paid = Math.round(paid);
        this.received = Math.round(received);
        this.pnl = Math.round(pnl);
        this.type = type;
    }

    public toString(): string {
        return `${this.symbol} (${this.type}): paid=${this.paid}, received=${this.received}, pnl=${this.pnl}`;
    }
}
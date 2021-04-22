export enum K4_TYPE {
    TYPE_A,
    TYPE_B,
    TYPE_C,
    TYPE_D
}

export class Statement {

    symbol: string;
    received: number;
    paid: number;
    pnl: number;
    type: K4_TYPE;
    
    constructor(symbol: string, paid: number, received: number, pnl: number, type: K4_TYPE) {
        this.symbol = symbol;
        this.paid = paid;
        this.received = received;
        this.pnl = pnl,
        this.type = type;
    }

    public toString(): string {
        return `${this.symbol} (${this.type}): paid=${this.paid}, received=${this.received}, pnl=${this.pnl}`;
    }
}
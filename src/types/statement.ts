export enum K4_TYPE {
    TYPE_A,
    TYPE_B,
    TYPE_C,
    TYPE_D,
}

export class Statement {
    id: number;
    symbol: string; // TODO: max 80 chars
    quantity = 0;
    received: number;
    paid: number;
    pnl: number;
    type: K4_TYPE;
    date: string;

    constructor(
        id: number,
        quantity: number,
        symbol: string,
        paid: number,
        received: number,
        pnl: number,
        type: K4_TYPE,
        date: string,
    ) {
        this.id = id;
        this.quantity = Math.abs(quantity);
        this.symbol = symbol.substring(0, 80);
        this.paid = Math.abs(Math.round(paid));
        this.received = Math.abs(Math.round(received));
        this.pnl = Math.round(pnl);
        this.type = type;
        this.date = date;
    }

    public toString(): string {
        return `${this.symbol} (${this.type}) ${this.date}: qty=${this.quantity} paid=${this.paid}, received=${this.received}, pnl=${this.pnl}`;
    }
}

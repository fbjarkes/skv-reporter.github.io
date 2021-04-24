import format from 'date-fns/format';
import { Statement } from "./statement";

const DATETIME_FORMAT = 'yyyyMMdd HHmmss'

export class K4Form {
    
    title: string;
    pageNumber: number;
    id: string;
    created: Date; // On format 20210101 143000 
    statements: Statement[];

    constructor(title: string, pageNumber: number, id: string, date: Date,  statements: Statement[]) {
        this.title = title;
        this.pageNumber = pageNumber;
        this.id = id;
        this.statements = statements;
        this.created = date;
    }

    public generateLines(): string[] {
        const str = format(this.created, DATETIME_FORMAT);
        const lines = [
            `#BLANKETT ${this.title}`,
            `#IDENTITET ${this.id} ${str}`,
        ]

        return lines;
    }
}
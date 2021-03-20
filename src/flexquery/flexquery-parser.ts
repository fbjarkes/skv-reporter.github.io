import { TradeType } from '../model/trade';

export class FlexQueryParser {
    public async parse(fileData: string): Promise<TradeType[]> {
        const trades: TradeType[] = [];
        console.log(`Parsing ${fileData}`);
        // ...parse
        const t = new TradeType();
        t.symbol = 'SPY';
        trades.push(t);
        return trades;
    }
}

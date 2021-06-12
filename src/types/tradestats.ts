export class TradeStats {

    totalLoss = 0;
    totalWin = 0;
    winners = 0;
    losers = 0;
    profitFactor = 0;
    winRate = 0;
    firstDate = null;
    lastDate = null;

    get avgWin() : number {
        return this.totalWin / this.winners;        
    }

    get avgLoss() : number {
        return this.totalLoss / this.losers;
    }
}
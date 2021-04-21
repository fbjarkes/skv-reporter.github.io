import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { TradeType } from '../types/trade';
import { SRUFile } from './sru-file';


chai.use(chaiAsPromised);

describe('SRU Files', () => {
    
    const fxRates: Map<string, Map<string, number>> = new Map(Object.entries({
        '2020-01-10': new Map(Object.entries({'USD/SEK': 9.1}))
    }));

    describe('SRU statements', () => {
        it('should create valid statement from closing trades', () => {
            //const t1 = new TradeType({symbol: 'SPY', description: 'SPY ETF...', quantity: 10, pnl: 98.5, securityType: 'STK', proceeds: 1000, cost: 900, commission: 1.5});
            const t1 = new TradeType(); 
            t1.exitDateTime = '2020-01-10';
            t1.symbol = 'SPY';
            t1.description = 'SPY ETF...';            
            t1.quantity = 10;
            t1.securityType = 'STK';
            t1.proceeds = 1000;
            t1.cost = 900;
            t1.commission = 1.5;
            t1.pnl = 98.5; // 1000 - (900 + 1.5)

            const sru = new SRUFile(fxRates, [t1]);
            const statements = sru.getStatements();
            expect(statements[0].pnl).to.equal(98.5*9.1);
            expect(statements[0].paid).to.equal(901.5*9.1);
            expect(statements[0].received).to.equal(1000*9.1);
        });
    });
});
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { promises as fs } from 'fs';
import { TradeType } from '../types/trade';
import { FlexQueryParser } from './flexquery-parser';
import { setTradeEntryDates } from './utils';


chai.use(chaiAsPromised);


describe('Utils', () => {
    it('should add entry dates for closing trades', () => {
        const trades = [
            new TradeType('SPY', 100, 250, 0, '2020-01-01', '', 'O', 'LONG'),
            new TradeType('SPY', 100, 250, 0, '2020-01-02', '', 'O', 'LONG'),
            new TradeType('SPY', 50, 0, 260, '', '2020-01-03', 'C', 'LONG'),
            new TradeType('SPY', 50, 0, 270, '', '2020-01-04', 'C', 'LONG'),
        ];
        setTradeEntryDates(trades);

        expect(trades[2].entryDateTime).to.equal('2020-01-01');
        expect(trades[3].entryDateTime).to.equal('2020-01-01');
    });

    it('should add entry dates and prices for closing trades', () => {
        const trades = [
            new TradeType('SPY', -100, 250, 0, '2020-01-01', '', 'O', 'SHORT'),
            new TradeType('SPY', -100, 251, 0, '2020-01-02', '', 'O', 'SHORT'),
            new TradeType('SPY', 100, 0, 260, '', '2020-01-03', 'C', 'SHORT'),
            new TradeType('SPY', 100, 0, 270, '', '2020-01-04', 'C', 'SHORT'),
            new TradeType('SPY', -100, 260, 0, '2020-02-02', '', 'O', 'SHORT'),
            new TradeType('SPY', 100, 0, 250, '', '2020-02-03', 'C', 'SHORT'),
        ];
        setTradeEntryDates(trades);

        expect(trades[2].entryDateTime).to.equal('2020-01-01');
        expect(trades[2].entryPrice).to.equal(250);
        expect(trades[3].entryDateTime).to.equal('2020-01-01');
        expect(trades[3].entryPrice).to.equal(250);
        expect(trades[5].entryDateTime).to.equal('2020-02-02');
        expect(trades[5].entryPrice).to.equal(260);
    });

    // it('should have a unique id to relate closing trades to the opening trade', () => {
    //     const trades = [
    //         new TradeType('SPY', 100, 250, 0, '2020-01-01', '', 'O', 'LONG'),
    //         new TradeType('SPY', 100, 0, 260, '', '2020-01-03', 'C', 'LONG'),
    //         new TradeType('SPY', 100, 0, 270, '', '2020-01-04', 'C', 'LONG'),
    //         new TradeType('SPY', -100, 260, 0, '2020-02-02', '', 'O', 'LONG'),
    //         new TradeType('SPY', 100, 0, 250, '', '2020-02-03', 'C', 'SHORT'),
    //     ];
    //     setTradeEntryDates(trades);

    //     expect(trades[0].positionId).to.equal(trades[1].positionId);
    //     expect(trades[0].positionId).to.equal(trades[2].positionId);
    //     expect(trades[3].positionId).to.equal(trades[4].positionId);
    // })
});

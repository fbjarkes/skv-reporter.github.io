import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { TradeType } from '../types/trade';
import { connectTrades } from './utils';

chai.use(chaiAsPromised);

describe('Utils', () => {
    it('should add entry dates for closing trades', () => {
        const trades = [
            new TradeType('SPY', 100, 250, 0, '2020-01-01', '', 'O', 'LONG'),
            new TradeType('SPY', 100, 250, 0, '2020-01-02', '', 'O', 'LONG'),
            new TradeType('SPY', 50, 0, 260, '', '2020-01-03', 'C', 'LONG'),
            new TradeType('SPY', 50, 0, 270, '', '2020-01-04', 'C', 'LONG'),
        ];
        connectTrades(trades);

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
        connectTrades(trades);

        expect(trades[2].entryDateTime).to.equal('2020-01-01');
        expect(trades[2].entryPrice).to.equal(250);
        expect(trades[3].entryDateTime).to.equal('2020-01-01');
        expect(trades[3].entryPrice).to.equal(250);
        expect(trades[5].entryDateTime).to.equal('2020-02-02');
        expect(trades[5].entryPrice).to.equal(260);
    });

    it('should have a unique id to relate closing trades to the opening trade', () => {
        const trades = [
            new TradeType('SPY', 100, 250, 0, '2020-01-01', '', 'O', 'LONG'),
            new TradeType('SPY', 100, 240, 0, '2020-01-01', '', 'O', 'LONG'),
            new TradeType('SPY', -100, 0, 260, '', '2020-01-03', 'C', 'LONG'),
            new TradeType('SPY', -100, 0, 270, '', '2020-01-04', 'C', 'LONG'),
            new TradeType('SPY', -100, 260, 0, '2020-02-02', '', 'O', 'SHORT'),
            new TradeType('SPY', 100, 0, 250, '', '2020-02-03', 'C', 'SHORT'),
        ];
        connectTrades(trades);

        expect(trades[0].positionId).to.equal(1);
        expect(trades[1].positionId).to.equal(1);
        expect(trades[2].positionId).to.equal(1);
        expect(trades[3].positionId).to.equal(1);
        expect(trades[4].positionId).to.equal(2);
        expect(trades[5].positionId).to.equal(2);
    });

    it('should have a trade duration for connected trades', () => {
        const trades = [
            new TradeType('SPY', 100, 250, 0, '2020-01-02 09:00', '', 'O', 'LONG'),
            new TradeType('SPY', 100, 240, 0, '2020-01-03 09:00', '', 'O', 'LONG'),
            new TradeType('SPY', -100, 0, 260, '', '2020-01-03 10:00', 'C', 'LONG'),
            new TradeType('SPY', -100, 0, 270, '', '2020-01-04 09:00', 'C', 'LONG'),
        ];
        connectTrades(trades);

        expect(trades[2].durationMin).to.equal(24 * 60 + 60);
        expect(trades[3].durationMin).to.equal(2 * 24 * 60);
    });
});

import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { promises as fs } from 'fs';
import { TradeType } from '../types/trade';
import { FlexQueryParser } from './flexquery-parser';

chai.use(chaiAsPromised);

describe('FlexQueryParser', () => {
    const flexParser = new FlexQueryParser();

    it('should parse single STK trade', async () => {
        const testFileData = await fs.readFile('test/fixtures/trade1.xml', 'utf8');
        const trades = await flexParser.parse(testFileData);

        expect(trades[0]).to.not.be.undefined;
        expect(trades[0].symbol).to.equal('ABC');
        expect(trades[0].exitDateTime).to.equal('2015-03-27 16:00');
        expect(trades[0].securityType).to.equal('STK');
        expect(trades[0].quantity).to.equal(1.0);
        expect(trades[0].exitPrice).to.equal(400.0);
        expect(trades[0].pnl).to.equal(-100.0);
    });

    it('should get all data for a STK trade', async () => {
        const testFileData = await fs.readFile('test/fixtures/trade2.xml', 'utf8');
        const trades = await flexParser.parse(testFileData);
        expect(trades).to.have.lengthOf(2);
        expect(trades[0].symbol).to.equal('UWM');
        expect(trades[0].description).to.equal('PROSHARES ULTRA RUSSELL2000');
        expect(trades[0].quantity).to.equal(32);
        expect(trades[0].exitPrice).to.equal(88.86);
        expect(trades[0].proceeds).to.equal(2843.52);
        expect(trades[0].cost).to.equal(-2738.863785);
        expect(trades[0].pnl).to.equal(104.200907);
        expect(trades[0].securityType).to.equal('STK');
        expect(trades[0].exitDateTime).to.equal('2015-01-08 16:00');
        expect(trades[0].commission).to.equal(-0.455307);
        expect(trades[0].currency).to.equal('USD');
        expect(trades[0].direction).to.equal('LONG');
        expect(trades[0].transactionType).to.equal('ExchTrade');
    });

    it('should handle exercised stock option', async () => {
        const testFileData = await fs.readFile('test/fixtures/option_exercised.xml', 'utf8');
        const trades = await flexParser.parse(testFileData);
        expect(trades).to.have.lengthOf(2);
        expect(trades[0].symbol).to.equal('BA');
        expect(trades[0].securityType).to.equal('STK');
        expect(trades[0].transactionType).to.equal('BookTrade');
        expect(trades[0].pnl).to.equal(316.946875);
        expect(trades[1].symbol).to.equal('BA    150417C00144000');
        expect(trades[1].securityType).to.equal('OPT');
        expect(trades[1].transactionType).to.equal('BookTrade');
    });
});

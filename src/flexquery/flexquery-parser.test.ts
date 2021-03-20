import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { FlexQueryParser } from './flexquery-parser';

chai.use(chaiAsPromised);

describe('FlexQueryParser', () => {
    it('should parse FlexQuery XML file', async () => {
        const parser = new FlexQueryParser();
        const trades = await parser.parse('DATA');
        expect(trades[0]).to.not.be.undefined;
        expect(trades[0].symbol).to.equal('SPY');
    });
});

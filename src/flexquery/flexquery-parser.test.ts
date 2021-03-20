import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { promises as fs } from 'fs';
import { FlexQueryParser } from './flexquery-parser';

chai.use(chaiAsPromised);

/**
 * 	File testFile = new File("src/test/resources/test_usd_conversion_abc.xml");
		FlexQueryResponse xml = (FlexQueryResponse) marshaller.unmarshal(new StreamSource(testFile));

		FlexQueryTradeStatements tmp = new FlexQueryTradeStatements(xml);
		ConversionStrategy conversionStrategy = new ClosingConversionStrategy();


		DateTimeFormatter df = DateTimeFormat.forPattern("yyyy-MM-dd");
		Map<LocalDate,BigDecimal> fxMap = new HashMap<LocalDate,BigDecimal>();
		fxMap.put(df.parseDateTime("2015-03-27").toLocalDate() , new BigDecimal("0.125"));
		fxMap.put(df.parseDateTime("2015-03-26").toLocalDate() , new BigDecimal("0.1429"));
		Map<String, Map<LocalDate,BigDecimal>> fxMapMapping = new HashMap<String,Map<LocalDate,BigDecimal>>();
		fxMapMapping.put("SEKUSD",fxMap);
		conversionStrategy.setFXMap(fxMapMapping);

		StockStatementAdapter creator = new StockStatementAdapter(tmp);
		List<Statement> statements = creator.getStatements(conversionStrategy);


		// Buy 	1 ABC @ $500, 8 USD/SEK
		// Sell 1 ABC @ $400, 8 USD/SEK
 */

describe('FlexQueryParser', () => {
    const flexParser = new FlexQueryParser();

    it('should parse single STK trade', async () => {
        const testFileData = await fs.readFile('test/trade1.xml', 'utf8');
        const trades = await flexParser.parse(testFileData);

        expect(trades[0]).to.not.be.undefined;
        expect(trades[0].symbol).to.equal('ABC');
        expect(trades[0].exitDate).to.equal('2015-03-27');
        expect(trades[0].securityType).to.equal('STK');
        expect(trades[0].quantity).to.equal(1.0);
        expect(trades[0].exitPrice).to.equal(400.0);
        expect(trades[0].pnl).to.equal(-100.0);
    });
});

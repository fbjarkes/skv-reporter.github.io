import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
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
		//
		Statement one = statements.get(0);
		assertEquals("1",one.getQuantity()+"");
		assertEquals("ABC ", one.getTicker());
		assertEquals("3200.0000", one.getReceieved()+"");
		assertEquals("4000.0000", one.getPaid()+"");
		assertEquals("-800.0000", one.getPnL()+"");

 */

describe('FlexQueryParser', () => {
    it('should parse FlexQuery XML file', async () => {
        const parser = new FlexQueryParser();
        const trades = await parser.parse('DATA');
        expect(trades[0]).to.not.be.undefined;
        expect(trades[0].symbol).to.equal('SPY');
    });
});

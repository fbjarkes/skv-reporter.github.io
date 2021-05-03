# SKV Reporter

## v0.0.1 Notes (Tax year 2020)
 1. Field 'tradeTime' doesn't seem to exist in Flex Query reports anymore, remove from required field in order process recent generated XML files
 2. Files should be written with 'ISO8859-1' encoding
 3. Due to the 5mb file size limit, each 'blanketter.sru' will contain max 400 statements
 5. Use following simple code to generate final SRU files, and rename each file to 'blanketter.sru' to uplod seperately:
```
const main = async () => {
    const flexParser = new FlexQueryParser();
    const file = await fs.readFile('2020.xml', 'utf8');    
    flexParser.parse(file);
    const trades = flexParser.getClosingTrades();
    
    const sruFiles = new SRUFile(flexParser.getConversionRates(), trades, {
        'name': '<NAME>',
        'surname': '<SURNAME>',
        'id': '<ID>',
        'code': '<POSTAL CODE>',
        'city': '<CITY>',
        'mail': '<EMAIL>'
    });
    const statements = sruFiles.getStatements();
    let losers = 0, winners = 0, totalPaid = 0, totalReceived = 0, pnl = 0, totalLoss = 0, totalProfit = 0;
    
    statements.forEach((s: Statement) => {
        pnl += s.pnl;
        if (s.pnl > 0) {
            totalProfit += s.pnl;
            winners++;
        } else {
            totalLoss += Math.abs(s.pnl);
            losers++;
        }
        totalPaid += s.paid;
        totalReceived += s.received;
    });

    console.log('Statements: ', statements.length);
    console.log('Pnl:', pnl);
    console.log('Total losses:', totalLoss);
    console.log('Total profits:', totalProfit);
    console.log('Total paid:', totalPaid);
    console.log('Total received:', totalReceived);
    console.log('Winners:', winners);
    console.log('Losers:', losers);
    statements.sort((a, b) => a.pnl - b.pnl).forEach(s => {
         console.log(s.toString());
    });
    
    const datas = sruFiles.getFormData();
    const info = sruFiles.getInfoData();
    await fs.writeFile('info.sru', info.join('\n'));
    datas.forEach( async (data, idx) =>{
      await fs.writeFile(`blanketter${idx}.sru`, data.join('\n'));
    });
}
```


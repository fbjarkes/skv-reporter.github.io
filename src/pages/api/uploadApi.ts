  
import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import initMiddleware from '../../utils/init-middleware';
import { TradeType } from '../../types/trade';
import { FlexQueryParser } from '../../flexquery/flexquery-parser';

const upload = multer();

// for parsing multipart/form-data
const multerAny = initMiddleware(
    upload.any()
);

type NextApiRequestWithFormData = NextApiRequest & {
    files: any[],
}

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async (req: NextApiRequestWithFormData, res: NextApiResponse<TradeType[]>): Promise<void> => {
    const flexParser = new FlexQueryParser();
    await multerAny(req, res);

    if (!req.files?.length || req.files.length > 1) {
        res.statusCode = 400;
        res.end();
        return;
    }

    const blob = req.files[0];

    try {
        console.log(`Processing file: ${blob.originalname} (${blob.size / 1024}kb)`);
        flexParser.parse(blob.buffer.toString('utf8'));
        const trades = flexParser.getClosingTrades();
        res.statusCode = 201;
        res.json(trades);
        res.end();        
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.json([]);
    }
}
import { Router } from 'express';
import { readJournal } from '../controllers/journal.controller';
import { getStockTraffic } from '../controllers/stocks.journal.controller';
import { getMonthlySales } from '../controllers/sales.journal.controller';
const journalRouter = Router();

journalRouter.get('/', readJournal);
journalRouter.get('/stock-report?', getStockTraffic);
journalRouter.get('/monthly-sales?', getMonthlySales);

export { journalRouter };

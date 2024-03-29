import { Router } from 'express';
import { readJournal, getData } from '../controllers/journal.controller';
import { getStockTraffic } from '../controllers/stocks.journal.controller';
import {
  getMonthlySales,
  product_sold,
  categoriesSold,
} from '../controllers/sales.journal.controller';
import { getSalesJournals } from '../controllers/read.sales.journal';
import { getStockJournals } from '../controllers/stocks.journal.controller';
const journalRouter = Router();

journalRouter.get('/', readJournal);
journalRouter.get('/get-data', getData);
journalRouter.get('/stock-report?', getStockTraffic);
journalRouter.get('/product-sold?', product_sold);
journalRouter.get('/monthly-sales?', getMonthlySales);
journalRouter.get('/category-sold?', categoriesSold);
journalRouter.get('/stock-journal?', getStockJournals);
journalRouter.get('/sales-journal?', getSalesJournals);

export { journalRouter };

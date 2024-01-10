import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { categoriesRouter } from './routers/categories.router';
import { productsRouter } from './routers/products.router';
import { accountsRouter } from './routers/accounts.router';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
// router.use('/register', sampleRouter);
// router.use('/login', sampleRouter);

// Gibran
router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);

//KAI
router.use('/accounts', accountsRouter)
// add another router here ...

export default router;

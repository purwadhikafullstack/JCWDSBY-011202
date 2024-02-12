import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { categoriesRouter } from './routers/categories.router';
import { productsRouter } from './routers/products.router';
import { accountsRouter } from './routers/accounts.router';
import { cartRouter } from './routers/carts.router';
import { warehouse_mutationRouter } from './routers/warehouse_mutation.router';
import { warehouse_storageRouter } from './routers/warehouse_storage.router';
import { warehouseRouter } from './routers/warehouse.router';
import { provinces_and_cities_Router } from './routers/provinces.and.cities.router';
import { checkoutRouter } from './routers/checkout';
import { journalRouter } from './routers/journal.router';
import { userOrderRouter } from './routers/userOrder';
import { userSetting } from './routers/userSetting';
import { warehouseOrder } from './routers/warehouse_order';

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
router.use('/warehouse/mutation', warehouse_mutationRouter);
router.use('/warehouse/storage', warehouse_storageRouter);
router.use('/warehouses', warehouseRouter);
router.use('/provincesandcities', provinces_and_cities_Router);
router.use('/journal', journalRouter);
//KAI
router.use('/accounts', accountsRouter);
// add another router here ...

// RAMA
router.use('/cart', cartRouter)
router.use('/checkout', checkoutRouter)
router.use('/userOrder', userOrderRouter)
router.use('/userSetting', userSetting)
router.use('/warehouse/order', warehouseOrder)

export default router;

import { Router } from 'express';
import {
  getWarehouse,
  createWarehouse,
} from '../controllers/warehouse.controller';
import {
  deleteWarehouse,
  updateWarehouse,
} from '../controllers/warehouse.manange.controller';

const warehouseRouter = Router();

//GET
warehouseRouter.get('/?', getWarehouse);
//POST
warehouseRouter.post('/', createWarehouse);
//PATCH
warehouseRouter.patch('/:id', updateWarehouse);
//DELETE
warehouseRouter.delete('/:id', deleteWarehouse);
export { warehouseRouter };

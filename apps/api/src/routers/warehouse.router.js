import { Router } from 'express';
import {
  getWarehouse,
  createWarehouse,
} from '../controllers/warehouse.controller';
import {
  deleteWarehouse,
  updateWarehouse,
} from '../controllers/warehouse.manange.controller';
import {
  ValidatePassword,
  ValidateEmail,
  validateToken,
  ValidateSuperAdmin,
} from '../middleware/validation';

const warehouseRouter = Router();

//GET
warehouseRouter.get('/?', getWarehouse);
//POST
warehouseRouter.post('/', validateToken, ValidateSuperAdmin, createWarehouse);
//PATCH
warehouseRouter.patch(
  '/:id',
  validateToken,
  ValidateSuperAdmin,
  updateWarehouse,
);
//DELETE
warehouseRouter.delete(
  '/:id',
  validateToken,
  ValidateSuperAdmin,
  deleteWarehouse,
);
export { warehouseRouter };

import { Router } from 'express';
import { validateToken, ValidateAdmin} from '../middleware/validation';
import { getWarehouseOrderData } from '../controllers/warehouse.manage.order';
const warehouseOrder = Router();

warehouseOrder.get('/',validateToken,ValidateAdmin,getWarehouseOrderData );


export {warehouseOrder}
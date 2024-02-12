import { Router } from 'express';
import { validateToken, ValidateAdmin} from '../middleware/validation';
import { getManageOrderDetail, getWarehouseOrderData, updateStatus } from '../controllers/warehouse.manage.order';
const warehouseOrder = Router();
// GET
warehouseOrder.get('/',validateToken,ValidateAdmin,getWarehouseOrderData );
warehouseOrder.get('/manage-order/?',validateToken,ValidateAdmin,getManageOrderDetail );
//PATCH
warehouseOrder.patch('/update-status',validateToken,ValidateAdmin,updateStatus );

export {warehouseOrder}
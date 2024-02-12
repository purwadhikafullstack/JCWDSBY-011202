import { Router } from 'express';
import { validateToken, ValidateAdmin} from '../middleware/validation';
import { getManageOrderDetail, getWarehouseOrderData, updateStatus } from '../controllers/warehouse.manage.order';
import {  getWarehouseSearchOrder } from '../controllers/warehouse.manage.order2';
const warehouseOrder = Router();
// GET
warehouseOrder.get('/',validateToken,ValidateAdmin,getWarehouseOrderData );
warehouseOrder.get('/manage-order/?',validateToken,ValidateAdmin,getManageOrderDetail );
warehouseOrder.get('/search-order/?',validateToken,ValidateAdmin,getWarehouseSearchOrder );
//PATCH
warehouseOrder.patch('/update-status',validateToken,ValidateAdmin,updateStatus );

export {warehouseOrder}
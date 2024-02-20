import { Router } from 'express';
import { validateToken, ValidateSuperAdmin} from '../middleware/validation';
import {  getSuperAdminOrderData } from '../controllers/admin.manage.order';
import { getManageOrderDetail } from '../controllers/warehouse.manage.order';
const adminOrder = Router();
adminOrder.get('/',validateToken, ValidateSuperAdmin, getSuperAdminOrderData);
adminOrder.get("/detail?",getManageOrderDetail)

export {adminOrder}

import { Router } from 'express';
import { validateToken, ValidateSuperAdmin} from '../middleware/validation';
import {  getSuperAdminOrderData } from '../controllers/admin.manage.order';
const adminOrder = Router();
adminOrder.get('/',validateToken, ValidateSuperAdmin, getSuperAdminOrderData);

export {adminOrder}

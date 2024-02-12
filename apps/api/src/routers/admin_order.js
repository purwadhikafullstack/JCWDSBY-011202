import { Router } from 'express';
import { validateToken, ValidateAdmin} from '../middleware/validation';
import { getOrder } from '../controllers/admin.manage.order';
const adminOrder = Router();
adminOrder.get('/',validateToken,ValidateAdmin, getOrder);

export {adminOrder}

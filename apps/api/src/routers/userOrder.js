import { Router } from 'express';
import { validateToken,ValidateUser } from '../middleware/validation';
import { getUserOrder } from '../controllers/userOrder';
const userOrderRouter = Router();
// GET
userOrderRouter.get('/',validateToken,ValidateUser, getUserOrder);

export { userOrderRouter };

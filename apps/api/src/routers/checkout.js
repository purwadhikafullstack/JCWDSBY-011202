import { Router } from 'express';
import { validateToken,ValidateUser } from '../middleware/validation';
import { getCartToCheckout, getUserData } from '../controllers/checkout';
const checkoutRouter = Router();

// GET
checkoutRouter.get('/get-cart/:id',validateToken,ValidateUser, getCartToCheckout);
checkoutRouter.get('/userData',validateToken,ValidateUser, getUserData);

// POST

// DELETE

// UPDATE

export { checkoutRouter };
import { Router } from 'express';
import { validateToken,ValidateUser } from '../middleware/validation';
import { getCartToCheckout, getShippingCost, getUserData } from '../controllers/checkout';
import { getUserAddress } from '../controllers/checkout2';
const checkoutRouter = Router();

// GET
checkoutRouter.get('/get-cart/:id',validateToken,ValidateUser, getCartToCheckout);
checkoutRouter.get('/userData',validateToken,ValidateUser, getUserData);
checkoutRouter.get('/userAddress',validateToken,ValidateUser,getUserAddress);
checkoutRouter.get("/get-shipping-cost/?",validateToken,ValidateUser,getShippingCost)

// POST
// DELETE

// UPDATE

export { checkoutRouter };
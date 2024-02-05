import { Router } from 'express';
import { validateToken,ValidateUser } from '../middleware/validation';
import { getCartToCheckout, getShippingCost, getUserData } from '../controllers/checkout';
import { changeUserAddress, createOrder, getOrderData, getUserAddress } from '../controllers/checkout2';
import { getUsernamePict } from '../controllers/checkout3';
const checkoutRouter = Router();

// GET
checkoutRouter.get('/get-cart/:id',validateToken,ValidateUser, getCartToCheckout);
checkoutRouter.get('/userData',validateToken,ValidateUser, getUserData);
checkoutRouter.get('/userAddress',validateToken,ValidateUser,getUserAddress);
checkoutRouter.get("/get-shipping-cost/?",validateToken,ValidateUser,getShippingCost)
checkoutRouter.get("/success/?",validateToken,ValidateUser,getOrderData)
checkoutRouter.get("/getUsernamePict",validateToken,ValidateUser,getUsernamePict)


// POST
checkoutRouter.post("/",validateToken,ValidateUser,createOrder)

// DELETE

// UPDATE
checkoutRouter.patch('/changeUserAddress',validateToken,ValidateUser,changeUserAddress);


export { checkoutRouter };
import { Router } from 'express';
import { addToCart, getCart } from '../controllers/cart.controller';
import { validateToken } from '../middleware/validation';

const cartRouter = Router()

// GET
cartRouter.get("/",validateToken,getCart)

// POST
cartRouter.post("/add-to-cart",validateToken,addToCart)



export {cartRouter}
import { Router } from 'express';
import { addToCart, getCart } from '../controllers/cart.controller';

const cartRouter = Router()

// GET
cartRouter.get("/cart",getCart)

// POST
cartRouter.post("/add-to-cart",addToCart)

export {cartRouter}
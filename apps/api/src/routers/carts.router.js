import { Router } from 'express';
import { addToCart, deleteCart, getCart, minusQty, plusQty } from '../controllers/cart.controller';
import { validateToken } from '../middleware/validation';

const cartRouter = Router()

// GET
cartRouter.get("/",validateToken,getCart)

// POST
cartRouter.post("/add-to-cart",validateToken,addToCart)

// DELETE
cartRouter.delete("/:id",validateToken,deleteCart)

// UPDATE QTY
cartRouter.patch("/plus/:id", validateToken,plusQty)
cartRouter.patch("/minus/:id", validateToken,minusQty)

export {cartRouter}
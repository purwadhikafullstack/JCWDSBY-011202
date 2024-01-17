import { Router } from 'express';
import { addToCart, deleteCart, getCart, minusQty, plusQty } from '../controllers/cart.controller';
import { validateToken,ValidateUser } from '../middleware/validation';
import { getSummary } from '../controllers/cart.controller2';

const cartRouter = Router()

// GET
cartRouter.get("/",validateToken,ValidateUser,getCart)

// GET Cart Summary
cartRouter.get("/summary/:id",validateToken,ValidateUser,getSummary)

// POST
cartRouter.post("/add-to-cart",validateToken,ValidateUser,addToCart)

// DELETE
cartRouter.delete("/:id",validateToken,ValidateUser,deleteCart)

// UPDATE QTY
cartRouter.patch("/plus/:id", validateToken,ValidateUser,plusQty)
cartRouter.patch("/minus/:id", validateToken,ValidateUser,minusQty)

export {cartRouter}
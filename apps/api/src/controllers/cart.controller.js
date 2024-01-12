import fs from 'fs/promises';
import path from 'path';
import { Model, Op, Sequelize } from 'sequelize';
import carts from '../models/carts';
import products from '../models/products';
import jwt from "jsonwebtoken"


// untuk API ("cart/add-to-cart")
export const addToCart = async (req, res, next) => {
    try {
        const findProduct = await carts.findOne({
            where: {
                [Op.and]: [
                    { account_id: req.userData.id },
                    { product_id: req.body.product_id }
                ]
            },
            raw: true
        })
        if (!findProduct) {
            const result = await carts.create({
                account_id: req.userData.id,
                product_id: req.body.product_id,
                quantity: req.body.quantity,
                total_price: req.body.total_price,
                createdAt: new Date(),
                updatedAt: new Date()

            })
            return res.status(200).send({
                message: "Success add product to cart", result: result
            })
        } else {
            const result = await carts.update({
                quantity: findProduct.quantity + req.body.quantity,
                total_price: findProduct.total_price + req.body.total_price,
                updatedAt: new Date(),
            },
                {
                    where: {
                        id: findProduct.id
                    }
                })
            return res.status(200).send({
                message: "Success add product to cart", result: result
            })
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: "failed", error: error.message })
    }

}
// Untuk API("/cart")
export const getCart = async (req, res, next) => {
    try {
        const allProduct = await carts.findAndCountAll({
            where: {
                account_id: req.userData.id
            },
            include: [
                {
                    model: products,
                    required: true,
                    attributes: ["name", "price"]
                }
            ],
            raw: true
        })
        return res.status(200).send({
            message: "Berhasil mendapatkan data carts",
            result: allProduct
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
// Untuk API("/cart")
export const deleteCart = async (req, res, next) => {
    try {
        console.log("params", req.params.id);
        console.log("params 2", req.userData.id);
        const result = await carts.destroy({
            where: {
                account_id: req.userData.id,
                id: req.params.id
            }
        })
        return res.status(200).send({
            message: "Success delete cart item",
            result: result
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}
export const plusQty = async (req, res, next) => {
    try {
        console.log("masuk plus");
        const findProduct=await carts.findOne({
            where:{[Op.and]:[
                {account_id: req.userData.id},
                {id: req.params.id}]
            },
            include: [
                {
                    model: products,
                    required: true,
                    attributes: ["name", "price"]
                }
            ],
            raw:true
        })
        const data = await carts.update({
            quantity:findProduct.quantity+1,
            total_price:findProduct[`product.price`]*(findProduct.quantity+1)
        },{
            where: {
                id:findProduct.id
            }
            
        })
        return res.status(200).send({message
        :"success increase qty",
    result:data})
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
export const minusQty = async (req, res, next) => {
    try {
        console.log("masuk minus");

        const findProduct=await carts.findOne({
            where:{[Op.and]:[
                {account_id: req.userData.id},
                {id: req.params.id}]
            },
            include: [
                {
                    model: products,
                    required: true,
                    attributes: ["name", "price"]
                }
            ],
            raw:true
        })
        if(findProduct.quantity===1){
            const data = await carts.destroy({
                where: {
                    id:findProduct.id
                }
            })
            return res.status(200).send({
                message:"success delete product cart",
                result:data
            })
        } else {
            const data = await carts.update({
                quantity:findProduct.quantity-1,
                total_price:findProduct[`product.price`]*(findProduct.quantity-1)
            },{
                where: {
                    id:findProduct.id
                }
                
            })
            return res.status(200).send({message
            :"success increase qty",
        result:data})
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
export const other = async (req, res, next) => {

}
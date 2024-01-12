import fs from 'fs/promises';
import path from 'path';
import { Model, Op, Sequelize } from 'sequelize';
import carts from '../models/carts';
import products from '../models/products';
const jwt = require("jsonwebtoken");


// untuk API ("cart/add-to-cart")
export const addToCart = async(req,res,next)=>{
    try {
        console.log("sini", req.userData);
        console.log("sini 2", req.body);
        const userData = jwt.verify(req.userData.token)
        console.log("sini 3", userData);
        
        const result = await carts.create({
            account_id : userData.id,
            product_id : req.body.product_id,
            quantity : req.body.quantity,
            total_price : req.body.total_price,
            createdAt : new Date(),
            updatedAt : new Date(),
        })
        return res.status(200).send({message:"Success add product to cart", result:result
        })
    } catch (error) {
        console.log(error.message);  
        return res.status(500).send({message:"failed",error:error.message})
    }

}

export const getCart = async(req,res,next)=>{
try {
    const allProduct = await carts.findAndCountAll({
        where:{
            account_id:req.body.account_id
        },
        include: [
            {
                model:products,
                required:true,
                attributes:["name", "price"]
            }
        ]
        })
        return res.status(200).send({
            message:"Berhasil mendapatkan data carts",
            result:allProduct
        })
} catch (error) {
    return res.status(500).send(error.message)
}
}
export const deleteCart = async(req,res,next)=>{

}
export const updateCart = async(req,res,next)=>{

}
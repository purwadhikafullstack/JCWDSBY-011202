import fs from 'fs/promises';
import path from 'path';
import { Model, Op, Sequelize } from 'sequelize';
import carts from '../models/carts';
import products from '../models/products';
import jwt from "jsonwebtoken"
// Ini routing backend untuk add to cart, get cart, delete cart, update cart plus dan minus

// GET Summary
export const getSummary = async (req, res, next) => {
 try {
   let data=[]
   let price=[]
   let weight=[]
   let checkedProduct_id = []
   if(req.params.id.includes(" ")){
      data = [...req.params.id.split(" ")]
   } else {
      data=req.params.id
   }
   const summary = await carts.findAll({
      where:{
         id:data
      },
      attributes:["total_price", "total_weight", "product_id"],
      raw:true
   })
  for (let i = 0; i < summary.length; i++) {
     price.push(summary[i].total_price)
     weight.push(summary[i].total_weight)
     checkedProduct_id.push(summary[i].product_id)
  } 
  let allPrice = price.reduce((a,b)=>{return a+b})
  let allWeight = weight.reduce((a,b)=>{return a+b})
  return res.status(200).send({
   success:true,
   message:"Success get summary cart",
   allPrice,
   allWeight,
   checkedProduct_id,
   allWeightConvert:allWeight/1000,
   totalItem:checkedProduct_id.length,
   data
  })
} catch (error) {
     return res.status(500).send({success:false,message:error
    .message})
 }   
}

// PATCH Qty
export const updateQty =async (req,res,next)=>{
   try {
      // console.log("haia",req.params.id);
      // console.log("haia2",req.body);
      const findCart = await carts.findOne({
         where:{
            id:req.params.id
         },
         include: [
            {
                model: products,
                required: true,
                attributes: ["name", "price", "weight"]
            }
        ],
         raw:true
      })
      if(req.body.quantity>req.body.stock){
         const data = await carts.update({
            quantity: req.body.stock,
            total_price:findCart[`product.price`]*req.body.stock,
            total_weight:findCart[`product.weight`]*req.body.stock
        }, {
            where: {
                id: req.params.id
            }
   
        })
        return res.status(200).send(data)
      } else {

         const data = await carts.update({
            quantity: req.body.quantity,
            total_price:findCart[`product.price`]*req.body.quantity,
            total_weight:findCart[`product.weight`]*req.body.quantity
        }, {
            where: {
                id: req.params.id
            }
   
        })
        return res.status(200).send(data)
      }
   } catch (error) {
      return res.status(500).send(error)
   }
}

// Untuk API("/navbar")
export const getCountCart = async (req, res, next) => {
   try {
      console.log("masuk navbar");
       const allProduct = await carts.findAndCountAll({
           where: {
               account_id: req.userData.id
           },
           raw: true
       })
       return res.status(200).send({
           message: "Berhasil mendapatkan data carts",
           result: allProduct.count
       })
   } catch (error) {
       return res.status(500).send(error.message)
   }
}
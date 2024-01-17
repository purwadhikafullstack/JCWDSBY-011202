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
   totalItem:checkedProduct_id.length
  })
} catch (error) {
     return res.status(500).send({success:false,message:error
    .message})
 }   
}
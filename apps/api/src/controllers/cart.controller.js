import fs from 'fs/promises';
import path from 'path';
import { Model, Op, Sequelize } from 'sequelize';
import carts from '../models/carts';
import products from '../models/products';
import jwt from "jsonwebtoken"
import product_images from '../models/product_images';
import warehouse_storage from '../models/warehouse_storage';
// Ini routing backend untuk add to cart, get cart, delete cart, update cart plus dan minus
// untuk API ("cart/add-to-cart")
export const addToCart = async (req, res, next) => {
    try {
        const findCart = await carts.findOne({
            where: {
                [Op.and]: [
                    { account_id: req.userData.id },
                    { product_id: req.body.product_id }
                ]
            },
            include: [
                {
                    model: products,
                    required: true,
                    attributes: ["name", "price", "weight"]
                }
            ],
            raw: true
        })
        if (!findCart) {
            const result = await carts.create({
                account_id: req.userData.id,
                product_id: req.body.product_id,
                quantity: req.body.quantity,
                total_price: req.body.quantity * req.body.price,
                total_weight: req.body.quantity * req.body.weight,
                createdAt: new Date(),
                updatedAt: new Date()

            })
            return res.status(200).send({
                message: "Success add product to cart", result: result
            })
        } else {
            const result = await carts.update({
                quantity: findCart.quantity + req.body.quantity,
                total_price: findCart.total_price + (req.body.price * req.body.quantity),
                total_weight: findCart.total_weight + (req.body.weight * req.body.quantity),
                updatedAt: new Date(),
            },
                {
                    where: {
                        id: findCart.id
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
                    attributes: ["name", "price", "weight", "id"],
                    include: [{ model: product_images, required: true, attributes: ["image"] }]
                }
            ],
            raw: true
        })
        const result = []
        let index = []
        // console.log("0",allProduct);
        // console.log("1",allProduct.rows);
        allProduct.rows.map((val, id) => {
            if (!index.includes(allProduct.rows[id].product_id)) {
                index.push(allProduct.rows[id].product_id)
                result.push({ ...allProduct.rows[id], productWeightConvert: val[`product.weight`] / 1000, total_weightConvert: val.total_weight / 1000, isChecked: false })
            }
        })
        console.log("uo",result);
        const productId = []
        result.map((val, id) => { productId.push(val.product_id) })
        const stock = await warehouse_storage.findAll({
            attributes: ["product_id", "stock"], where: {
                product_id: productId
            }, raw: true
        })
        const stockProduct = []
        let filterProductId = -1
        stock.map((val, idx) => {
            filterProductId = val.product_id
            let id = stockProduct.findIndex(val => val.product_id == filterProductId)
            if (id < 0) {
                stockProduct.push(stock[idx])
            } else {
                stockProduct[id].stock = stockProduct[id].stock + val.stock
            }
        })
        stockProduct.map((val, id) => {
            let idx = result.findIndex(val => val.product_id == stockProduct[id].product_id)
            console.log("cari", idx);
            // console.log("cari2",stockProduct[id].product_id);
            if (idx >= 0) {
                console.log("ini val stock", val.stock);
                result[idx].stock = val.stock
            } else {
                console.log("id product tidak ditemukan");
            }
        })
        console.log("result tambah stock", result);
        //    console.log("stockproduct",stockProduct);
        //    console.log("stock",stock);
        return res.status(200).send({
            message: "Berhasil mendapatkan data carts",
            result: result,
            count: result.length
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
// Untuk API("/cart")
export const deleteCart = async (req, res, next) => {
    try {
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
        console.log("maaaaa");
        const findProduct = await carts.findOne({
            where: {
                [Op.and]: [
                    { account_id: req.userData.id },
                    { id: req.params.id }]
            },
            include: [
                {
                    model: products,
                    required: true,
                    attributes: ["name", "price", "weight"]
                }
            ],
            raw: true
        })
        if (findProduct.quantity + 1 > req.body.stock) {
            const data = await carts.update({
                quantity: req.body.stock,
                total_price: req.body.stock * findProduct[`product.price`],
                total_weight: req.body.stock * findProduct[`product.weight`],
            }, {
                where: {
                    id: findProduct.id
                }
            })
            return res.status(200).send({
                message
                    : "success increase qty",
                result: data
            })
        } else {
            const data = await carts.update({
                quantity: findProduct.quantity + 1,
                total_price: findProduct.total_price + findProduct[`product.price`],
                total_weight: findProduct.total_weight + findProduct[`product.weight`],
            }, {
                where: {
                    id: findProduct.id
                }

            })
            return res.status(200).send({
                message
                    : "success increase qty",
                result: data
            })

        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
export const minusQty = async (req, res, next) => {
    try {
        const findProduct = await carts.findOne({
            where: {
                [Op.and]: [
                    { account_id: req.userData.id },
                    { id: req.params.id }]
            },
            include: [
                {
                    model: products,
                    required: true,
                    attributes: ["name", "price", "weight"]
                }
            ],
            raw: true
        })
        if (findProduct.quantity === 1) {
            const data = await carts.destroy({
                where: {
                    id: findProduct.id
                }
            })
            return res.status(200).send({
                message: "success delete product cart",
                result: data
            })
        } else {
            const data = await carts.update({
                quantity: findProduct.quantity - 1,
                total_price: findProduct.total_price - findProduct[`product.price`],
                total_weight: findProduct.total_weight - findProduct[`product.weight`],
            }, {
                where: {
                    id: findProduct.id
                }
            })
            // data.total_weight_convert = data.total_weight / 1000
            return res.status(200).send({
                message
                    : "success increase qty",
                result: data
            })
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
import { Op, where } from "sequelize";
import order_details from "../models/order_details";
import orders from "../models/orders";
import product_images from "../models/product_images";
import products from "../models/products";
import addresses from "../models/addresses";
import cities from "../models/cities";
import provinces from "../models/provinces";
import fs from 'fs';
import path from 'path';

export const getUserOrder = async (req, res, next) => {
    try {
        const userOrder = await orders.findAll({
            where: {
                account_id: req.userData.id
            },
            attributes: ["id", "invoice", "total_price", "recepient", "status", "createdAt"],
            raw: true
        })
        const orderId = userOrder.map((val, id) => { return val.id })
        const orderInv = userOrder.map((val, id) => { return val.invoice })
        const userOrderItem = await order_details.findAll({
            where: {
                order_id: orderId,
                invoice: orderInv
            },
            attributes: ["quantity", "total_price", "order_id", "invoice"],
            include: [
                {
                    model: products,
                    required: true,
                    attributes: ["id", "price", "name"],
                    include: [{
                        model: product_images,
                        required: true,
                        attributes: ["image"]
                    }]
                }
            ],
            raw: true
        })
        // console.log("1", userOrder);
        // console.log("2", userOrderItem);
        const result = []
        for (let i = 0; i < userOrder.length; i++) {
            result.push(userOrder[i])
            const index = []
            for (let j = 0; j < userOrderItem.length; j++) {
                if (userOrder[i].id === userOrderItem[j]["order_id"] && userOrder[i].invoice === userOrderItem[j]["invoice"]) {
                    if (!index.includes(userOrderItem[j]["product.id"])) {
                        index.push(userOrderItem[j]["product.id"])
                        if (!userOrder[i]["data"]) {
                            userOrder[i]["data"] = [userOrderItem[j]]
                        } else {
                            userOrder[i].data.push(userOrderItem[j])
                        }
                    }
                }
            }
        }
        console.log("1", result);
        // console.log("2",result[0].data);
        // console.log("3",result[1].data);
        // console.log("4",result[3].data);
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}
export const deleteOrder = async (req, res, next) => {
    try {
        console.log("req.body", req.body);
        const result = await orders.update({
            status: "Dibatalkan"
        },
            {
                where: {
                    id: req.body.id,
                    invoice: req.body.invoice
                }
            })
        return res.status(200).send({ message: "Berhasil membatalkan pesanan" })
    } catch (error) {
        return res.status(500).send(error)
    }
}
export const getOrderDetail = async (req, res, next) => {
    try {
        const userOrder = await orders.findAll({
            where: {
                id: req.query.order,
                invoice: req.query.inv
            },
            include: [{
                model: addresses,
                required: true,
                attributes: ["address", "phone"],
                include: [{
                    model: cities,
                    attributes: ["name"]
                },
                {
                    model: provinces,
                    attributes: ["name"]
                }]
            }],
            raw: true
        })
        return res.status(200).send(userOrder)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}
export const uploadPaymentProof = async (req, res, next) => {
    try {
        console.log("masuk 1", req.file);
        const uploadProof = await orders.findOne({
            where: {
                id: req.query.order,
                invoice: req.query.inv
            },
            attributes: ["payment_proof"],
            raw: true
        })
        console.log("masuk 2", uploadProof);

        if (uploadProof.payment_proof) {
            const filePath = path.join(
                __dirname,
                '../../src/public/productimage',
                req.file.filename
            )
            fs.unlinkSync(filePath)
        }
        console.log("masuk ga3?");
        const edit = await orders.update({
            payment_proof: req.file.filename,
            status: "Menunggu Konfirmasi Pembayaran"
        }, {
            where: {
                id: req.query.order,
                invoice: req.query.inv
            }
        })
        return res.status(200).send("success upload")
    } catch (error) {
        return res.status(500).send(error)
    }
}

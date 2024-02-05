import { Op } from "sequelize";
import order_details from "../models/order_details";
import orders from "../models/orders";
import product_images from "../models/product_images";
import products from "../models/products";

export const getUserOrder = async (req, res, next) => {
    try {
        const userOrder = await orders.findAll({
            where: {
                account_id: req.userData.id
            },
            attributes: ["id", "invoice", "total_price", "recepient","status","createdAt"],
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
                    attributes: ["id", "price","name"],
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
        console.log("1",result);
        // console.log("2",result[0].data);
        // console.log("3",result[1].data);
        // console.log("4",result[3].data);
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}
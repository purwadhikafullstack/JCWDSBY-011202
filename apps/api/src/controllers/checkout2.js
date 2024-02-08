import { Op } from "sequelize";
import accounts from "../models/accounts";
import addresses from "../models/addresses"
import carts from "../models/carts";
import cities from "../models/cities";
import order_details from "../models/order_details";
import orders from "../models/orders";
import provinces from "../models/provinces";
import warehouse_storage from "../models/warehouse_storage";
import warehouse_mutation from "../models/warehouse_mutation";

export const getUserAddress = async (req, res, next) => {
    try {
        const address = await addresses.findAll({
            where: {
                account_id: req.userData.id
            },
            include: [
                {
                    model: provinces,
                    required: true,
                    attributes: ["name"]
                },
                {
                    model: cities,
                    required: true,
                    attributes: ["name"]
                },
            ],
            raw: true
        })
        return res.status(200).send({ success: "Success get address", address })
    } catch (error) {
        return res.status(500).send({ success: "FAILED get address" })

    }
}
export const changeUserAddress = async (req, res, next) => {
    try {
        // console.log("haha",req.body);
        const result = await accounts.update({
            address_id: req.body.address
        },
            {
                where: {
                    id: req.userData.id
                }
            })
        // console.log("ganit da",result);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error)
    }
}
export const createOrder = async (req, res, next) => {
    try {
        // console.log("masuk nih", req.body);
        const orderDetails = []
        const orderItemsId = req.body.cartId.split(",")
        const countOrder = await orders.findAndCountAll({
            where: {
                account_id: req.userData.id
            },
            attributes: ["id"],
            raw: true
        })
        const orderItems = await carts.findAll({
            where: {
                id: orderItemsId
            },
            raw: true
        })
        const productId = orderItems.map((val, idx) => { return val.product_id })
        console.log("orderitems", orderItems);
        // const productStock = await warehouse_storage.findAll({
        //     where: {
        //         warehouse_id: req.body.warehouse_id,
        //         product_id: productId,
        //         is_deleted:0
        //     }, raw: true
        // })
        // const productIdLessStock = []
        // const productLessStock = []
        // orderItems.map((val, id) => {
        //     if (val.product_id == productStock[id].product_id) {
        //         if (val.quantity >= productStock[id].stock) {
        //             productIdLessStock.push(val.product_id)
        //             productLessStock.push({ product_id: val.product_id, quantity: val.quantity, warehouseStock: productStock[id].stock })
        //         }
        //     }
        // })
        // let total = 0
        // if (productIdLessStock.length > 0) {
        //     console.log("masuk sini1");
        //     const searchStock = await warehouse_storage.findAll({
        //         where: {
        //             product_id: productIdLessStock,
        //         },
        //         order: [["stock", "DESC"]],
        //         raw: true
        //     })
        //     const itemMutation = []
        //     let date = new Date()
        //     for (let i = 0; i < productLessStock.length; i++) {
        //         total = parseInt(productLessStock[i].warehouseStock)
        //         for (let j = 0; j < searchStock.length; j++) {
        //             if (
        //                 searchStock[j].product_id == productLessStock[i].product_id &&
        //                 productLessStock[i].quantity > total &&
        //                 searchStock[j].warehouse_id != productLessStock[i].warehouse_id) {
        //                 const countMutation = await warehouse_mutation.findAndCountAll({
        //                     where:{
        //                         destination_warehouse_id:req.body.warehouse_id
        //                     },raw:true
        //                 })
        //                 console.log("hitung",countMutation);
        //                 total = total+parseInt(searchStock[j].stock)
        //                 // console.log("hola",searchStock[j]);
        //                 itemMutation.push({
        //                     mutation_code:`MUT/${date.getFullYear()}${date.getMonth()}${date.getDate()}/ORI${req.body.warehouse_id}/DEST${searchStock[j].warehouse_id}/PR${productLessStock[i].product_id}/${countMutation.count}/${j+1}`,
        //                     product_id: productLessStock[i].product_id,
        //                     warehouse_id: req.body.warehouse_id,
        //                     source_warehouse_id: searchStock[j].warehouse_id,
        //                     destination_warehouse_id: req.body.warehouse_id,
        //                     quantity: productLessStock[i].quantity >= total ? searchStock[j].stock : productLessStock[i].quantity - total,
        //                     mutation_type:"request",
        //                     status:"waiting confirmation"
        //                 })
        //             }
        //         }
        //     }
        //     console.log("masuk sini3", itemMutation);
        //     const createMutation = await warehouse_mutation.bulkCreate(itemMutation)
        // }
            const createOrder = await orders.create({
                invoice: `${req.body.invoice}${countOrder.count+1}`,
                account_id: req.userData.id,
                address_id: req.body.address_id,
                warehouse_id: req.body.warehouse_id,
                recepient: req.body.recepient,
                shipping_cost: req.body.shipping_cost,
                shipping_type: req.body.shipping_type,
                total_price: req.body.total_price,
                total_weight: req.body.total_weight,
                status: "Menunggu Pembayaran",
                createdAt: new Date(),
                updatedAt: new Date()
            })
            orderItems.map((val,idx)=>{
                return orderDetails.push({
                    invoice:createOrder.invoice,
                    order_id:createOrder.id,
                    product_id:val.product_id,
                    warehouse_id:createOrder.warehouse_id,
                    quantity:val.quantity,
                    total_price:val.total_price,
                    total_weight:val.total_weight
                })
            })
            const deleteCartItems = await carts.destroy({
                where:{id:orderItemsId}
            })
          const createOrderDetail = await order_details.bulkCreate(orderDetails)
        return res.status(200).send({message:"success create order",id:createOrder.id,invoice:createOrder.invoice})
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}
export const getOrderData = async (req, res, next) => {
    try {
        const result = await orders.findOne({
            where: {
                [Op.and]: [
                    { id: parseInt(req.query.id) },
                    { invoice: req.query.inv }
                ]
            },
            include: [
                {
                    model: accounts,
                    required: true,
                    attributes: ["email"]
                }],
            raw: true
        })
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}
import accounts from "../models/accounts";
import addresses from "../models/addresses"
import carts from "../models/carts";
import cities from "../models/cities";
import order_details from "../models/order_details";
import orders from "../models/orders";
import provinces from "../models/provinces";

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
        // console.log("alaa cuy",address);
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
        console.log("masuk nih", req.body);
        const orderDetails = []
        const orderItemsId = req.body.cartId.split(",")
        console.log("orderItems",orderItemsId);
        const countOrder = await orders.findAndCountAll({
            where:{
                account_id:99
            },
            attributes:["id"],
            raw:true
        })
        const orderItems = await carts.findAll({
            where:{
                id:orderItemsId
            },
            raw:true
        })
        console.log("ini data cartnya",orderItems);
        console.log("ini data cartnya",countOrder);
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
        console.log("ini yang mau di bulk create",orderDetails);
      const createOrderDetail = await order_details.bulkCreate(orderDetails)
    return res.status(200).send({message:"success create order",id:createOrder.id,invoice:createOrder.invoice})
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}
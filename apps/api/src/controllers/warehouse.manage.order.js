import warehouse from '../models/warehouses';
import warehouse_storage from '../models/warehouse_storage';
import orders from '../models/orders';
import addresses from '../models/addresses';
import provinces from '../models/provinces';
import cities from '../models/cities';
import order_details from '../models/order_details';
import product_images from '../models/product_images';
import products from '../models/products';
export const getWarehouseOrderData = async (req, res, next) => {
    try {
        // console.log("masu bos", req.userData);
        const result = await orders.findAll({
            where: {
                warehouse_id: req.userData.warehouse_id
            },
            include: [
                {
                    model: addresses,
                    required: true,
                    attributes: ["address"],
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
                        }
                    ]
                },

            ],
            raw: true
        })
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}
export const getManageOrderDetail = async (req, res, next) => {
    try {
        // console.log("mulai kerjakan", req.query);
        const data = await order_details.findAll({
            where: {
                order_id: req.query.id,
            },
            include:[{
                model:products,
                required:true,
                attributes:["id","name","price"],
                include:[{
                    model:product_images,
                    required:true,
                    attributes:["image"]
                }]
            }],
            raw: true
        })
        const result = []
        const index = []
        data.map((val,idx)=>{
            if(!index.includes(data[idx].product_id)){
                index.push(data[idx].product_id)
                result.push(val)
            }
        })
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}
export const updateStatus = async (req, res, next) => {
try {
    const result = await orders.update({
        status:req.body.status
    },{
        where:{
            invoice:req.body.invoice,
            id:req.body.id
        }
    })
    return res.status(200).send(result)

} catch (error) {
    return res.status(500).send(error)
}
}
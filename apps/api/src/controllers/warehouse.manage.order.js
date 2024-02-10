import warehouse from '../models/warehouses';
import warehouse_storage from '../models/warehouse_storage';
import orders from '../models/orders';
export const getWarehouseOrderData = async (req, res, next) => {
try {
    // console.log("masu bos", req.userData);
    const result = await orders.findAll({
        where:{
            warehouse_id:req.userData.warehouse_id
        }, raw:true
    })
    return res.status(200).send(result)
} catch (error) {
    return res.status(500).send(error)
}
}

import { Op } from "sequelize";
import accounts from "../models/accounts";
import addresses from "../models/addresses"
import carts from "../models/carts";
import cities from "../models/cities";
import order_details from "../models/order_details";
import orders from "../models/orders";
import provinces from "../models/provinces";
export const getUsernamePict = async (req, res, next) => {
    try {
    const result = await accounts.findOne({
        where:{
            id:req.userData.id
        },
        attributes:["username","profile_picture"],
        raw:true
    })
    return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}

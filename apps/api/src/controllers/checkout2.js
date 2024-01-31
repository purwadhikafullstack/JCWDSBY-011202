import accounts from "../models/accounts";
import addresses from "../models/addresses"
import cities from "../models/cities";
import provinces from "../models/provinces";

export const getUserAddress = async (req, res, next) => {
    try {
        const address = await addresses.findAll({
            where:{
                account_id:req.userData.id
            },
            include:[
                {
                    model:provinces,
                    required:true,
                    attributes:["name"]
                },
                {
                    model:cities,
                    required:true,
                    attributes:["name"]
                },
            ],
            raw:true
        })
        // console.log("alaa cuy",address);
        return res.status(200).send({success:"Success get address",address})
    } catch (error) {
        return res.status(500).send({success:"FAILED get address"})
        
    }
}
export const changeUserAddress = async (req, res, next) => {
    try {
        // console.log("haha",req.body);
        const result = await accounts.update({
            address_id:req.body.address
        },
        {
            where:{
                id:req.userData.id
            }
        })
        // console.log("ganit da",result);
        return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error)
    } 
}

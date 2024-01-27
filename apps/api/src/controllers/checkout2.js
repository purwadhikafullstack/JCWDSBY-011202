import addresses from "../models/addresses"

export const getUserAddress = async (req, res, next) => {
    try {
        const address = await addresses.findOne({
            where:{
                id:19
            },
            raw:true
        })
        console.log("alaa cuy",address);
        return res.status(200).send({success:"Success get address",address})
    } catch (error) {
        return res.status(500).send({success:"FAILED get address"})
        
    }
}
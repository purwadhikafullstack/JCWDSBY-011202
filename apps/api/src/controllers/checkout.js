import accounts from "../models/accounts"
import addresses from "../models/addresses"
import carts from "../models/carts"
import cities from "../models/cities"
import product_images from "../models/product_images"
import products from "../models/products"
import provinces from "../models/provinces"

export const getCartToCheckout = async(req,res,next)=>{
    try {
        let cartId = ""
        if(req.params.id.includes(",")){
        cartId = req.params.id.split(",")            
        } else {
         cartId = req.params.id
        }
        const data = await carts.findAll({
            where:{
                id:cartId
            },
            include: [
                {
                    model: products,
                    required: true,
                    attributes: ["name", "price", "weight"],
                    include:[{model:product_images,required:true,attributes:["image"]}]
                }
            ],
            raw:true
        })
        const result =[]
        const allPrice = [] 
        const allWeight = [] 
        let index=0
        data.map((val,id)=>{
            if(data[id].product_id != index){
                index = data[id].product_id
                allPrice.push(val.total_price)
                allWeight.push(val.total_weight)
                result.push({ ...data[id], productWeightConvert: val[`product.weight`] / 1000, total_weightConvert: val.total_weight / 1000 })
            }
        })

        let checkoutPrice = allPrice.reduce((a,b)=>{return a+b})
        let checkoutWeight = allWeight.reduce((a,b)=>{return a+b})
        return res.status(200).send({
            message:"success get cart data",
            result,
            checkoutPrice,
            checkoutWeight
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const getUserData = async(req,res,next)=>{
    try {
        // console.log("loh dah masuk");
        const result = await accounts.findOne({
            where:{
                id:req.userData.id
            },
            attributes:{exclude:["password","createdAt","updatedAt","is_deleted","id"]},
            include:[{
                model:addresses,
                required:true,
                attributes:["prov_id","city_id", "phone","address"]
            }],
            raw:true
        })
        const city = await cities.findOne({
            where:{
                id:result["addresses.city_id"]
            },
            attributes:["name"],
            raw:true
        })
        // console.log("loh dah masuk 2", city);
        const province = await provinces.findOne({
            where:{
                id:result["addresses.prov_id"]
            },
            attributes:["name"],
            raw:true
        })
        const final = {...result,city:city.name,province:province.name}
        
        return res.status(200).send({
            message:"success get user data",
           final
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}
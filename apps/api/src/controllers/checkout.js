import axios from "axios"
import { distance } from "../helper/distance"
import accounts from "../models/accounts"
import addresses from "../models/addresses"
import carts from "../models/carts"
import cities from "../models/cities"
import product_images from "../models/product_images"
import products from "../models/products"
import provinces from "../models/provinces"
import warehouses from "../models/warehouses"

export const getCartToCheckout = async (req, res, next) => {
    try {
        let cartId = ""
        if (req.params.id.includes(",")) {
            cartId = req.params.id.split(",")
        } else {
            cartId = req.params.id
        }
        const data = await carts.findAll({
            where: {
                id: cartId
            },
            include: [
                {
                    model: products,
                    required: true,
                    attributes: ["name", "price", "weight"],
                    include: [{ model: product_images, required: true, attributes: ["image"] }]
                }
            ],
            raw: true
        })
        const result = []
        const allPrice = []
        const allWeight = []
        let index = 0
        data.map((val, id) => {
            if (data[id].product_id != index) {
                index = data[id].product_id
                allPrice.push(val.total_price)
                allWeight.push(val.total_weight)
                result.push({ ...data[id], productWeightConvert: val[`product.weight`] / 1000, total_weightConvert: val.total_weight / 1000 })
            }
        })

        let checkoutPrice = allPrice.reduce((a, b) => { return a + b })
        let checkoutWeight = allWeight.reduce((a, b) => { return a + b })
        return res.status(200).send({
            message: "success get cart data",
            result,
            checkoutPrice,
            checkoutWeight
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const getUserData = async (req, res, next) => {
    try {
        // console.log("loh dah masuk");
        const result = await accounts.findOne({
            where: {
                id: req.userData.id
            },
            attributes: { exclude: ["password", "createdAt", "updatedAt", "is_deleted", "id"] },
            include: [{
                model: addresses,
                required: true,
                attributes: ["prov_id", "city_id", "phone", "address", "lat", "lon"]
            }],
            raw: true
        })
        const city = await cities.findOne({
            where: {
                id: result["addresses.city_id"]
            },
            attributes: ["name"],
            raw: true
        })
        // console.log("loh dah masuk 2", city);
        const province = await provinces.findOne({
            where: {
                id: result["addresses.prov_id"]
            },
            attributes: ["name"],
            raw: true
        })
        const final = { ...result, city: city.name, province: province.name }
        // console.log("hasul user data", final);
        return res.status(200).send({
            message: "success get user data",
            final
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const getShippingCost = async (req, res, next) => {
    try {
        // console.log("q masuk");
        // console.log("q untuk lokasi", req.query);
        if(req.query.weight>30000){
            req.query.weight=30000
        }
        const gudangLoc = await warehouses.findAll({
            where: {
                is_deleted: 0
            },
            include: [
            {
                model: cities,
                required: true,
                attributes: ["name"]
            }],
            raw: true,
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        let shortest = 0
        const origin = []
        gudangLoc.map((val,id)=>{
            let dist = distance(parseFloat(req.query.lat),parseFloat(req.query.lon),parseFloat(val.lat),parseFloat(val.lon))
            if(id==0){
                shortest=dist
                origin.push(gudangLoc[id])
            } else{
                if(shortest>dist){
                    shortest=dist
                    origin.pop()
                    origin.push(gudangLoc[id])
                }
            }
        })
        const dbCity =await axios.get("https://api.rajaongkir.com/starter/city",{
            headers:{key:"6bbe9009786e32eb45afc273fd506b31"}
        })
        const allCity=dbCity.data.rajaongkir.results
        const originId = allCity.findIndex(val=>val.city_name==origin[0]["city.name"])
        const destinationId=allCity.findIndex(val=>val.city_name==req.query.kota)
        const formData = new FormData();
        formData.append("origin", allCity[originId].city_id)
        formData.append("destination", allCity[destinationId].city_id)
        formData.append("weight", req.query.weight)
        formData.append("courier", "jne")
        const cost = await axios.post("https://api.rajaongkir.com/starter/cost", formData, {
            headers: {
                key: '6bbe9009786e32eb45afc273fd506b31'
            }
        })
        return res.status(200).send(cost.data.rajaongkir.results[0].costs)
    } catch (error) {
        console.log(error);
    }
}
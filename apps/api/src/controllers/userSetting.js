import axios from "axios"
import accounts from "../models/accounts"
import addresses from "../models/addresses"
import cities from "../models/cities"
import provinces from "../models/provinces"

export const getUserMainAddress = async (req, res, next) => {
    try {
        const result = await accounts.findOne({
            where: {
                id: req.userData.id
            },
            attributes: ["address_id"],
            raw: true
        })
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}
export const getProvinces = async (req, res, next) => {
    try {
        const province = await provinces.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        res.status(200).send({ success: true, data: province });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'ERROR GETTING DATA' });
    }
}
export const getCitiesRama = async (req, res, next) => {
    try {
        console.log("ini paam", req.params);
        const city = await cities.findAll({
            where: {
                prov_id: req.params.prov_id
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            raw: true
        });
        res.status(200).send({ success: true, data: city });
    } catch (error) {
        res.status(500).send({ success: false, message: 'ERROR GETTING DATA' });
    }
}
export const createNewAddress = async (req, res, next) => {
    try {
        const cityName = await cities.findOne({
            where: {
                id: req.body.city_id
            },
            attributes: ["name"],
            raw: true
        })
        console.log("1", cityName);
        const searchLatLon = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${req.body.address}%2C+${cityName.name}%2C+Indonesia&key=4f33f6aa35b34fca97c8c6d583fbe834`)
        const createAddress = await addresses.create({
            account_id: req.userData.id,
            prov_id: req.body.prov_id,
            city_id: req.body.city_id,
            address: req.body.address,
            phone: req.body.phone,
            lat: searchLatLon.data.results[0].geometry.lat,
            lon: searchLatLon.data.results[0].geometry.lng
        })
        const searchMainAddress = await accounts.findOne({
            where: {
                id: req.userData.id
            },
            raw: true
        })
        console.log("main address", searchMainAddress);
        if (!searchMainAddress.address_id) {
            const updateMainAddress = await accounts.update(
                {
                    address_id: createAddress.id
                },
                {
                    where: {
                        id: req.userData.id
                    }
                }
            )
        }
        return res.status(200).send({ success: true, message: "SUCCESS ADD ADDRESS" })
    } catch (error) {
        return res.status(500).send({ success: false, message: 'ERROR CREATE DATA' });

    }
}
export const deleteAddress = async (req, res, next) => {
    try {
        const result = await addresses.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).send({ success: true, message: "Success delete adress" })
    } catch (error) {
        return res.status(500).send(error)
    }
}
export const deleteMainAddress = async (req, res, next) => {
    try {
        // console.log("da",req.query);
        const result = await addresses.destroy({
            where: {
                id: req.query.id
            }
        })
        const setMainAddress = await accounts.update({
            address_id:req.query.other
        },
        {
            where:{
                id:req.userData.id
            }
        }
        )
        return res.status(200).send({ success: true, message: "Success delete adress" })
    } catch (error) {
        return res.status(500).send(error)
    }
}
export const editAddress = async (req, res, next) => {
try {
    const result = await addresses.update({
        prov_id:req.body.prov_id,
        city_id:req.body.city_id,
        address:req.body.address,
        phone:req.body.phone,
    },
    {
        where:{id:req.body.addressId}
    })
    return res.status(200).send({success:true,message:"Success edit address"})   
} catch (error) {
    return res.status(500).send(error)   
}
}
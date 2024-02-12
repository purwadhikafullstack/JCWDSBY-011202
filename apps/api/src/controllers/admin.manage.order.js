import fs from 'fs/promises';
import path from 'path';
import { Op, Sequelize } from 'sequelize';
import orders from '../models/orders';
import addresses from '../models/addresses';
import warehouses from '../models/warehouses';
import accounts from '../models/accounts';
import { templateResponseError } from '../helper/utils';
import { emitWarning } from 'process';

export const getOrder = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit
        let from =""
        let to =""
        // Filter berdasarkan nama gudang
        if (req.query.gudang) {
            if (req.query.gudang.includes("%20")) {
                req.query.gudang = req.query.gudang.replace("%20", " ")
            }
            const gudangId = await warehouses.findOne({ where: { name: req.query.gudang }, raw: true })
            req.query["warehouse_id"] = gudangId.id
            delete req.query.gudang
        }
        if (req.query.status) {
            if (req.query.status.includes("%20")) {
                req.query.status = req.query.status.replace("%20", " ")
            }}
        
        if(req.query.from || req.query.to){
            if(req.query.from && req.query.to){ 
                to=req.query.to
                from=req.query.from
                delete req.query.from
                delete req.query.to
            }
            if (!req.query.to){
                to=new Date()
                delete req.query.from
            }
            if(!req.query.from){
                from = "1972-01-01"
                delete req.query.to

            } 
        }
        
        console.log("query2", req.query);
        console.log("query4", req.query.warehouse_id);
        if(from||to){
            const result = await orders.findAndCountAll({
                where: {
                    ...req.query,
                    createdAt : {[Op.between]:[from,to]},
                    }
                ,
                include: [
                    {
                        model: accounts,
                        required: true,
                        attributes: ["fullname"]
                    },
                    {
                        model: addresses,
                        required: true,
                        attributes: ["address"],
                    },
                    {
                        model: warehouses,
                        required: true,
                        attributes: ["name"]
                    },
                ],
                raw: true,
                limit: limit,
                offset: offset,
                subQuery: false
            })
            return res.status(200).send(result);
        } else {
            console.log("masuk sini");
            const result = await orders.findAndCountAll({
                where: req.query,
                include: [
                    {
                        model: accounts,
                        required: true,
                        attributes: ["fullname"]
                    },
                    {
                        model: addresses,
                        required: true,
                        attributes: ["address"],
                    },
                    {
                        model: warehouses,
                        required: true,
                        attributes: ["name"]
                    },
                ],
                raw: true,
                limit: limit,
                offset: offset,
                subQuery: false
            })
            return res.status(200).send(result);
        }
        
    } catch (error) {
        console.log(error.message);
        // return templateResponseError(400,false,"error get data",error.message,null)
        return res.status(500).send({ success: false, result: null, message: error.message })
    }
}
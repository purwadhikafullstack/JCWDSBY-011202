import { Op, Sequelize } from 'sequelize';
import orders from '../models/orders';
import addresses from '../models/addresses';
import warehouses from '../models/warehouses';
import accounts from '../models/accounts';
import provinces from '../models/provinces';
import cities from '../models/cities';

export const getWarehouseSearchOrder = async (req, res, next) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;
    // const offset = (page - 1) * limit
    let from = '';
    let to = '';
    // Filter berdasarkan nama gudang
    // if (req.query.gudang) {
    //     if (req.query.gudang.includes("%20")) {
    //         req.query.gudang = req.query.gudang.replace("%20", " ")
    //     }
    //     const gudangId = await warehouses.findOne({ where: { name: req.query.gudang }, raw: true })
    //     req.query["warehouse_id"] = gudangId.id
    //     delete req.query.gudang
    // }
    if (req.query.status) {
      if (req.query.status.includes('%20')) {
        req.query.status = req.query.status.replace('%20', ' ');
      }
    }

    if (req.query.from || req.query.to) {
      if (req.query.from && req.query.to) {
        from = new Date(req.query.from);
        to = new Date(req.query.to);

        delete req.query.from;
        delete req.query.to;
      } else if (!req.query.to) {
        to = new Date();
        delete req.query.from;
      } else if (!req.query.from) {
        from = '1972-01-01';
        delete req.query.to;
      }
    }
    if (from || to) {
      const result = await orders.findAndCountAll({
        where: {
          warehouse_id: req.userData.warehouse_id,
          ...req.query,
          createdAt: { [Op.between]: [from, to] },
        },
        include: [
          {
            model: accounts,
            required: true,
            attributes: ['fullname'],
          },
          {
            model: addresses,
            required: true,
            attributes: ['address'],
            include: [
              {
                model: provinces,
                required: true,
                attributes: ['name'],
              },
              {
                model: cities,
                required: true,
                attributes: ['name'],
              },
            ],
          },
          {
            model: warehouses,
            required: true,
            attributes: ['name'],
          },
        ],
        raw: true,
        // limit: limit,
        // offset: offset,
        // subQuery: false
      });
      return res.status(200).send(result.rows);
    } else {
      const result = await orders.findAndCountAll({
        where: { ...req.query, warehouse_id: req.userData.warehouse_id },
        include: [
          {
            model: accounts,
            required: true,
            attributes: ['fullname'],
          },
          {
            model: addresses,
            required: true,
            attributes: ['address'],
            include: [
              {
                model: provinces,
                required: true,
                attributes: ['name'],
              },
              {
                model: cities,
                required: true,
                attributes: ['name'],
              },
            ],
          },
          {
            model: warehouses,
            required: true,
            attributes: ['name'],
          },
        ],
        raw: true,
        // limit: limit,
        // offset: offset,
        // subQuery: false
      });
      return res.status(200).send(result.rows);
    }
  } catch (error) {
    // return templateResponseError(400,false,"error get data",error.message,null)
    return res
      .status(500)
      .send({ success: false, result: null, message: error.message });
  }
};

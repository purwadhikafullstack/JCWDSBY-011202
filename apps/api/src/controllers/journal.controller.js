import journal from '../models/journal';
import accounts from '../models/accounts';
import products from '../models/products';
import warehouses from '../models/warehouses';
export const readJournal = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.id) {
      filter.id = req.query.id;
    }
    if (req.query.date) {
      filter.date = req.query.date;
    }
    if (req.query.from) {
      filter.from = req.query.from;
    }
    if (req.query.warehouse_id) {
      filter.warehouse_id = req.query.warehouse_id;
    }
    const result = await journal.findAll({
      where: filter,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      raw: true,
    });
    return res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const getData = async (req, res, next) => {
  try {
    const getWarehouse = await warehouses.findAll({
      where: {
        is_deleted: false,
      },
      raw: true,
    });
    const getAdmin = await accounts.findAll({
      where: {
        is_deleted: false,
        role: ['admin', 'superadmin'],
      },
      raw: true,
    });
    const getProduct = await products.findAll({
      where: {
        is_deleted: false,
      },
      raw: true,
    });

    return res.status(200).send({
      countwarehouse: getWarehouse.length,
      countadmin: getAdmin.length,
      countproduct: getProduct.length,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

import warehouse_mutation from '../models/warehouse_mutation';
import warehouses from '../models/warehouses';
import products from '../models/products';

export const getMutation = async (req, res, next) => {
  try {
    const filter = {
      is_deleted: false,
    };

    if (req.query.id) {
      filter.id = req.query.id;
    }
    if (req.query.product_id) {
      filter.product_id = req.query.product_id;
    }
    if (req.query.warehouse_id) {
      filter.warehouse_id = req.query.warehouse_id;
    }
    if (req.query.is_confirmed) {
      filter.is_confirmed = req.query.is_confirmed;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const result = await warehouse_mutation.findAll({
      where: filter,
      attributes: { exclude: ['createdAt', 'updatedAt', 'is_deleted'] },
      include: [
        {
          model: warehouses,
          as: 'warehouse',
          attributes: ['name'],
        },
        {
          model: products,
          as: 'product',
          attributes: ['name'],
        },
      ],
      raw: true,
    });

    const modifiedResult = result.map(async (mutation) => {
      const sourceWarehouse = await warehouses.findOne({
        where: { id: mutation.source_warehouse_id },
        raw: true,
      });
      const destinationWarehouse = await warehouses.findOne({
        where: { id: mutation.destination_warehouse_id },
        raw: true,
      });

      const {
        'warehouse.name': warehouseName,
        'product.name': productName,
        ...rest
      } = mutation;

      return {
        ...rest,
        sourceWarehouseName: sourceWarehouse.name,
        destinationWarehouseName: destinationWarehouse.name,
        productName,
      };
    });
    const resultArray = await Promise.all(modifiedResult);
    return res.status(200).send({
      success: true,
      data: resultArray,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

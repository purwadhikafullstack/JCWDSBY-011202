import warehouse_mutation from '../models/warehouse_mutation';
import warehouses from '../models/warehouses';
import products from '../models/products';

export const getMutation = async (req, res, next) => {
  try {
    const filter = {
      is_deleted: false,
    };
    if (req.query.id) filter.id = req.query.id;
    if (req.query.code) filter.mutation_code = req.query.code;
    if (req.query.product_id) filter.product_id = req.query.product_id;
    if (req.query.warehouse_id) filter.warehouse_id = req.query.warehouse_id;
    if (req.query.is_confirmed) filter.is_confirmed = req.query.is_confirmed;
    if (req.query.status) filter.status = req.query.status;

    const totalCount = await warehouse_mutation.count({ where: filter });

    const limit = req.query.limit || 12;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

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
      offset,
      limit,
      raw: true,
    });

    const modifiedResult = await Promise.all(
      result.map(async (mutation) => {
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
      }),
    );

    const totalPages = Math.ceil(totalCount / limit);

    const getPriority = (val) => {
      const priorities = {
        'waiting for confirmation': 1,
        processing: 2,
        'on delivery': 3,
        arrived: 4,
        done: 5,
        canceled: 6,
      };
      return priorities[val.status] || 0;
    };
    const sortedData = modifiedResult.sort(
      (a, b) => getPriority(a) - getPriority(b),
    );

    return res.status(200).send({
      success: true,
      data: sortedData,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

import warehouse_storage from '../models/warehouse_storage';
import warehouse from '../models/warehouses';
import products from '../models/products';
import stocks_journals from '../models/stocks_journals';

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const getStorage = async (req, res, next) => {
  try {
    let queryOptions = {
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: warehouse,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'id',
              'is_deleted',
              'prov_id',
              'city_id',
              'address',
            ],
          },
        },
        {
          model: products,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'is_deleted',
              'price',
              'description',
              'category_id',
              'id',
            ],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'is_deleted'],
      },
      raw: true,
    };

    if (req.query.warehouse && req.query.product_id) {
      queryOptions.where = {
        ...queryOptions.where,
        warehouse_id: req.query.warehouse,
        product_id: req.query.product_id,
      };
    } else if (req.query.warehouse) {
      queryOptions.where = {
        ...queryOptions.where,
        warehouse_id: req.query.warehouse,
      };
    } else if (req.query.id) {
      queryOptions.where = {
        ...queryOptions.where,
        id: req.query.id,
      };
    } else if (req.query.product_id) {
      queryOptions.where = {
        ...queryOptions.where,
        product_id: req.query.product_id,
      };
    }

    const totalCount = await warehouse_storage.count({
      where: queryOptions.where,
    });

    let totalPages = 0;
    let limit = 0;
    let page = 1;

    if (req.query.page) {
      page = parseInt(req.query.page);
      limit = parseInt(req.query.limit) || 12;
      queryOptions.limit = limit;
      queryOptions.offset = (page - 1) * limit;
      totalPages = Math.ceil(totalCount / limit);
    }

    const result = await warehouse_storage.findAll(queryOptions);

    const modifiedResult = result.map((storage) => {
      const {
        'warehouse.name': warehouseName,
        'product.name': productName,
        ...rest
      } = storage;
      return {
        ...rest,
        warehouse_name: warehouseName,
        product_name: productName,
      };
    });

    res.status(200).send({
      success: true,
      data: modifiedResult,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: 'ERROR GETTING DATA' });
  }
};

export const deleteWarehouseStorage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const warehouseStorageRecord = await warehouse_storage.findOne({
      where: {
        id,
        is_deleted: false,
      },
    });

    if (!warehouseStorageRecord) {
      return res.status(400).send({
        success: false,
        message: 'Warehouse storage data not found',
      });
    }
    await warehouse_storage.update(
      { is_deleted: true },
      {
        where: {
          id,
          is_deleted: false,
        },
      },
    );

    const journalDate = new Date();

    await stocks_journals.create({
      date: formatDate(journalDate),
      product_id: warehouseStorageRecord.product_id,
      warehouse_id: warehouseStorageRecord.warehouse_id,
      quantity: warehouseStorageRecord.stock,
      operation: 'decrement',
      now_stock: 0,
    });

    await warehouse_storage.update(
      { stock: 0 },
      {
        where: {
          warehouse_id: warehouseStorageRecord.warehouse_id,
          is_deleted: true,
        },
      },
    );

    res.status(200).send({
      success: true,
      message: 'Warehouse storage data soft-deleted successfully',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error soft-deleting warehouse storage data',
    });
  }
};

import warehouse_storage from '../models/warehouse_storage';
import warehouse from '../models/warehouses';
import products from '../models/products';

export const getStorage = async (req, res, next) => {
  try {
    let queryOptions;
    if (req.query.warehouse && req.query.product_id) {
      queryOptions = {
        where: {
          warehouse_id: req.query.warehouse,
          product_id: req.query.product_id,
          is_deleted: false,
        },
      };
    } else if (req.query.warehouse) {
      queryOptions = {
        where: {
          warehouse_id: req.query.warehouse,
          is_deleted: false,
        },
      };
    } else if (req.query.id) {
      queryOptions = {
        where: {
          id: req.query.id,
          is_deleted: false,
        },
      };
    } else if (req.query.product_id) {
      queryOptions = {
        where: {
          product_id: req.query.product_id,
          is_deleted: false,
        },
      };
    }

    const result = await warehouse_storage.findAll({
      ...queryOptions,
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
    });

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

    res.status(200).send({ success: true, data: modifiedResult });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'ERROR GETTING DATA' });
  }
};

export const addStorage = async (req, res, next) => {
  try {
    const existingStock = await warehouse_storage.findOne({
      where: {
        warehouse_id: req.body.warehouse_id,
        product_id: req.body.product_id,
      },
    });

    if (existingStock) {
      if (existingStock.is_deleted) {
        const restoredStock = await warehouse_storage.update(
          {
            is_deleted: false,
            stock: req.body.stock,
          },
          {
            where: {
              id: existingStock.id,
            },
          },
        );

        return res.status(200).send({
          success: true,
          message: 'Product stock restored successfully.',
          restored: restoredStock,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: 'Product stock already exists; you can now edit the stock.',
        });
      }
    }

    if (req.body.stock > 10 || req.body.stock <= 0) {
      return res.status(400).send({
        success: false,
        message:
          'You can add a maximum of 10 and a minimum of 1 item when adding new stock to your warehouse.',
      });
    }

    const existingProduct = await products.findOne({
      where: {
        id: req.body.product_id,
        is_deleted: false,
      },
    });

    if (!existingProduct) {
      return res.status(400).send({
        success: false,
        message: 'Product does not exist or has been deleted.',
      });
    }

    const existingWarehouse = await warehouse.findOne({
      where: {
        id: req.body.warehouse_id,
        is_deleted: false,
      },
    });

    if (!existingWarehouse) {
      return res.status(400).send({
        success: false,
        message: 'Warehouse does not exist or has been deleted.',
      });
    }

    const createNewStock = await warehouse_storage.create({
      warehouse_id: req.body.warehouse_id,
      product_id: req.body.product_id,
      stock: req.body.stock,
    });

    res.status(200).send({
      success: true,
      message: 'Product stock added successfully.',
      added: createNewStock.dataValues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'ERROR ADDING STORAGE' });
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
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error soft-deleting warehouse storage data',
    });
  }
};

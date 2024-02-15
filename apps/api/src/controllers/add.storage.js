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

export const addStorage = async (req, res, next) => {
  try {
    const existingStock = await warehouse_storage.findOne({
      where: {
        warehouse_id: req.body.warehouse_id,
        product_id: req.body.product_id,
      },
    });

    if (existingStock) {
      if (existingStock.is_deleted === true) {
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

        const journalDate = new Date();
        await stocks_journals.create({
          date: formatDate(journalDate),
          product_id: req.body.product_id,
          warehouse_id: req.body.warehouse_id,
          quantity: req.body.stock,
          operation: 'increment',
          now_stock: req.body.stock,
        });

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

    const journalDate = new Date();
    await stocks_journals.create({
      date: formatDate(journalDate),
      product_id: req.body.product_id,
      warehouse_id: req.body.warehouse_id,
      quantity: req.body.stock,
      operation: 'increment',
      now_stock: req.body.stock,
    });

    res.status(200).send({
      success: true,
      message: 'Product stock added successfully.',
      added: createNewStock.dataValues,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: 'ERROR ADDING STORAGE' });
  }
};

import warehouse_storage from '../models/warehouse_storage';
import warehouse from '../models/warehouses';
import products from '../models/products';

export const editStock = async (req, res, next) => {
  try {
    const isStockExist = await warehouse_storage.findOne({
      where: {
        id: req.params.id,
        is_deleted: false,
      },
    });

    if (!isStockExist) {
      return res
        .status(400)
        .send({ success: false, message: "Data stock doesn't exist" });
    }

    if (!req.body.operation) {
      return res.status(400).send({
        success: false,
        message: 'Choose the operation either increment or decrement',
      });
    }

    if (req.body.operation === 'increment') {
      await warehouse_storage.update(
        { stock: isStockExist.stock + req.body.unit },
        { where: { id: req.params.id } },
      );

      const updatedStock = await warehouse_storage.findByPk(req.params.id, {
        raw: true,
      });

      return res.status(200).send({
        success: true,
        message: 'Successfully added stock',
        nowStock: updatedStock.stock,
      });
    }

    if (req.body.operation === 'decrement') {
      if (isStockExist.stock - req.body.unit < 0) {
        return res.status(400).send({
          success: false,
          message: 'Cannot decrement beyond zero stock.',
        });
      }

      await warehouse_storage.update(
        { stock: isStockExist.stock - req.body.unit },
        { where: { id: req.params.id } },
      );

      const updatedStock = await warehouse_storage.findByPk(req.params.id, {
        raw: true,
      });

      return res.status(200).send({
        success: true,
        message: 'Successfully decremented stock',
        nowStock: updatedStock.stock,
      });
    }

    return res.status(400).send({
      success: false,
      message: 'Invalid operation. Choose either increment or decrement.',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: 'ERROR UPDATING DATA' });
  }
};

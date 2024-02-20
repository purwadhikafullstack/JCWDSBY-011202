import warehouse_storage from '../models/warehouse_storage';
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

export const editStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { operation, unit } = req.body;

    // Check if unit is a valid positive number
    if (typeof unit !== 'number' || unit <= 0) {
      return res.status(400).send({
        success: false,
        message: 'Unit must be a positive number.',
      });
    }

    const isStockExist = await warehouse_storage.findOne({
      where: { id, is_deleted: false },
      raw: true,
    });

    if (!isStockExist) {
      return res.status(400).send({
        success: false,
        message: "Data stock doesn't exist.",
      });
    }

    if (!operation || !['increment', 'decrement'].includes(operation)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid operation. Choose either increment or decrement.',
      });
    }

    let newStock;
    if (operation === 'increment') {
      newStock = isStockExist.stock + unit;
    } else if (operation === 'decrement') {
      if (isStockExist.stock < unit) {
        return res.status(400).send({
          success: false,
          message: 'Cannot decrement beyond zero stock.',
        });
      }
      newStock = isStockExist.stock - unit;
    }

    const journalDate = new Date();

    await stocks_journals.create({
      date: formatDate(journalDate),
      product_id: isStockExist.product_id,
      warehouse_id: isStockExist.warehouse_id,
      quantity: unit,
      operation,
      now_stock: newStock,
    });

    await warehouse_storage.update({ stock: newStock }, { where: { id } });

    return res.status(200).send({
      success: true,
      message:
        operation === 'increment'
          ? 'Successfully added stock'
          : 'Successfully decremented stock',
      nowStock: newStock,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Error updating data.',
    });
  }
};

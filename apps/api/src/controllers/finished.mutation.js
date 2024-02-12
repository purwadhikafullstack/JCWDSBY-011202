import warehouse from '../models/warehouses';
import warehouse_storage from '../models/warehouse_storage';
import journal from '../models/journal';
import warehouse_mutation from '../models/warehouse_mutation';
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
export const finishMutation = async (req, res, next) => {
  try {
    const isExists = await warehouse_mutation.findOne({
      where: {
        id: req.params.id,
        status: 'arrived',
        mutation_type: 'request',
      },
      raw: true,
    });

    if (!isExists) {
      console.error('Mutation not found or not eligible for confirmation');
      return res.status(500).send({
        success: false,
        message: "Sorry, your data can't be updated",
      });
    }

    const isExistSourceWarehouse = await warehouse.findOne({
      where: {
        id: isExists.source_warehouse_id,
      },
      raw: true,
    });

    const isExistDestinationWarehouse = await warehouse.findOne({
      where: {
        id: isExists.destination_warehouse_id,
      },
      raw: true,
    });

    const isStock = await warehouse_storage.findOne({
      where: {
        warehouse_id: isExists.destination_warehouse_id,
        product_id: isExists.product_id,
      },
      raw: true,
    });

    const isExistProduct = await products.findOne({
      where: { id: isExists.product_id, is_deleted: false },
      raw: true,
    });

    const reversedWarehouse = await warehouse_mutation.findOne({
      where: {
        mutation_code: isExists.mutation_code,
        mutation_type: 'requested',
      },
      raw: true,
    });

    const journalDate = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });

    const updateStatus = await warehouse_mutation.update(
      {
        status: 'done',
        arrival_date: journalDate,
      },
      {
        where: {
          id: isExists.id,
        },
      },
    );
    const updateStatusReversedWarehouse = await warehouse_mutation.update(
      {
        status: 'done',
        arrival_date: journalDate,
      },
      {
        where: {
          id: reversedWarehouse.id,
        },
      },
    );

    if (updateStatus) {
      await warehouse_storage.update(
        {
          stock: isStock.stock + isExists.quantity,
        },
        {
          where: {
            id: isStock.id,
          },
        },
      );
    }

    const journalInformation = `${isExists.mutation_code}:${req.userData.fullname} confirmed done the mutation for ${isExists.quantity} units of product ${isExistProduct.name} from warehouse ${isExistSourceWarehouse.name} to ${isExistDestinationWarehouse.name}, the stock of stock product will be increase`;
    const journalFrom = 'Mutation Stock';
    if (updateStatusReversedWarehouse && updateStatus) {
      await stocks_journals.create({
        date: formatDate(new Date()),
        product_id: isExists.product_id,
        warehouse_id: isExists.destination_warehouse_id,
        quantity: isExists.quantity,
        operation: 'increment',
        now_stock: isStock.stock + isExists.quantity,
      });
      await journal.create({
        date: journalDate,
        information: journalInformation,
        from: journalFrom,
      });
      await journal.create({
        date: journalDate,
        information: `${isExists.mutation_code}: The mutation, which your warehouse request for ${isExists.quantity} units of product ${isExistProduct.name} from ${isExistSourceWarehouse.name} is already success`,
        from: journalFrom,
        warehouse_id: isExists.destination_warehouse_id,
      });
      await journal.create({
        date: journalDate,
        information: `${isExists.mutation_code}: Warehouse ${isExistDestinationWarehouse.name} already update status request for ${isExists.quantity} units of product ${isExistProduct.name} to success`,
        from: journalFrom,
        warehouse_id: isExists.source_warehouse_id,
      });
      await journal.create({
        date: journalDate,
        information: `${isExists.mutation_code}: Your warehouse stock ${isExistProduct.name} is already increase ${isExists.quantity} by mutation from ${isExistSourceWarehouse.name}`,
        from: 'Storage',
        warehouse_id: isExists.destination_warehouse_id,
      });
    }
    return res.status(200).send({
      success: true,
      message: 'Mutation finished successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

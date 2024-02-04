import warehouse from '../models/warehouses';
import warehouse_storage from '../models/warehouse_storage';
import journal from '../models/journal';
import warehouse_mutation from '../models/warehouse_mutation';
import products from '../models/products';
export const finishMutation = async (req, res, next) => {
  try {
    const isExists = await warehouse_mutation.findOne({
      where: {
        id: req.params.id,
        mutation_type: 'request',
        warehouse_id: req.userData.warehouse_id,
        is_deleted: false,
        status: 'arrived',
        is_confirmed: true,
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
        warehouse_id: isExists.source_warehouse_id,
        product_id: isExists.product_id,
        destination_warehouse_id: isExists.destination_warehouse_id,
        quantity: isExists.quantity,
        mutation_type: 'requested',
        is_confirmed: true,
        status: 'arrived',
        arrival_date: isExists.arrival_date,
        delivery_date: isExists.delivery_date,
        is_deleted: isExists.is_deleted,
        createdAt: isExists.createdAt,
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
    const journalInformation = `${req.userData.fullname} confirmed done the mutation for ${isExists.quantity} units of product ${isExistProduct.name} from warehouse ${isExistSourceWarehouse.name} to ${isExistDestinationWarehouse.name}, the stock of stock product will be increase`;
    const journalFrom = 'Mutation Stock';
    if (updateStatusReversedWarehouse && updateStatus) {
      await journal.create({
        date: journalDate,
        information: journalInformation,
        from: journalFrom,
      });
      await journal.create({
        date: journalDate,
        information: `The mutation, which your warehouse request for ${isExists.quantity} units of product ${isExistProduct.name} from ${isExistSourceWarehouse.name} is already success`,
        from: journalFrom,
        warehouse_id: isExists.destination_warehouse_id,
      });
      await journal.create({
        date: journalDate,
        information: `Warehouse ${isExistDestinationWarehouse.name} already update status request for ${isExists.quantity} units of product ${isExistProduct.name} to success`,
        from: journalFrom,
        warehouse_id: isExists.source_warehouse_id,
      });
      await journal.create({
        date: journalDate,
        information: `Your warehouse stock ${isExistProduct.name} is already increase ${isExists.quantity} by mutation from ${isExistSourceWarehouse.name}`,
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

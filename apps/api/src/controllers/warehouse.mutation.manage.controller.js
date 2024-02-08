import warehouse from '../models/warehouses';
import warehouse_storage from '../models/warehouse_storage';
import journal from '../models/journal';
import warehouse_mutation from '../models/warehouse_mutation';
import products from '../models/products';
export const confirmMutation = async (req, res, next) => {
  try {
    const isExists = await warehouse_mutation.findOne({
      where: {
        id: req.params.id,
        status: 'waiting for confirmation',
        is_confirmed: false,
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

    const isExistProduct = await products.findOne({
      where: { id: isExists.product_id, is_deleted: false },
      raw: true,
    });

    const isStock = await warehouse_storage.findOne({
      where: {
        warehouse_id: isExists.source_warehouse_id,
        product_id: isExists.product_id,
      },
      raw: true,
    });

    if (req.body.quantity > isStock.stock) {
      return res.status(400).send({
        success: false,
        message: 'Stock is not enough',
      });
    }

    const reversedWarehouse = await warehouse_mutation.findOne({
      where: {
        mutation_code: isExists.mutation_code,
        mutation_type: 'request',
      },
      raw: true,
    });

    const updateStatus = await warehouse_mutation.update(
      {
        status: 'processing',
        is_confirmed: true,
      },
      {
        where: {
          id: isExists.id,
        },
      },
    );
    const updateStatusReversedWarehouse = await warehouse_mutation.update(
      {
        status: 'processing',
        is_confirmed: true,
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
          stock: isStock.stock - isExists.quantity,
        },
        {
          where: {
            id: isStock.id,
          },
        },
      );
    }

    const journalDate = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });

    const journalInformation = `${isExists.mutation_code}: ${req.userData.fullname} confirmed a request for ${isExists.quantity} units of product ${isExistProduct.name} from warehouse ${isExistSourceWarehouse.name} to ${isExistDestinationWarehouse.name}, the stock of stock product will be reduce`;
    const sourceInformation = `${isExists.mutation_code}: Your warehouse, ${isExistSourceWarehouse.name} confirmed a request for ${isExists.quantity} units of product  ${isExistProduct.name} of warehouse ${isExistDestinationWarehouse.name} request`;
    const destinationInformation = `${isExists.mutation_code}:  Your warehouse, ${isExistDestinationWarehouse.name} request for ${isExists.quantity} units of product ${isExistProduct.name} is confirmed by admin of ${isExistSourceWarehouse}`;
    const journalFrom = 'Mutation Stock';
    if (updateStatusReversedWarehouse && updateStatus) {
      await journal.create({
        date: journalDate,
        information: journalInformation,
        from: journalFrom,
      });
      await journal.create({
        date: journalDate,
        information: destinationInformation,
        from: journalFrom,
        warehouse_id: isExists.destination_warehouse_id,
      });
      await journal.create({
        date: journalDate,
        information: sourceInformation,
        from: journalFrom,
        warehouse_id: isExists.source_warehouse_id,
      });
      await journal.create({
        date: journalDate,
        information: `Your warehouse stock ${isExistProduct.name} is already reduce ${isExists.quantity} by mutation`,
        from: 'Storage',
        warehouse_id: isExists.source_warehouse_id,
      });
    }
    return res.status(200).send({
      success: true,
      message: 'Mutation confirmed successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

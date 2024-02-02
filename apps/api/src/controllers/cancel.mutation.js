import warehouse_mutation from '../models/warehouse_mutation';
import warehouses from '../models/warehouses';
import products from '../models/products';
import warehouse_storage from '../models/warehouse_storage';
import journal from '../models/journal';

export const cancelMutation = async (req, res, next) => {
  try {
    const mutationId = req.params.id;

    const existingMutation = await warehouse_mutation.findOne({
      where: { id: mutationId },
      raw: true,
    });
    console.log(req.userData.warehouse_id, existingMutation.warehouse_id);
    if (!req.userData.warehouse_id === existingMutation.warehouse_id) {
      return res.status(404).send({
        success: false,
        message: 'You, are unauthorized admin.',
      });
    }

    if (!existingMutation) {
      return res.status(404).send({
        success: false,
        message: 'Mutation not found.',
      });
    }

    if (
      existingMutation.status === 'done' ||
      existingMutation.status === 'canceled'
    ) {
      return res.status(400).send({
        success: false,
        message: 'This mutation cannot be cancelled.',
      });
    }

    const sourceWarehouse = await warehouses.findOne({
      where: { id: existingMutation.source_warehouse_id },
      raw: true,
    });

    const destinationWarehouse = await warehouses.findOne({
      where: { id: existingMutation.warehouse_id },
      raw: true,
    });

    const relatedProduct = await products.findOne({
      where: { id: existingMutation.product_id, is_deleted: false },
    });

    if (!relatedProduct || !destinationWarehouse || !sourceWarehouse) {
      return res.status(500).send({
        success: false,
        message: 'Invalid Data',
      });
    }
    const cancelMutation = await warehouse_mutation.update(
      { status: 'canceled' },
      { where: { id: req.params.id } },
    );

    let mutation_type_reversed;
    if (existingMutation.mutation_type === 'request') {
      mutation_type_reversed = 'requested';
    } else if (existingMutation.mutation_type === 'requested') {
      mutation_type_reversed = 'request';
    }

    const cancelReversedMutation = await warehouse_mutation.update(
      { status: 'canceled' },
      {
        where: {
          product_id: existingMutation.product_id,
          warehouse_id: existingMutation.warehouse_id,
          source_warehouse_id: existingMutation.source_warehouse_id,
          destination_warehouse_id: existingMutation.destination_warehouse_id,
          quantity: existingMutation.quantity,
          mutation_type: mutation_type_reversed,
          is_confirmed: existingMutation.is_confirmed,
          status: existingMutation.status,
          createdAt: existingMutation.createdAt,
          arrival_date: existingMutation.arrival_date,
          delivery_date: existingMutation.delivery_date,
        },
      },
    );

    if (!cancelReversedMutation) {
      return res.status(400).send({
        success: false,
        message: 'Error cancel Data',
      });
    }

    const isStock = await warehouse_storage.findOne({
      where: {
        warehouse_id: existingMutation.source_warehouse_id,
        product_id: existingMutation.product_id,
      },
      raw: true,
    });

    if (!isStock) {
      return res.status(404).send({
        success: false,
        message: 'Inventory not found',
      });
    }

    if (
      existingMutation.status === 'processing' ||
      existingMutation.status === 'on delivery'
    ) {
      await warehouse_storage.update(
        {
          stock: isStock.stock + existingMutation.quantity,
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

    const journalInformation = `${req.userData.fullname} canceled a request for ${existingMutation.quantity} units of product ${relatedProduct.name} from warehouse ${sourceWarehouse.name} to ${destinationWarehouse.name}`;
    const journalFrom = 'Mutation';
    if (cancelMutation && cancelReversedMutation) {
      await journal.create({
        date: journalDate,
        information: journalInformation,
        from: journalFrom,
      });
      await journal.create({
        date: journalDate,
        information: `The ${existingMutation.quantity} units of product ${relatedProduct.name} from warehouse ${sourceWarehouse.name} to ${destinationWarehouse.name} canceled`,
        from: journalFrom,
        warehouse_id: sourceWarehouse.id,
      });
      await journal.create({
        date: journalDate,
        information: `Your request for ${existingMutation.quantity} units of product ${relatedProduct.name} from warehouse ${sourceWarehouse.name} to ${destinationWarehouse.name} canceled by ${req.userData.fullname} `,
        from: journalFrom,
        warehouse_id: destinationWarehouse.id,
      });
    }
    return res.status(200).send({
      success: true,
      message: 'Mutation successfully cancelled.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
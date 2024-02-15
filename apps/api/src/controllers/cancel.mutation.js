import warehouse_mutation from '../models/warehouse_mutation';
import warehouses from '../models/warehouses';
import products from '../models/products';
import warehouse_storage from '../models/warehouse_storage';
import journal from '../models/journal';
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

export const cancelMutation = async (req, res, next) => {
  try {
    const mutationId = req.params.id;
    const existingMutation = await warehouse_mutation.findOne({
      where: { id: mutationId },
      raw: true,
    });
    if (!req.userData.warehouse_id == existingMutation.warehouse_id) {
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
          mutation_type: mutation_type_reversed,
          mutation_code: existingMutation.mutation_code,
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
      existingMutation.status === 'on delivery' ||
      existingMutation.status === 'arrived'
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
      await stocks_journals.create({
        date: formatDate(new Date()),
        product_id: existingMutation.product_id,
        warehouse_id: existingMutation.source_warehouse_id,
        quantity: existingMutation.quantity,
        operation: 'increment',
        now_stock: isStock.stock + existingMutation.quantity,
      });
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
      if (
        existingMutation.status === 'processing' ||
        existingMutation.status === 'done' ||
        existingMutation.status === 'arrived'
      ) {
        await journal.create({
          date: journalDate,
          information: `${existingMutation.mutation_code}: Your warehouse stock ${relatedProduct.name} is already increase ${relatedProduct.quantity} by mutation from canceled request ${existingMutation.mutation_code}`,
          from: 'Storage',
          warehouse_id: existingMutation.destination_warehouse_id,
        });
      }
    }
    return res.status(200).send({
      success: true,
      message: 'Mutation successfully cancelled.',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

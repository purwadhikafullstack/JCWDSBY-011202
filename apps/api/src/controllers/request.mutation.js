import warehouse_mutation from '../models/warehouse_mutation';
import warehouse_storage from '../models/warehouse_storage';
import warehouses from '../models/warehouses';
import products from '../models/products';
import journal from '../models/journal';
import { generateUniqueCode } from '../middleware/helper';
export const requestMutation = async (req, res, next) => {
  try {
    const uniqueCode = generateUniqueCode();
    if (req.userData.id === req.body.source_warehouse_id) {
      return res.status(400).send({
        success: false,
        message: 'Invalid',
      });
    }
    const isExistSourceWarehouse = await warehouses.findOne({
      where: { id: req.body.source_warehouse_id },
      raw: true,
    });
    const isExistDestinationWarehouse = await warehouses.findOne({
      where: { id: req.userData.warehouse_id },
      raw: true,
    });
    const isExistProduct = await products.findOne({
      where: { id: req.body.product_id, is_deleted: false },
    });

    if (
      !isExistDestinationWarehouse ||
      !isExistSourceWarehouse ||
      !isExistProduct
    ) {
      return res.status(404).send({
        success: false,
        message: 'Data not found',
      });
    }

    const isStock = await warehouse_storage.findOne({
      where: {
        warehouse_id: req.body.source_warehouse_id,
        product_id: req.body.product_id,
      },
      raw: true,
    });

    if (!isStock) {
      return res.status(404).send({
        success: false,
        message: 'Inventory not found',
      });
    }

    if (!req.userData || !req.userData.warehouse_id) {
      return res.status(400).send({
        success: false,
        message: 'Admin is not authorized',
      });
    }

    if (req.body.quantity > isStock.stock) {
      return res.status(400).send({
        success: false,
        message: 'Stock is not enough',
      });
    }
    const createRequest = await warehouse_mutation.create({
      product_id: req.body.product_id,
      mutation_code: uniqueCode,
      warehouse_id: req.userData.warehouse_id,
      source_warehouse_id: req.body.source_warehouse_id,
      destination_warehouse_id: req.userData.warehouse_id,
      quantity: req.body.quantity,
      mutation_type: 'request',
      is_confirmed: false,
      status: 'waiting for confirmation',
    });

    if (createRequest) {
      const createReverseRequest = await warehouse_mutation.create({
        product_id: req.body.product_id,
        mutation_code: uniqueCode,
        warehouse_id: req.body.source_warehouse_id,
        source_warehouse_id: req.body.source_warehouse_id,
        destination_warehouse_id: req.userData.warehouse_id,
        quantity: req.body.quantity,
        mutation_type: 'requested',
        is_confirmed: false,
        status: 'waiting for confirmation',
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

      const journalInformation = `${uniqueCode}: ${req.userData.fullname} created a request for ${req.body.quantity} units of product ${isExistProduct.name} from warehouse ${isExistSourceWarehouse.name} to ${isExistDestinationWarehouse.name}`;
      const journalFrom = 'Mutation';

      if (createReverseRequest) {
        await journal.create({
          date: journalDate,
          information: journalInformation,
          from: journalFrom,
        });
        await journal.create({
          date: journalDate,
          information: `${uniqueCode}: The ${req.body.quantity} units of product ${isExistProduct.name} from warehouse ${isExistSourceWarehouse.name} to ${isExistDestinationWarehouse.name}`,
          from: journalFrom,
          warehouse_id: isExistSourceWarehouse.id,
        });
        await journal.create({
          date: journalDate,
          information: `${uniqueCode}: Your request for ${req.body.quantity} units of product ${isExistProduct.name} from warehouse ${isExistSourceWarehouse.name} to ${isExistDestinationWarehouse.name} created`,
          from: journalFrom,
          warehouse_id: isExistDestinationWarehouse.id,
        });
      }
    }

    return res.status(200).send({
      success: true,
      message: 'Mutation request created successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

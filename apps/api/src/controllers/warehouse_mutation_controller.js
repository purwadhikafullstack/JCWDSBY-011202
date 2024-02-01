import warehouse_mutation from '../models/warehouse_mutation';
import warehouse_storage from '../models/warehouse_storage';
import warehouses from '../models/warehouses';
import account from '../models/accounts';
import products from '../models/products';
import journal from '../models/journal';

export const getMutation = async (req, res, next) => {
  try {
    const filter = {
      is_deleted: false,
    };

    if (req.query.id) {
      filter.id = req.query.id;
    }
    if (req.query.product_id) {
      filter.product_id = req.query.product_id;
    }
    if (req.query.warehouse_id) {
      filter.warehouse_id = req.query.warehouse_id;
    }
    if (req.query.is_confirmed) {
      filter.is_confirmed = req.query.is_confirmed;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const result = await warehouse_mutation.findAll({
      where: filter,
      attributes: { exclude: ['createdAt', 'updatedAt', 'is_deleted'] },
      include: [
        {
          model: warehouses,
          as: 'warehouse',
          attributes: ['name'],
        },
        {
          model: products,
          as: 'product',
          attributes: ['name'],
        },
      ],
      raw: true,
    });

    const modifiedResult = result.map(async (mutation) => {
      const sourceWarehouse = await warehouses.findOne({
        where: { id: mutation.source_warehouse_id },
        raw: true,
      });
      const destinationWarehouse = await warehouses.findOne({
        where: { id: mutation.destination_warehouse_id },
        raw: true,
      });

      const {
        'warehouse.name': warehouseName,
        'product.name': productName,
        ...rest
      } = mutation;

      return {
        ...rest,
        // warehouseName,
        sourceWarehouseName: sourceWarehouse.name,
        destinationWarehouseName: destinationWarehouse.name,
        productName,
      };
    });
    const resultArray = await Promise.all(modifiedResult);
    return res.status(200).send({
      success: true,
      data: resultArray,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const requestMutation = async (req, res, next) => {
  try {
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

      const journalInformation = `${req.userData.fullname} created a request for ${req.body.quantity} units of product ${isExistProduct.name} from warehouse ${isExistSourceWarehouse.name} to ${isExistDestinationWarehouse.name}`;
      const journalFrom = 'Mutation';

      if (createReverseRequest) {
        await journal.create({
          date: journalDate,
          information: journalInformation,
          from: journalFrom,
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

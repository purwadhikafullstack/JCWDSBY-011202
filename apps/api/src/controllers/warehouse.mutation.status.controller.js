import warehouse from '../models/warehouses';
import journal from '../models/journal';
import warehouse_mutation from '../models/warehouse_mutation';
import products from '../models/products';
export const updateStatusProcess = async (req, res, next) => {
  try {
    const isExists = await warehouse_mutation.findOne({
      where: {
        id: req.params.id,
        mutation_type: 'requested',
        status: 'processing',
      },
      raw: true,
    });

    if (!isExists) {
      return res.status(500).send({
        success: false,
        message:
          "Mutation not found or not eligible for delivery, your data can't be updated",
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

    const reversedWarehouse = await warehouse_mutation.findOne({
      where: {
        mutation_code: isExists.mutation_code,
        mutation_type: 'request',
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
        status: 'on delivery',
        delivery_date: journalDate,
      },
      {
        where: {
          id: isExists.id,
        },
      },
    );
    const updateStatusReversedWarehouse = await warehouse_mutation.update(
      {
        status: 'on delivery',
        delivery_date: journalDate,
      },
      {
        where: {
          id: reversedWarehouse.id,
        },
      },
    );
    const journalInformation = `${isExists.mutation_code}:${req.userData.fullname} processing a request for ${isExists.quantity} units of product ${isExists.name} from warehouse ${isExistSourceWarehouse.name} to ${isExistDestinationWarehouse.name}, now status is on delivery`;
    const journalFrom = 'Mutation Stock';
    const sourceInformation = `${isExists.mutation_code}: Your warehouse, ${isExistSourceWarehouse.name} deliver a request for ${isExists.quantity} units of product  ${isExistProduct.name} of warehouse ${isExistDestinationWarehouse.name} request`;
    const destinationInformation = `${isExists.mutation_code}: Your warehouse, ${isExistDestinationWarehouse.name} request for ${isExists.quantity} units of product ${isExistProduct.name} is delivered by admin of ${isExistSourceWarehouse}`;
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
    }
    return res.status(200).send({
      success: true,
      message: 'Status updated to on delivery',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

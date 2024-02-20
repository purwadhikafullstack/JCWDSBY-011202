import warehouse from '../models/warehouses';
import journal from '../models/journal';
import warehouse_mutation from '../models/warehouse_mutation';
import products from '../models/products';
export const updateStatusArrived = async (req, res, next) => {
  try {
    const isExists = await warehouse_mutation.findOne({
      where: {
        id: req.params.id,
        mutation_type: 'request',
        status: 'on delivery',
      },
      raw: true,
    });
    if (!isExists) {
      return res.status(500).send({
        success: false,
        message:
          "Mutation not found or not eligible for updating to arrived, your data can't be updated",
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
        mutation_type: 'requested',
      },
      raw: true,
    });
    const updateStatus = await warehouse_mutation.update(
      {
        status: 'arrived',
      },
      {
        where: {
          id: isExists.id,
        },
      },
    );
    const updateStatusReversedWarehouse = await warehouse_mutation.update(
      {
        status: 'arrived',
      },
      {
        where: {
          id: reversedWarehouse.id,
        },
      },
    );
    const journalDate = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    const journalInformation = `${isExists.mutation_code}: ${req.userData.fullname} confirmed arrival of ${isExists.quantity} units of product ${isExistProduct.name} from warehouse ${isExistSourceWarehouse.name} to ${isExistDestinationWarehouse.name}`;
    const journalFrom = 'Mutation Stock';
    const sourceInformation = `${isExists.mutation_code}: Request for ${isExists.quantity} units of product  ${isExistProduct.name} of warehouse ${isExistDestinationWarehouse.name} request is arrived`;
    const destinationInformation = `${isExists.mutation_code}: Request for ${isExists.quantity} units of product ${isExistProduct.name} is arrived`;
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
      message: 'Status updated to arrived',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

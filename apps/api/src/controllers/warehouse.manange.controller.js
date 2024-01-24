import warehouse from '../models/warehouses';

export const deleteWarehouse = async (req, res, next) => {
  try {
    const isExist = await warehouse.findOne({
      where: {
        is_deleted: false,
        id: req.params.id,
      },
    });

    if (!isExist) {
      return res
        .status(400)
        .send({ success: false, message: 'Warehouse data not found' });
    }

    await warehouse.update(
      { is_deleted: true },
      {
        where: {
          is_deleted: false,
          id: req.params.id,
        },
      },
    );

    return res
      .status(200)
      .send({ success: true, message: 'Warehouse deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: 'Error deleting warehouse data' });
  }
};

export const updateWarehouse = async (req, res, next) => {
  try {
    const existingWarehouse = await warehouse.findOne({
      where: {
        is_deleted: false,
        id: req.params.id,
      },
    });
    if (!existingWarehouse) {
      return res
        .status(400)
        .send({ success: false, message: 'Warehouse data not found' });
    }
    const { name, prov_id, city_id, address } = req.body;
    const numOfUpdatedRows = await warehouse.update(
      {
        name: name || existingWarehouse.name,
        prov_id: prov_id || existingWarehouse.prov_id,
        city_id: city_id || existingWarehouse.city_id,
        address: address || existingWarehouse.address,
      },
      {
        where: {
          is_deleted: false,
          id: req.params.id,
        },
      },
    );

    if (numOfUpdatedRows[0] === 1) {
      const updatedWarehouseData = await warehouse.findOne({
        where: {
          is_deleted: false,
          id: req.params.id,
        },
      });

      return res.status(200).send({
        success: true,
        message: 'Warehouse updated successfully',
        data: updatedWarehouseData ? updatedWarehouseData.dataValues : null,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: 'Error updating warehouse data',
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: 'Error updating warehouse data' });
  }
};

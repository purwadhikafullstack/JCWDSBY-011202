import warehouse from '../models/warehouses';
import cities from '../models/cities';
import provinces from '../models/provinces';
import journal from '../models/journal';
import { Op } from 'sequelize';
export const getWarehouse = async (req, res, next) => {
  try {
    const { city_id, province_id, page, warehouse_id, name } = req.query;

    const filterOptions = {
      is_deleted: false,
    };

    if (city_id) {
      filterOptions['$city.id$'] = city_id;
    }

    if (province_id) {
      filterOptions['$province.id$'] = province_id;
    }

    if (warehouse_id) {
      filterOptions.id = warehouse_id;
    }

    if (name) {
      filterOptions.name = { [Op.like]: `%${name}%` };
    }

    const pageSize = 12;
    const offset = page ? (page - 1) * pageSize : 0;

    const results = await warehouse.findAndCountAll({
      where: filterOptions,
      include: [
        {
          model: cities,
          attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'prov_id'] },
        },
        {
          model: provinces,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'province_id', 'id'],
          },
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt', 'is_deleted'] },
      offset: offset,
      limit: pageSize,
      raw: true,
    });

    const totalWarehouses = results.count;
    const totalPages = Math.ceil(totalWarehouses / pageSize);

    const modifiedResults = results.rows.map((result) => {
      const {
        'city.name': cityName,
        'province.name': provinceName,
        ...rest
      } = result;

      return {
        ...rest,
        city_name: cityName,
        province_name: provinceName,
      };
    });

    return res.status(200).send({
      success: true,
      data: modifiedResults,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: 'Error getting data' });
  }
};

export const createWarehouse = async (req, res, next) => {
  try {
    const existingWarehouse = await warehouse.findOne({
      where: {
        is_deleted: false,
        name: req.body.name,
      },
    });
    if (existingWarehouse) {
      return res
        .status(400)
        .send({ success: false, message: 'Warehouse already exists' });
    }
    const deletedWarehouse = await warehouse.findOne({
      where: {
        is_deleted: true,
        name: req.body.name,
      },
    });

    if (deletedWarehouse) {
      const restoredWarehouse = await warehouse.update(
        {
          is_deleted: false,
          prov_id: req.body.prov_id,
          city_id: req.body.city_id,
          address: req.body.address,
        },
        {
          where: {
            id: deletedWarehouse.id,
          },
        },
      );

      return res.status(200).send({
        success: true,
        message: 'Warehouse restored and updated successfully',
        data: restoredWarehouse,
      });
    }
    if (
      !req.body.name ||
      !req.body.prov_id ||
      !req.body.city_id ||
      !req.body.address
    ) {
      return res
        .status(400)
        .send({ success: false, message: 'Fill the warehouse data' });
    }

    const newWarehouse = await warehouse.create({
      name: req.body.name,
      prov_id: req.body.prov_id,
      city_id: req.body.city_id,
      address: req.body.address,
      lon: req.body.lon,
      lat: req.body.lat,
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

    const journalInformation = `${req.userData.fullname} created warehouse ${req.body.name}`;
    const journalFrom = `Warehouse`;

    if (newWarehouse) {
      await journal.create({
        date: journalDate,
        information: journalInformation,
        from: journalFrom,
      });
    }

    return res.status(201).send({
      success: true,
      message: 'Warehouse created successfully',
      data: newWarehouse.dataValues,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error creating or restoring warehouse data',
    });
  }
};

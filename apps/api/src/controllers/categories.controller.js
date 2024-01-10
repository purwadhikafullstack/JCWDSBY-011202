import categories from '../models/categories';
import products from '../models/products';
import { Sequelize } from 'sequelize';

export const getData = async (req, res, next) => {
  try {
    const filter = {
      is_deleted: false,
    };

    if (req.query.id) {
      filter.id = req.query.id;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const result = await categories.findAll({
      where: filter,
      attributes: [
        'id',
        'category',
        [Sequelize.fn('COUNT', Sequelize.col('products.id')), 'productCount'],
      ],
      include: [
        {
          model: products,
          attributes: [],
          as: 'products',
          where: { is_deleted: false },
          required: false,
        },
      ],
      group: ['categories.id'],
    });

    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: 'ERROR GETTING DATA' });
  }
};

export const createData = async (req, res, next) => {
  try {
    const existingCategory = await categories.findOne({
      where: {
        category: req.body.category,
      },
    });
    if (existingCategory) {
      if (existingCategory.is_deleted) {
        await categories.update(
          { is_deleted: false },
          {
            where: {
              id: existingCategory.id,
            },
          },
        );
        return res.status(200).send({
          success: true,
          message: 'Category already exists. Restored.',
        });
      } else {
        return res.status(400).send({
          success: false,
          message: 'Category already exists',
        });
      }
    }
    const result = await categories.create({
      category: req.body.category,
    });
    return res.status(201).send({
      success: true,
      message: 'Created category',
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: 'ERROR CREATING DATA' });
  }
};
export const deleteData = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const isExist = await categories.findOne({
      where: {
        id: req.params.id,
        is_deleted: false,
      },
    });
    if (!isExist) {
      return res
        .status(400)
        .send({ success: false, message: 'CATEGORY NOT FOUND' });
    }
    const result = await categories.update(
      {
        is_deleted: true,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    return res
      .status(200)
      .send({ success: false, message: 'SUCCES DELETE DATA' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: 'ERROR DELETE DATA' });
  }
};
export const updateData = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const isExist = await categories.findOne({
      where: {
        id: req.params.id,
        is_deleted: false,
      },
    });
    if (!isExist) {
      return res
        .status(400)
        .send({ success: false, message: 'CATEGORY NOT FOUND!' });
    }
    const result = await categories.update(
      {
        category: req.body.category,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    return res
      .status(200)
      .send({ success: true, message: 'SUCCES UPDATE DATA' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: 'ERROR UPDATE DATA' });
  }
};

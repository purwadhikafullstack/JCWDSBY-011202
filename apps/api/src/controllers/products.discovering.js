import products from '../models/products';
import categories from '../models/categories';
import products_images from '../models/product_images';
import { Op, Sequelize } from 'sequelize';

export const ProductDiscovering = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const result = await products.findAll({
      where: {
        category_id: categoryId,
        is_deleted: false,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'is_deleted'],
      },
      include: [
        {
          model: categories,
          attributes: ['category'],
        },
        {
          model: products_images,
          attributes: ['image', 'id'],
        },
      ],
    });

    let additionalProducts = [];

    if (result.length <= 4) {
      let count = 0;

      if (result.length === 3) {
        count = 1;
      } else if (result.length === 2) {
        count = 2;
      } else if (result.length === 1) {
        count = 3;
      }

      additionalProducts = await products.findAll({
        where: {
          category_id: { [Op.not]: categoryId },
          is_deleted: false,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'is_deleted'],
        },
        include: [
          {
            model: categories,
            attributes: ['category'],
          },
          {
            model: products_images,
            attributes: ['image', 'id'],
          },
        ],
        order: Sequelize.literal('rand()'),
        limit: count,
      });
    }

    const finalResult = result.concat(additionalProducts);

    return res.status(200).send({ success: true, data: finalResult });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: 'ERROR GETTING DATA' });
  }
};

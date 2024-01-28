import products from '../models/products';
import categories from '../models/categories';
import products_images from '../models/product_images';
import { Op, Sequelize } from 'sequelize';

export const ProductDiscovering = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const productIdToExclude = req.params.productId;

    const result = await products.findAll({
      where: {
        category_id: categoryId,
        is_deleted: false,
        id: { [Op.ne]: productIdToExclude },
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

    let count = 4 - result.length;

    if (count > 0) {
      additionalProducts = await products.findAll({
        where: {
          category_id: { [Op.not]: categoryId },
          is_deleted: false,
          id: { [Op.ne]: productIdToExclude },
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

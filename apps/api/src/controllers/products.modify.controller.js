import products from '../models/products';
import products_images from '../models/product_images';
import fs from 'fs/promises';
import path from 'path';
import { Sequelize } from 'sequelize';

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await products.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: 'Product not found!' });
    }
    await deleteProductImages(product.id);
    await products.update(
      {
        is_deleted: true,
      },
      {
        where: {
          id: productId,
        },
      },
    );
    return res.status(200).send({
      success: true,
      message: 'Product and associated files deleted successfully',
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: 'Error deleting data' });
  }
};
async function deleteProductImages(productId) {
  const imageDir = path.join(__dirname, '../../src/public/productimage');
  const productImages = await products_images.findAll({
    where: {
      product_id: productId,
    },
  });
  await Promise.all(
    productImages.map(async (image) => {
      const imagePath = path.join(imageDir, image.image);
      await fs.unlink(imagePath);
    }),
  );
  await products_images.destroy({
    where: {
      product_id: productId,
    },
  });
}

export const updateProduct = async (req, res, next) => {
  try {
    const existingProduct = await products.findOne({
      where: {
        name: req.body.name,
        id: {
          [Sequelize.Op.not]: req.params.id,
        },
      },
    });

    if (existingProduct) {
      return res.status(400).send({
        success: false,
        message: 'Product name already exists for another product.',
      });
    }

    const result = await products.update(
      {
        name: req.body.name,
        price: req.body.price,
        category_id: req.body.category_id,
        description: req.body.description,
        weight: req.body.weight,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    return res.status(201).send({
      success: true,
      message: 'Data updated successfully',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Failed to update data',
    });
  }
};

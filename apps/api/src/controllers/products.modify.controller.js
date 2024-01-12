import products from '../models/products';
import categories from '../models/categories';
import products_images from '../models/product_images';
import fs from 'fs/promises';
import path from 'path';

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
    console.log(error);
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
    const result = await products.update(
      {
        name: req.body.name,
        price: req.body.price,
        category_id: req.body.category_id,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    return res.status(201).send({
      success: true,
      message: 'Edit Data successfully',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .send({ success: false, message: 'Error update data' });
  }
};

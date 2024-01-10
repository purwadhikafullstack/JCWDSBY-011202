import products from '../models/products';
import categories from '../models/categories';
import products_images from '../models/product_images';
import fs from 'fs/promises';
import path from 'path';

export const getProduct = async (req, res, next) => {
  try {
    const filter = {
      is_deleted: false,
    };
    if (req.query.id) {
      filter.id = req.query.id;
    }
    if (req.query.name) {
      filter.name = req.query.name;
    }
    if (req.query.category_id) {
      filter.category_id = req.query.category_id;
    }
    const order = [];
    if (req.query.alphabet) {
      order.push([
        'name',
        req.query.alphabet.toLowerCase() === 'desc' ? 'DESC' : 'ASC',
      ]);
    }
    if (req.query.price) {
      order.push([
        'price',
        req.query.price.toLowerCase() === 'desc' ? 'DESC' : 'ASC',
      ]);
    }

    const result = await products.findAll({
      where: filter,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'is_deleted'],
      },
      order: order,
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

    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: 'ERROR GETTING DATA' });
  }
};
export const createProduct = async (req, res, next) => {
  try {
    const existingProduct = await products.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (existingProduct) {
      if (existingProduct.is_deleted) {
        await existingProduct.update({ is_deleted: false });

        for (const file of req.files) {
          await products_images.create({
            product_id: existingProduct.id,
            image: file.filename,
          });
        }

        return res.status(201).send({
          success: true,
          message: 'Product restored successfully',
          data: existingProduct,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: 'Product already exists',
        });
      }
    }

    const newProduct = await products.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category_id: req.body.category_id,
    });

    for (const file of req.files) {
      await products_images.create({
        product_id: newProduct.id,
        image: file.filename,
      });
    }

    return res.status(201).send({
      success: true,
      message: 'Product added successfully',
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: 'Error adding data' });
  }
};

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

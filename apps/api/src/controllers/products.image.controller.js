import products from '../models/products';
import products_images from '../models/product_images';
import fs from 'fs';
import path from 'path';

export const addImageToProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const existingProduct = await products.findOne({
      where: {
        is_deleted: false,
        id: productId,
      },
    });

    if (!existingProduct) {
      return res
        .status(404)
        .send({ success: false, message: 'Product not found!' });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .send({ success: false, message: 'No files uploaded' });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const newImage = await products_images.create({
        product_id: productId,
        image: file.filename,
      });

      uploadedImages.push({
        id: newImage.id,
        image: newImage.image,
      });
    }

    return res.status(201).send({
      success: true,
      message: 'Product image added successfully',
      data: uploadedImages,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: 'Error adding data' });
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const imageId = req.params.id;
    const existingImage = await products_images.findOne({
      where: {
        id: imageId,
      },
    });

    if (!existingImage) {
      return res
        .status(404)
        .send({ success: false, message: 'Image not found for the product' });
    }

    const filePath = path.join(
      __dirname,
      '../../src/public/productimage',
      existingImage.image,
    );

    fs.unlinkSync(filePath);

    await products_images.destroy({
      where: {
        id: imageId,
      },
    });

    return res
      .status(200)
      .send({ success: true, message: 'Product image deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: 'Error deleting image' });
  }
};

export const editImage = async (req, res, next) => {
  try {
    const imageId = req.params.id;
    const newImageFilename = req.file.filename;

    const existingImage = await products_images.findOne({
      where: {
        id: imageId,
      },
    });

    if (!existingImage) {
      return res
        .status(404)
        .send({ success: false, message: 'Image not found for the product' });
    }

    const oldFilePath = path.join(
      __dirname,
      '../../src/public/productimage',
      existingImage.image,
    );

    const newFilePath = path.join(
      __dirname,
      '../../src/public/productimage',
      newImageFilename,
    );

    await products_images.update(
      { image: newImageFilename },
      {
        where: {
          id: imageId,
        },
      },
    );

    const updatedImage = await products_images.findOne({
      where: {
        id: imageId,
      },
    });

    const { product_id, createdAt, updatedAt, ...resultWithoutProductId } =
      updatedImage.dataValues;

    fs.copyFileSync(req.file.path, newFilePath);
    fs.unlinkSync(oldFilePath);

    return res.status(200).send({
      success: true,
      message: 'Product image edited successfully',
      data: {
        result: resultWithoutProductId,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: 'Error editing image' });
  }
};

export const GetImages = async (req, res, next) => {
  try {
    const result = await products_images.findOne({
      where: {
        image: req.params.name,
      },
    });
    return res.status(200).send({ success: true, image: result });
  } catch (error) {
    return res.status(500).send({ success: false, message: 'Not Found' });
  }
};

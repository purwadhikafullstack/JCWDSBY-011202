import products from '../models/products';
import products_images from '../models/product_images';

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

    for (const file of req.files) {
      await products_images.create({
        product_id: productId,
        image: file.filename,
      });
    }

    return res
      .status(201)
      .send({ success: true, message: 'Product image added successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: 'Error adding data' });
  }
};

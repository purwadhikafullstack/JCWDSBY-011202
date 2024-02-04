import products from '../models/products';
import categories from '../models/categories';
import products_images from '../models/product_images';
import warehouse_storage from '../models/warehouse_storage';

export const getProduct = async (req, res, next) => {
  try {
    const warehouseStorage = await warehouse_storage.findAll({
      where: {
        is_deleted: false,
      },
      raw: true,
    });

    const warehouseStockMap = {};
    warehouseStorage.forEach((item) => {
      const { product_id, stock } = item;
      if (warehouseStockMap[product_id] === undefined) {
        warehouseStockMap[product_id] = stock;
      } else {
        warehouseStockMap[product_id] += stock;
      }
    });

    const filter = {
      is_deleted: false,
    };
    let limit = 12;
    let page = 1;

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

    if (req.query.page) {
      page = parseInt(req.query.page);
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
      limit: req.query.page ? limit : undefined,
      offset: req.query.page ? (page - 1) * limit : undefined,
    });

    const resultWithStock = result.map((product) => {
      const product_id = product.id;
      const total_stock = warehouseStockMap[product_id] || 0;
      return {
        ...product.get({ plain: true }),
        total_stock,
      };
    });

    return res.status(200).send(resultWithStock);
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
      weight: req.body.weight,
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

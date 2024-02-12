import warehouse from '../models/warehouses';
import warehouse_storage from '../models/warehouse_storage';
import orders from '../models/orders';
import addresses from '../models/addresses';
import provinces from '../models/provinces';
import cities from '../models/cities';
import order_details from '../models/order_details';
import product_images from '../models/product_images';
import products from '../models/products';
import stocks_journals from '../models/stocks_journals';
import sales_journals from '../models/sales_journals';

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export const getWarehouseOrderData = async (req, res, next) => {
  try {
    // console.log("masu bos", req.userData);
    const result = await orders.findAll({
      where: {
        warehouse_id: req.userData.warehouse_id,
      },
      include: [
        {
          model: addresses,
          required: true,
          attributes: ['address'],
          include: [
            {
              model: provinces,
              required: true,
              attributes: ['name'],
            },
            {
              model: cities,
              required: true,
              attributes: ['name'],
            },
          ],
        },
      ],
      raw: true,
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getManageOrderDetail = async (req, res, next) => {
  try {
    // console.log("mulai kerjakan", req.query);
    const data = await order_details.findAll({
      where: {
        order_id: req.query.id,
      },
      include: [
        {
          model: products,
          required: true,
          attributes: ['id', 'name', 'price'],
          include: [
            {
              model: product_images,
              required: true,
              attributes: ['image'],
            },
          ],
        },
      ],
      raw: true,
    });
    const result = [];
    const index = [];
    data.map((val, idx) => {
      if (!index.includes(data[idx].product_id)) {
        index.push(data[idx].product_id);
        result.push(val);
      }
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const updateStatus = async (req, res, next) => {
  try {
    const isExist = await orders.findOne({
      where: {
        invoice: req.body.invoice,
        id: req.body.id,
      },
      raw: true,
    });

    const productsOrder = await order_details.findAll({
      where: {
        invoice: req.body.invoice,
        order_id: isExist.id,
      },
      raw: true,
    });

    if (isExist) {
      if (
        isExist.status === 'Menunggu Konfirmasi Pembayaran' &&
        req.body.status === 'Diproses'
      ) {
        for (let i = 0; i < productsOrder.length; i++) {
          const productCheck = await products.findOne({
            where: {
              id: productsOrder[i].product_id,
            },
            raw: true,
          });
          const isStock = await warehouse_storage.findOne({
            where: {
              warehouse_id: isExist.warehouse_id,
              product_id: productCheck.id,
            },
            raw: true,
          });

          await stocks_journals.create({
            date: formatDate(new Date()),
            product_id: productsOrder[i].product_id,
            warehouse_id: isExist.warehouse_id,
            quantity: productsOrder[i].quantity,
            operation: 'decrement',
            now_stock: isStock.stock - productsOrder[i].quantity,
          });
          await warehouse_storage.update(
            {
              stock: isStock.stock - productsOrder[i].quantity,
            },
            {
              where: {
                warehouse_id: isExist.warehouse_id,
                product_id: productCheck.id,
              },
            },
          );
        }
      }
      if (isExist.status === 'Dikirim' && req.body.status === 'Berhasil') {
        for (let i = 0; i < productsOrder.length; i++) {
          const productCheck = await products.findOne({
            where: {
              id: productsOrder[i].product_id,
            },
            raw: true,
          });

          await sales_journals.create({
            date: formatDate(new Date()),
            product_id: productsOrder[i].product_id,
            warehouse_id: isExist.warehouse_id,
            category_id: productCheck.category_id,
            quantity: productsOrder[i].quantity,
          });
        }
      }
      const result = await orders.update(
        {
          status: req.body.status,
        },
        {
          where: {
            invoice: req.body.invoice,
            id: req.body.id,
          },
        },
      );

      return res.status(200).send(result);
    } else {
      const result = await orders.update(
        {
          status: req.body.status,
        },
        {
          where: {
            invoice: req.body.invoice,
            id: req.body.id,
          },
        },
      );
      return res.status(200).send(result);
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('Internal Server Error');
  }
};
export const cancelOrder = async (req, res, next) => {
  try {
    const result = await orders.update(
      {
        status: 'Dibatalkan',
      },
      {
        where: {
          invoice: req.body.invoice,
          id: req.body.id,
        },
      },
    );
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

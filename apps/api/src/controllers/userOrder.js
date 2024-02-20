import order_details from '../models/order_details';
import orders from '../models/orders';
import product_images from '../models/product_images';
import products from '../models/products';
import addresses from '../models/addresses';
import cities from '../models/cities';
import provinces from '../models/provinces';
import fs from 'fs';
import path from 'path';
import sales_journal from '../models/sales_journals';

export const getUserOrder = async (req, res, next) => {
  try {
    const userOrder = await orders.findAll({
      where: {
        account_id: req.userData.id,
      },
      attributes: [
        'id',
        'invoice',
        'total_price',
        'recepient',
        'status',
        'createdAt',
      ],
      raw: true,
    });
    const orderId = userOrder.map((val, id) => {
      return val.id;
    });
    const orderInv = userOrder.map((val, id) => {
      return val.invoice;
    });
    const userOrderItem = await order_details.findAll({
      where: {
        order_id: orderId,
        invoice: orderInv,
      },
      attributes: ['quantity', 'total_price', 'order_id', 'invoice'],
      include: [
        {
          model: products,
          required: true,
          attributes: ['id', 'price', 'name'],
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
    for (let i = 0; i < userOrder.length; i++) {
      result.push(userOrder[i]);
      const index = [];
      for (let j = 0; j < userOrderItem.length; j++) {
        if (
          userOrder[i].id === userOrderItem[j]['order_id'] &&
          userOrder[i].invoice === userOrderItem[j]['invoice']
        ) {
          if (!index.includes(userOrderItem[j]['product.id'])) {
            index.push(userOrderItem[j]['product.id']);
            if (!userOrder[i]['data']) {
              userOrder[i]['data'] = [userOrderItem[j]];
            } else {
              userOrder[i].data.push(userOrderItem[j]);
            }
          }
        }
      }
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const deleteOrder = async (req, res, next) => {
  try {
    const result = await orders.update(
      {
        status: 'Dibatalkan',
      },
      {
        where: {
          id: req.body.id,
          invoice: req.body.invoice,
        },
      },
    );
    return res.status(200).send({ message: 'Berhasil membatalkan pesanan' });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getOrderDetail = async (req, res, next) => {
  try {
    const userOrder = await orders.findAll({
      where: {
        id: req.query.order,
        invoice: req.query.inv,
      },
      include: [
        {
          model: addresses,
          required: true,
          attributes: ['address', 'phone'],
          include: [
            {
              model: cities,
              attributes: ['name'],
            },
            {
              model: provinces,
              attributes: ['name'],
            },
          ],
        },
      ],
      raw: true,
    });
    return res.status(200).send(userOrder);
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const uploadPaymentProof = async (req, res, next) => {
  try {
    const uploadProof = await orders.findOne({
      where: {
        id: req.query.order,
        invoice: req.query.inv,
      },
      attributes: ['payment_proof'],
      raw: true,
    });

    if (uploadProof.payment_proof) {
      const filePath = path.join(
        __dirname,
        '../../src/public/paymentProof',
        uploadProof.payment_proof,
      );
      fs.unlinkSync(filePath);
    }
    const edit = await orders.update(
      {
        payment_proof: req.file.filename,
        status: 'Menunggu Konfirmasi Pembayaran',
      },
      {
        where: {
          id: req.query.order,
          invoice: req.query.inv,
        },
      },
    );
    return res.status(200).send('success upload');
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const orderConfirmation = async (req, res, next) => {
  try {
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const isExist = await orders.findOne({
      where: {
        id: req.body.order,
        invoice: req.body.invoice,
      },
      raw: true,
    });
    if (!isExist) {
      return res
        .status(400)
        .send({ succes: false, message: `Order Not Found` });
    }
    const result = await orders.update(
      {
        status: 'Berhasil',
      },
      {
        where: {
          id: req.body.order,
          invoice: req.body.invoice,
        },
      },
    );
    const productsOrder = await order_details.findAll({
      where: {
        invoice: req.body.invoice,
        order_id: isExist.id,
      },
      raw: true,
    });
    for (let i = 0; i < productsOrder.length; i++) {
      const productCheck = await products.findOne({
        where: {
          id: productsOrder[i].product_id,
        },
        raw: true,
      });

      await sales_journal.create({
        date: formatDate(new Date()),
        product_id: productsOrder[i].product_id,
        warehouse_id: isExist.warehouse_id,
        category_id: productCheck.category_id,
        quantity: productsOrder[i].quantity,
      });
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

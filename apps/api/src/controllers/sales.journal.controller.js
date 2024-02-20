import { Op, fn, col, Sequelize } from 'sequelize';
import sales_journals from '../models/sales_journals';
import products from '../models/products';
import categories from '../models/categories';
export const getMonthlySales = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.warehouse_id) {
      filter.warehouse_id = req.query.warehouse_id;
    }
    if (req.query.product_id) {
      filter.product_id = req.query.product_id;
    }
    const currentDate = new Date();
    const sixMonthsAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 6,
      1,
    );

    const monthlySales = await sales_journals.findAll({
      attributes: [
        [fn('date_format', col('date'), '%M'), 'month'],
        [fn('sum', col('quantity')), 'sales'],
      ],
      where: {
        ...filter,
        date: {
          [Op.between]: [sixMonthsAgo, currentDate],
        },
      },
      group: fn('date_format', col('date'), '%Y-%m'),
      order: [[fn('date_format', col('date'), '%Y-%m'), 'ASC']],
      raw: true,
    });

    const response = [];

    for (let i = 0; i < 6; i++) {
      const monthName = currentDate.toLocaleString('en-US', { month: 'long' });
      const salesData = monthlySales.find(
        (entry) => entry.month === monthName,
      ) || { month: monthName, sales: 0 };
      response.unshift({
        month: salesData.month,
        sales: Number(salesData.sales),
      });
      currentDate.setMonth(currentDate.getMonth() - 1);
    }

    res.send(response);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

export const product_sold = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.warehouse_id) {
      filter.warehouse_id = req.query.warehouse_id;
    }
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const monthlyProductSales = await sales_journals.findAll({
      where: {
        ...filter,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('MONTH', Sequelize.col('date')),
            currentMonth,
          ),
          Sequelize.where(
            Sequelize.fn('YEAR', Sequelize.col('date')),
            currentYear,
          ),
        ],
      },
      include: [
        {
          model: products,
          attributes: ['name'],
        },
      ],
    });

    const groupedData = {};
    for (const item of monthlyProductSales) {
      const { product_id, quantity } = item;
      groupedData[product_id] = (groupedData[product_id] || 0) + quantity;
    }

    const result = [];
    let othersTotal = 0;
    for (const productId in groupedData) {
      const productName = monthlyProductSales.find(
        (item) => item.product_id === parseInt(productId),
      ).product.name;
      const quantitySold = groupedData[productId];
      result.push({
        product_name: productName,
        product_sold: quantitySold,
      });
    }

    result.sort((a, b) => b.product_sold - a.product_sold);

    if (result.length > 4) {
      for (let i = 4; i < result.length; i++) {
        othersTotal += result[i].product_sold;
      }
      result.splice(4);
    }
    if (othersTotal > 0) {
      result.push({ product_name: 'others', product_sold: othersTotal });
    }

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

export const categoriesSold = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.warehouse_id) {
      filter.warehouse_id = req.query.warehouse_id;
    }
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const monthlyCategorySales = await sales_journals.findAll({
      where: {
        ...filter,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('MONTH', Sequelize.col('date')),
            currentMonth,
          ),
          Sequelize.where(
            Sequelize.fn('YEAR', Sequelize.col('date')),
            currentYear,
          ),
        ],
      },
      include: [
        {
          model: products,
          include: [
            {
              model: categories,
              attributes: ['category'],
            },
          ],
        },
      ],
    });
    const groupedData = {};
    for (const item of monthlyCategorySales) {
      const { product } = item;
      const { category } = product;
      const { category: categoryName } = category;
      groupedData[categoryName] =
        (groupedData[categoryName] || 0) + item.quantity;
    }

    const sortedCategories = Object.entries(groupedData).sort(
      (a, b) => b[1] - a[1],
    );

    const result = [];
    let othersTotal = 0;
    for (let i = 0; i < sortedCategories.length; i++) {
      const [categoryName, quantitySold] = sortedCategories[i];
      if (i < 4) {
        result.push({
          category_name: categoryName,
          category_sold: quantitySold,
        });
      } else {
        othersTotal += quantitySold;
      }
    }

    if (othersTotal > 0) {
      result.push({ category_name: 'others', category_sold: othersTotal });
    }

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

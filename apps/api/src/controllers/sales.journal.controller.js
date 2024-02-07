import { Op, fn, col } from 'sequelize';
import sales_journals from '../models/sales_journals';

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
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

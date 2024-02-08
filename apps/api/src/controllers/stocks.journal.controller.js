import { Op } from 'sequelize';
import stocks_journals from '../models/stocks_journals';

export const getStockTraffic = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.warehouse_id) {
      filter.warehouse_id = req.query.warehouse_id;
    }
    if (req.query.product_id) {
      filter.product_id = req.query.product_id;
    }
    const startOfMonth = new Date(2024, 1, 1);
    const monthlyResults = [];
    for (let i = 0; i < 5; i++) {
      const endOfMonth = new Date(
        startOfMonth.getFullYear(),
        startOfMonth.getMonth() + 1,
        0,
        23,
        59,
        59,
      );

      const getDataEachMonth = await stocks_journals.findAll({
        where: {
          ...filter,
          date: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
        order: [['date', 'DESC']],
        raw: true,
      });

      const groupedData = getDataEachMonth.reduce((acc, item) => {
        const key = `${item.product_id}-${item.warehouse_id}`;
        if (!acc[key] || new Date(acc[key].date) < new Date(item.date)) {
          acc[key] = item;
        }
        return acc;
      }, {});
      const result = Object.values(groupedData);

      const monthName = new Intl.DateTimeFormat('en-US', {
        month: 'long',
      }).format(startOfMonth);

      monthlyResults.push({ month: monthName, result });
      startOfMonth.setMonth(startOfMonth.getMonth() - 1);
    }

    const monthlyStockSum = monthlyResults.map(({ month, result }) => ({
      month,
      stockSum: result.reduce((sum, entry) => sum + entry.now_stock, 0),
    }));

    res.send(monthlyStockSum);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

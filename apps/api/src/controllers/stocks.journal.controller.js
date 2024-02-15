import { Op } from 'sequelize';
import stocks_journals from '../models/stocks_journals';
import products from '../models/products';
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
    res.status(500).send({ succes: false, message: 'Internal Server Error' });
  }
};

export const getStockJournals = async (req, res, next) => {
  try {
    const { startdate, enddate, product_id, warehouse_id, page } = req.query;
    const pageSize = 12;

    const filter = {};
    if (startdate) {
      filter.date = { [Op.gte]: startdate };
    }
    if (enddate) {
      if (!filter.date) {
        filter.date = {};
      }
      filter.date[Op.lte] = enddate;
    }
    if (product_id) {
      filter.product_id = product_id;
    }
    if (warehouse_id) {
      filter.warehouse_id = warehouse_id;
    }

    const offset = (parseInt(page) - 1) * pageSize;
    const limit = pageSize;

    const { count, rows: stockJournals } =
      await stocks_journals.findAndCountAll({
        where: filter,
        offset,
        limit,
        include: [
          {
            model: products,
            attributes: ['name'],
            required: true,
          },
        ],
        order: [['date', 'DESC']],
        raw: true,
      });

    const modifiedStockJournals = stockJournals.map((journal) => {
      return {
        ...journal,
        product_name: journal['product.name'],
      };
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).send({ stockJournals: modifiedStockJournals, totalPages });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

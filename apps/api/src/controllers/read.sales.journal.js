import { Op, fn, col, Sequelize } from 'sequelize';
import sales_journals from '../models/sales_journals';
import products from '../models/products';

export const getSalesJournals = async (req, res, next) => {
  try {
    const { start_date, end_date, warehouse_id, page, pageSize } = req.query;
    const filter = {};
    if (start_date) {
      filter.date = { [Op.gte]: start_date };
    }
    if (end_date) {
      if (!filter.date) {
        filter.date = {};
      }
      filter.date[Op.lte] = end_date;
    }
    if (warehouse_id) {
      filter.warehouse_id = warehouse_id;
    }

    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(pageSize) || 10;
    const offset = (pageNumber - 1) * limit;

    const { count, rows: salesJournals } = await sales_journals.findAndCountAll(
      {
        where: filter,
        include: [
          {
            model: products,
            attributes: ['name'],
          },
        ],
        offset,
        limit,
        order: [['date', 'DESC']],
        raw: true,
      },
    );

    const transformedSalesJournals = salesJournals.map((journal) => {
      return {
        ...journal,
        product_name: journal['product.name'],

        ['product.name']: undefined,
      };
    });

    const totalPages = Math.ceil(count / limit);

    res
      .status(200)
      .send({ salesJournals: transformedSalesJournals, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

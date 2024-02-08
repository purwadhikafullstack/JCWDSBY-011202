import journal from '../models/journal';

export const readJournal = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.id) {
      filter.id = req.query.id;
    }
    if (req.query.date) {
      filter.date = req.query.date;
    }
    if (req.query.from) {
      filter.from = req.query.from;
    }
    if (req.query.warehouse_id) {
      filter.warehouse_id = req.query.warehouse_id;
    }
    const result = await journal.findAll({
      where: filter,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      raw: true,
    });
    return res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

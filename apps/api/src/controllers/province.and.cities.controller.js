import cities from '../models/cities';
import provinces from '../models/provinces';

export const getCities = async (req, res, next) => {
  try {
    const { prov_id } = req.query;
    const whereClause = prov_id ? { prov_id } : {};

    const city = await cities.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: whereClause,
    });

    res.status(200).send({ success: true, data: city });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'ERROR GETTING DATA' });
  }
};

export const getProvinces = async (req, res, next) => {
  try {
    const province = await provinces.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ success: true, data: province });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'ERROR GETTING DATA' });
  }
};

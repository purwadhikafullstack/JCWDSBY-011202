import warehouses from '../models/warehouses';
import accounts from '../models/accounts';
import bcrypt from 'bcrypt';

export const updateAccount = async (req, res, next) => {
  try {
  } catch (error) {}
};
export const deleteAccount = async (req, res, next) => {
  try {
    const isExist = await accounts.findOne({
      where: { id: req.params.id, is_deleted: false },
    });

    if (!isExist) {
      return res.status(404).send({
        message: 'Account not found',
        success: false,
      });
    }

    const delAccount = await accounts.update(
      { is_deleted: true },
      { where: { id: req.params.id } },
    );

    return res.status(200).send({
      message: 'Account deleted',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'Error deleting data',
      success: false,
    });
  }
};

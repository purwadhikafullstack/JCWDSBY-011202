import warehouses from '../models/warehouses';
import accounts from '../models/accounts';
import bcrypt from 'bcrypt';
import journal from '../models/journal';
import { Op } from 'sequelize';

export const updateAccount = async (req, res, next) => {
  try {
    const existingAccount = await accounts.findOne({
      where: { id: req.params.id, is_deleted: false },
    });

    if (!existingAccount) {
      return res.status(404).send({
        message: 'Account not found',
        success: false,
      });
    }

    const isEmailTaken = await accounts.findOne({
      where: { email: req.body.email, id: { [Op.not]: existingAccount.id } },
    });

    if (isEmailTaken) {
      return res.status(400).send({
        message: 'Email is already taken',
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const updatedAccount = await accounts.update(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        warehouse_id: req.body.warehouse_id,
      },
      {
        where: { id: req.params.id },
        returning: true,
      },
    );

    return res.status(200).send({
      message: 'Account updated successfully',
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

    const journalDate = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });

    const journalInformation = `${req.userData.fullname} deleted ${isExist.fullname} as ${isExist.role}`;
    const journalFrom = `Accounts`;

    if (delAccount) {
      await journal.create({
        date: journalDate,
        information: journalInformation,
        from: journalFrom,
      });
    }

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

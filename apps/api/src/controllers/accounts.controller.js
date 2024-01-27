import warehouses from '../models/warehouses';
import accounts from '../models/accounts';
const bcrypt = require('bcrypt');

export const GetAccounts = async (req, res, next) => {
  try {
    const filter = {
      is_deleted: false,
    };

    if (req.query.id) {
      filter.id = req.query.id;
    }
    if (req.query.username) {
      filter.username = req.query.username;
    }
    if (req.query.email) {
      filter.email = req.query.email;
    }
    if (req.query.fullname) {
      filter.fullname = req.query.fullname;
    }
    if (req.query.role) {
      filter.role = req.query.role;
    }
    if (req.query.warehouse_id) {
      filter.warehouse_id = req.query.warehouse_id;
    }
    if (req.query.order) {
      filter.order = req.query.order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    }

    const result = await accounts.findAll({
      where: filter,
      attributes: { exclude: ['createdAt', 'updatedAt', 'is_deleted'] },
    });

    const mappedResult = result.map((account) => {
      const { is_verified, ...accountData } = account.dataValues;
      return {
        ...accountData,
        verification_status: is_verified == 1 ? 'verified' : 'unverified',
      };
    });

    return res.status(200).send(mappedResult);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'MANAGE ACCOUNT FAILED',
    });
  }
};

export const CreateAccount = async (req, res, next) => {
  try {
    // Check if the email is already registered, including deleted accounts
    const existingAccount = await accounts.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingAccount) {
      // If the existing account is deleted, restore it with new data
      if (existingAccount.is_deleted) {
        // Restore the account with new data
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const restoredAccount = await accounts.update(
          {
            password: hashPassword,
            role: req.body.role,
            fullname: req.body.fullname,
            warehouse_id: req.body.warehouse_id || null,
            is_verified: true,
            is_deleted: false,
          },
          {
            where: { id: existingAccount.id },
            returning: true,
          },
        );

        const result = restoredAccount[1][0];

        return res.status(200).json({
          success: true,
          message: 'Account restored with new data',
          result,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: `${existingAccount.email} is already registered as ${existingAccount.role}`,
        });
      }
    }

    if (req.body.password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }

    let generatedUsername = req.body.fullname.toLowerCase().replace(/\s/g, '_');
    let counter = 1;

    while (await accounts.findOne({ where: { username: generatedUsername } })) {
      generatedUsername = `${req.body.fullname
        .toLowerCase()
        .replace(/\s/g, '_')}${counter}`;
      counter++;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const result = await accounts.create({
      password: hashPassword,
      email: req.body.email,
      role: req.body.role,
      fullname: req.body.fullname,
      username: generatedUsername,
      warehouse_id: req.body.warehouse_id || null,
      is_verified: true,
    });

    return res.status(201).json({
      success: true,
      message: 'Account created',
      result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

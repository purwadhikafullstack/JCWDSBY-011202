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
    if (req.query.order) {
      req.query.order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    }
    const result = await accounts.findAll({
      where: filter,
    });

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'MANAGE ACCOUNT FAILED',
    });
  }
};

export const GetAdmins = async (req, res, next) => {
  try {
    const filter = {
      is_deleted: false,
      role: 'admin',
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
    if (req.query.order) {
      req.query.order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    }
    const result = await accounts.findAll({
      where: filter,
    });

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'MANAGE ACCOUNT FAILED',
    });
  }
};

export const GetUsers = async (req, res, next) => {
  try {
    const filter = {
      is_deleted: false,
      role: 'user',
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
    if (req.query.order) {
      req.query.order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    }
    const result = await accounts.findAll({
      where: filter,
    });

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'MANAGE ACCOUNT FAILED',
    });
  }
};

export const CreateAccount = async (req, res, next) => {
  try {
    const exists = await accounts.findOne({
      where: {
        username: req.body.email,
        email: req.body.email,
        is_deleted: false,
      },
    });

    if (exists) {
      return res.status(500).send({
        success: false,
        message: 'ACCOUNT ALREADY EXISTS',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log('SALT : ', salt);
    console.log('HASH : ', hashPassword);
    req.body.password = hashPassword;
    const newAccount = await accounts.create(req.body);
    console.log('ACCOUNT REGISTERED : \n', newAccount);

    return res.status(201).send({
      success: true,
      message: 'REGISTER SUCCESS',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const DeleteAccount = async (req, res, next) => {
  try {
    const account = await accounts.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!account) {
      return res.status(404).send({
        success: false,
        message: 'ACCOUNT NOT FOUND',
      });
    }

    await accounts.update(
      {
        is_deleted: true,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    return res.status(200).send({
      success: true,
      message: 'ACCOUNT SUCCESFULLY DELETED',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('ERROR DELETE ACCOUNT');
  }
};

export const UpdateAccount = async (req, res, next) => {
  try {
    console.log(req.params.id);

    const result = await accounts.update(
      {
        username: req.body.username,
        email: req.body.email,
        address_id: req.body.address_id,
        warehouse_id: req.body.warehouse_id,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    console.log(result);
    return res.status(200).send({
      success: true,
      message: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

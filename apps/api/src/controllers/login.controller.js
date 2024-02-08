import accounts from '../models/accounts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Login = async (req, res, next) => {
  try {
    const findAccount = await accounts.findOne({
      where: {
        email: req.body.email,
      },
      raw: true,
    });

    if (!findAccount) {
      return res.status(401).send({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      findAccount.password,
    );

    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: 'Invalid  password',
      });
    }

    const token = jwt.sign(
      {
        id: findAccount.id,
        role: findAccount.role,
        fullname: findAccount.fullname,
        warehouse_id: findAccount.warehouse_id,
      },
      process.env.SCRT_TKN,
      {
        expiresIn: '8h',
      },
    );

    const resultData = {
      username: findAccount.username,
      role: findAccount.role,
      fullname: findAccount.fullname,
      email: findAccount.email,
      is_confirmed: findAccount.is_confirmed,
      warehouse_id: findAccount.warehouse_id,
    };

    return res.status(200).send({
      success: true,
      message: 'Login Successfully',
      token,
      result: resultData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const keepLogin = async (req, res) => {
  try {
    const resultData = await accounts.findOne({
      where: {
        id: req.userData.id,
      },
      attributes: { exclude: ['password', 'id'] },
      raw: true,
    });
    const token = jwt.sign(
      {
        id: req.userData.id,
        role: req.userData.role,
        fullname: req.userData.fullname,
        warehouse_id: req.userData.warehouse_id,
      },
      process.env.SCRT_TKN,
      {
        expiresIn: '1h',
      },
    );

    return res.status(200).send({
      success: true,
      message: 'Login Successfully',
      token,
      result: resultData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

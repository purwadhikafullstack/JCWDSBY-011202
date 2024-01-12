import accounts from '../models/accounts';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../helper/mailer');

export const ForgotPassword = async (req, res, next) => {
  try {
    const account = await accounts.findOne({
      where: {
        email: req.body.email,
      },
      raw: true,
    })

    if (!account) {
      return res.status(404).send({
        success: false,
        message: 'ACCOUNT NOT FOUND',
      })
    }

    const { id, email } = account

    const token = jwt.sign(
      {
        id,
        email,
      },
      'abcd',
      { expiresIn: '1h' }
    )

    const mailOptions = {
      from: 'gibrand789@gmail.com', 
      to: req.body.email, 
      subject: 'RESET PASSWORD',
      text: token
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send(error)
      }
      return res.status(200).send({
        success: true,
        message: 'EMAIL SENT'
      })
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

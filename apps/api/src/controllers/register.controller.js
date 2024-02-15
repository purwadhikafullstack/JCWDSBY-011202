import accounts from '../models/accounts';
import bcrypt from 'bcrypt';
import transporter from '../helper/mailer';
import jwt from 'jsonwebtoken';
export const Register = async (req, res, next) => {
  try {
    const isExist = await accounts.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (isExist) {
      return res
        .status(500)
        .send({ success: false, message: 'Account Already Exists' });
    }

    let generatedUsername = req.body.fullname.toLowerCase().replace(/\s/g, '_');
    let isUsernameExist = await accounts.findOne({
      where: {
        username: generatedUsername,
      },
    });
    let counter = 1;

    while (isUsernameExist) {
      generatedUsername =
        req.body.fullname.toLowerCase().replace(/\s/g, '_') + counter;
      isUsernameExist = await accounts.findOne({
        where: {
          username: generatedUsername,
        },
      });

      counter++;
    }

    req.body.username = generatedUsername;
    req.body.role = 'user';
    console.log(req.body);
    const result = await accounts.create(req.body);
    console.log(result.dataValues);
    const token = jwt.sign(
      {
        email: result.email,
        id: result.id,
        fullname: result.fullname,
      },
      process.env.SCRT_TKN,
      {
        expiresIn: '1h',
      },
    );

    const emailHtml = `
      <div style="background-color: #FFA500; padding: 20px; text-align: center;">
        <h2 style="color: #fff; background-color: #FF8C00; padding: 10px; border-radius: 5px;">Thank You For Registering!</h2>
        <p style="font-size: 16px; color: #fff;">Hello ${req.body.fullname},</p>
        <p style="font-size: 16px; color: #fff;">Your registration was successful.</p>

        <div style="margin-top: 20px;">
          <a href="http://localhost:5173/user/email-verification?${token}" style="background-color: #FF6347; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Complete Registration</a>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: 'gibrand789@gmail.com',
      to: req.body.email,
      subject: 'Registration successfully',
      html: emailHtml,
    });
    return res.status(201).send({
      success: true,
      message: 'Thanks For Registering',
      token,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: 'ERROR GETTING DATA' });
  }
};

export const ConfirmationEmail = async (req, res, next) => {
  console.log('MASUK');
  try {
    const isExist = await accounts.findOne({
      where: {
        id: req.userData.id,
      },
      raw: true,
    });
    if (!isExist) {
      return res
        .status(404)
        .send({ success: false, message: 'Account Doesnt Exist' });
    }
    if (isExist.is_verified === true) {
      return res
        .status(404)
        .send({ success: false, message: 'Account is verified' });
    }
    delete req.body.confirmpassword;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const setPassword = await accounts.update(
      { password: hashPassword, is_verified: true },
      { where: { id: req.userData.id } },
    );
    console.log(setPassword);
    return res.status(200).send({
      success: true,
      message: 'Registration and Verification Successfully',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: 'ERROR GETTING DATA' });
  }
};

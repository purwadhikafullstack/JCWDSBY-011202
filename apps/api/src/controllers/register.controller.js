import accounts from '../models/accounts'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const Register = async (req, res, next) => {
    try {
        const exists = await accounts.findOne({
            where: {
                email: req.body.email,
                is_deleted: false
            }
        })

        if (exists) {
            return res.status(400).send({
                success: false,
                message: 'ACCOUNT ALREADY EXISTS'
            })
        }

        if (!req.body.confirmPassword) {
            return res.status(400).send({
                success: false,
                message: 'PLEASE CONFIRM PASSWORD'
            })
        }

        // if (req.body.password !== req.body.confirmPassword && (req.body.password).length >= 8) {
        //     return res.status(400).send({
        //         success: false,
        //         message: 'INVALID PASSWORD'
        //     })
        // }

        delete req.body.confirmPassword

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashPassword

        const newAccount = await accounts.create(req.body)

        const mailOptions = {
            from: 'gibrand789@gmail.com', 
            to: req.body.email, 
            subject: 'test',
            text: `test`,
          }
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(500).send(error)
            }
          })

        return res.status(201).send({
            success: true,
            message: "REGISTER SUCCESS"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error
        })
    }
}
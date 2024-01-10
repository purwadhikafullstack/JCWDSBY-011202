import accounts from '../models/accounts'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const Register = async (req, res, next) => {
    try {
        const exists = await accounts.findOne({
            where: {
                email: req.body.email
            }
        })

        if (exists) {
            return res.status(500).send({
                success: false,
                message: 'ACCOUNT ALREADY EXISTS'
            })
        }

        if (req.body.password !== req.body.confirmPassword && (req.body.password).length >= 8) {
            return res.status(500).send({
                success: false,
                message: 'INVALID PASSWORD'
            })
        }

        delete req.body.confirmPassword

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        console.log("SALT : ", salt)
        console.log("HASH : ", hashPassword)

        req.body.password = hashPassword

        const newAccount = await accounts.create(req.body)
        console.log('ACCOUNT REGISTERED : \n', newAccount);

        const token = jwt.sign({
            id: newAccount.id,
            email: newAccount.email
        },
            process.env.secretToken,
            { expiresIn: '1h' }
        )

        return res.status(201).send({
            success: true,
            message: "REGISTER SUCCESS",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error
        })
    }
}
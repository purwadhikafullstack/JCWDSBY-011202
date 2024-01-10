import accounts from '../models/accounts'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const ResetPassword = async (req, res, next) => {
    try {
        let token = req.body.token
        const accountData = jwt.verify(token, process.env.secretToken)

        if (req.body.password === req.body.confirmPassword) {
            delete req.body.confirmPassword
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            console.log("SALT : ", salt)
            console.log("HASH : ", hashPassword)

            req.body.password = hashPassword

            await accounts.update({
                password: req.body.password
            }, {
                where: {
                    id: accountData.id
                }
            })

            return res.status(200).send({
                success: true,
                message: 'PASSWORD UPDATED'
            })

        } else {
            return res.status(400).send({
                success: false,
                message: 'PASSWORD UPDATE FAILED'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'RESET PASSWORD FAILED'
        })
    }
}
import accounts from '../models/accounts'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const ForgotPassword = async (req, res, next) => {
    try {
        const account = accounts.findOne({
            where: {
                email: req.body.email
            },
            raw: true
        })

        if (!account) {
            return res.status(404).send({
                success: false,
                message: 'ACCOUNT NOT FOUND'
            })
        }

        const { id, email } = account

        const token = jwt.sign({
            id, email
        }, process.env.secretToken,
        { expiresIn: '1h' })

        return res.status(200).send(token)

    } catch (error) {
        console.log(error);
        return res.status(500).send('FORGOT PASSWORD FAILED')
    }
}
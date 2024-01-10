import accounts from '../models/accounts'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const Login = async (req, res, next) => {
    try {
        const findAccount = await accounts.findOne({
            where: {
                username: req.body.username
            },
            raw: true
        })

        // const salt = await bcrypt.genSalt(10)
        // const hashPassword = await bcrypt.hash(req.body.password, salt)
        // console.log("SALT : ", salt)
        // console.log("HASH : ", hashPassword)

        // req.body.password = hashPassword

        // if (hashPassword !== findAccount.password) {
        //     console.log('INPUTTED PASSWORD', req.body.password);
        //     console.log('ACCOUNT PASSWORD', findAccount.password);
        //     return res.status(400).send({
        //         success: false,
        //         message: 'INCORRECT PASSWORD'
        //     })
        // }

        const token = jwt.sign({
            id: findAccount.id,
            username: findAccount.username
        },
        'abcd',
        { expiresIn: "1h" })

        return res.status(200).send({
            success: true,
            findAccount,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error
        })
    }
}
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
        console.log("api backend", findAccount);
        if (!findAccount) {
            return res.status(404).send({
                success: false,
                message: 'ACCOUNT NOT FOUND'
            })
        }

        const correctPassword = await bcrypt.compare(req.body.password, findAccount.password);
        console.log("api backend 2", correctPassword);
        if (!correctPassword) {
            return res.status(400).send({
                success: false,
                message: 'INCORRECT PASSWORD'
            });
        }

        const token = jwt.sign({
            id: findAccount.id,
            role: findAccount.role
        },
        'abcd',
        { expiresIn: "1h" })
        const tokenReal = jwt.verify(token,"abcd")
        console.log("api backend 3", token );
        console.log("api backend 4",tokenReal);
        return res.status(200).send({
            success: true,
            username:findAccount.username,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
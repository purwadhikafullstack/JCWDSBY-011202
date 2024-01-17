import accounts from '../models/accounts';
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
        if (!findAccount) {
            return res.status(404).send({
                success: false,
                message: 'ACCOUNT NOT FOUND'
            })
        }
      
        if (!findAccount) {
            return res.status(404).send({
                success: false,
                message: 'ACCOUNT NOT FOUND'
            })
        }

        const correctPassword = await bcrypt.compare(req.body.password, findAccount.password);

        if (!correctPassword) {
            return res.status(400).send({
                success: false,
                message: 'INCORRECT PASSWORD'
            });
        }

        const token = jwt.sign({
            id: findAccount.id,
            username: findAccount.username,
            role: findAccount.role
        },
            'abcd',
            { expiresIn: "1h" })

        jwt.verify(token, 'abcd', (error, decoded) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: error
                });
            }

            const { role } = decoded;

            return res.status(200).send({
                success: true,
                findAccount,
                token,
                role
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

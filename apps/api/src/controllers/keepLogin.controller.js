import accounts from '../models/accounts';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const KeepLogin = async (req, res, next) => {
    try {
        // Check if the Authorization header exists
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(400).send({
                success: false,
                message: 'NO TOKEN AVAILABLE'
            });
        }

        // Extract the token from the Authorization header
        const token = authorizationHeader.split(' ')[1];

        const verifyAccount = jwt.verify(token, 'abcd');

        if (!verifyAccount) {
            return res.status(401).send({
                success: false,
                message: 'UNAUTHORIZED REQUEST'
            });
        } else {
            req.accountData = verifyAccount;
            console.log('Keep Login : ', req.accountData);

            const account = await accounts.findOne({
                where: {
                    id: req.accountData.id
                },
                raw: true
            });

            console.log('result : ', account);

            const { id, username, email, role, is_verified, is_deleted } = account;

            const newToken = jwt.sign({
                id, role, is_verified
            }, 'abcd',
                { expiresIn: '1h' }
            );

            return res.status(200).send({
                success: true,
                message: account,
                token: newToken
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('INVALID TOKEN');
    }
};
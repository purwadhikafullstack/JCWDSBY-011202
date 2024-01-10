import accounts from '../models/accounts'

export const GetAccounts = async (req, res, next) => {
    try {
        const filter = {
            is_deleted: false
        }
        if (req.query.id) {
            filter.id = req.query.id
        }
        if (req.query.username) {
            filter.username = req.query.username
        }
        if (req.query.email) {
            filter.email = req.query.email
        }
        if (req.query.order) {
            req.query.order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
        }

        const result = await accounts.findAll({
            where: filter
        })

        return res.status(200).send(result)

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'MANAGE ACCOUNT FAILED'
        })
    }
}

export const CreateAccount = async (req, res, next) => {
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

        // const salt = await bcrypt.genSalt(10)
        // const hashPassword = await bcrypt.hash(req.body.password, salt)
        // console.log("SALT : ", salt)
        // console.log("HASH : ", hashPassword)

        // req.body.password = hashPassword

        const newAccount = await accounts.create(req.body)
        console.log('ACCOUNT REGISTERED : \n', newAccount);

        // const token = jwt.sign({
        //     id: newAccount.id,
        //     email: newAccount.email
        // },
        //     process.env.secretToken,
        //     { expiresIn: '1h' }
        // )

        return res.status(201).send({
            success: true,
            message: 'REGISTER SUCCESS'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

export const DeleteAccount = async (req, res, next) => {
    try {
        const account = await accounts.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!account) {
            return res.status(404).send({
                success: false,
                message: 'ACCOUNT NOT FOUND'
            })
        }

        await accounts.update({
            is_deleted: true
        }, {
            where: {
                id: req.params.id
            }
        })

        return res.status(200).send({
            success: true,
            message: 'ACCOUNT SUCCESFULLY DELETED'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send('ERROR DELETE ACCOUNT')
    }
}

export const UpdateAccount = async (req, res, next) => {
    try {
        const { username, email } = req.query;

        if (!username && !email ) {
            return res.status(400).send({
                success: false,
                message: 'NO DATA PROVIDED'
            })
        }

        const [updatedRows] = await accounts.update(
            { username, email },
            {
                where: {
                    id: req.params.id
                }
            }
        )

        if (updatedRows > 0) {
            return res.status(200).send({
                success: true,
                message: 'ACCOUNT SUCCESSFULLY UPDATED'
            })
        } else {
            return res.status(404).send({
                success: false,
                message: 'NO CHANGES MADE'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error
        })
    }
}

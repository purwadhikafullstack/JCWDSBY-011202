import { Router } from "express";
import { Register } from "../controllers/register.controller";
import { Login } from "../controllers/login.controller";
import { KeepLogin } from "../controllers/keepLogin.controller";
import { ForgotPassword } from "../controllers/forgotPassword.controller";
import { ResetPassword } from "../controllers/resetPassword.controller";
import {
    CreateAccount,
    DeleteAccount,
    GetAccounts,
    UpdateAccount
} from "../controllers/accounts.controller";

const accountsRouter = Router()

accountsRouter.post('/register', Register)
accountsRouter.post('/login', Login)
accountsRouter.post('forgot-password', ForgotPassword)
accountsRouter.post('reset-password', ResetPassword)
accountsRouter.get('/keep-login', KeepLogin)
accountsRouter.get('/', GetAccounts)
accountsRouter.post('/create-account', CreateAccount)
accountsRouter.patch('/delete-account/:id', DeleteAccount)
accountsRouter.patch('/update-account/:id', UpdateAccount)

export { accountsRouter }
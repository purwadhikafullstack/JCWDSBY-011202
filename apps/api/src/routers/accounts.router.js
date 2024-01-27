import { Router } from 'express';
import {
  Register,
  ConfirmationEmail,
} from '../controllers/register.controller';
import { Login, keepLogin } from '../controllers/login.controller';
import { KeepLogin } from '../controllers/keepLogin.controller';
import { ForgotPassword } from '../controllers/forgotPassword.controller';
import { ResetPassword } from '../controllers/resetPassword.controller';
import {
  CreateAccount,
  DeleteAccount,
  GetAccounts,
  GetAdmins,
  GetUsers,
  UpdateAccount,
} from '../controllers/accounts.controller';
import {
  ValidatePassword,
  ValidateEmail,
  validateToken,
} from '../middleware/validation';

const accountsRouter = Router();

accountsRouter.post('/register', ValidateEmail, Register);
accountsRouter.post(
  '/register/verification',
  ValidatePassword,
  validateToken,
  ConfirmationEmail,
);
accountsRouter.post('/login', Login);
accountsRouter.post('/keep-login', validateToken, keepLogin);
accountsRouter.post('/forgot-password', ForgotPassword);
accountsRouter.post('reset-password', ResetPassword);
// accountsRouter.get('/keep-login', KeepLogin);
accountsRouter.get('/', GetAccounts);
accountsRouter.get('/admins', GetAdmins);
accountsRouter.get('/users', GetUsers);
accountsRouter.post('/create-account', CreateAccount);
accountsRouter.patch('/delete-account/:id', DeleteAccount);
accountsRouter.patch('/update-account/:id', UpdateAccount);

export { accountsRouter };

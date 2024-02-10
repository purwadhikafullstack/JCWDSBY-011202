import { Router } from 'express';
import {
  Register,
  ConfirmationEmail,
} from '../controllers/register.controller';
import { Login, keepLogin } from '../controllers/login.controller';
import { ForgotPassword } from '../controllers/forgotPassword.controller';
import { ResetPassword } from '../controllers/resetPassword.controller';
import { CreateAccount, GetAccounts } from '../controllers/accounts.controller';
import {
  updateAccount,
  deleteAccount,
  authCheck,
} from '../controllers/accounts.manage';
import {
  ValidatePassword,
  ValidateEmail,
  validateToken,
  ValidateSuperAdmin,
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
accountsRouter.get('/authcheck', validateToken, authCheck);
accountsRouter.post('/forgot-password', ForgotPassword);
accountsRouter.post('reset-password', ResetPassword);
accountsRouter.get('/', GetAccounts);
accountsRouter.post(
  '/create-account',
  validateToken,
  ValidateSuperAdmin,
  ValidateEmail,
  CreateAccount,
);
accountsRouter.patch(
  '/update-account/:id',
  validateToken,
  ValidateSuperAdmin,
  updateAccount,
);
accountsRouter.delete(
  '/delete-account/:id',
  validateToken,
  ValidateSuperAdmin,
  deleteAccount,
);

export { accountsRouter };

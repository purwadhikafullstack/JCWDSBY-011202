import { Router } from 'express';
import { validateToken,ValidateUser } from '../middleware/validation';
import { deleteOrder, getOrderDetail, getUserOrder, uploadPaymentProof } from '../controllers/userOrder';
import { uploader } from '../helper/uploader';

const userOrderRouter = Router();
// GET
userOrderRouter.get('/',validateToken,ValidateUser, getUserOrder);
userOrderRouter.get('/order-detail/?',validateToken,ValidateUser, getOrderDetail);
// DELETE
userOrderRouter.patch("/delete",validateToken,ValidateUser,deleteOrder)
// EDIT
userOrderRouter.patch("/upload/payment-proof/?",uploader('/paymentProof').single('fileUpload'),
uploadPaymentProof)

export { userOrderRouter };

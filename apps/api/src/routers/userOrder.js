import { Router } from 'express';
import { validateToken,ValidateUser } from '../middleware/validation';
import { deleteOrder, getOrderDetail, getUserOrder, uploadPaymentProof } from '../controllers/userOrder';
import { uploader } from '../helper/uploader';
import { requestMutation } from '../controllers/userOrder2';

const userOrderRouter = Router();
// GET
userOrderRouter.get('/',validateToken,ValidateUser, getUserOrder);
userOrderRouter.get('/order-detail/?',validateToken,ValidateUser, getOrderDetail);
// DELETE
userOrderRouter.patch("/delete",validateToken,ValidateUser,deleteOrder)
// EDIT
userOrderRouter.patch("/upload/payment-proof/?",uploader('/paymentProof').single('fileUpload'),
uploadPaymentProof)
//POST 
userOrderRouter.post("/request-mutation/?",validateToken,ValidateUser,requestMutation)


export { userOrderRouter };

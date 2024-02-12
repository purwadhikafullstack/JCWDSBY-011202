import { Router } from 'express';
import { updateStatusArrived } from '../controllers/arrivedmutation';
import { requestMutation } from '../controllers/request.mutation';
import { getMutation } from '../controllers/warehouse_mutation_controller';
import { confirmMutation } from '../controllers/warehouse.mutation.manage.controller';
import { updateStatusProcess } from '../controllers/warehouse.mutation.status.controller';
import { finishMutation } from '../controllers/finished.mutation';
import { cancelMutation } from '../controllers/cancel.mutation';
import { deleteMutation } from '../controllers/mutation.delete.controller';
import {
  ValidatePassword,
  ValidateEmail,
  validateToken,
  ValidateSuperAdmin,
  ValidateAdmin,
} from '../middleware/validation';

const warehouse_mutationRouter = Router();

// GET
warehouse_mutationRouter.get('/', getMutation);
//POST
warehouse_mutationRouter.post(
  '/',
  validateToken,
  ValidateAdmin,
  requestMutation,
);
//PATCH
warehouse_mutationRouter.patch(
  '/confirm/:id',
  validateToken,
  ValidateAdmin,
  confirmMutation,
);
warehouse_mutationRouter.patch(
  '/process/:id',
  validateToken,
  ValidateAdmin,
  updateStatusProcess,
);
warehouse_mutationRouter.patch(
  '/arrival/:id',
  validateToken,
  ValidateAdmin,
  updateStatusArrived,
);
warehouse_mutationRouter.patch(
  '/finish/:id',
  validateToken,
  ValidateAdmin,
  finishMutation,
);
warehouse_mutationRouter.patch(
  '/cancel/:id',
  validateToken,
  ValidateAdmin,
  cancelMutation,
);
//DELETE
warehouse_mutationRouter.patch(
  '/delete/:id',
  validateToken,
  ValidateAdmin,
  deleteMutation,
);

export { warehouse_mutationRouter };

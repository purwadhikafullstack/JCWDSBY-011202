import { Router } from 'express';
import {
  getMutation,
  requestMutation,
} from '../controllers/warehouse_mutation_controller';
import { confirmMutation } from '../controllers/warehouse.mutation.manage.controller';
import {
  updateStatusProcess,
  updateStatusArrived,
} from '../controllers/warehouse.mutation.status.controller';
import { finishMutation } from '../controllers/finished.mutation';
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
//DELETE

export { warehouse_mutationRouter };

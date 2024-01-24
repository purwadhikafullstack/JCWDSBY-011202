import { Router } from 'express';
import { getMutation } from '../controllers/warehouse_mutation_controller';

const warehouse_mutationRouter = Router();

// GET
warehouse_mutationRouter.get('/', getMutation);
//POST

//PATCH

//DELETE

export { warehouse_mutationRouter };

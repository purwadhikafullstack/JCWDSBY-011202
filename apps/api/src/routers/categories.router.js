import { Router } from 'express';
import {
  createData,
  getData,
  deleteData,
  updateData,
} from '../controllers/categories.controller';

const categoriesRouter = Router();

// GET
categoriesRouter.get('/?', getData);

// POST
categoriesRouter.post('/', createData);

// DELETE
categoriesRouter.delete('/:id', deleteData);

// UPDATE
categoriesRouter.patch('/:id', updateData);

export { categoriesRouter };

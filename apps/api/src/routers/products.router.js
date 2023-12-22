import { Router } from 'express';
import {
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/products.controller';
import {
  addImageToProduct,
  editImage,
} from '../controllers/products.image.controller';
import { uploader } from '../helper/uploader';

const productsRouter = Router();

// GET
productsRouter.get('/?', getProduct);
// POST
productsRouter.post(
  '/',
  uploader('/productimage').array('filesUpload'),
  createProduct,
);
productsRouter.post(
  '/add-image/:id',
  uploader('/productimage').array('filesUpload'),
  addImageToProduct,
);
// DELETE
productsRouter.delete('/:id', deleteProduct);
// UPDATE
productsRouter.patch('/:id', updateProduct);

export { productsRouter };

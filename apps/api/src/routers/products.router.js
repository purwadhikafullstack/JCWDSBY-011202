import { Router } from 'express';
import { getProduct, createProduct } from '../controllers/products.controller';
import {
  deleteProduct,
  updateProduct,
} from '../controllers/products.modify.controller';
import {
  addImageToProduct,
  editImage,
  deleteImage,
  GetImages,
} from '../controllers/products.image.controller';
import { ProductDiscovering } from '../controllers/products.discovering';
import { uploader } from '../helper/uploader';

const productsRouter = Router();

// GET
productsRouter.get('/?', getProduct);
productsRouter.get('/productimage/:name', GetImages);
productsRouter.get('/discovering/:id/:productId', ProductDiscovering);
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

productsRouter.delete('/delete-image/:id', deleteImage);
// UPDATE
productsRouter.patch('/:id', updateProduct);
productsRouter.patch(
  '/edit-image/:id',
  uploader('/productimage').single('fileUpload'),
  editImage,
);

export { productsRouter };

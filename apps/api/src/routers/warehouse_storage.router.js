import { Router } from 'express';
import { getStorage } from '../controllers/warehouse_storage_controller';
const warehouse_storageRouter = Router();

//GET
warehouse_storageRouter.get('/', getStorage);
//POST

//PATCH

//DELETE

export { warehouse_storageRouter };

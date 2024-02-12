import { Router } from 'express';
import { addStorage } from '../controllers/add.storage';
import {
  getStorage,
  deleteWarehouseStorage,
} from '../controllers/warehouse_storage_controller';
import { editStock } from '../controllers/warehouse.storage.manage.controller';
const warehouse_storageRouter = Router();

//GET
warehouse_storageRouter.get('/', getStorage);
//POST
warehouse_storageRouter.post('/', addStorage);
//PATCH
warehouse_storageRouter.patch('/:id', editStock);
//DELETE
warehouse_storageRouter.delete('/:id', deleteWarehouseStorage);
export { warehouse_storageRouter };

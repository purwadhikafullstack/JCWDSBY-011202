import { Router } from 'express';
import { validateToken,ValidateUser } from '../middleware/validation';
import { createNewAddress, deleteAddress, deleteMainAddress, editAddress, getCitiesRama, getUserMainAddress } from '../controllers/userSetting';
const userSetting = Router();
userSetting.get("/main-address",validateToken,ValidateUser,getUserMainAddress)
userSetting.get("/getCity/:prov_id",getCitiesRama)

// POST
userSetting.post("/add-address",validateToken,ValidateUser,createNewAddress)
//EDIT
userSetting.patch("/edit-address",validateToken,ValidateUser,editAddress)

//DELETE
userSetting.delete("/delete-address/:id",validateToken,ValidateUser,deleteAddress)
userSetting.delete("/delete-main-address?",validateToken,ValidateUser,deleteMainAddress)

export { userSetting };

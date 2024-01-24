import { Router } from 'express';
import {
  getCities,
  getProvinces,
} from '../controllers/province.and.cities.controller';
const provinces_and_cities_Router = Router();

// GET
provinces_and_cities_Router.get('/cities?', getCities);
provinces_and_cities_Router.get('/provinces', getProvinces);
//POST

//PATCH

//DELETE

export { provinces_and_cities_Router };

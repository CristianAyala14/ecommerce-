import { productsService } from "./services/productsService.js";
import { categoriesService } from "./services/categoriesService.js";
export const productsDao = new productsService();
export const categoriesDao= new categoriesService();
  
import { productsDao } from "../database/dao_exports.js";

class productsController {
  static getAllProducts = async (req, res) => {
    try {
      const products = await productsDao.getAllProducts(req.query);
      res.send({
        status: "success",
        payload: products,
        message: `Productos obtenidos correctamente`
      });
    } catch (error) {
      console.error("Error en getAllProducts:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  };

  static getProductById = async (req, res) => {
    try {
      const product = await productsDao.getProductById(req.params.id);
      res.send({ status: "success", payload: product });
    } catch (error) {
      res.status(404).send({ status: "error", message: error.message });
    }
  };

  static createProduct = async (req, res) => {
    try {
      const newProduct = await productsDao.createProduct(req.body);
      res.status(201).send({ status: "success", payload: newProduct });
    } catch (error) {
      res.status(400).send({ status: "error", message: error.message });
    }
  };

  static updateProduct = async (req, res) => {
    try {
      const updatedProduct = await productsDao.updateProduct(req.params.id, req.body);
      res.send({ status: "success", payload: updatedProduct });
    } catch (error) {
      res.status(400).send({ status: "error", message: error.message });
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await productsDao.deleteProduct(req.params.id);
      res.send({ status: "success", payload: deletedProduct });
    } catch (error) {
      res.status(404).send({ status: "error", message: error.message });
    }
  };
}

export { productsController };

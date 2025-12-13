import { categoriesDao } from "../database/dao_exports.js";

class categoriesController {

  static createCategory = async (req, res) => {
    try {
      const category = await categoriesDao.createCategory(req.body);
      res.status(201).send({ status: "success", payload: category });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  }

  static getAllCategories = async (req, res) => {
    try {
      const categories = await categoriesDao.getAllCategories();
      res.send({ status: "success", payload: categories });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  }

  static getCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await categoriesDao.getCategoryById(id);
      if (!category) return res.status(404).send({ status: "error", message: "Categoría no encontrada" });
      res.send({ status: "success", payload: category });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  }

  static updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCategory = await categoriesDao.updateCategory(id, req.body);
      if (!updatedCategory) return res.status(404).send({ status: "error", message: "Categoría no encontrada para actualizar" });
      res.send({ status: "success", payload: updatedCategory });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  }

  static deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      await categoriesDao.deleteCategory(id);
      res.send({ status: "success", message: "Categoría eliminada" });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  }
}

export { categoriesController };

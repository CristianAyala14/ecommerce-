import categoriesModel from "../models/categoriesModel.js";

class categoriesService {
  
  // Crear categoría
  createCategory = async (newCategory) => {
    const created = await categoriesModel.create(newCategory);
    return created;
  }

  // Obtener todas las categorías
  getAllCategories = async () => {
    const categories = await categoriesModel.find();
    return categories;
  }

  // Obtener categoría por ID
  getCategoryById = async (id) => {
    const category = await categoriesModel.findById(id);
    return category;
  }

  // Actualizar categoría
  updateCategory = async (id, updateData) => {
    const updated = await categoriesModel.findByIdAndUpdate(id, updateData, { new: true });
    return updated;
  }

  // Eliminar categoría
  deleteCategory = async (id) => {
    const deleted = await categoriesModel.findByIdAndDelete(id);
    return deleted;
  }
}

export { categoriesService };

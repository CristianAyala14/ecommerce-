import mongoose from "mongoose";
import productsModel from "../models/productsModel.js";
import categoriesModel from "../models/categoriesModel.js";

class productsService {

  // Crear un nuevo producto
  createProduct = async (newProduct) => {
    const created = await productsModel.create(newProduct);
    return created;
  };

  // Obtener un producto por ID
  getProductById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("ID de producto inválido");
    const product = await productsModel.findById(id).populate("category");
    if (!product) throw new Error("Producto no encontrado");
    return product;
  };

  // Actualizar un producto
  updateProduct = async (id, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("ID de producto inválido");
    const updated = await productsModel.findByIdAndUpdate(id, updateData, { new: true }).populate("category");
    if (!updated) throw new Error("Producto no encontrado para actualizar");
    return updated;
  };

  // Eliminar un producto
  deleteProduct = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("ID de producto inválido");
    const deleted = await productsModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("Producto no encontrado para eliminar");
    return deleted;
  };

  // Obtener productos con filtros, paginación, sort y populate de categoría
  getAllProducts = async (query = {}) => {
    let { page = 1, limit = 10, sort = "createdAt", order = "desc", category } = query;

    page = parseInt(page);
    limit = parseInt(limit);
    const sortOrder = order === "asc" ? 1 : -1;

    let filter = {};

    // Si viene category como nombre, convertir a _id
    if (category && category.toLowerCase() !== "all") {
      const catDoc = await categoriesModel.findOne({ name: category });
      if (catDoc) filter.category = catDoc._id;
    }

    const options = {
      page,
      limit,
      sort: { [sort]: sortOrder },
      lean: true,
      populate: "category"
    };

    const products = await productsModel.paginate(filter, options);
    return products;
  };
}

export { productsService };

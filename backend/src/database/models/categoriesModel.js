// models/Category.js
import mongoose from "mongoose";
const collection = "categories";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Cada categoría debe ser única
  },
  description: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const categoriesModel = mongoose.model(collection, categorySchema);

export default categoriesModel;

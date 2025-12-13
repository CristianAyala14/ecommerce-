// models/Product.js
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const collection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Category
    ref: "categories",
    required: true
  },
  images: {
    type: [String], // Array de URLs de imágenes
    required: true,
    validate: [arr => arr.length > 0, "Debe haber al menos una imagen"]
  },
  banner: {
    type: String,
    required: true
  },
  new_price: {
    type: Number,
    required: true
  },
  old_price: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
productSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model(collection, productSchema);

export default productsModel;

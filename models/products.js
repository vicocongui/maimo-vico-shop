import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String}
})

export default mongoose.model("Product", productSchema, "Products")
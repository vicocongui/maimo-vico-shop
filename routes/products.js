import express from 'express';
const router = express.Router();
import Product from '../models/products.js'


const findAllProducts = async (req, res) => {

try{
    const products = await Product.find().select("_id name");
    res.status(200).send({ message: 'All products', products });
}catch (error){
    res.status(501).send({ message: 'Error', error });
}};

const findOneProduct = async (req, res) => {
    const { id } = req.params;//params está deltro del objeto req
try{
    const product = await Product.findOne({_id : id}).select("_id name");
    res.status(200).send({ message: 'Product info', product });
}catch(error){
    res.status(501).send({ message: 'Error', error });
}};

const addProduct = async(req, res) => {
try{
    const { name } = req.body;
    const product = new Product({name});
    await product.save();
  //Agregar magia para crear el producto en la base de datos!!
  res.status(200).send({ message: `Product Created ${name}`, product });

} catch(error){
    res.status(501).send({ message: 'Error', error });
}};


const updateProduct = async (req, res) => {
  
  try {
    const { id } = req.params;
    const { name } = req.body;
    const productToUpdate= await Product.findOne({ _id: id });
    if (!productToUpdate) {
      res.status(501).send({ message: "Error Product Not Found" });
    }
    
    productToUpdate.name = name

    await productToUpdate.save();

    return res.status(200).send({ message: 'Product Updated' });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};


const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const productToDelete = await Product.findOne({ _id: id });
      if (!productToDelete) {
        res.status(501).send({ message: "Error Product Not Found" });
      }
      await Product.deleteOne({ _id: id });
      return res.status(200).send({ message: "Product deleted", product: productToDelete });
    } catch (error) {
      return res.status(501).send({ message: "Error", error });
    }
  };

//CRUD (Create, Read, Update, Delete)
router.get('/', findAllProducts);
router.get('/:id', findOneProduct);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
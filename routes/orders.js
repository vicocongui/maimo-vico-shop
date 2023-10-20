import express from 'express';
const router = express.Router();
import Order from '../models/orders.js'


const findAllOrders = async (req, res) => {

try{
    const order = await Order.find().select("_id name products status clientId");
    res.status(200).send({ message: 'All products', order });
}catch (error){
    res.status(501).send({ message: 'Error', error });
}};

const findOneOrders = async (req, res) => {
    const { id } = req.params;//params está deltro del objeto req
try{
    const order = await Order.findOne({_id : id}).select("_id name products status clientId");
    res.status(200).send({ message: 'Product info', order });
}catch(error){
    res.status(501).send({ message: 'Error', error });
}};

const addOrder = async (req, res) => {
    try {
      const { name, products, clientId, status } = req.body;
      console.log(products)
      const order = new Order({ name, products, clientId, status });
      await order.save();
      return res
        .status(200)
        .send({ message: `order Created ${name}`, order });
    } catch (error) {
      return res.status(501).send({ message: 'Error', error });
    }
  };


  const updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, products, clientId, status } = req.body;
  
      const orderToUpdate = await Order.findOne({ _id: id });
  
      if (!orderToUpdate) {
        return res.status(501).send({ message: 'Error order not found' });
      }
  
      if(name) orderToUpdate.name = name; 
      if(products) orderToUpdate.products = products;
      if(clientId) orderToUpdate.clientId = clientId;
      if(status) orderToUpdate.status = status;
      await orderToUpdate.save();
  
      return res
        .status(200)
        .send({ message: 'order Updated', order: orderToUpdate });
    } catch (error) {
      return res.status(501).send({ message: 'Error', error });
    }
  };


const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const orderToDelete = await Order.findOne({ _id: id });
      if (!orderToDelete) {
        res.status(501).send({ message: "Error Product Not Found" });
      }
      await Order.deleteOne({ _id: id });
      return res.status(200).send({ message: "Product deleted", order: orderToDelete });
    } catch (error) {
      return res.status(501).send({ message: "Error", error });
    }
  };

//CRUD (Create, Read, Update, Delete)
router.get('/', findAllOrders);
router.get('/:id', findOneOrders);
router.post('/', addOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
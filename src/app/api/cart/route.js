import { connectToDb } from "@/lib/utils";
import Cart from '@/lib/models'; // Your Cart model
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
    await connectToDb();
  
    const token = await getToken({ req });
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const userId = token.sub;
  
    switch (req.method) {
      case 'GET':
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
        break;
  
      case 'POST':
        const { productId, quantity } = req.body;
        const cartForPost = await Cart.findOne({ user: userId }) || new Cart({ user: userId, items: [] });
        const existingItemIndex = cartForPost.items.findIndex(item => item.productId === productId);
        if (existingItemIndex > -1) {
          cartForPost.items[existingItemIndex].quantity += quantity; // Update quantity if item exists
        } else {
          cartForPost.items.push({ productId, quantity }); // Add new item if it doesn't exist
        }
        await cartForPost.save();
        res.status(201).json(cartForPost);
        break;
  
      case 'PUT':
        const { itemId, newQuantity } = req.body;
        const cartForPut = await Cart.findOne({ user: userId });
        if (!cartForPut) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        const itemIndex = cartForPut.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex > -1) {
          cartForPut.items[itemIndex].quantity = newQuantity; // Update item quantity
        } else {
          return res.status(404).json({ message: 'Item not found' });
        }
        await cartForPut.save();
        res.status(200).json(cartForPut);
        break;
  
      case 'DELETE':
        const { itemIdToRemove } = req.query;
        const cartForDelete = await Cart.findOne({ user: userId });
        if (!cartForDelete) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        cartForDelete.items = cartForDelete.items.filter(item => item._id.toString() !== itemIdToRemove);
        await cartForDelete.save();
        res.status(200).json(cartForDelete);
        break;
  
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
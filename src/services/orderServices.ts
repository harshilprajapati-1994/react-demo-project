import axios from 'axios';
import type { CartItem } from '../types/Product';

export const placeOrder = async (order: { email: string; items: CartItem[] }) => {
  return axios.post('/api/orders', order);
};

export const getOrders = async (email: string) => {
  const res = await axios.get(`/api/orders/${email}`);
  return res.data;
};

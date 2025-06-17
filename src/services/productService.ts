import axios from 'axios';
import type { Product } from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>('https://fakestoreapi.com/products');
  console.log(res.data)
  return res.data;
};

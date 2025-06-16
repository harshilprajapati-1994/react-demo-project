import axios from "axios";
import type { Product } from '../types/Product'

export const fetchProducts = async ():Promise<Product[]> => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data
}

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return res.data;
};
import axios from 'axios';
import type { Product } from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>('/api/products');
  return res.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axios.get<Product>(`/api/products/${id}`);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await axios.delete(`/api/products/${id}`);
  return res.data;
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  const res = await axios.post('/api/products', product);
  return res.data;
};

export const updateProduct = async (product: Product) => {
  const res = await axios.put(`/api/products/${product.id}`, product);
  return res.data;
};

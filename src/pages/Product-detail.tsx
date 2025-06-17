import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product } from '../types/Product';

const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
  return res.data;
};

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
  });

  if (isLoading) return <p>Loading product...</p>;
  if (error || !product) return <p>Product not found</p>;

  return (
    <div className="container product-detail">
      <h2>{product.title}</h2>
      <img src={product.image} />
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
    </div>
  );
};

export default ProductDetail;

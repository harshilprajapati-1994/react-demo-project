import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../services/productService';
import type { Product } from '../types/Product';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
  });

  const { dispatch } = useCart();

  if (isLoading) return <p>Loading...</p>;
  if (error || !product) return <p>Product not found</p>;

  return (
    <div className="container">
      <h2>{product.title}</h2>
      <img src={product.image} width="200" />
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;

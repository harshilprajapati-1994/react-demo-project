import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/Product';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
  });

  const { dispatch } = useCart();

  if (isLoading) return <p>Loading product...</p>;
  if (error || !product) return <p>Product not found.</p>;

  return (
    <div className="container">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="200" />
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ₹{product.price}</p>
      <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;

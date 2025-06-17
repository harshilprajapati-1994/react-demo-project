import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productService';
import type { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { dispatch } = useCart();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="container">
      <div className='product-grid'>
        {data?.map(product => (
          <div className='product-card' key={product.id}>
            <img src={product.image} width="100" />
            <h3><Link to={`/product/${product.id}`}>{product.title}</Link></h3>
            <p>₹{product.price}</p>
            <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

import { useQuery } from '@tanstack/react-query';
import type { Product, } from '../types/Product';
import { fetchProducts } from '../services/productService';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';


const Home = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const {dispatch} = useCart()

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className='container'>
      <div className="product-grid">
        {data?.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
            </Link>
            <p>${product.price}</p>
            <button onClick={() => dispatch({type: 'ADD_TO_CART', payload: product})}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

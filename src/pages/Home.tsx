import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productService';
import type { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const [search, setSearch] = useState('');

  const filteredProducts = data?.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))

  const { dispatch } = useCart();

  if (isLoading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p>Error loading products</p></div>;


  return (
    <div className="container">
      <div className='searchbar'>
        <input type='text' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className='product-grid'>
        {filteredProducts?.length === 0 && <p>No products found.</p>}
        {filteredProducts?.map(product => (
          <div className='product-card' key={product.id}>
            <img src={product.image} width="100" />
            <h3><Link to={`/product/${product.id}`}>{product.title}</Link></h3>
            <p>₹{product.price}</p>
            <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  
};

export default Home;

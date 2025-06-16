import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './common/Header';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Routes>
          
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;

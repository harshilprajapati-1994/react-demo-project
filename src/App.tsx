import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import Cart from './pages/Cart';
import ProductDetail from './pages/Product-detail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
};

export default App;

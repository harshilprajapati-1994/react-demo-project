import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/Product-detail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import './App.css'
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    
    <Route path="/success" element={<Success />} />
    <Route path="/login" element={<Login />} />
    
    <Route path="/checkout" element={
      <ProtectedRoute >
        <Checkout />
      </ProtectedRoute>
    } />
  </Routes>
);

export default App;
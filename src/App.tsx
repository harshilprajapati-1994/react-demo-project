import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/Product-detail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import './App.css'
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import MyOrders from './pages/MyOrders';
import AdminProducts from "./pages/AdminProducts";
import AddProduct from './pages/AddProduct';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductList from './pages/AdminProductList';
import EditProduct from './pages/EditProduct';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    
    <Route path="/success" element={<Success />} />
    <Route path="/login" element={<Login />} />

    <Route path="/admin/edit/:id" element={<EditProduct />} />

    
    <Route path="/admin/products" element={
      <ProtectedAdminRoute>
        <AdminProducts />
      </ProtectedAdminRoute>
      } />
    <Route path="/admin/add" element={
      <ProtectedAdminRoute>
      <AddProduct />
      </ProtectedAdminRoute>
    } />

    <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
    <Route path="/admin/products" element={
      <ProtectedAdminRoute>
        <AdminProductList />
      </ProtectedAdminRoute>} 
    />


    
    <Route path="/orders" element={
      <ProtectedRoute >
        <MyOrders />
      </ProtectedRoute>  
     } />
    
    <Route path="/checkout" element={
      <ProtectedRoute >
        <Checkout />
      </ProtectedRoute>
    } />
  </Routes>
);

export default App;
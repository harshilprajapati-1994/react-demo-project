// src/pages/AdminDashboard.tsx
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/products">Manage Products</Link></li>
        <li><Link to="/admin/orders">Manage Orders</Link></li>
        <li><Link to="/admin/users">Manage Users</Link></li> {/* Optional */}
      </ul>
    </div>
  );
};

export default AdminDashboard;

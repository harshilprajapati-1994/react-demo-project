import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";



const Header = () => {
    const { state, authdispatch } = useAuth();
    return (
        <nav>
            <div className="container">
                <a href="">
                    Logo
                </a>
                <ul className="menu"> 
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart </Link>
                    </li>
                    {state.isAuthenticated && state.user?.isAdmin && (
                    <li>
                        <Link to="/admin/products">Admin</Link>
                    </li>
                    )}
                    {state.isAuthenticated && (
                        <li>
                            <Link to="/orders">My Orders</Link>
                        </li>
                    
                    )}
                    {state.isAuthenticated && state.user?.isAdmin && (
                    <Link to="/admin/add">Add Product</Link>
                    )}
                </ul>
                {state.isAuthenticated ? (
                    <div className="user-info">
                        <span>Hello, {state.user?.name}</span>
                        <button onClick={() => authdispatch({ type: "LOGOUT" })}>Logout</button>
                    </div>
                ) : (
                    <a href="/login">Login</a>
                )}
            </div>
        </nav>
    )
}

export default Header
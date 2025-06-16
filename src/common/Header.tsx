import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="container">
            <div className="header">
                <a href="">
                    Logo
                </a>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header
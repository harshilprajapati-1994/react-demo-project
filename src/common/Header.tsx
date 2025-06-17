import { Link } from "react-router-dom"

const Header = () => {
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
                        <Link to="/cart">Cart</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
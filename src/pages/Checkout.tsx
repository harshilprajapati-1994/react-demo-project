import { useMutation } from "@tanstack/react-query";
import { useCart } from "../context/CartContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { state, dispatch} = useCart();

    const totalAmount = state.cartItems.reduce((acc, item) => {
        return acc + item.quantity * item.price
    },0);

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (cartData: any) =>
            axios.post("https://jsonplaceholder.typicode.com/posts", cartData),
        onSuccess: () => {
            dispatch({ type: "CLEAR_CART" });
            localStorage.removeItem("cart");
            navigate("/success");
        },
    });

    const handlePlaceOrder = () => {
        mutation.mutate({ cart: state.cartItems, total: totalAmount });
    }

    return (
        <div className="container">
            <h2>Checkout</h2>
            <p>Total Items: {state.cartItems.length}</p>
            <p>Total Amount: ₹{totalAmount}</p>
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    )
}

export default Checkout
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "../services/orderServices";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../types/Product";

const Checkout = () => {
  const { state, dispatch } = useCart();
  const { state: authState } = useAuth();
  const navigate = useNavigate();

  
const mutation = useMutation({
  mutationFn: (orderData: { email: string; items: CartItem[] }) =>
    placeOrder(orderData),
  onSuccess: () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cart");
    navigate("/orders");
  },
});

  const handlePlaceOrder = () => {
    if (!authState.user) {
      alert("You need to be logged in to place an order.");
      return;
    }

    mutation.mutate({
      email: authState.user.email,
      items: state.cartItems,
    });
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <p>Total Items: {state.cartItems.length}</p>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;

import { useCart } from '../context/CartContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define cart item
type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

const Checkout = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const mutation = useMutation<void, Error, CartItem[]>({
    mutationFn: async (cartData) => {
      await axios.post('https://jsonplaceholder.typicode.com/posts', cartData);
    },
    onSuccess: () => {
      dispatch({ type: 'CLEAR_CART' });
      localStorage.removeItem('cart');
      navigate('/success');
    },
  });

  return (
    <div className="container">
      <h2>Checkout</h2>
      <p>₹{state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
      <button onClick={() => mutation.mutate(state.cartItems)}>Place Order</button>
    </div>
  );
};

export default Checkout;

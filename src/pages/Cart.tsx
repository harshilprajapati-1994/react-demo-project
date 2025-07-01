import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { state, dispatch } = useCart();

  if (state.cartItems.length === 0) return <div className="container"><p>No items in cart</p></div>;

  return (
    <div className="container">
      <table className='cart-table'>
        <thead>
          <tr>
            <th>Product</th><th>Qty</th><th>Price</th><th>Total</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.cartItems.map(item => (
            <tr key={item.id}>
              <td>
                <div className='cart-item-detail'>
                    <img src={item.image} />
                    {item.title}
                </div>
              </td>
              <td>
                {item.quantity}
                <button onClick={() => dispatch({ type: 'QuantityIncrease', payload: item.id })}>+</button>
                <button onClick={() => dispatch({ type: 'QuantityDecrease', payload: item.id })}>-</button>
              </td>
              <td>₹{item.price}</td>
              <td>₹{item.quantity * item.price}</td>
              <td><button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}>Delete</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan={3}>Total</td>
                <td>₹{state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</td>
                <td></td>
            </tr>
        </tfoot>
      </table>
      <div className='checkout-btn'>
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;

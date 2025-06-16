import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { state, dispatch } = useCart();

  if (state.cartItems.length === 0) {
    return <p>No items in your cart</p>;
  }

  return (
    <div className="container">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} width="50" />
                <Link to={`/product/${item.id}`}>
                  <div>{item.title}</div>
                </Link>
              </td>
              <td>
                {item.quantity}
                <button onClick={() => dispatch({ type: 'QuantityIncrease', payload: item.id })}>+</button>
                <button onClick={() => dispatch({ type: 'QuantityDecrease', payload: item.id })}>-</button>
              </td>
              <td>₹{item.price}</td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Total Amount:</th>
            <td>₹{state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div className='go-to-checkout'>
          <Link to="/checkout">
              Checkout
          </Link>
      </div>
    </div>
  );
};

export default Cart;

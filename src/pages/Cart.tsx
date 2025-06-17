import { useCart } from "../context/CartContext";


const Cart = () => {
    const {state, dispatch} = useCart();

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
                    {state.cartItems.map((item) => {
                        console.log(item)
                        return <tr key={item.id}>
                            <td width="400">
                                <div className="cart-product">
                                    <img src={item.image} />
                                    <div className="cart-product-info">
                                        <label>{item.title}</label>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.quantity}
                                <div className="quantity_update">
                                    <button onClick={() => dispatch({type: 'QuantityIncrease', payload: item.id})}>+</button>
                                    <button onClick={() => dispatch({type: 'QuantityDecrease', payload: item.id})}>-</button>
                                </div>
                            </td>
                            <td>
                                {item.price}
                            </td>
                            <td>
                                {item.quantity * item.price}
                            </td>
                            <td>
                                <button onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: item.id})}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>
                            Total
                        </td>
                        <td>{state.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Cart
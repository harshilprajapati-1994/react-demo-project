import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { CartItem, Product } from '../types/Product';

type CartState = {
  cartItems: CartItem[];
};

const initialState: CartState = {
  cartItems: [],
};

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'QuantityIncrease'; payload: number }
  | { type: 'QuantityDecrease'; payload: number }
  | { type: 'CLEAR_CART';};
  

const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cartItems.find(item => item.id === action.payload.id);
      if (exists) {
        return {
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    }
    case 'QuantityIncrease': {
      return {
        cartItems: state.cartItems.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    case 'QuantityDecrease': {
      return {
        cartItems: state.cartItems.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
    return { cartItems: [] };
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const local = localStorage.getItem('cart');
    return local ? JSON.parse(local) : initial;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  },[state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
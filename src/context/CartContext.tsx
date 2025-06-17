import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type {CartItem, Product} from '../types/Product';


type CartState = {
    cartItems: CartItem[]
}

const initialState:CartState = {
    cartItems: []
}

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'QuantityIncrease'; payload: number}
  | { type: 'QuantityDecrease'; payload: number}

const reducer = (state: CartState, action: Action): CartState => {
    switch(action.type){
        case 'ADD_TO_CART' : {
            const existingitems = state.cartItems.find((items) => items.id == action.payload.id)
            if(existingitems) {
                return {
                    cartItems: state.cartItems.map((item) => item.id === action.payload.id ? {...item, quantity: item.quantity + 1} : item)
                }
            }
            return {
                cartItems: [...state.cartItems, {...action.payload, quantity: 1}]
            }
        }
        case 'REMOVE_FROM_CART': {
            return {
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            };
        }
        case 'QuantityIncrease': {
            return {
               cartItems: state.cartItems.map((items) => items.id === action.payload ? {...items, quantity: items.quantity + 1} : items)
            }
        }
        case 'QuantityDecrease': {
            return {
               cartItems: state.cartItems.map((items) => {
                    if(items.id === action.payload ) {
                        if(items.quantity > 1) {
                            return {...items, quantity: items.quantity - 1}
                        }
                    } 

                    return items
                })
               
            }
        }
        default:
      return state;
    }
}

const CartContext = createContext<{state: CartState, dispatch: React.Dispatch<Action>}>({state: initialState, dispatch: () => null});


export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const getitems = localStorage.getItem("cartdata");
        return  getitems ? JSON.parse(getitems) : initial
    });

    useEffect(() => {
        localStorage.setItem('cartdata', JSON.stringify(state))
    }, [state])

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => {
    const getCart = useContext(CartContext);
    if(!getCart) {
        throw new Error('There is no cart Items')
    }

    return getCart
}
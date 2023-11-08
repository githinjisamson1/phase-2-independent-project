import React, { useContext, useReducer } from "react";

// ShoppingCartContext
const ShoppingCartContext = React.createContext();

// ShoppingCartProvider
export const ShoppingCartProvider = ({ children }) => {
  // initialShoppingCartState
  const initialShoppingCartState = {
    shoppingCart: [],
    shoppingCartCount: 0,
    totalPrice: 0,
  };

  // shoppingCartReducer;
  const shoppingCartReducer = (state, action) => {
    // !handleAddToCart
    const handleAddToCart = (state) => {
      return [...state.shoppingCart, action.payload];
    };

    // !handleDeleteFromCart
    const handleDeleteFromCart = (state) => {
      return state.shoppingCart.filter((cartItem) => {
        return cartItem.id !== action.payload.id;
      });
    };

    // !updating shoppingCartCount based on previousState/INCREASE
    const handleIncreasingCartCount = (prevState) => {
      return prevState.shoppingCartCount + 1;
    };

    // !updating shoppingCartCount based on previousState/DECREASE
    const handleDecreasingCartCount = (prevState) => {
      return prevState.shoppingCartCount - 1;
    };

    // !OR use immmediately invoked function
    // (function (prevState) {
    //   return prevState.shoppingCartCount + 1;
    // })(state);

    switch (action.type) {
      case "ADD_TO_CART":
        return {
          ...state,
          shoppingCart: handleAddToCart(state),
          shoppingCartCount: handleIncreasingCartCount(state),
          totalPrice: handleAddToCart(state).reduce((accumulator, cartItem) => {
            return (accumulator += cartItem.price);
          }, initialShoppingCartState.totalPrice),
        };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          shoppingCart: handleDeleteFromCart(state),
          shoppingCartCount: handleDecreasingCartCount(state),
          totalPrice: handleDeleteFromCart(state).reduce(
            (accumulator, cartItem) => {
              return (accumulator += cartItem.price);
            },
            initialShoppingCartState.totalPrice
          ),
        };
      default:
        return state;
    }
  };

  // useReducer
  const [shoppingCartState, dispatchForShoppingCart] = useReducer(
    shoppingCartReducer,
    initialShoppingCartState
  );

  // context API
  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCartState, dispatchForShoppingCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

// useGlobalShoppingCartContext will be accessed globally
export const useGlobalShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

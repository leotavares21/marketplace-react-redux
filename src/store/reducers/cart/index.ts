import { Reducer } from "redux";
import { CartState, CartTypes } from "../../types";

const initial_state: CartState = {
  open: false,
  items: [],
  cartValue: ""
};

const cartReducer: Reducer<CartState> = (state = initial_state, action) => {
  switch (action.type) {
    case CartTypes.OPEN_CART: {
      return { ...state, open: action.payload.open };
    }
    case CartTypes.ADD_CART_ITEM: {
      const hasItem = state.items.filter(
        (item) => item.id === action.payload.id
      );

      if (hasItem.length !== 0) {
        alert("O item já está no carrinho");
        return { ...state };
      } else {
        return {
          ...state,
          items: [action.payload.item, ...state.items],
        };
      }
    }
    case CartTypes.REMOVE_CART_ITEM: {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const newItem = [...state.items];

      newItem[index].quantity = 1;

      return {
        ...state,
        items: newItem.filter((item) => item.id !== action.payload.id),
      };
    }
    case CartTypes.ADD_CART_QUANTITY: {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const newItem = [...state.items];

      newItem[index].quantity = Number(action.payload.quantity);

      return { ...state, items: newItem };
    }
    case CartTypes.SET_CART_VALUE: {
      return {...state, cartValue: action.payload.value }
    }
    default:
      return state;
  }
};

export default cartReducer;

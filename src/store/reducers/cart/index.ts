import { Reducer } from "redux";
import { CartState, CartTypes } from "../../types";

const initial_state: CartState = {
  open: false,
  items: [],
  cartValue: "",
};

const cartReducer: Reducer<CartState> = (state = initial_state, action) => {
  switch (action.type) {
    case CartTypes.OPEN_CART: {
      return { ...state, open: action.payload.open };
    }
    case CartTypes.ADD_CART_ITEM: {
      return {
        ...state,
        items: [action.payload.item, ...state.items],
      };
    }
    case CartTypes.REMOVE_CART_ITEM: {
      return {
        ...state,
        items: action.payload.newItem,
      };
    }
    case CartTypes.ADD_CART_QUANTITY: {
      return { ...state, items: action.payload.newItem };
    }
    case CartTypes.SET_CART_VALUE: {
      return { ...state, cartValue: action.payload.value };
    }
    default:
      return state;
  }
};

export default cartReducer;

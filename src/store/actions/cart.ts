import { action } from "typesafe-actions";
import { CartTypes, Dishes } from "../types";
import { store } from "../../store";
import { Dispatch } from "redux";

export function handleOpenCart(open: boolean) {
  return action(CartTypes.OPEN_CART, { open });
}

export function handleAddCartItem(item: Dishes, id?: string) {
  const state = store.getState();
  const hasItem = state.cart.items.filter((item) => item.id === id);

  return (dispatch: Dispatch) => {
    if (hasItem.length !== 0) {
      alert("O item já está no carrinho");
      return;
    } else {
      return dispatch(action(CartTypes.ADD_CART_ITEM, { item }));
    }
  };
}

export function handleRemoveCartItem(id: string) {
  const state = store.getState();
  const index = state.cart.items.findIndex((item) => item.id === id);

  const items = [...state.cart.items];

  items[index].quantity = 1;

  const newItem = items.filter((item) => item.id !== id);

  return (dispatch: Dispatch) => {
    return dispatch(
      action(CartTypes.REMOVE_CART_ITEM, {
        newItem,
      })
    );
  };
}

export function handleCartQuantity(id: string, quantity: string) {
  const state = store.getState();
  const index = state.cart.items.findIndex((item) => item.id === id);

  let quantityToNumber = Number(quantity);

  function checkQuantity() {
    if (quantityToNumber < 1) {
      alert("A quantidade mínima deve ser 1");
      quantityToNumber = 1;
    }

    if (quantityToNumber > 20) {
      alert("A quantidade máxima deve ser 20");
      quantityToNumber = 20;
    }

    return quantityToNumber;
  }

  const newItem = [...state.cart.items];

  newItem[index].quantity = checkQuantity();

  return (dispatch: Dispatch) => {
    return dispatch(action(CartTypes.ADD_CART_QUANTITY, { newItem }));
  };
}

export function handleCartValue(value: string) {
  return action(CartTypes.SET_CART_VALUE, { value });
}

import { action } from "typesafe-actions";
import { CartTypes, Dishes } from "../types";

export function openCart(open: boolean) {
  return action(CartTypes.OPEN_CART, { open });
}

export function handleAddCartItem(item: Dishes, id?: string ) {
  return action(CartTypes.ADD_CART_ITEM, { item, id });
}

export function handleRemoveCartItem(id: string) {
  return action(CartTypes.REMOVE_CART_ITEM, { id });
}

export function handleCartQuantity(id: string, quantity: string) {
  return action(CartTypes.ADD_CART_QUANTITY, { id, quantity });
}

export function handleCartValue(value: string){
  return action(CartTypes.SET_CART_VALUE, {value})
}

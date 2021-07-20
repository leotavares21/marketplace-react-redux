import { ThunkAction } from "redux-thunk";

// Action types
export enum DishesTypes {
  FETCH_REQUEST = "FETCH_DISHES_REQUEST",
  FETCH_SUCCESS = "FETCH_DISHES_SUCCESS",
  FETCH_FAILURE = "FETCH_DISHES_FAILURE",
}

export enum CartTypes {
  OPEN_CART = "OPEN_CART",
  ADD_CART_ITEM = "ADD_CART_ITEM",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  ADD_CART_QUANTITY = "ADD_CART_QUANTITY",
  SET_CART_VALUE = "SET_CART_VALUE",
}

export type getDishesAction = {
  type: DishesTypes;
  payload?: Dishes[] | Object;
};

// dishes types
export type Dishes = {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  quantity: number;
};

// State type
export type DishesState = {
  readonly data: Dishes[];
  readonly error: string;
  readonly loading: boolean;
};

export type DishesMapState = {
  dishes: { data: Dishes[]; error: string; loading: boolean };
};

export type CartState = {
  readonly open: boolean;
  readonly items: Dishes[];
  readonly cartValue: string;
};

export type CartMapState = {
  cart: { open: boolean; items: Dishes[]; cartValue: string };
};

// action creator types
export type getDishesActionCreator = () => ThunkAction<
  void,
  DishesState,
  {},
  getDishesAction
>;

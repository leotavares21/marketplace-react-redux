import { combineReducers } from "redux";

import dishesReducer from "./dishes";
import cartReducer from './cart'

export default combineReducers({
  dishes: dishesReducer,
  cart: cartReducer,
});

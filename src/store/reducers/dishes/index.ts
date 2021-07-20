import { Reducer } from "redux";
import { DishesState, DishesTypes } from "../../types";

const initial_state: DishesState = {
  data: [],
  error: "",
  loading: false
};

const dishesReducer: Reducer<DishesState> = (state = initial_state, action) => {
  switch (action.type) {
    case DishesTypes.FETCH_REQUEST: {
      return { ...state };
    }
    case DishesTypes.FETCH_SUCCESS: {

      return { ...state, data: action.payload.data, error: "", loading: true };
    }
    case DishesTypes.FETCH_FAILURE: {
      return { ...state, data: [], error: action.payload.error, loading: false };
    }
    default:
      return state;
  }
};

export default dishesReducer;

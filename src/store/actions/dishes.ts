import { action } from "typesafe-actions";
import { DishesTypes, Dishes, getDishesActionCreator } from "../types";
import api from "../../services/api";

export function fetchDishesRequest() {
  return action(DishesTypes.FETCH_REQUEST);
}

export function fetchDishesSuccess(data: Dishes[]) {
  return action(DishesTypes.FETCH_SUCCESS, { data });
}

export function fetchDishesFailure(error: string) {
  return action(DishesTypes.FETCH_FAILURE, { error });
}

export const getDishes: getDishesActionCreator = () => async (dispatch) => {
  try {
    dispatch(fetchDishesRequest());

    const res = await api.get("dishes");
    const dishes = res.data;

    dispatch(fetchDishesSuccess(dishes));
  } catch (err) {
    const errorMsg = err.message;
    dispatch(fetchDishesFailure(errorMsg));
  }
};

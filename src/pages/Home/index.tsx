import { useEffect } from "react";
import { connect, InferThunkActionCreatorType } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import {
  DishesMapState,
  Dishes,
  getDishesActionCreator,
} from "../../store/types";

import { priceToString } from "../../utils/priceToString";

import * as dishesActions from "../../store/actions/dishes";
import * as cartActions from "../../store/actions/cart";

import styles from "./styles.module.scss";

type HomeProps = {
  dishes: Dishes[];
  loading: boolean;
  getDishes: InferThunkActionCreatorType<getDishesActionCreator>;
  handleAddCartItem: (item: Dishes, id: string) => void;
};

function Home({ dishes, loading, getDishes, handleAddCartItem }: HomeProps) {
  useEffect(() => {
    getDishes();
  }, [getDishes]);

  return (
    <div className={styles.container}>
      <main>
        <h1>{loading ? "Cardápio" : "Carregando..."}</h1>
        <article className={styles.cardDishes}>
          {dishes.map((dish, index) => (
            <div key={index}>
              <img src={dish.thumbnail} alt={dish.title} />
              <strong>{dish.title}</strong>
              <span>R$ {priceToString(dish.price)}</span>
              <button
                type="button"
                onClick={() => handleAddCartItem(dish, dish.id)}
              >
                <HiShoppingCart /> Adicionar
              </button>
              <Link to={`/prato/${dish.id}`}>Saiba mais</Link>
            </div>
          ))}
        </article>
      </main>
    </div>
  );
}

const mapStateToProps = (state: DishesMapState) => ({
  dishes: state.dishes.data,
  loading: state.dishes.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(Object.assign({}, dishesActions, cartActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

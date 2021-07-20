import { bindActionCreators, Dispatch } from "redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import * as cartActions from "../../store/actions/cart";

import styles from "./styles.module.scss";
import { connect } from "react-redux";

type DishType = {
  id: string;
  title: string;
  price: string;
  thumbnail: string;
  description: string;
};

type DishesProps = {
  openCart: (open: boolean) => void;
};

function Dishes({openCart}: DishesProps) {
  const { slug } = useParams<{ slug: string }>();
  const [dish, setDish] = useState<DishType>();

  useEffect(() => {
    getDish();
    openCart(false)
  }, [slug]);

  async function getDish() {
    const res = await api.get(`dishes/${slug}`);
    setDish(res.data);
  }

  return (
    <div className={styles.container}>
      {dish ? (
        <>
          <img src={dish.thumbnail} alt="" />
          <h2>{dish.title}</h2>
          <p>{dish.description}</p>
        </>
      ) : (
        <h2>Carregando...</h2>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(cartActions, dispatch);

export default connect(null, mapDispatchToProps)(Dishes);

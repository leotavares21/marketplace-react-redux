import { bindActionCreators, Dispatch } from "redux";
import { useEffect } from "react";

import * as cartActions from "../../store/actions/cart";

import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { CartMapState, Dishes } from "../../store/types";

import { priceToString } from "../../utils/priceToString";

type PaymentProps = {
  items: Dishes[];
  cartValue: string;
  openCart: (open: boolean) => void;
};

function Payment({ items, cartValue, openCart }: PaymentProps) {
  useEffect(() => {
    openCart(false);
  }, []);

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.id}>
          <img src={item.thumbnail} alt={item.title} />
          <h2>{item.title}</h2>
          <div>
            <span>R$ {priceToString(item.price)}</span>
            <span>Qtd: {item.quantity}</span>
          </div>
        </div>
      ))}
      <strong>Valor da compra: {cartValue}</strong>
      <button type="button">Pagar</button>
    </div>
  );
}

const mapStateToProps = (state: CartMapState) => ({
  items: state.cart.items,
  cartValue: state.cart.cartValue,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(cartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

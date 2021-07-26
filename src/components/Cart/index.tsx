import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Link, useHistory } from "react-router-dom";
import React, { ReactNode, useEffect } from "react";

import * as cartActions from "../../store/actions/cart";
import { CartMapState, Dishes } from "../../store/types";
import { priceToString } from "../../utils/priceToString";

import styles from "./styles.module.scss";

import { useClickOutside } from "../../hooks/useClickOutside";

const cartRef: React.RefObject<any> = React.createRef();
const btnCartRef: React.RefObject<any> = React.createRef();

type CartProps = {
  open: boolean;
  items: Dishes[];
  cartValue: string;
  handleOpenCart: (open: boolean) => void;
  handleCartQuantity: (id: string, quantity: string) => void;
  handleRemoveCartItem: (id: string) => void;
  handleCartValue: (value: string) => void;
};

function Cart({
  open,
  items,
  cartValue,
  handleOpenCart,
  handleCartQuantity,
  handleRemoveCartItem,
  handleCartValue,
}: CartProps) {
  const history = useHistory();

  useEffect(() => {
    getCartValue(items);
  });

  function getCartValue(state: Dishes[]) {
    const cartValue = state.map((item) => {
      const quantity = item.quantity;
      const price = item.price;

      return {
        total: price * quantity,
      };
    });

    const total = cartValue.reduce((total, item) => total + item.total, 0);

    const totalValue = priceToString(total);

    handleCartValue(totalValue);
  }

  function handleClickOutside() {
    handleOpenCart(false);
  }

  useClickOutside(cartRef, btnCartRef, handleClickOutside);

  return (
    <div
      className={`${styles.cartList} ${open ? styles.active : ""}`}
      ref={cartRef}
    >
      {items.length > 0 ? (
        <>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <div>
                  <img src={item.thumbnail} alt={item.title} />
                  <Link to={`/pratos/${item.id}`}>{item.title}</Link>
                </div>
                <div>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={item.quantity}
                    onChange={(event) =>
                      handleCartQuantity(item.id, event.target.value)
                    }
                  />
                  <span>R$ {priceToString(item.price)}</span>
                  <span onClick={() => handleRemoveCartItem(item.id)}>
                    &#10005;
                  </span>
                </div>
              </li>
            ))}

            <button type="button" onClick={() => history.push("/pagamento")}>
              Finalizar
            </button>
          </ul>

          <span>
            Valor total: <strong>R$ {cartValue} </strong>
          </span>
        </>
      ) : (
        <strong>Carrinho vazio</strong>
      )}
    </div>
  );
}

type BtnCartProps = {
  open: boolean;
  children: ReactNode;
  handleOpenCart: (open: boolean) => void;
};

function BtnCart({ children, open, handleOpenCart }: BtnCartProps) {
  return (
    <button type="button" onClick={() => handleOpenCart(!open)} ref={btnCartRef}>
      {children}
    </button>
  );
}

const mapStateToProps = (state: CartMapState) => ({
  open: state.cart.open,
  items: state.cart.items,
  cartValue: state.cart.cartValue,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(cartActions, dispatch);

const connectCart = connect(mapStateToProps, mapDispatchToProps)(Cart);
const connectBtnCart = connect(mapStateToProps, mapDispatchToProps)(BtnCart);

export { connectBtnCart, connectCart };

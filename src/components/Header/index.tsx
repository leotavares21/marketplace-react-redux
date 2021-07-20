import { Link, useHistory } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { CartMapState, Dishes } from "../../store/types";

import { priceToString } from "../../utils/priceToString";

import * as cartActions from "../../store/actions/cart";

import styles from "./styles.module.scss";

type HeaderProps = {
  open: boolean;
  items: Dishes[];
  cartValue: string;
  openCart: (open: boolean) => void;
  handleCartQuantity: (id: string, quantity: string) => void;
  handleAddCartItem: (item: Dishes) => void;
  handleRemoveCartItem: (id: string) => void;
  handleCartValue: (value: string) => void;
};

function Header({
  open,
  items,
  cartValue,
  openCart,
  handleCartQuantity,
  handleRemoveCartItem,
  handleCartValue,
}: HeaderProps) {
  const history = useHistory();

  useEffect(() => {
    getCartValue(items);
  }, [items]);

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

  return (
    <header className={styles.container}>
      <Link to="/">
        <h3>Food Store</h3>
      </Link>

      <button type="button" onClick={() => openCart(!open)}>
        {items.length > 0 && <span> {items.length} </span>}

        <HiShoppingCart />
      </button>

      <div className={`${styles.cartList} ${open ? styles.active : ""}`}>
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
    </header>
  );
}

const mapStateToProps = (state: CartMapState) => ({
  open: state.cart.open,
  items: state.cart.items,
  cartValue: state.cart.cartValue,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(cartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);

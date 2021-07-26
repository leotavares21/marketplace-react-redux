import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { connect } from "react-redux";

import { CartMapState, Dishes } from "../../store/types";

import { connectBtnCart as BtnCart } from "../CartElements";

import styles from "./styles.module.scss";

type HeaderProps = {
  items: Dishes[];
};

function Header({ items }: HeaderProps) {
  return (
    <header className={styles.container}>
      <Link to="/">
        <h3>Food Store</h3>
      </Link>

      <BtnCart>
        {items.length > 0 && <span> {items.length} </span>}
        <HiShoppingCart />
      </BtnCart>
    </header>
  );
}

const mapStateToProps = (state: CartMapState) => ({
  open: state.cart.open,
  items: state.cart.items,
});

export default connect(mapStateToProps)(Header);

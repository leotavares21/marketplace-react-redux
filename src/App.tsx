import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Home from "./pages/Home";
import Dish from "./pages/Dish";
import Payment from "./pages/Payment";
import Header from "./components/Header";

import {
  connectCart as Cart,
} from "./components/CartElements";

import { store, persistor } from "./store";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            <Cart />
            <Route path="/" exact component={Home} />
            <Route path="/prato/:slug" component={Dish} />
            <Route path="/pagamento" component={Payment} />
          </PersistGate>
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

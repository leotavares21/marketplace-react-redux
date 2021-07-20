import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Home from "./pages/Home";
import Dishes from "./pages/Dishes";
import Payment from "./pages/Payment";
import Header from "./components/Header";

import { store, persistor } from "./store";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/pratos/:slug" component={Dishes} />
            <Route path="/pagamento" component={Payment} />
          </PersistGate>
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

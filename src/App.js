import "./App.css";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInitialData, isUserLoggedIn } from "./actions";
import Product from "./containers/Product";
import Orders from "./containers/Orders";
import { Category } from "./containers/Category";
import NewPage from "./containers/NewPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getInitialData());
    } else {
      dispatch(isUserLoggedIn());
    }
    // eslint-disable-next-line
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products" component={Product} />
        <PrivateRoute path="/page" component={NewPage} />

        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;

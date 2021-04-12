import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// --> Components
import App from "./App";
import Admin from "./components/Admin/Admin";
import AdminAuthencationComponent from "./components/Admin/AdminAuthencationComponent";
import TestAdmin from "./components/Admin/TestAdmin";
import F403 from "./components/Admin/F403";
// --> Bootstrap//CSS
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import * as serviceWorker from "./serviceWorker";
// Store
import { createStore } from "redux";
import myReducer from "./reducers/index";
import { Provider } from "react-redux";
const store = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path="/admin-temp">
            <AdminAuthencationComponent>
              <TestAdmin />
            </AdminAuthencationComponent>
          </Route>
          <Route exact path="/admin">
            <AdminAuthencationComponent>
              <Admin />
            </AdminAuthencationComponent>
          </Route>
          <Route path="/" component={App} />
        </Switch>
      </Provider>{" "}
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

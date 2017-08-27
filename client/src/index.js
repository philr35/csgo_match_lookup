import "semantic-ui-css/semantic.min.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

document.body.style.backgroundImage =
  "linear-gradient(60deg, #29323c 0%, #485563 100%)";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./createStore";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  rootElement
);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App"; // Replace with the correct path to your App component
import store from 'state/store';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

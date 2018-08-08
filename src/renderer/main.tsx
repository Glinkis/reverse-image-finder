import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import "./styles/index.css";

const render = () => {
  const App = require("./components/App").App;
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.body
  );
};

render();

if (module.hot) {
  module.hot.accept(render);
}

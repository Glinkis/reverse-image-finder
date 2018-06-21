import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { App } from "./components/App";

const render = () => {
  const MyApp = require("./components/App").App;
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root")
  );
};

render();

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(render);
}

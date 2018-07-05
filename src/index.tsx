import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

const render = () => {
  const App = require("./components/App").App;
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root")
  );
};

render();

if (module.hot) {
  module.hot.accept(render);
}

import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";

import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";

import RootNavigation from "./navigation/RootNavigation";

function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

export default App;

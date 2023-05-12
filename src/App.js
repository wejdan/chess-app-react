import React from "react";
import { ContextProvider } from "./contexts/Context";
import Play from "./pages/Play";
import "semantic-ui-css/semantic.min.css";
function App() {
  return (
    <ContextProvider>
      <Play />
    </ContextProvider>
  );
}

export default App;

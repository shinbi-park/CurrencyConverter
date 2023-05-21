import React from "react";
import Main from "./pages/Main";
import { GlobalStyle } from "./asset/style/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <Main />
      </div>
    </>
  );
};

export default App;

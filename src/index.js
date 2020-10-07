import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CustomThemeProvider from "./Theme/CustomThemeProvider";
import { SnackbarProvider } from "notistack";
import { FirebaseContext } from "./components/Firebase/FirebaseConfig";
import Firebase from "./components/Firebase/FirebaseConfig";

ReactDOM.render(
  <CustomThemeProvider>
    <FirebaseContext.Provider value={new Firebase()}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </FirebaseContext.Provider>
  </CustomThemeProvider>,
  document.getElementById("root")
);

import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import getTheme from "./themes";

// initial context
export const CustomThemeContext = React.createContext({
  currentTheme: "light",
  setTheme: null,
});

const CustomThemeProvider = (props) => {
  // destructuring to store all children
  const { children } = props;
  // getting the current theme name from browsers 'localStorage', default: 'light'
  const currentTheme = localStorage.getItem("appTheme") || "light";
  // store the theme name in component state
  const [themeName, _setThemeName] = React.useState(currentTheme);
  // stores the theme object accordingly
  const theme = getTheme(themeName);
  // a wrapper around _setThemeName() to set the theme name in 'localStorage' and component state
  const setThemeName = (name) => {
    localStorage.setItem("appTheme", name);
    _setThemeName(name);
  };
  // final context value to be applied in the Provider
  const themeContext = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };
  // Provides the appropriate theme to all 'children' through ThemeProvider from @material-ui
  return (
    <CustomThemeContext.Provider value={themeContext}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;

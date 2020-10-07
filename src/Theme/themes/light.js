import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Light theme
const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#121212",
    },
    secondary: {
      main: "#121212",
    },
    background: { default: "#ffffff" },
  },
});

const light = responsiveFontSizes(theme);

export default light;

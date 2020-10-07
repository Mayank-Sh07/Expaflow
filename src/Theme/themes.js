import light from "./themes/light";
import dark from "./themes/dark";

// Destructuring themes into an object as {themeName: it's import, themName: it's import ...}
const themes = { light, dark };

// Return appropriate theme object based on themeName parameter
export default function getTheme(themeName) {
  return themes[themeName];
}

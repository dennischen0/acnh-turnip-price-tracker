import { createMuiTheme } from "@material-ui/core";
import finkWoff1 from "../fonts/FinkHeavyRegular.woff";
import finkWoff2 from "../fonts/FinkHeavyRegular.woff2";

const finkHeavy = {
  fontFamily: "FinkHeavy",
  src: ` 
    url(${finkWoff2}) format('woff2'),
    url(${finkWoff1}) format('woff')
    `,
  fontWeight: "normal",
  fontStyle: "normal",
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7FD1A5",
      dark: "#007D75",
      light: "#88C9A1",
    },
    secondary: {
      light: "#7B6C53",
      main: "#6B5C43",
    },
    bkgs: {
      main: "#E9F5EB",
      mainAlt: "#F8F8F0",
      chart: "#D8F1E1",
      banner: "#F0FFF5",
      content: "#88C9A1",
      contentAlt: "#7B6C53",
    },
    warning: {
      main: "#F1E26F",
      dark: "#EF8341",
    },
    text: {
      primary: "#6E661B",
    },
  },
  typography: {
    fontFamily: 'FinkHeavy',
    fontSize: 16
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [finkHeavy],
      },
    },
  },
});

export default theme;
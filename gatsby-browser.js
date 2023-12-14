import "@fontsource/source-sans-pro/300.css";
import "@fontsource/source-sans-pro/400.css";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/source-sans-pro/700.css";

import "@fontsource/frank-ruhl-libre/300.css";
import "@fontsource/frank-ruhl-libre/400.css";
import "@fontsource/frank-ruhl-libre/500.css";
// import CustomThemeProvider from "./src/context/ThemeContext";
import { CountProvider } from "./src/context/AppContext";
// const React = require("react");
import React from "react";

// highlight-start
export const wrapPageElement = ({ element, props }) => {
  return <CountProvider {...props}>{element}</CountProvider>;
};

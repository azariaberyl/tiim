import React from "react";

const ThemeContext = React.createContext("");

const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

export { ThemeConsumer, ThemeProvider };
export default ThemeContext;

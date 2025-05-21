import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    margin: 0;
    background-color: #ffffff;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;

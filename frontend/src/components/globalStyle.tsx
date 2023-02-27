import "../assets/scss/GlobalStyle.scss";
import React from "react";
type Props = {
  children: JSX.Element;
};
const GlobalStyle: React.FC<Props> = ({ children }): JSX.Element => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default GlobalStyle;

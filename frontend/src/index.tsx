import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyle from "./components/globalStyle";
import {
  MessageProvider,
  ReceiverProvider,
  UserProvider,
  VisibilityProvider,
} from "./providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <BrowserRouter>
        <VisibilityProvider>
          <UserProvider>
            <ReceiverProvider>
              <MessageProvider>
                <App />
              </MessageProvider>
            </ReceiverProvider>
          </UserProvider>
        </VisibilityProvider>
      </BrowserRouter>
    </GlobalStyle>
  </React.StrictMode>
);

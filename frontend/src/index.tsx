import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyle from "./components/globalStyle";
import {
  AuthProvider,
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
          <AuthProvider>
            <UserProvider>
              <ReceiverProvider>
                <MessageProvider>
                  <App />
                </MessageProvider>
              </ReceiverProvider>
            </UserProvider>
          </AuthProvider>
        </VisibilityProvider>
      </BrowserRouter>
    </GlobalStyle>
  </React.StrictMode>
);

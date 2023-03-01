import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import GlobalStyle from "./components/globalStyle";
import {
  AuthProvider,
  ReceiverProvider,
  VisibilityProvider,
} from "./providers";
import store from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle>
        <VisibilityProvider>
          <AuthProvider>
            <ReceiverProvider>
              <App />
            </ReceiverProvider>
          </AuthProvider>
        </VisibilityProvider>
      </GlobalStyle>
    </Provider>
  </React.StrictMode>
);

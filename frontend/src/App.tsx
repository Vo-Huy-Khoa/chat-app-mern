import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  Fragment } from 'react';
import { publicRoutes } from "./routes";
import Home from "./pages/Home/home";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((routes, index) => {
            const Page = routes.component;
            let Layout = Home;
            if (routes.layout) {
              Layout = routes.layout;
            } else if (routes.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={routes.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";

export const Auth = () => {
  return (
    <div>
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
};

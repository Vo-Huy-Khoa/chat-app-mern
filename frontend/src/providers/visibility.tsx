import { createContext, useState } from "react";

const VisibilityContext = createContext({
  isVisible: "sidebar",
  toggleVisibility: (prop: any) => {},
});
function VisibilityProvider({ children }: any) {
  const [isVisible, setIsVisible] = useState("sidebar");
  function toggleVisibility(prop: any) {
    setIsVisible(prop);
  }
  const value = { isVisible, toggleVisibility };
  return (
    <VisibilityContext.Provider value={value}>
      {children}
    </VisibilityContext.Provider>
  );
}

export { VisibilityContext, VisibilityProvider };

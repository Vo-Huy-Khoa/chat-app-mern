import { createContext, useContext, useEffect, useState } from "react";
import { IUser, MessageContextValue, selectMessageType } from "../types";
import { getProfile } from "../services";

const UserContext = createContext({
  _id: "",
  avatar: "",
  fullname: "",
  username: "",
  email: "",
});

function UserProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<IUser>({
    _id: "",
    avatar: "",
    fullname: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    getProfile()
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <div>{children}</div>
    </UserContext.Provider>
  );
}

const MessageContext = createContext<MessageContextValue>({
  selectMessage: [],
  getSelectMessage: () => {},
});

function MessageProvider({ children }: any) {
  const [selectMessage, getSelectMessage] = useState<selectMessageType>([]);

  return (
    <MessageContext.Provider value={{ selectMessage, getSelectMessage }}>
      <div>{children}</div>
    </MessageContext.Provider>
  );
}

export const VisibilityContext = createContext({
  isVisible: "sidebar",
  toggleVisibility: (prop: any) => {},
});

export function VisibilityProvider({ children }: any) {
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

export { UserContext, UserProvider, MessageContext, MessageProvider };

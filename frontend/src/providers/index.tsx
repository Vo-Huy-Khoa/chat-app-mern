import { createContext, useEffect, useState } from "react";
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

export { UserContext, UserProvider, MessageContext, MessageProvider };

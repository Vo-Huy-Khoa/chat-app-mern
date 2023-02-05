import { createContext, useEffect, useState } from "react";
import { IUser } from "../types";
import { getProfile } from "../services";

const UserContext = createContext({
  avatar: "",
  fullname: "",
  username: "",
  email: "",
});

function UserProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<IUser>({
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

const MessageContext = createContext([]);

function MessageProvider({ children }: any) {
  const [selectMessage, getSelectMessage] = useState<never[]>([]);

  return (
    <MessageContext.Provider value={selectMessage}>
      <div>{children}</div>
    </MessageContext.Provider>
  );
}

export { UserContext, UserProvider, MessageContext, MessageProvider };

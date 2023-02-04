import { createContext, useEffect, useState } from "react";
import { IUser } from "../types";
import { getProfile } from "../services";

const UserContext = createContext({
  avatar: "",
  fullname: "",
  username: "",
  email: "",
});

const ListMessageContext = createContext([]);

function ListMessageProvider({ children }: any) {
  const [listMessage, setListMessage] = useState([]);

  useEffect(() => {
    getProfile()
      .then((res) => {
        setListMessage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ListMessageContext.Provider value={listMessage}>
      <div>{children}</div>
    </ListMessageContext.Provider>
  );
}

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

export { UserContext, UserProvider, ListMessageContext, ListMessageProvider };

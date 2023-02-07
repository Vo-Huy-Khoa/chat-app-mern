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

interface User {
  id: string;
  avatar: string;
  username: String;
}
interface selectMessage {
  id: number;
  message: string;
  receiverID: User;
}

interface selectMessageType extends Array<selectMessage> {}

interface MessageContextValue {
  selectMessage: selectMessageType;
  getSelectMessage: React.Dispatch<React.SetStateAction<selectMessageType>>;
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

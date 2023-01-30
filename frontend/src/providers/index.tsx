import { createContext, useEffect, useState } from "react";
import { IUser } from "../models";
import { getProfile } from "../services";

const UserContext = createContext({
  avatar:
    "https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png",
  fullname: "",
  username: "",
  email: "",
});

function UserProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<IUser>({
    avatar:
      "https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png",
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
        // console.log(error);
      });
  }, []);
  return (
    <UserContext.Provider value={currentUser}>
      <div>{children}</div>
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

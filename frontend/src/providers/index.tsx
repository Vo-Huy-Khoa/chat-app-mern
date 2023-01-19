import { createContext, useEffect, useState } from "react";
import { IUser } from "../models";
import { getProfile } from "../services";

const UserContext = createContext({
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6XOOcmlFur_I8B2Nnd2wgTgGSE4VBi0MCfCVj_37i0DHPz4dHC1Ax_nWi6hBUM4UK5lQ&usqp=CAU",
  fullname: "vo huy khoa",
  username: "huykhoa",
  email: "huykhoa630@gmail.com",
});

function UserProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<IUser>({
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6XOOcmlFur_I8B2Nnd2wgTgGSE4VBi0MCfCVj_37i0DHPz4dHC1Ax_nWi6hBUM4UK5lQ&usqp=CAU",
    fullname: "vo huy khoa",
    username: "huykhoa",
    email: "huykhoa630@gmail.com",
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

export { UserContext, UserProvider };

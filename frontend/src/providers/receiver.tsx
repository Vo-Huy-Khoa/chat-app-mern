import { createContext, useState } from "react";

const ReceiverContext = createContext({
  currentReceiver: {
    _id: "",
    avatar: "",
    fullname: "",
    username: "",
  },
  setCurrentReceiver: (prop: any) => {},
});

function ReceiverProvider({ children }: any) {
  const [currentReceiver, setReceiver] = useState({
    _id: "",
    avatar: "",
    fullname: "",
    username: "",
  });
  function setCurrentReceiver(prop: any) {
    setReceiver(prop);
  }
  const value = { currentReceiver, setCurrentReceiver };
  return (
    <ReceiverContext.Provider value={value}>
      <div>{children}</div>
    </ReceiverContext.Provider>
  );
}
export { ReceiverContext, ReceiverProvider };

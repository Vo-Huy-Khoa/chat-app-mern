import { createContext, useState } from "react";
import { MessageContextValue, selectMessageType } from "../types";

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

export { MessageContext, MessageProvider };

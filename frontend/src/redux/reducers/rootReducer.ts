import { combineReducers } from "redux";
import { currentUserReducer, currentReceiverReducer } from "./currentUser";
import currentMessageReducer from "./listMessage";
import currentVisibilityReducer from "./visibility";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  currentMessage: currentMessageReducer,
  currentVisibility: currentVisibilityReducer,
  currentReceiver: currentReceiverReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import currentMessageReducer from "./listMessage";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  currentMessage: currentMessageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import currentMessageReducer from "./listMessage";
import currentVisibilityReducer from "./visibility";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  currentMessage: currentMessageReducer,
  currentVisibility: currentVisibilityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

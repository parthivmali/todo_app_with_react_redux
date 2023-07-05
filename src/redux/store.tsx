import { createStore } from "redux";
import todoReducer from "./reducers/TodoReducers";

const store = createStore(todoReducer);

export default store
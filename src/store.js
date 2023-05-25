import { createStore } from "redux";
import AdminReducer from "./Reducer/Reducer";

const store = createStore(AdminReducer);
export default store;
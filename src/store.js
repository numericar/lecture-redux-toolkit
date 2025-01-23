import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducers/userReducer";
import { thunk } from "redux-thunk";

const rootReducers = combineReducers({
    user: userReducer
});

// applyMiddleware(thunk) ทำให้เราสามารถใช้งาน dispatch กับ action ที่เป็น async ได้
// รองรับหลาย reducer
const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
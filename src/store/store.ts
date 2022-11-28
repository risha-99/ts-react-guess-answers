import { createStore } from "redux";
import { questionCounterReducer } from "../reducers/questionCounterReducer";

export const store = createStore(questionCounterReducer);

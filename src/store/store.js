import { createStore } from "redux";
import { rootReducer } from "./reducer";
import { devToolsEnhancer } from "@redux-devtools/extension";

const enhancer = devToolsEnhancer();

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')): {};

export const store = createStore(rootReducer, persistedState,  enhancer);

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })

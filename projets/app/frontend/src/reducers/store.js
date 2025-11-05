import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit"

//REDUCERS
import tokenReducer from "./tokenReducer";
import eventCategoryReducer from "./eventCategoryReducer";
import eventSelectedReducer from "./eventSelectedReducer";
import eventDatasForRegistrationReducer from "./eventDatasForRegistrationReducer";
import teamReducer from "./teamReducer"

const persistConfig = {
  key: "root",
  version: 1,
  storage
};

const reducer = combineReducers({
  tokenReducer,
  eventSelectedReducer,
  eventCategoryReducer,
  eventDatasForRegistrationReducer,
  teamReducer
});

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer
});
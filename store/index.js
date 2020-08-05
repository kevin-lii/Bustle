import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import reducers from "./reducers";

export default function configureStore() {
  const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["app"],
  };
  const persistedReducers = persistReducer(persistConfig, reducers);
  const store = createStore(persistedReducers, {}, applyMiddleware(reduxThunk));
  let persistor = persistStore(store);

  return { store, persistor };
}

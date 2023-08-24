import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import dataUserResponseReduser from "./slices/dataUserResponse";
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};

const dataUserResponsePersistedReduser = persistReducer(
  persistConfig,
  dataUserResponseReduser,
);
export const store = configureStore({
  reducer: { dataUserResponseRedux: dataUserResponsePersistedReduser },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

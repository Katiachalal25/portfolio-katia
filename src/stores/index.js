//Importer le reducteur final
import finalReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { FLUSH, PERSIST, PURGE, PAUSE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";

const persisConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persisConfig, finalReducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.VITE_NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store
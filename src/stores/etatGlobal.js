import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/authReducteur';
import avisReducer from './avis/avisReducteur';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['utilisateur', 'estConnecte']
};

const avisPersistConfig = {
  key: 'avis',
  storage,
  whitelist: ['liste']
};

export const etatGlobal = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    avis: persistReducer(avisPersistConfig, avisReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(etatGlobal); 
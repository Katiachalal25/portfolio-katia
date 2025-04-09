'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { etatGlobal, persistor } from '@/stores/etatGlobal';

export default function ReduxProvider({ children }) {
  return (
    <Provider store={etatGlobal}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
} 
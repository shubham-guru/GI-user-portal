import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from './authConfig.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.ts'


const msalInstance = new PublicClientApplication(msalConfig);
const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(

  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </MsalProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
)

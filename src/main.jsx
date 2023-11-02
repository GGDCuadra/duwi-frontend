import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import App from './App.jsx';
import store from './redux/store.jsx';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react'; // Importa Auth0Provider



const root = document.getElementById('root');
const rootElement = createRoot(root);

const { VITE_PAYPAL_CLIENT_ID } = import.meta.env

rootElement.render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ clientId: "ATMLVmLHv0YEwCBlrsTN876rIIPsFqEHl6nuZyidnWBeWL3ongFuZb2iIS6pw9Q-t0mha_tcypiqG_jb" }}>
      <Provider store={store}>
        <BrowserRouter>
          <Auth0Provider
            domain="dev-yan4u8u82wxf2qfz.us.auth0.com"
            clientId="4m7ITw6bxuQ5kCsIIl47C3y4A9DS0iB8"
            redirectUri={window.location.origin + '/dashboard'}
          >
            <App />
          </Auth0Provider>
        </BrowserRouter>
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
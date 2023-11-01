import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import App from './App.jsx';
import store from './redux/store.jsx';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react'; 

const root = document.getElementById('root');
const rootElement = createRoot(root);

const { VITE_PAYPAL_CLIENT_ID } = import.meta.env


const Domain = import.meta.env.VITE_APP_AUTH0_DOMAIN
const ClientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID


rootElement.render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ clientId: "ATMLVmLHv0YEwCBlrsTN876rIIPsFqEHl6nuZyidnWBeWL3ongFuZb2iIS6pw9Q-t0mha_tcypiqG_jb" }}>
      <Provider store={store}>
        <BrowserRouter>
        <Auth0Provider
            domain={Domain}
            clientId={ClientId}
            redirectUri={window.location.origin + '/dashboard'}
          >
            <App />
          </Auth0Provider>
        </BrowserRouter>
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
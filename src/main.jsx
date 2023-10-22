import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import store from './redux/store.jsx';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react'; // Importa Auth0Provider



const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-yan4u8u82wxf2qfz.us.auth0.com"
          clientId="3tvQ9nFAkeQ6gs6UzoAN19PHHQTEl9N3"
          redirectUri={window.location.origin + '/dashboard'}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
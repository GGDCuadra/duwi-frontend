import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import App from './App.jsx';
import store from './redux/store.jsx'
import { Provider } from 'react-redux';
const root = document.getElementById('root');
const rootElement = createRoot(root);

const { VITE_PAYPAL_CLIENT_ID } = import.meta.env

rootElement.render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ clientId: VITE_PAYPAL_CLIENT_ID }}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);

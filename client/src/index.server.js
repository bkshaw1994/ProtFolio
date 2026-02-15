import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import ReduxProvider from './app/provider';

// Hydrate the React app on the client side
// The server has already rendered the initial HTML
const rootElement = document.getElementById('root');

if (rootElement) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </React.StrictMode>
  );
}

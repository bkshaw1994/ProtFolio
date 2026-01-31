import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import ReduxProvider from './app/provider';

const rootElement = document.getElementById('root');

// Use hydrateRoot if content is already rendered (SSR)
// Otherwise use createRoot for client-only rendering
if (rootElement?.innerHTML) {
  ReactDOM.hydrateRoot(rootElement, (
    <React.StrictMode>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </React.StrictMode>
  ));
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </React.StrictMode>
  );
}

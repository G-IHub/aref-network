import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AREFProvider } from './context/AREFContext.jsx';
import App from './App.jsx';
import './styles/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AREFProvider>
        <App />
      </AREFProvider>
    </BrowserRouter>
  </React.StrictMode>
);

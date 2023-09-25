import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { RoomProvider } from './context/RoomContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <App />
      </RoomProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);

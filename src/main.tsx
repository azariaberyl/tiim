import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/index.css';
import { getTimers, setTimers } from './utils';

getTimers()
  ? setTimers([
      {
        id: 1,
        project: 'Project',
        time: 1200,
        title: 'Focus',
        isSelected: true,
      },
    ])
  : console.log('Sudah ada timers');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider value='light'>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

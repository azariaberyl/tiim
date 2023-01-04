import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/index.css';
import {
  getSelectedTimer,
  getTimers,
  setSelectedTimer,
  setTimers,
} from './utils';

!getTimers()
  ? setTimers([
      {
        category: 'Project',
        seconds: 0,
        minutes: 2,
        title: 'Focus',
      },
    ])
  : console.log('Sudah ada timers');
!getSelectedTimer() ? setSelectedTimer(0) : console.log('Sudah ada timers');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ThemeProvider value='light'>
      <App />
    </ThemeProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

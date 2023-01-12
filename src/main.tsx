import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/index.css';
import { getTimersData, setTimersData } from './utils';

!getTimersData() &&
  setTimersData({
    reports: [0],
    selected: 0,
    timers: [
      { category: 'Project', minutes: 25, seconds: 0, title: 'My Project' },
    ],
  });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider value='light'>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { Provider } from 'react-redux';
import store from './app/store';

let permission = Notification.permission;

if (permission === 'default') {
  requestAndShowPermission();
}

function requestAndShowPermission() {
  Notification.requestPermission(function (permission) {
    if (permission === 'granted') {
      showNotification('Pomodoro Timer', 'This is the notification');
    }
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

function showNotification(title: string, body?: string, icon?: string) {
  //  if(document.visibilityState === "visible") {
  //      return;
  //  }

  let notification = new Notification(title, { body, icon });

  notification.onclick = () => {
    notification.close();
    window.parent.focus();
  };
}

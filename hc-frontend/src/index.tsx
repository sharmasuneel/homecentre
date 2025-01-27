import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router';
import store from './redux/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

//TODO: set contextProvider values from context and use it below

const ContextProvider = createContext({});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider.Provider value={{}}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider.Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

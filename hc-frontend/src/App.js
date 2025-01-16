import React, { createContext } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';

const ContextProvider = createContext();

//TODO: set contextProvider values from context and use it below

function App() {
  return (
    <Provider store={store}>
      <ContextProvider.Provider value={{}}>
        <h1>Home Center</h1>
      </ContextProvider.Provider>
    </Provider>
  );
}

export default App;

import React, { createContext } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import FilterSideBar from './component/custom/SideBarNavigation/FilterSideBar';

const ContextProvider = createContext({});

//TODO: set contextProvider values from context and use it below

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ContextProvider.Provider value={{}}>
        <h1>Home Center</h1>
        <FilterSideBar />
      </ContextProvider.Provider>
    </Provider>
  );
}


export default App;


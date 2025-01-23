import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import App from './App';
import { fetchAllProducts } from './redux/slices/filtersSlice';

// Mock the fetchAllProducts action to return a plain object
jest.mock('./redux/slices/filtersSlice', () => ({
  fetchAllProducts: () => ({ type: 'FETCH_ALL_PRODUCTS' }),
}));

const mockStore = configureStore([]);

describe('App Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      filters: {
        products: [], // Ensure the initial state includes the products array
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders App component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
  });
});
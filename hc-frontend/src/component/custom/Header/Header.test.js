import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from './Header';
import { fetchAllProducts } from '../../../redux/slices/filtersSlice';

// Mock the fetchAllProducts action
jest.mock('../../../redux/slices/filtersSlice', () => ({
  fetchAllProducts: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Header Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      filters: {
        products: [
          { id: 1, name: 'Product 1', category: 'beauty' },
          { id: 2, name: 'Product 2', category: 'furniture' },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders Header component', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText('HomeCenter')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  test('dispatches fetchAllProducts on mount', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchAllProducts());
  });

  test('renders categories in Search component', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.getByText('All Departments')).toBeInTheDocument();
    expect(screen.getByText('beauty')).toBeInTheDocument();
    expect(screen.getByText('furniture')).toBeInTheDocument();
  });
});
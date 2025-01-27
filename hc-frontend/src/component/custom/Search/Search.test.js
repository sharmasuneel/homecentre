import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Search from './Search';
import { fetchAllProducts } from '../../../redux/slices/filtersSlice';

// Mock the fetchAllProducts action
jest.mock('../../../redux/slices/filtersSlice', () => ({
  fetchAllProducts: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Search Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      filters: {
        products: [
          { id: 1, name: 'Product 1', category: 'Electronics' },
          { id: 2, name: 'Product 2', category: 'Clothing' },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders Search component', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Search for products...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('dispatches fetchAllProducts on mount', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchAllProducts());
  });

  test('renders categories in dropdown', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(screen.getByText('All Departments')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
  });

  test('updates selected category state on dropdown change', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const categoryDropdown = screen.getByRole('combobox');
    fireEvent.change(categoryDropdown, { target: { value: 'Electronics' } });

    expect(categoryDropdown.value).toBe('Electronics');
  });
});
import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';


// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");
test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Home Center/i);
  expect(linkElement).toBeInTheDocument();
});


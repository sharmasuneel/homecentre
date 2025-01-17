import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Home Center/i);
  expect(linkElement).toBeInTheDocument();
});

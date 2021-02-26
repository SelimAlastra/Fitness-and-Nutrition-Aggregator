import { render, screen } from '@testing-library/react';
import App from './App';
import * as React from "react";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Create an account/i);
  expect(linkElement).toBeInTheDocument();
});

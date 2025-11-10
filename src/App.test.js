import { render, screen } from '@testing-library/react';
import App from './App';

test('renders React Testing App header', () => {
  render(<App />);
  const headerElement = screen.getByText(/React Testing App/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders Counter component', () => {
  render(<App />);
  const counterElement = screen.getByText(/Counter Component/i);
  expect(counterElement).toBeInTheDocument();
});

test('renders Product List component', () => {
  render(<App />);
  const productListElement = screen.getByText(/Product List Component/i);
  expect(productListElement).toBeInTheDocument();
});

test('renders Form component', () => {
  render(<App />);
  const formElement = screen.getByText(/Form Component/i);
  expect(formElement).toBeInTheDocument();
});
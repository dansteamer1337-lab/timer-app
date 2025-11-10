import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter Component', () => {
  test('отображает начальное значение счетчика', () => {
    render(<Counter />);
    expect(screen.getByText(/Counter: 0/i)).toBeInTheDocument();
  });

  test('увеличивает значение счетчика при нажатии на кнопку "Увеличить"', () => {
    render(<Counter />);
    const increaseButton = screen.getByText(/Увеличить/i);
    fireEvent.click(increaseButton);
    expect(screen.getByText(/Counter: 1/i)).toBeInTheDocument();
  });

  test('уменьшает значение счетчика при нажатии на кнопку "Уменьшить"', () => {
    render(<Counter />);
    const decreaseButton = screen.getByText(/Уменьшить/i);
    fireEvent.click(decreaseButton);
    expect(screen.getByText(/Counter: -1/i)).toBeInTheDocument();
  });

  test('работает многократное нажатие кнопок', () => {
    render(<Counter />);
    const increaseButton = screen.getByText(/Увеличить/i);
    const decreaseButton = screen.getByText(/Уменьшить/i);
    
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    expect(screen.getByText(/Counter: 3/i)).toBeInTheDocument();
    
    fireEvent.click(decreaseButton);
    expect(screen.getByText(/Counter: 2/i)).toBeInTheDocument();
  });
});
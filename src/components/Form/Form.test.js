import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('Form Component', () => {
  test('отображает сообщение об ошибке при отправке пустой формы', () => {
    render(<Form />);
    
    const submitButton = screen.getByText(/Отправить/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/Все поля обязательны для заполнения/i)).toBeInTheDocument();
  });

  test('отображает сообщение об ошибке при отправке формы только с именем', () => {
    render(<Form />);
    
    const nameInput = screen.getByLabelText(/Имя:/i);
    const submitButton = screen.getByText(/Отправить/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Все поля обязательны для заполнения/i)).toBeInTheDocument();
  });

  test('отображает сообщение об ошибке при отправке формы только с email', () => {
    render(<Form />);
    
    const emailInput = screen.getByLabelText(/Email:/i);
    const submitButton = screen.getByText(/Отправить/i);
    
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Все поля обязательны для заполнения/i)).toBeInTheDocument();
  });

  test('успешно отправляет форму при заполнении всех полей', () => {
    // Мокаем console.log чтобы проверить его вызов
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<Form />);
    
    const nameInput = screen.getByLabelText(/Имя:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const submitButton = screen.getByText(/Отправить/i);
    
    // Заполняем форму
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(submitButton);

    // Проверяем что сообщение об ошибке исчезло
    expect(screen.queryByText(/Все поля обязательны для заполнения/i)).not.toBeInTheDocument();
    
    // Проверяем что данные были выведены в консоль
    // Теперь проверяем два аргумента: строку и объект
    expect(consoleSpy).toHaveBeenCalledWith(
      { name: 'John Doe', email: 'john.doe@example.com' }
    );
    
    consoleSpy.mockRestore();
  });

  test('очищает сообщение об ошибке после успешной отправки', () => {
    render(<Form />);
    
    const submitButton = screen.getByText(/Отправить/i);
    
    // Пытаемся отправить пустую форму
    fireEvent.click(submitButton);
    expect(screen.getByText(/Все поля обязательны для заполнения/i)).toBeInTheDocument();
    
    // Заполняем и отправляем форму правильно
    const nameInput = screen.getByLabelText(/Имя:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(submitButton);
    
    // Сообщение об ошибке должно исчезнуть
    expect(screen.queryByText(/Все поля обязательны для заполнения/i)).not.toBeInTheDocument();
  });
});
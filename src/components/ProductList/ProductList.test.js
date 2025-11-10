import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProductList from './ProductList';

jest.mock('axios');

describe('ProductList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('отображает индикатор загрузки', () => {
    axios.get.mockImplementation(() => new Promise(() => {}));
    
    render(<ProductList />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('отображает список товаров после загрузки', async () => {
    const mockProducts = [
      { id: 1, title: 'Product 1' },
      { id: 2, title: 'Product 2' },
      { id: 3, title: 'Product 3' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockProducts });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
  });

  test('обрабатывает ошибку загрузки', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching products:', expect.any(Error));
    
    consoleSpy.mockRestore();
  });
});

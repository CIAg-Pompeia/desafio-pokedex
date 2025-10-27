import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders search input and button', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    
    expect(screen.getByPlaceholderText(/search by name or id/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with query when form is submitted', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    
    const input = screen.getByPlaceholderText(/search by name or id/i);
    fireEvent.change(input, { target: { value: 'pikachu' } });
    
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    
    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });

  it('does not call onSearch when input is empty', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    
    expect(onSearch).not.toHaveBeenCalled();
  });
});


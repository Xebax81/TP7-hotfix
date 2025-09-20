import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

test('renders calculator title', () => {
  render(<Calculator />);
  const titleElement = screen.getByText(/Calculadora TP7/i);
  expect(titleElement).toBeInTheDocument();
});

test('displays initial zero in display', () => {
  render(<Calculator />);
  const displayElement = screen.getByTestId('display');
  expect(displayElement).toHaveTextContent('0');
});

test('can input numbers', () => {
  render(<Calculator />);
  const button5 = screen.getByRole('button', { name: '5' });
  fireEvent.click(button5);

  const displayElement = screen.getByTestId('display');
  expect(displayElement).toHaveTextContent('5');
});

test('can perform basic addition', () => {
  render(<Calculator />);

  // Click 2 + 3 =
  fireEvent.click(screen.getByRole('button', { name: '2' }));
  fireEvent.click(screen.getByRole('button', { name: '+' }));
  fireEvent.click(screen.getByRole('button', { name: '3' }));
  fireEvent.click(screen.getByRole('button', { name: '=' }));

  const displayElement = screen.getByTestId('display');
  expect(displayElement).toHaveTextContent('5');
});

test('can toggle scientific mode', () => {
  render(<Calculator />);
  const toggleButton = screen.getByText('Científica');
  fireEvent.click(toggleButton);

  // Check if scientific functions appear
  const sinButton = screen.getByText('sin');
  expect(sinButton).toBeInTheDocument();

  const basicToggle = screen.getByText('Básica');
  expect(basicToggle).toBeInTheDocument();
});

test('handles division by zero error', () => {
  render(<Calculator />);

  // Click 5 / 0 =
  fireEvent.click(screen.getByRole('button', { name: '5' }));
  fireEvent.click(screen.getByRole('button', { name: '/' }));
  fireEvent.click(screen.getByRole('button', { name: '0' }));
  fireEvent.click(screen.getByRole('button', { name: '=' }));

  const displayElement = screen.getByTestId('display');
  expect(displayElement).toHaveTextContent('Error');
});

test('clears display when AC is pressed', () => {
  render(<Calculator />);

  // Input a number first
  fireEvent.click(screen.getByRole('button', { name: '7' }));
  let displayElement = screen.getByTestId('display');
  expect(displayElement).toHaveTextContent('7');

  // Press AC
  fireEvent.click(screen.getByRole('button', { name: 'AC' }));
  displayElement = screen.getByTestId('display');
  expect(displayElement).toHaveTextContent('0');
});

test('performs scientific operations', () => {
  render(<Calculator />);

  // Switch to scientific mode
  fireEvent.click(screen.getByText('Científica'));

  // Test square root of 9
  fireEvent.click(screen.getByRole('button', { name: '9' }));
  fireEvent.click(screen.getByRole('button', { name: '√' }));

  const displayElement = screen.getByTestId('display');
  expect(displayElement).toHaveTextContent('3');
});

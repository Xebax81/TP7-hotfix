import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from './Calculator';

/**
 * Integration Tests - Calculator Component
 *
 * These tests validate complete user workflows and interactions
 * between multiple components and features working together.
 */

describe('Calculator Integration Tests', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // Helper function para clicks más robustos
  const safeClick = async buttonName => {
    await act(async () => {
      await user.click(screen.getByRole('button', { name: buttonName }));
    });
  };

  // Helper para clicks de texto (como cambio de modo)
  const safeClickText = async text => {
    await act(async () => {
      await user.click(screen.getByText(text));
    });
  };

  test('complex calculation workflow: (15 + 25) * 2 / 5 = 16', async () => {
    render(<Calculator />);

    // Perform complex calculation: (15 + 25) * 2 / 5
    // Step 1: 15 + 25 = 40
    await safeClick('1');
    await safeClick('5');
    await safeClick('+');
    await safeClick('2');
    await safeClick('5');
    await safeClick('=');

    // Verify intermediate result
    expect(screen.getByTestId('display')).toHaveTextContent('40');

    // Step 2: 40 * 2 = 80
    await safeClick('×');
    await safeClick('2');
    await safeClick('=');

    expect(screen.getByTestId('display')).toHaveTextContent('80');

    // Step 3: 80 / 5 = 16
    await safeClick('/');
    await safeClick('5');
    await safeClick('=');

    expect(screen.getByTestId('display')).toHaveTextContent('16');
  });

  test('scientific mode integration: simple calculation', async () => {
    render(<Calculator />);

    // Switch to scientific mode
    await safeClickText('Científica');

    // Verify scientific buttons are visible
    expect(screen.getByRole('button', { name: 'sin' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'cos' })).toBeInTheDocument();

    // Simple calculation in scientific mode: 2² = 4
    await safeClick('AC');
    await safeClick('2');
    await safeClick('x^y');
    await safeClick('2');
    await safeClick('=');

    expect(screen.getByTestId('display')).toHaveTextContent('4');
  });

  test('decimal precision workflow: 0.1 + 0.2 handling', async () => {
    render(<Calculator />);

    // Test famous floating point precision issue
    await safeClick('0');
    await safeClick('.');
    await safeClick('1');
    await safeClick('+');
    await safeClick('0');
    await safeClick('.');
    await safeClick('2');
    await safeClick('=');

    const result = parseFloat(screen.getByTestId('display').textContent);
    expect(result).toBeCloseTo(0.3, 10); // Should handle floating point precision
  });

  test('error recovery workflow: division by zero then continue', async () => {
    render(<Calculator />);

    // Cause division by zero error
    await safeClick('5');
    await safeClick('/');
    await safeClick('0');
    await safeClick('=');

    expect(screen.getByTestId('display')).toHaveTextContent('Error');

    // Recover with AC and continue with new calculation
    await safeClick('AC');
    expect(screen.getByTestId('display')).toHaveTextContent('0');

    // Perform successful calculation
    await safeClick('8');
    await safeClick('+');
    await safeClick('2');
    await safeClick('=');

    expect(screen.getByTestId('display')).toHaveTextContent('10');
  });

  test('mode switching preserves calculation state', async () => {
    render(<Calculator />);

    // Start calculation in basic mode
    await safeClick('1');
    await safeClick('2');
    await safeClick('+');

    // Switch to scientific mode
    await safeClickText('Científica');

    // Verify display shows current number
    expect(screen.getByTestId('display')).toHaveTextContent('12');

    // Continue calculation in scientific mode
    await safeClick('8');
    await safeClick('=');

    expect(screen.getByTestId('display')).toHaveTextContent('20');

    // Switch back to basic mode
    await safeClickText('Básica');

    // State should be preserved
    expect(screen.getByTestId('display')).toHaveTextContent('20');
  });

  test('multiple operations with memory persistence', async () => {
    render(<Calculator />);

    // Calculation 1: 5 * 3 = 15
    await safeClick('5');
    await safeClick('×');
    await safeClick('3');
    await safeClick('=');

    expect(screen.getByTestId('display')).toHaveTextContent('15');

    // Calculation 2: Continue with result: 15 - 5 = 10
    await safeClick('-');
    await safeClick('5');
    await safeClick('=');

    expect(screen.getByTestId('display')).toHaveTextContent('10');

    // Calculation 3: Continue: 10 / 2 = 5
    await safeClick('/');
    await safeClick('2');
    await safeClick('=');

    expect(screen.getByTestId('display')).toHaveTextContent('5');
  });

  test('scientific functions integration workflow', async () => {
    render(<Calculator />);

    // Switch to scientific mode
    await safeClickText('Científica');

    // Test workflow: √(4^2) + 3! = 4 + 6 = 10

    // Step 1: Calculate 4^2
    await safeClick('4');
    await safeClick('x^y');
    await safeClick('2');
    await safeClick('=');

    expect(screen.getByTestId('display')).toHaveTextContent('16');

    // Step 2: Calculate √16
    await safeClick('√');

    expect(screen.getByTestId('display')).toHaveTextContent('4');

    // Step 3: Add 3!
    await safeClick('+');
    await safeClick('3');
    await safeClick('x!');

    expect(screen.getByTestId('display')).toHaveTextContent('6');

    // Step 4: Complete calculation
    await safeClick('=');

    expect(screen.getByTestId('display')).toHaveTextContent('10');
  });

  test('input validation and edge cases integration', async () => {
    render(<Calculator />);

    // Test multiple decimal points prevention
    await safeClick('3');
    await safeClick('.');
    await safeClick('1');
    await safeClick('.'); // Should be ignored
    await safeClick('4');

    expect(screen.getByTestId('display')).toHaveTextContent('3.14');

    // Test leading zeros handling
    await safeClick('AC');
    await safeClick('0');
    await safeClick('0');
    await safeClick('5');

    expect(screen.getByTestId('display')).toHaveTextContent('5');
  });
});

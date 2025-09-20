import { render, screen } from '@testing-library/react';
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

  test('complex calculation workflow: (15 + 25) * 2 / 5 = 16', async () => {
    render(<Calculator />);

    // Perform complex calculation: (15 + 25) * 2 / 5
    // Step 1: 15 + 25 = 40
    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    // Verify intermediate result
    expect(screen.getByTestId('display')).toHaveTextContent('40');

    // Step 2: 40 * 2 = 80
    await user.click(screen.getByRole('button', { name: '*' }));
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByTestId('display')).toHaveTextContent('80');

    // Step 3: 80 / 5 = 16
    await user.click(screen.getByRole('button', { name: '/' }));
    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByTestId('display')).toHaveTextContent('16');
  });

  test('scientific mode integration: sin(30°) + cos(60°) ≈ 1', async () => {
    render(<Calculator />);

    // Switch to scientific mode
    await user.click(screen.getByText('Científica'));

    // Verify scientific buttons are visible
    expect(screen.getByRole('button', { name: 'sin' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'cos' })).toBeInTheDocument();

    // Calculate sin(30°) ≈ 0.5
    // First clear display and input 30
    await user.click(screen.getByRole('button', { name: 'AC' }));
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: '0' }));

    // Convert to radians: 30 * π / 180
    await user.click(screen.getByRole('button', { name: '*' }));
    await user.click(screen.getByRole('button', { name: 'π' }));
    await user.click(screen.getByRole('button', { name: '/' }));
    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: '8' }));
    await user.click(screen.getByRole('button', { name: '0' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    // Apply sin function
    await user.click(screen.getByRole('button', { name: 'sin' }));

    const sinResult = parseFloat(screen.getByTestId('display').textContent);
    expect(sinResult).toBeCloseTo(0.5, 1); // sin(30°) ≈ 0.5
  });

  test('decimal precision workflow: 0.1 + 0.2 handling', async () => {
    render(<Calculator />);

    // Test famous floating point precision issue
    await user.click(screen.getByRole('button', { name: '0' }));
    await user.click(screen.getByRole('button', { name: '.' }));
    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '0' }));
    await user.click(screen.getByRole('button', { name: '.' }));
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    const result = parseFloat(screen.getByTestId('display').textContent);
    expect(result).toBeCloseTo(0.3, 10); // Should handle floating point precision
  });

  test('error recovery workflow: division by zero then continue', async () => {
    render(<Calculator />);

    // Cause division by zero error
    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: '/' }));
    await user.click(screen.getByRole('button', { name: '0' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByTestId('display')).toHaveTextContent('Error');

    // Recover with AC and continue with new calculation
    await user.click(screen.getByRole('button', { name: 'AC' }));
    expect(screen.getByTestId('display')).toHaveTextContent('0');

    // Perform successful calculation
    await user.click(screen.getByRole('button', { name: '8' }));
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByTestId('display')).toHaveTextContent('10');
  });

  test('mode switching preserves calculation state', async () => {
    render(<Calculator />);

    // Start calculation in basic mode
    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: '+' }));

    // Switch to scientific mode
    await user.click(screen.getByText('Científica'));

    // Verify display shows current number
    expect(screen.getByTestId('display')).toHaveTextContent('12');

    // Continue calculation in scientific mode
    await user.click(screen.getByRole('button', { name: '8' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByTestId('display')).toHaveTextContent('20');

    // Switch back to basic mode
    await user.click(screen.getByText('Básica'));

    // State should be preserved
    expect(screen.getByTestId('display')).toHaveTextContent('20');
  });

  test('multiple operations with memory persistence', async () => {
    render(<Calculator />);

    // Calculation 1: 5 * 3 = 15
    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: '*' }));
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByTestId('display')).toHaveTextContent('15');

    // Calculation 2: Continue with result: 15 - 5 = 10
    await user.click(screen.getByRole('button', { name: '-' }));
    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByTestId('display')).toHaveTextContent('10');

    // Calculation 3: Continue: 10 / 2 = 5
    await user.click(screen.getByRole('button', { name: '/' }));
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByTestId('display')).toHaveTextContent('5');
  });

  test('scientific functions integration workflow', async () => {
    render(<Calculator />);

    // Switch to scientific mode
    await user.click(screen.getByText('Científica'));

    // Test workflow: √(4²) + 3! = 4 + 6 = 10

    // Step 1: Calculate 4²
    await user.click(screen.getByRole('button', { name: '4' }));
    await user.click(screen.getByRole('button', { name: 'x²' }));

    expect(screen.getByTestId('display')).toHaveTextContent('16');

    // Step 2: Calculate √16
    await user.click(screen.getByRole('button', { name: '√' }));

    expect(screen.getByTestId('display')).toHaveTextContent('4');

    // Step 3: Add 3!
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: '!' }));

    expect(screen.getByTestId('display')).toHaveTextContent('6');

    // Step 4: Complete calculation
    await user.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByTestId('display')).toHaveTextContent('10');
  });

  test('input validation and edge cases integration', async () => {
    render(<Calculator />);

    // Test multiple decimal points prevention
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: '.' }));
    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: '.' })); // Should be ignored
    await user.click(screen.getByRole('button', { name: '4' }));

    expect(screen.getByTestId('display')).toHaveTextContent('3.14');

    // Test leading zeros handling
    await user.click(screen.getByRole('button', { name: 'AC' }));
    await user.click(screen.getByRole('button', { name: '0' }));
    await user.click(screen.getByRole('button', { name: '0' }));
    await user.click(screen.getByRole('button', { name: '5' }));

    expect(screen.getByTestId('display')).toHaveTextContent('5');
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from './Calculator';

/**
 * Regression Tests - Calculator Component
 *
 * These tests ensure that previously working functionality
 * continues to work after changes are made to the codebase.
 * They focus on critical features that should never break.
 */

describe('Calculator Regression Tests', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Critical Core Functionality', () => {
    test('REGRESSION: Basic arithmetic operations always work', async () => {
      render(<Calculator />);

      // Addition regression test
      await user.click(screen.getByRole('button', { name: '7' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      expect(screen.getByTestId('display')).toHaveTextContent('10');

      await user.click(screen.getByRole('button', { name: 'AC' }));

      // Subtraction regression test
      await user.click(screen.getByRole('button', { name: '9' }));
      await user.click(screen.getByRole('button', { name: '-' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      expect(screen.getByTestId('display')).toHaveTextContent('5');

      await user.click(screen.getByRole('button', { name: 'AC' }));

      // Multiplication regression test
      await user.click(screen.getByRole('button', { name: '6' }));
      await user.click(screen.getByRole('button', { name: '×' }));
      await user.click(screen.getByRole('button', { name: '7' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      expect(screen.getByTestId('display')).toHaveTextContent('42');

      await user.click(screen.getByRole('button', { name: 'AC' }));

      // Division regression test
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '/' }));
      await user.click(screen.getByRole('button', { name: '6' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      expect(screen.getByTestId('display')).toHaveTextContent('4');
    });

    test('REGRESSION: Calculator title and UI elements always render', () => {
      render(<Calculator />);

      // Critical UI elements that should never disappear
      expect(screen.getByText(/Calculadora TP7/i)).toBeInTheDocument();
      expect(screen.getByTestId('display')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'AC' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '=' })).toBeInTheDocument();
      expect(screen.getByText('Científica')).toBeInTheDocument();
    });

    test('REGRESSION: Mode toggle functionality never breaks', async () => {
      render(<Calculator />);

      // Should start in basic mode
      expect(screen.getByText('Científica')).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'sin' })
      ).not.toBeInTheDocument();

      // Toggle to scientific mode
      await user.click(screen.getByText('Científica'));
      expect(screen.getByText('Básica')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'sin' })).toBeInTheDocument();

      // Toggle back to basic mode
      await user.click(screen.getByText('Básica'));
      expect(screen.getByText('Científica')).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'sin' })
      ).not.toBeInTheDocument();
    });
  });

  describe('Error Handling Regression', () => {
    test('REGRESSION: Division by zero always shows Error', async () => {
      render(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '/' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '=' }));

      expect(screen.getByTestId('display')).toHaveTextContent('Error');
    });

    test('REGRESSION: AC always clears error state', async () => {
      render(<Calculator />);

      // Create error state
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '/' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      expect(screen.getByTestId('display')).toHaveTextContent('Error');

      // AC should always clear
      await user.click(screen.getByRole('button', { name: 'AC' }));
      expect(screen.getByTestId('display')).toHaveTextContent('0');
    });
  });

  describe('Scientific Functions Regression', () => {
    test('REGRESSION: Scientific functions always accessible in scientific mode', async () => {
      render(<Calculator />);

      await user.click(screen.getByText('Científica'));

      // All scientific functions should be present
      const scientificFunctions = [
        'sin',
        'cos',
        'tan',
        'log',
        '√',
        'x!',
        '|x|',
        'x^y',
      ];

      scientificFunctions.forEach(func => {
        expect(screen.getByRole('button', { name: func })).toBeInTheDocument();
      });
    });

    test('REGRESSION: Square root calculation never fails for positive numbers', async () => {
      render(<Calculator />);

      await user.click(screen.getByText('Científica'));

      // Test √16 = 4
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '6' }));
      await user.click(screen.getByRole('button', { name: '√' }));

      expect(screen.getByTestId('display')).toHaveTextContent('4');

      await user.click(screen.getByRole('button', { name: 'AC' }));

      // Test √9 = 3
      await user.click(screen.getByRole('button', { name: '9' }));
      await user.click(screen.getByRole('button', { name: '√' }));

      expect(screen.getByTestId('display')).toHaveTextContent('3');
    });

    test('REGRESSION: Factorial calculation never fails for valid inputs', async () => {
      render(<Calculator />);

      await user.click(screen.getByText('Científica'));

      // Test 5! = 120
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: 'x!' }));

      expect(screen.getByTestId('display')).toHaveTextContent('120');

      await user.click(screen.getByRole('button', { name: 'AC' }));

      // Test 0! = 1
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: 'x!' }));

      expect(screen.getByTestId('display')).toHaveTextContent('1');
    });
  });

  describe('Input Validation Regression', () => {
    test('REGRESSION: Multiple decimal points never allowed', async () => {
      render(<Calculator />);

      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '.' })); // Should be ignored
      await user.click(screen.getByRole('button', { name: '4' }));

      expect(screen.getByTestId('display')).toHaveTextContent('3.14');
    });

    test('REGRESSION: Display never exceeds reasonable length', async () => {
      render(<Calculator />);

      // Try to input very long number
      for (let i = 0; i < 20; i++) {
        await user.click(screen.getByRole('button', { name: '9' }));
      }

      const displayContent = screen.getByTestId('display').textContent;
      // Should have some reasonable limit (exact limit may vary)
      expect(displayContent.length).toBeLessThanOrEqual(20);
    });
  });

  describe('Memory and State Regression', () => {
    test('REGRESSION: Previous calculation result always available for next operation', async () => {
      render(<Calculator />);

      // Calculate 6 * 7 = 42
      await user.click(screen.getByRole('button', { name: '6' }));
      await user.click(screen.getByRole('button', { name: '×' }));
      await user.click(screen.getByRole('button', { name: '7' }));
      await user.click(screen.getByRole('button', { name: '=' }));

      expect(screen.getByTestId('display')).toHaveTextContent('42');

      // Use result in next calculation: 42 + 8 = 50
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '8' }));
      await user.click(screen.getByRole('button', { name: '=' }));

      expect(screen.getByTestId('display')).toHaveTextContent('50');
    });

    test('REGRESSION: Calculator state never corrupted by mode switches', async () => {
      render(<Calculator />);

      // Start calculation
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '+' }));

      // Switch modes
      await user.click(screen.getByText('Científica'));
      await user.click(screen.getByText('Básica'));

      // Continue calculation
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '=' }));

      expect(screen.getByTestId('display')).toHaveTextContent('15');
    });
  });

  describe('Performance Regression', () => {
    test('REGRESSION: Calculator renders within reasonable time', () => {
      const startTime = performance.now();
      render(<Calculator />);
      const endTime = performance.now();

      // Should render within 100ms (generous threshold)
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('REGRESSION: Button clicks always responsive', async () => {
      render(<Calculator />);

      const startTime = performance.now();

      // Rapid button clicks should all register
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '3' }));

      const endTime = performance.now();

      expect(screen.getByTestId('display')).toHaveTextContent('123');
      expect(endTime - startTime).toBeLessThan(500); // Should be very fast
    });
  });

  describe('Accessibility Regression', () => {
    test('REGRESSION: All buttons always have accessible names', () => {
      render(<Calculator />);

      // Basic mode buttons
      const basicButtons = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '+',
        '-',
        '×',
        '/',
        '=',
        'AC',
        '.',
      ];

      basicButtons.forEach(buttonName => {
        expect(
          screen.getByRole('button', { name: buttonName })
        ).toBeInTheDocument();
      });

      // Mode toggle button
      expect(screen.getByText('Científica')).toBeInTheDocument();
    });

    test('REGRESSION: Display always has proper test ID for automation', () => {
      render(<Calculator />);

      expect(screen.getByTestId('display')).toBeInTheDocument();
    });
  });
});

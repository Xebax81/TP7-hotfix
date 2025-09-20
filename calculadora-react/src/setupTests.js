import '@testing-library/jest-dom';

// Suprimir warnings específicos en entorno de test
const originalError = console.error; // eslint-disable-line no-console
beforeAll(() => {
  console.error = (...args) => {
    // eslint-disable-line no-console
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('ReactDOMTestUtils.act') ||
        args[0].includes(
          'Warning: An update to Calculator inside a test was not wrapped in act'
        ))
    ) {
      return;
    }
    originalError.call(console, ...args); // eslint-disable-line no-console
  };
});

afterAll(() => {
  console.error = originalError; // eslint-disable-line no-console
});

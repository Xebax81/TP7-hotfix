import React, { useState } from 'react';
import Calculadora from '../Calculadora';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [error, setError] = useState('');

  const calc = new Calculadora();

  const inputDigit = digit => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
    setError('');
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
    setError('');
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setError('');
  };

  const performOperation = nextOperation => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      try {
        let result;
        switch (operation) {
          case '+':
            result = calc.sumar(currentValue, inputValue);
            break;
          case '-':
            result = calc.restar(currentValue, inputValue);
            break;
          case '*':
            result = calc.multiplicar(currentValue, inputValue);
            break;
          case '/':
            result = calc.dividir(currentValue, inputValue);
            break;
          case '^':
            result = calc.potencia(currentValue, inputValue);
            break;
          case '%':
            result = calc.modulo(currentValue, inputValue);
            break;
          default:
            return;
        }
        setDisplay(String(result));
        setPreviousValue(result);
      } catch (error) {
        setError(error.message);
        setDisplay('Error');
        setPreviousValue(null);
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    performOperation(null);
    setOperation(null);
    setPreviousValue(null);
    setWaitingForOperand(true);
  };

  const performScientificOperation = operation => {
    const inputValue = parseFloat(display);
    try {
      let result;
      switch (operation) {
        case 'sqrt':
          result = calc.raizCuadrada(inputValue);
          break;
        case 'factorial':
          if (!Number.isInteger(inputValue) || inputValue < 0) {
            throw new Error(
              'El factorial requiere un número entero no negativo'
            );
          }
          result = calc.factorial(inputValue);
          break;
        case 'log':
          result = calc.logaritmo(inputValue);
          break;
        case 'sin':
          result = calc.seno(inputValue);
          break;
        case 'cos':
          result = calc.coseno(inputValue);
          break;
        case 'tan':
          result = calc.tangente(inputValue);
          break;
        case 'abs':
          result = calc.valorAbsoluto(inputValue);
          break;
        default:
          return;
      }
      setDisplay(String(result));
      setWaitingForOperand(true);
    } catch (error) {
      setError(error.message);
      setDisplay('Error');
    }
  };

  const toggleScientific = () => {
    setIsScientific(!isScientific);
  };

  return (
    <div className="calculator">
      <div className="calculator-header">
        <h1>Calculadora TP7</h1>
        <button className="mode-toggle" onClick={toggleScientific}>
          {isScientific ? 'Básica' : 'Científica'}
        </button>
      </div>

      <div className="display">
        <div
          className="display-value"
          data-testid="display"
          role="textbox"
          aria-label="calculator display"
          aria-readonly="true"
        >
          {display}
        </div>
        {error && (
          <div className="error-message" data-testid="error-message">
            {error}
          </div>
        )}
      </div>

      <div className={`button-grid ${isScientific ? 'scientific' : 'basic'}`}>
        {isScientific ? (
          <>
            {/* Primera fila - Funciones trigonométricas y logaritmo */}
            <button
              className="scientific-function"
              onClick={() => performScientificOperation('sin')}
            >
              sin
            </button>
            <button
              className="scientific-function"
              onClick={() => performScientificOperation('cos')}
            >
              cos
            </button>
            <button
              className="scientific-function"
              onClick={() => performScientificOperation('tan')}
            >
              tan
            </button>
            <button
              className="scientific-function"
              onClick={() => performScientificOperation('log')}
            >
              log
            </button>

            {/* Segunda fila - Funciones matemáticas */}
            <button
              className="scientific-function"
              onClick={() => performScientificOperation('sqrt')}
            >
              √
            </button>
            <button
              className="scientific-function"
              onClick={() => performScientificOperation('factorial')}
            >
              x!
            </button>
            <button
              className="scientific-function"
              onClick={() => performScientificOperation('abs')}
            >
              |x|
            </button>
            <button
              className="scientific-function"
              onClick={() => performOperation('^')}
            >
              x^y
            </button>

            {/* Tercera fila - Operaciones básicas */}
            <button className="function" onClick={clear}>
              AC
            </button>
            <button className="function" onClick={() => performOperation('%')}>
              %
            </button>
            <button className="function" onClick={() => performOperation('/')}>
              /
            </button>
            <button className="operator" onClick={() => performOperation('*')}>
              ×
            </button>

            {/* Cuarta fila - Números */}
            <button onClick={() => inputDigit(7)}>7</button>
            <button onClick={() => inputDigit(8)}>8</button>
            <button onClick={() => inputDigit(9)}>9</button>
            <button className="operator" onClick={() => performOperation('-')}>
              -
            </button>

            {/* Quinta fila - Números */}
            <button onClick={() => inputDigit(4)}>4</button>
            <button onClick={() => inputDigit(5)}>5</button>
            <button onClick={() => inputDigit(6)}>6</button>
            <button className="operator" onClick={() => performOperation('+')}>
              +
            </button>

            {/* Sexta fila - Números */}
            <button onClick={() => inputDigit(1)}>1</button>
            <button onClick={() => inputDigit(2)}>2</button>
            <button onClick={() => inputDigit(3)}>3</button>
            <button className="operator equals" onClick={calculate}>
              =
            </button>

            {/* Séptima fila - Cero y decimal */}
            <button className="zero" onClick={() => inputDigit(0)}>
              0
            </button>
            <button onClick={inputDecimal}>.</button>
          </>
        ) : (
          <>
            <button className="function" onClick={clear}>
              AC
            </button>
            <button className="function" onClick={() => performOperation('%')}>
              %
            </button>
            <button className="function" onClick={() => performOperation('/')}>
              /
            </button>
            <button className="operator" onClick={() => performOperation('*')}>
              ×
            </button>

            <button onClick={() => inputDigit(7)}>7</button>
            <button onClick={() => inputDigit(8)}>8</button>
            <button onClick={() => inputDigit(9)}>9</button>
            <button className="operator" onClick={() => performOperation('-')}>
              -
            </button>

            <button onClick={() => inputDigit(4)}>4</button>
            <button onClick={() => inputDigit(5)}>5</button>
            <button onClick={() => inputDigit(6)}>6</button>
            <button className="operator" onClick={() => performOperation('+')}>
              +
            </button>

            <button onClick={() => inputDigit(1)}>1</button>
            <button onClick={() => inputDigit(2)}>2</button>
            <button onClick={() => inputDigit(3)}>3</button>
            <button className="operator equals" onClick={calculate} rowSpan="2">
              =
            </button>

            <button className="zero" onClick={() => inputDigit(0)}>
              0
            </button>
            <button onClick={inputDecimal}>.</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator;

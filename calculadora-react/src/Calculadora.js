class Calculadora {
    sumar(a, b) {
        return a + b;
    }

    restar(a, b) {
        return a - b;
    }

    multiplicar(a, b) {
        return a * b;
    }

    dividir(a, b) {
        if (b === 0) {
            throw new Error("No se puede dividir por cero");
        }
        return a / b;
    }

    potencia(base, exponente) {
        return Math.pow(base, exponente);
    }

    factorial(n) {
        if (n < 0) {
            throw new Error("El factorial no está definido para números negativos");
        }
        if (n === 0 || n === 1) {
            return 1;
        }

        let resultado = 1;
        for (let i = 2; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    }

    modulo(a, b) {
        if (b === 0) {
            throw new Error("No se puede dividir por cero");
        }
        return a % b;
    }

    promedio(numeros) {
        if (!numeros || numeros.length === 0) {
            throw new Error("La lista no puede estar vacía");
        }
        return numeros.reduce((sum, num) => sum + num, 0) / numeros.length;
    }

    esPar(n) {
        return n % 2 === 0;
    }

    raizCuadrada(x) {
        if (x < 0) {
            throw new Error("No se puede calcular la raíz cuadrada de un número negativo");
        }
        return Math.sqrt(x);
    }

    valorAbsoluto(x) {
        return Math.abs(x);
    }

    redondear(numero, decimales) {
        try {
            return Number(parseFloat(numero).toFixed(parseInt(decimales)));
        } catch (error) {
            throw new Error("Los parámetros deben ser numéricos");
        }
    }

    maximo(lista) {
        if (!lista || lista.length === 0) {
            throw new Error("La lista no puede estar vacía");
        }
        return Math.max(...lista);
    }

    minimo(lista) {
        if (!lista || lista.length === 0) {
            throw new Error("La lista no puede estar vacía");
        }
        return Math.min(...lista);
    }

    logaritmo(x) {
        if (x <= 0) {
            throw new Error("El logaritmo solo está definido para números positivos");
        }
        return Math.log10(x);
    }

    seno(x) {
        return Math.sin(x);
    }

    coseno(x) {
        return Math.cos(x);
    }

    tangente(x) {
        return Math.tan(x);
    }

    porcentaje(valor, porcentaje) {
        return (valor * porcentaje) / 100;
    }
}

export default Calculadora;
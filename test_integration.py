"""
Tests de Integración para la Calculadora Python
===============================================

Estos tests validan flujos completos end-to-end que combinan múltiples
operaciones de la calculadora, simulando casos de uso reales.
"""

import pytest
import math
from calculadora_python import Calculadora


class TestIntegracionCalculadora:
    """Test suite de integración para flujos completos de la calculadora."""

    def setup_method(self):
        """Configuración inicial para cada test."""
        self.calc = Calculadora()

    def test_flujo_completo_formula_cuadratica(self):
        """
        Test de integración: Resolver ecuación cuadrática usando múltiples
        operaciones. Formula: (-b ± √(b²-4ac)) / 2a
        Ejemplo: x² - 5x + 6 = 0 (a=1, b=-5, c=6)
        """
        # Parámetros de la ecuación: x² - 5x + 6 = 0
        a, b, c = 1, -5, 6

        # Calcular discriminante: b² - 4ac
        b_cuadrado = self.calc.potencia(b, 2)  # (-5)² = 25
        producto_ac = self.calc.multiplicar(a, c)  # 1*6 = 6
        cuatro_ac = self.calc.multiplicar(4, producto_ac)  # 4*6 = 24
        discriminante = self.calc.restar(b_cuadrado, cuatro_ac)  # 25 - 24 = 1

        # Validar que el discriminante es positivo (tiene soluciones reales)
        assert discriminante >= 0, "La ecuación debe tener soluciones reales"

        # Calcular las dos soluciones
        sqrt_discriminante = self.calc.raiz_cuadrada(discriminante)  # √1 = 1
        dos_a = self.calc.multiplicar(2, a)  # 2*1 = 2

        # Solución 1: (-b + √discriminante) / 2a
        numerador1 = self.calc.sumar(-b, sqrt_discriminante)  # 5 + 1 = 6
        solucion1 = self.calc.dividir(numerador1, dos_a)  # 6/2 = 3

        # Solución 2: (-b - √discriminante) / 2a
        numerador2 = self.calc.restar(-b, sqrt_discriminante)  # 5 - 1 = 4
        solucion2 = self.calc.dividir(numerador2, dos_a)  # 4/2 = 2

        # Verificar las soluciones
        assert solucion1 == 3.0
        assert solucion2 == 2.0

        # Validación adicional: sustituir en la ecuación original
        # Para x=3: 3² - 5*3 + 6 = 9 - 15 + 6 = 0
        verificacion1 = self.calc.sumar(
            self.calc.restar(
                self.calc.potencia(solucion1, 2), self.calc.multiplicar(5, solucion1)
            ),
            6,
        )
        assert abs(verificacion1) < 1e-10  # Debe ser ≈ 0

    def test_flujo_trigonometrico_identidad_pitagorica(self):
        """
        Test de integración: Validar cálculos trigonométricos usando seno
        y operaciones básicas. Prueba sen(π/6) = 0.5 y otros valores conocidos.
        """
        # Test de valores conocidos de seno
        test_cases = [
            (0, 0.0),  # sen(0) = 0
            (math.pi / 6, 0.5),  # sen(π/6) = 0.5
            (math.pi / 2, 1.0),  # sen(π/2) = 1
        ]

        for angulo, valor_esperado in test_cases:
            sen_calculado = self.calc.seno(angulo)
            diferencia = self.calc.restar(sen_calculado, valor_esperado)
            diferencia_absoluta = self.calc.valor_absoluto(diferencia)

            # Verificar que la diferencia sea muy pequeña
            assert diferencia_absoluta < 1e-10, f"Seno de {angulo} falló"

    def test_flujo_estadistico_media_y_desviacion(self):
        """
        Test de integración: Calcular media aritmética y desviación estándar
        usando operaciones básicas de la calculadora.
        """
        datos = [2, 4, 4, 4, 5, 5, 7, 9]
        n = len(datos)

        # Calcular la media aritmética
        suma_total = 0
        for valor in datos:
            suma_total = self.calc.sumar(suma_total, valor)

        media = self.calc.dividir(suma_total, n)  # Σx / n
        assert media == 5.0

        # Calcular la desviación estándar
        suma_diferencias_cuadrado = 0
        for valor in datos:
            diferencia = self.calc.restar(valor, media)  # x - μ
            diferencia_cuadrado = self.calc.potencia(diferencia, 2)  # (x - μ)²
            suma_diferencias_cuadrado = self.calc.sumar(
                suma_diferencias_cuadrado, diferencia_cuadrado
            )

        varianza = self.calc.dividir(suma_diferencias_cuadrado, n)  # Σ(x-μ)² / n
        desviacion_estandar = self.calc.raiz_cuadrada(varianza)  # √varianza

        # Verificar resultado (desviación estándar esperada ≈ 2.0)
        assert abs(desviacion_estandar - 2.0) < 1e-10

    def test_flujo_compuesto_interes_compuesto(self):
        """
        Test de integración: Calcular interés compuesto usando múltiples operaciones.
        Fórmula: A = P(1 + r/n)^(nt)
        """
        # Parámetros: Principal=1000, tasa=5%, periodos=4, años=3
        principal = 1000  # P
        tasa_anual = 0.05  # r
        periodos_por_ano = 4  # n (trimestral)
        anos = 3  # t

        # Calcular (r/n)
        tasa_por_periodo = self.calc.dividir(
            tasa_anual, periodos_por_ano
        )  # 0.05/4 = 0.0125

        # Calcular (1 + r/n)
        uno_mas_tasa = self.calc.sumar(1, tasa_por_periodo)  # 1 + 0.0125 = 1.0125

        # Calcular (nt)
        exponente = self.calc.multiplicar(periodos_por_ano, anos)  # 4 * 3 = 12

        # Calcular (1 + r/n)^(nt)
        factor_crecimiento = self.calc.potencia(uno_mas_tasa, exponente)  # 1.0125^12

        # Calcular monto final: A = P * factor
        monto_final = self.calc.multiplicar(principal, factor_crecimiento)

        # Verificar que el resultado esté en el rango esperado (~1160.75)
        assert 1160 <= monto_final <= 1161, f"Monto final calculado: {monto_final}"

    def test_flujo_fibonacci_usando_operaciones_basicas(self):
        """
        Test de integración: Generar secuencia de Fibonacci usando solo
        operaciones básicas de suma de la calculadora.
        """
        # Generar los primeros 10 números de Fibonacci
        fib_esperado = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
        fib_calculado = []

        # Casos base
        if len(fib_esperado) > 0:
            fib_calculado.append(0)
        if len(fib_esperado) > 1:
            fib_calculado.append(1)

        # Generar el resto usando suma
        for i in range(2, len(fib_esperado)):
            siguiente = self.calc.sumar(fib_calculado[i - 1], fib_calculado[i - 2])
            fib_calculado.append(siguiente)

        # Verificar que la secuencia sea correcta
        assert fib_calculado == fib_esperado

    def test_flujo_conversion_temperatura_completo(self):
        """
        Test de integración: Conversiones de temperatura en cadena.
        Celsius → Fahrenheit → Kelvin → Celsius (debe volver al valor original)
        """
        temperatura_original = 25.0  # 25°C

        # Celsius a Fahrenheit: F = C * 9/5 + 32
        nueve_quintos = self.calc.dividir(9, 5)  # 9/5 = 1.8
        celsius_multiplicado = self.calc.multiplicar(
            temperatura_original, nueve_quintos
        )  # 25 * 1.8 = 45
        fahrenheit = self.calc.sumar(celsius_multiplicado, 32)  # 45 + 32 = 77°F

        # Fahrenheit a Kelvin: K = (F - 32) * 5/9 + 273.15
        fahrenheit_menos_32 = self.calc.restar(fahrenheit, 32)  # 77 - 32 = 45
        cinco_novenos = self.calc.dividir(5, 9)  # 5/9 ≈ 0.5556
        celsius_temp = self.calc.multiplicar(
            fahrenheit_menos_32, cinco_novenos
        )  # 45 * 0.5556 = 25
        kelvin = self.calc.sumar(celsius_temp, 273.15)  # 25 + 273.15 = 298.15K

        # Kelvin a Celsius: C = K - 273.15
        celsius_final = self.calc.restar(kelvin, 273.15)  # 298.15 - 273.15 = 25°C

        # Verificar que volvemos al valor original (con tolerancia)
        assert abs(celsius_final - temperatura_original) < 1e-10

    def test_flujo_manejo_errores_secuencial(self):
        """
        Test de integración: Validar que los errores se manejen correctamente
        en operaciones secuenciales que fallan.
        """
        # Test 1: División por cero en operación compuesta
        with pytest.raises(ValueError, match="No se puede dividir por cero"):
            resultado_intermedio = self.calc.sumar(5, 3)  # 8
            self.calc.dividir(resultado_intermedio, 0)  # Error: 8/0

        # Test 2: Factorial de número negativo
        with pytest.raises(ValueError, match="El factorial no está definido"):
            numero_negativo = self.calc.restar(2, 5)  # -3
            self.calc.factorial(numero_negativo)  # Error: factorial(-3)

        # Test 3: Logaritmo de número no positivo
        with pytest.raises(ValueError):
            numero_negativo = self.calc.multiplicar(-1, 5)  # -5
            self.calc.logaritmo(numero_negativo)  # Error: log(-5)

    def test_flujo_precision_numerica(self):
        """
        Test de integración: Validar que la precisión numérica se mantenga
        en cálculos complejos con múltiples operaciones.
        """
        # Test de precisión: (1/3) * 3 debe ser muy cercano a 1
        un_tercio = self.calc.dividir(1, 3)  # 0.3333...
        resultado = self.calc.multiplicar(un_tercio, 3)  # 0.3333... * 3

        # Debe ser muy cercano a 1 (tolerancia para errores de punto flotante)
        assert abs(resultado - 1.0) < 1e-15

        # Test de precisión: sqrt(2)² debe ser muy cercano a 2
        sqrt_dos = self.calc.raiz_cuadrada(2)  # √2
        sqrt_dos_cuadrado = self.calc.potencia(sqrt_dos, 2)  # (√2)²

        assert abs(sqrt_dos_cuadrado - 2.0) < 1e-15

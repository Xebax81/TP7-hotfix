# Calculadora React

Una calculadora científica desarrollada en React que replica todas las funciones de la calculadora Python original.

## 🌟 Demo en Vivo

🚀 **[Ver Aplicación Live](https://calculadora-react-tp7.web.app)** (Deployment automático via Firebase Hosting)

## Características

### Calculadora Básica
- ✅ Suma, resta, multiplicación, división
- ✅ Operaciones con decimales
- ✅ Función AC (All Clear)
- ✅ Manejo de errores (división por cero)

### Calculadora Científica
- ✅ Funciones trigonométricas (sin, cos, tan)
- ✅ Logaritmo base 10
- ✅ Raíz cuadrada
- ✅ Factorial
- ✅ Valor absoluto
- ✅ Potencias (x^y)
- ✅ Módulo

## 🚀 Deployment Automático

Este proyecto incluye **CI/CD completo** con GitHub Actions y Firebase Hosting:

- ✅ **Auto-deploy** en push a `develop`/`main`
- ✅ **Preview deploys** en Pull Requests
- ✅ **Tests automáticos** antes del deploy
- ✅ **Optimización** de build para producción

### Setup Firebase (una sola vez)

Ver guía completa: [`FIREBASE_SETUP.md`](../FIREBASE_SETUP.md)

### 🚨 ¿Problemas con CI/CD?

Si el deployment automático falla por permisos, tienes estas opciones:

#### Deployment Manual (Rápido)
```bash
# En Windows
./deploy.bat

# En Linux/Mac  
./deploy.sh
```

#### Configurar Firebase Token
```bash
firebase login:ci
# Añadir el token a GitHub Secrets como FIREBASE_TOKEN
```

Ver detalles completos en [`FIREBASE_SETUP.md`](../FIREBASE_SETUP.md)

## Instalación y Ejecución

### Prerequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos para ejecutar

1. **Navegar al directorio del proyecto**
   ```bash
   cd calculadora-react
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   La aplicación se abrirá automáticamente en `http://localhost:3000`

## Funcionalidades

### Modo Básico
- Interfaz simple con números, operadores básicos y función AC
- Display con visualización de errores
- Soporte para números decimales

### Modo Científico
- Botón para alternar entre modo básico y científico
- Funciones matemáticas avanzadas
- Interfaz adaptada con más botones

### Responsive Design
- Funciona en dispositivos móviles
- Interfaz adaptativa según el tamaño de pantalla
- Efectos visuales modernos con gradientes y animaciones

## Tecnologías Utilizadas

- **React 18** - Framework principal
- **CSS3** - Estilos con gradientes y animaciones
- **JavaScript ES6+** - Lógica de la aplicación

## Estructura del Proyecto

```
calculadora-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Calculator.js
│   │   └── Calculator.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── Calculadora.js
├── package.json
└── README.md
```

## Comparación con la Versión Python

Esta implementación React replica fielmente todas las funciones de la calculadora Python original:

| Función Python | Función React | Estado |
|----------------|---------------|---------|
| `sumar()` | `sumar()` | ✅ |
| `restar()` | `restar()` | ✅ |
| `multiplicar()` | `multiplicar()` | ✅ |
| `dividir()` | `dividir()` | ✅ |
| `potencia()` | `potencia()` | ✅ |
| `factorial()` | `factorial()` | ✅ |
| `modulo()` | `modulo()` | ✅ |
| `raiz_cuadrada()` | `raizCuadrada()` | ✅ |
| `valor_absoluto()` | `valorAbsoluto()` | ✅ |
| `logaritmo()` | `logaritmo()` | ✅ |
| `seno()` | `seno()` | ✅ |
| - | `coseno()` | ✅ Añadido |
| - | `tangente()` | ✅ Añadido |

## Mejoras Adicionales

- **Interfaz Gráfica**: Calculadora visual completa
- **Modo Dual**: Alterna entre básica y científica
- **Responsive**: Funciona en móviles y tablets
- **Manejo de Errores**: Mensajes de error visibles
- **Efectos Visuales**: Gradientes y animaciones CSS

## Scripts Disponibles

- `npm start` - Ejecuta en modo desarrollo
- `npm build` - Construye para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Eyecta la configuración (irreversible)

## Contribución

Este proyecto forma parte del TP7 hotfix del curso de Ingeniería y Calidad de Software.
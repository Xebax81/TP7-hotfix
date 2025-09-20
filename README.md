# Calculadora TP7 - React

Una calculadora científica moderna desarrollada en React con deploy automático en Firebase Hosting.

## 🌟 Demo en Vivo

🚀 **[Ver Aplicación](https://calculadora-react-tp7.web.app)**

## 📱 Características

### Calculadora Básica
- ✅ Operaciones aritméticas básicas (+, -, *, /)
- ✅ Números decimales
- ✅ Funciones de memoria (AC, Clear)
- ✅ Manejo de errores (división por cero)

### Calculadora Científica
- ✅ Funciones trigonométricas (sin, cos, tan)
- ✅ Logaritmos (log, ln)
- ✅ Potencias y raíces (x², √x, x^y)
- ✅ Factorial (n!)
- ✅ Constantes matemáticas (π, e)

### Características Técnicas
- ✅ Modo básico y científico alternables
- ✅ Interfaz responsive y moderna
- ✅ Tests automatizados
- ✅ Deploy automático con CI/CD

## 🛠️ Tecnologías

- **Frontend:** React 18.2.0
- **Styling:** CSS3 con gradientes y animaciones
- **Testing:** Jest + React Testing Library
- **Hosting:** Firebase Hosting
- **CI/CD:** GitHub Actions

## 🚀 Desarrollo Local

### Prerequisitos
- Node.js 20+
- npm

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Xebax81/TP7-hotfix.git
cd TP7-hotfix/calculadora-react

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:3000`

### Scripts Disponibles

```bash
# Desarrollo
npm start          # Servidor de desarrollo
npm test           # Ejecutar tests
npm test:coverage  # Tests con cobertura
npm run build      # Build de producción
```

## 🧪 Testing

El proyecto incluye tests automatizados para todas las funcionalidades:

```bash
npm test           # Ejecutar todos los tests
npm test:watch     # Tests en modo watch
npm test:coverage  # Generar reporte de cobertura
```

**Cobertura actual:** 8/8 tests pasando ✅

## 🚀 Deploy

### Deploy Automático
El proyecto tiene CI/CD configurado con GitHub Actions:

- **Push a `develop`, `main`, `produccion`** → Deploy automático
- **Pull Requests** → Tests automáticos

### Deploy Manual
```bash
cd calculadora-react
npm run build
firebase deploy --only hosting
```

## 📁 Estructura del Proyecto

```
TP7-hotfix/
├── .github/workflows/
│   └── firebase-deploy.yml    # CI/CD pipeline
├── calculadora-react/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calculator.js  # Componente principal
│   │   │   ├── Calculator.css # Estilos
│   │   │   └── Calculator.test.js # Tests
│   │   ├── Calculadora.js     # Lógica de cálculos
│   │   └── index.js           # Entry point
│   ├── package.json
│   └── firebase.json          # Config Firebase
└── README.md
```

## 🔧 Funcionalidades Clave

### Operaciones Básicas
- Suma, resta, multiplicación, división
- Números decimales y negativos
- Clear y All Clear

### Operaciones Científicas
- Trigonometría: `sin()`, `cos()`, `tan()`
- Logaritmos: `log10()`, `ln()`
- Potencias: `x²`, `x³`, `x^y`
- Raíces: `√x`, `∛x`
- Factorial: `n!`
- Constantes: `π`, `e`

### Validaciones
- División por cero
- Factorial de números negativos
- Logaritmo de números no positivos
- Raíz cuadrada de números negativos

## 🎨 UI/UX

- **Diseño responsive** para móviles y escritorio
- **Tema moderno** con gradientes azul/púrpura
- **Botones con efectos hover** y animaciones
- **Display claro** con manejo de overflow
- **Toggle visual** entre modo básico y científico

## 📊 Métricas de Calidad

- ✅ **Tests:** 8/8 pasando
- ✅ **Linting:** ESLint configurado
- ✅ **Performance:** Build optimizado
- ✅ **Accessibility:** Controles teclado
- ✅ **SEO:** Meta tags optimizados

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/nueva-funcion`)
3. Commit cambios (`git commit -m 'Add: nueva función'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto es para fines educativos.

## 👨‍💻 Autor

**TP7 - Ingeniería y Calidad de Software**

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
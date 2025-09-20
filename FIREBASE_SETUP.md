# 🚀 Deployment a Firebase Hosting - Guía Completa

## 📋 Prerequisitos

1. **Cuenta de Firebase**: Necesitas una cuenta de Google/Firebase
2. **Proyecto Firebase**: Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
3. **Repositorio GitHub**: Tu código debe estar en GitHub

## 🔧 Configuración Inicial

### 1. Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Nombre del proyecto: `calculadora-react-tp7` (o el que prefieras)
4. Habilita Google Analytics (opcional)
5. Crea el proyecto

### 2. Configurar Firebase Hosting

1. En la consola de Firebase, ve a **Hosting**
2. Haz clic en "Comenzar"
3. Sigue las instrucciones (no instales firebase-tools, ya lo tenemos)

### 3. Actualizar Project ID

Edita el archivo `.firebaserc` y cambia el project ID por el tuyo:

```json
{
  "projects": {
    "default": "TU-PROJECT-ID-AQUI"
  }
}
```

También actualiza el `firebase-deploy.yml` workflow:
- Cambia `calculadora-react-tp7` por tu project ID
- Cambia `FIREBASE_SERVICE_ACCOUNT_CALCULADORA_REACT_TP7` por `FIREBASE_SERVICE_ACCOUNT_TU_PROJECT_ID`

## 🔐 Configuración de Secretos GitHub

### 1. Generar Service Account Key

```bash
# Instala Firebase CLI globalmente (si no lo tienes)
npm install -g firebase-tools

# Inicia sesión en Firebase
firebase login

# Genera el service account key para GitHub Actions
firebase init hosting:github
```

**O manualmente:**

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Configuración del proyecto → Cuentas de servicio
3. Generar nueva clave privada
4. Guarda el archivo JSON

### 2. Configurar GitHub Secrets

1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Añade un nuevo secret:
   - **Nombre**: `FIREBASE_SERVICE_ACCOUNT_CALCULADORA_REACT_TP7`
   - **Valor**: El contenido completo del archivo JSON de service account

## 🚀 Deployment Automático

### Triggers del Workflow

El deployment se ejecuta automáticamente cuando:

- **Push a `develop` o `main`**: Deploy a producción
- **Pull Request**: Deploy de preview temporal
- **Solo cambios en `calculadora-react/`**: Optimización para evitar builds innecesarios

### Proceso de Deployment

1. **Build & Test**: Ejecuta tests y construye la aplicación
2. **Deploy Production**: Solo en push a ramas principales
3. **Deploy Preview**: Solo en Pull Requests (URL temporal)

### URLs Resultantes

- **Producción**: `https://TU-PROJECT-ID.web.app`
- **Preview**: URL temporal generada automáticamente en PRs

## 📁 Estructura de Archivos Agregados

```
calculadora-react/
├── firebase.json          # Configuración de Firebase Hosting
├── .firebaserc            # Project ID configuration
└── package.json           # Scripts de Firebase añadidos

.github/workflows/
└── firebase-deploy.yml    # Workflow CI/CD para Firebase
```

## 🔧 Scripts Disponibles

```bash
# Build para Firebase
npm run firebase:build

# Servir localmente (simula Firebase Hosting)
npm run firebase:serve

# Deploy manual (requiere auth)
npm run firebase:deploy

# Inicializar Firebase (si necesitas reconfigurar)
npm run firebase:init
```

## 🌟 Características del Setup

### Seguridad
- Headers de seguridad configurados (X-Frame-Options, X-XSS-Protection, etc.)
- Cache optimizado para assets estáticos
- Protección contra sniffing de contenido

### Performance
- Cache de 1 año para archivos estáticos
- SPA routing configurado
- Compresión automática de Firebase

### CI/CD
- Tests automáticos antes del deploy
- Artifacts de build compartidos entre jobs
- Deploy de preview para Pull Requests
- Deploy automático solo para ramas principales

## 🚨 Solución de Problemas

### Error: "Resource not accessible by integration"

**Problema**: El token `GITHUB_TOKEN` no tiene permisos suficientes para crear check runs.

**Soluciones disponibles:**

#### Opción 1: Usar Firebase CLI Token (Recomendado)

1. **Generar Firebase Token:**
   ```bash
   firebase login:ci
   ```
   Esto generará un token personal.

2. **Añadir a GitHub Secrets:**
   - GitHub repo → Settings → Secrets → Actions
   - Nuevo secret: `FIREBASE_TOKEN`
   - Valor: El token generado

3. **Usar workflow simple:**
   El archivo `firebase-simple.yml` está disponible como alternativa.

#### Opción 2: Configurar Service Account (Más seguro)

1. **Firebase Console** → Configuración → Cuentas de servicio
2. **Generar nueva clave privada** 
3. **Descargar archivo JSON**
4. **GitHub Secrets:**
   - Nombre: `FIREBASE_SERVICE_ACCOUNT_CALCULADORA_REACT_TP7`
   - Valor: Contenido completo del JSON

#### Opción 3: Permisos de Repositorio

Si tienes permisos de admin del repo:

1. **GitHub repo** → Settings → Actions → General
2. **Workflow permissions** → "Read and write permissions"
3. **Save**

### Error: "Project not found"
- Verifica que el project ID en `.firebaserc` sea correcto
- Asegúrate que el proyecto existe en Firebase Console

### Error: "Permission denied"
- Verifica que el service account key esté correctamente configurado en GitHub Secrets
- Asegúrate que el service account tenga permisos de Firebase Hosting

### Error: "Build folder not found"
- El workflow ejecuta `npm run build` automáticamente
- Verifica que la carpeta `build/` se genere correctamente

## 📚 Referencias

- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [GitHub Actions Firebase](https://github.com/FirebaseExtended/action-hosting-deploy)
- [React Build Optimization](https://create-react-app.dev/docs/deployment/)

## 🎯 Next Steps

1. **Configurar proyecto Firebase**: Sigue los pasos de configuración inicial
2. **Actualizar project IDs**: Cambia los IDs en los archivos de configuración
3. **Configurar secretos**: Añade el service account a GitHub Secrets
4. **Hacer commit**: Push de los cambios para activar el primer deployment

¡Una vez configurado, cada push deployará automáticamente tu calculadora React! 🎊
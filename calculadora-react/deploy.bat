@echo off
REM Deploy manual a Firebase
REM Usa este script si tienes problemas con GitHub Actions

echo 🚀 Deployment manual a Firebase Hosting
echo =========================================

REM Verificar que estamos en el directorio correcto
if not exist "package.json" (
    echo ❌ Error: Ejecuta este script desde el directorio calculadora-react
    pause
    exit /b 1
)

REM Verificar que Firebase CLI está instalado
firebase --version >nul 2>&1
if errorlevel 1 (
    echo 📦 Instalando Firebase CLI...
    npm install -g firebase-tools
)

echo 🔐 Iniciando sesión en Firebase...
firebase login

echo 🏗️  Construyendo aplicación...
npm run build

echo 🚀 Deployando a Firebase Hosting...
firebase deploy --only hosting

echo ✅ Deployment completado!
echo 🌐 Tu aplicación está disponible en:
echo    https://calculadora-react-tp7.web.app
pause
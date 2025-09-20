#!/bin/bash
# Deploy manual a Firebase
# Usa este script si tienes problemas con GitHub Actions

echo "🚀 Deployment manual a Firebase Hosting"
echo "========================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Ejecuta este script desde el directorio calculadora-react"
    exit 1
fi

# Verificar que Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    echo "📦 Instalando Firebase CLI..."
    npm install -g firebase-tools
fi

echo "🔐 Iniciando sesión en Firebase..."
firebase login

echo "🏗️  Construyendo aplicación..."
npm run build

echo "🚀 Deployando a Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Deployment completado!"
echo "🌐 Tu aplicación está disponible en:"
echo "   https://calculadora-react-tp7.web.app"
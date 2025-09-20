# Configuración para Desarrollo Local con Firebase

## 🏠 Servir la aplicación localmente

Para probar cómo se ve tu aplicación en Firebase Hosting localmente:

```bash
cd calculadora-react

# 1. Build la aplicación
npm run build

# 2. Servir con Firebase emulator
npm run firebase:serve

# O manualmente:
firebase serve --only hosting
```

Esto iniciará un servidor local en `http://localhost:5000` que simula exactamente Firebase Hosting.

## 🔧 Comandos útiles de Firebase CLI

```bash
# Ver proyectos disponibles
firebase projects:list

# Cambiar proyecto activo
firebase use [project-id]

# Ver configuración actual
firebase projects:list
firebase list

# Deploy manual (requiere autenticación)
firebase deploy --only hosting

# Ver logs del proyecto
firebase functions:log
```

## 🌍 URLs después del deploy

Una vez que configures Firebase, tendrás estas URLs:

- **Producción**: `https://calculadora-react-tp7.web.app`
- **Dominio custom**: `https://calculadora-react-tp7.firebaseapp.com`

## 🔄 Proceso de desarrollo recomendado

1. **Desarrollo local**: `npm start` (React dev server)
2. **Test local Firebase**: `npm run firebase:serve`
3. **Commit cambios**: Push automático deploy via GitHub Actions
4. **Review**: Verificar en URL de producción

## 📊 Métricas y Analytics

Firebase Hosting incluye automáticamente:
- **Performance Monitoring**: Métricas de carga
- **Analytics** (si está habilitado): Usuarios, páginas vistas
- **Error tracking**: JavaScript errors en producción

Accede a estas métricas en [Firebase Console](https://console.firebase.google.com/) → Tu proyecto → Hosting/Analytics

## 🛠 Troubleshooting local

### Error: "Firebase project not found"
```bash
firebase login
firebase use --add
```

### Error: "Port 5000 in use"
```bash
firebase serve --port 5001
```

### Cache issues
```bash
# Limpiar cache de Firebase
firebase hosting:clean

# Rebuild desde cero
rm -rf build/
npm run build
firebase serve
```
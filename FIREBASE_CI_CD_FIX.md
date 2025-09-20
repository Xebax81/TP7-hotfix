# 🔧 Solución: Error Firebase Deploy CI/CD

## 🚨 Problema
```
RequestError [HttpError]: Resource not accessible by integration
status: 403
'x-accepted-github-permissions': 'checks=write'
```

## 🎯 Causa
El token `GITHUB_TOKEN` de GitHub Actions no tiene permisos suficientes para crear "check runs" que requiere la action `FirebaseExtended/action-hosting-deploy@v0`.

## ✅ Soluciones Implementadas

### 1. **Workflow Mejorado** (`firebase-deploy.yml`)
- ✅ Añadidos permisos explícitos
- ✅ Removido `repoToken` del deploy principal 
- ✅ Configuración simplificada

### 2. **Workflow Alternativo** (`firebase-simple.yml`)
- ✅ Usa Firebase CLI directamente
- ✅ Requiere `FIREBASE_TOKEN` en secrets
- ✅ Más simple y confiable

### 3. **Scripts de Deploy Manual**
- ✅ `deploy.bat` (Windows)
- ✅ `deploy.sh` (Linux/Mac)
- ✅ Backup para cuando CI/CD falla

## 🔧 Cómo Resolver

### Opción A: Usar Workflow Simple (Recomendado)

1. **Generar Firebase Token:**
   ```bash
   firebase login:ci
   ```

2. **Añadir a GitHub Secrets:**
   - Ir a: GitHub repo → Settings → Secrets → Actions
   - Crear: `FIREBASE_TOKEN` 
   - Valor: El token generado

3. **Activar workflow simple:**
   ```yaml
   # En firebase-simple.yml (ya está listo)
   env:
     FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
   ```

### Opción B: Configurar Permisos Repository

Si eres admin del repositorio:

1. **GitHub repo** → Settings → Actions → General
2. **Workflow permissions** → "Read and write permissions"
3. **Allow GitHub Actions to create and approve pull requests** ✅
4. **Save**

### Opción C: Deploy Manual

```bash
cd calculadora-react

# Windows
./deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

## 📋 Status de Workflows

| Workflow | Estado | Uso |
|----------|---------|-----|
| `firebase-deploy.yml` | ⚠️ Permisos | Automático con service account |
| `firebase-simple.yml` | ✅ Listo | Requiere FIREBASE_TOKEN |
| `deploy.bat/sh` | ✅ Listo | Manual local |

## 🎯 Recomendación

**Para desarrollo rápido:** Usar `deploy.bat/sh` manualmente

**Para producción:** Configurar `FIREBASE_TOKEN` y usar `firebase-simple.yml`

## 📚 Referencias

- [Firebase CLI Tokens](https://firebase.google.com/docs/cli#cli-ci-systems)
- [GitHub Actions Permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)
- [Firebase Action Issues](https://github.com/FirebaseExtended/action-hosting-deploy/issues)

¡Con estas soluciones tu calculadora React debería deployarse exitosamente! 🚀
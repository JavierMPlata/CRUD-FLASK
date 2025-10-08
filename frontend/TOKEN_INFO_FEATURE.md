# 🔐 Funcionalidad de Información del Token JWT

## Descripción
Nueva característica que permite visualizar la información completa del token JWT de autenticación en tiempo real, incluyendo el tiempo de expiración y los datos decodificados del payload.

## Características Implementadas

### 1. **Decodificación de Token JWT**
- Método `decodeToken()` en `authService.ts` que decodifica el payload del JWT
- Extracción de información como `sub`, `iat`, `exp`, `identity`

### 2. **Información en Tiempo Real**
- Método `getTokenInfo()` que proporciona:
  - Token completo
  - Payload decodificado
  - Fecha de expiración
  - Tiempo restante (actualizado cada segundo)
  - Estado de expiración

### 3. **Interfaz Visual Mejorada**
- **Botón "Token"** en el header de la página de libros
- **Modal informativo** con diseño moderno que muestra:
  - ✅ Estado del token (Activo/Expirado)
  - ⏰ Contador en tiempo real del tiempo restante
  - 📅 Fecha de expiración formateada
  - 📊 Datos del payload decodificado:
    - Subject (sub)
    - Fecha de emisión (iat)
    - Fecha de expiración (exp)
    - Identidad del usuario (identity)
  - 🔑 Token JWT completo con opción de copiar al portapapeles

### 4. **Actualización Automática**
- El tiempo restante se actualiza cada segundo automáticamente
- Sin necesidad de recargar o reabrir el modal

## Componentes Modificados

### `authService.ts`
```typescript
// Nuevos métodos agregados:
- decodeToken(token: string): any
- getTokenInfo(): TokenInfo | null
```

### `books/page.tsx`
```typescript
// Nuevos estados agregados:
- showTokenInfo: boolean
- tokenInfo: any

// Nuevos efectos:
- useEffect para actualización cada segundo del token
- loadTokenInfo() para cargar información del token
```

## Uso

1. **Iniciar sesión** en la aplicación
2. En la página de libros, hacer clic en el botón **"Token"** (botón verde con ícono de llave)
3. Se abrirá un modal mostrando toda la información del token
4. El **tiempo restante** se actualizará automáticamente cada segundo
5. Puedes **copiar el token** completo haciendo clic en el botón "Copiar"

## Diseño Visual

- **Header del modal**: Gradiente verde-esmeralda-turquesa
- **Estado activo**: Fondo verde con ícono de check
- **Estado expirado**: Fondo rojo con ícono de advertencia
- **Tiempo restante**: Display grande con gradiente azul-índigo
- **Campos de información**: Cards coloridas según el tipo de dato
- **Token completo**: Fondo oscuro con texto en verde (estilo terminal)

## Seguridad

⚠️ **Nota de Seguridad**: Esta funcionalidad está diseñada para propósitos de desarrollo y debugging. En producción, considera:
- Limitar el acceso a la información del token
- No mostrar el token completo en la interfaz
- Implementar roles y permisos para ver esta información

## Beneficios

- ✅ **Transparencia**: Los usuarios pueden ver cuándo expirará su sesión
- ✅ **Debugging**: Facilita la depuración de problemas de autenticación
- ✅ **UX Mejorada**: Los usuarios saben exactamente cuánto tiempo les queda
- ✅ **Educativo**: Ayuda a entender cómo funcionan los JWT

## Tecnologías Utilizadas

- React Hooks (useState, useEffect)
- TypeScript
- Tailwind CSS
- JWT Decoding
- Date/Time manipulation
- Clipboard API

---

**Fecha de Implementación**: 8 de Octubre, 2025
**Desarrollador**: Sistema de Gestión de Libros CRUD-FLASK

# CRUD Flask - Frontend

Frontend en Next.js con Tailwind CSS para el backend CRUD Flask.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Arquitectura limpia** con separación de servicios
- **Sistema de caché** para optimizar peticiones HTTP
- **Autenticación JWT** con localStorage
- **Manejo de errores** centralizado

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/                 # Páginas (Next.js App Router)
│   │   ├── books/          # CRUD de libros
│   │   ├── login/          # Inicio de sesión
│   │   ├── register/       # Registro de usuarios
│   │   ├── layout.tsx      # Layout principal
│   │   ├── page.tsx        # Página de inicio
│   │   └── globals.css     # Estilos globales
│   ├── lib/                # Utilidades y configuración
│   │   └── apiClient.ts    # Cliente HTTP con interceptores
│   ├── services/           # Servicios de negocio
│   │   ├── authService.ts  # Servicio de autenticación
│   │   └── bookService.ts  # Servicio de libros (con caché)
│   └── types/              # Definiciones de TypeScript
│       ├── api.types.ts
│       ├── book.types.ts
│       └── user.types.ts
├── .env.local              # Variables de entorno
├── next.config.js          # Configuración de Next.js
├── package.json
├── tailwind.config.ts      # Configuración de Tailwind
└── tsconfig.json           # Configuración de TypeScript
```

## 🛠️ Instalación

1. Navega a la carpeta frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno en `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## 🎯 Ejecución

### Modo desarrollo (puerto 3000):
```bash
npm run dev
```

### Build de producción:
```bash
npm run build
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Arquitectura

### Sistema de Caché
El `bookService` implementa un sistema de caché inteligente:
- **TTL de 5 minutos** para datos cacheados
- **Invalidación automática** al crear/actualizar/eliminar
- **Parámetro `useCache`** opcional para forzar datos frescos

### Interceptores HTTP
El `apiClient` maneja automáticamente:
- **Inyección de JWT** en todas las peticiones autenticadas
- **Redirección a login** cuando el token expira
- **Manejo centralizado de errores**

### Servicios Singleton
Los servicios (`authService`, `bookService`) usan el patrón Singleton:
- Una sola instancia por servicio
- Estado compartido en toda la aplicación
- Gestión eficiente de recursos

## 🎨 Componentes UI

### Páginas disponibles:
- `/` - Redirección automática según autenticación
- `/login` - Inicio de sesión
- `/register` - Registro de nuevos usuarios
- `/books` - CRUD completo de libros (requiere autenticación)

### Estilos personalizados:
Tailwind CSS con clases utilitarias personalizadas:
- `.btn-primary` - Botón principal
- `.btn-secondary` - Botón secundario
- `.btn-danger` - Botón de peligro
- `.input-field` - Campo de entrada
- `.card` - Tarjeta de contenido

## 🔐 Autenticación

El sistema de autenticación maneja:
- Registro de nuevos usuarios
- Login con JWT
- Almacenamiento seguro del token
- Auto-login después del registro
- Redirección automática a login si no está autenticado
- Logout y limpieza de sesión

## 📡 API Endpoints

### Autenticación:
- `POST /auth/register` - Registro
- `POST /auth/login` - Login

### Libros (requieren autenticación):
- `GET /app/books` - Obtener todos los libros
- `GET /app/books/:id` - Obtener libro por ID
- `POST /app/books` - Crear libro
- `PUT /app/books/:id` - Actualizar libro
- `DELETE /app/books/:id` - Eliminar libro

## 🚀 Optimizaciones

1. **Caché de peticiones**: Reduce llamadas innecesarias al backend
2. **Singleton pattern**: Evita múltiples instancias de servicios
3. **Lazy loading**: Componentes se cargan solo cuando se necesitan
4. **TypeScript**: Detecta errores en tiempo de desarrollo
5. **Puerto diferente**: Frontend (3000) y Backend (5000) no colisionan

## 📝 Notas

- El frontend está configurado para usar el puerto **3000** por defecto
- El backend debe estar corriendo en el puerto **5000**
- Los tokens JWT se almacenan en `localStorage`
- El sistema detecta automáticamente tokens expirados

## 🛡️ Seguridad

- Tokens JWT para autenticación
- Validación de formularios en cliente
- Protección de rutas privadas
- Limpieza automática de sesiones expiradas
- Sanitización de datos de entrada

## 🐛 Solución de Problemas

### Error de conexión con el backend:
Verifica que el backend esté corriendo en `http://localhost:5000`

### Error de CORS:
Asegúrate de que el backend tenga configurado CORS correctamente

### Token expirado:
El sistema redirige automáticamente a login, simplemente vuelve a iniciar sesión

---

Desarrollado con ❤️ usando Next.js y Tailwind CSS

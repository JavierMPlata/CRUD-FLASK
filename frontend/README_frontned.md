# Frontend - CRUD Flask Books Manager

## 📖 Descripción

Frontend de la aplicación de gestión de libros desarrollado con Next.js 14, React 18 y TypeScript. Esta aplicación proporciona una interfaz de usuario moderna y responsiva para interactuar con la API de Flask del backend, permitiendo operaciones CRUD completas sobre libros y gestión de usuarios.

## 🚀 Tecnologías Utilizadas

- **Next.js 14** - Framework de React para aplicaciones full-stack
- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript 5.2+** - Superset de JavaScript con tipado estático
- **Tailwind CSS 3.3+** - Framework CSS utilitario para diseño rápido
- **Axios 1.6+** - Cliente HTTP para realizar peticiones a la API
- **ESLint** - Herramienta de análisis de código para JavaScript/TypeScript
- **PostCSS** - Procesador de CSS para transformaciones
- **Autoprefixer** - Plugin de PostCSS para compatibilidad con navegadores

## 📂 Estructura del Proyecto

```
frontend/
├── .next/                      # Archivos de build generados por Next.js
├── node_modules/              # Dependencias del proyecto
├── src/
│   ├── app/                    # App Router de Next.js 14
│   │   ├── globals.css         # Estilos globales con Tailwind
│   │   ├── layout.tsx          # Layout principal de la aplicación
│   │   ├── page.tsx           # Página principal (landing)
│   │   ├── not-found.tsx      # Página 404 personalizada
│   │   ├── books/             # Páginas relacionadas con libros
│   │   │   └── page.tsx       # Lista y gestión CRUD de libros
│   │   ├── login/             # Sistema de autenticación
│   │   │   └── page.tsx       # Página de inicio de sesión
│   │   └── register/          # Registro de usuarios
│   │       └── page.tsx       # Página de registro
│   ├── components/            # Componentes reutilizables
│   │   ├── index.ts           # Barrel export de componentes
│   │   ├── ConfirmationModal.tsx  # Modal de confirmación para acciones
│   │   ├── ErrorPage.tsx      # Componente de página de error
│   │   ├── LoadingSpinner.tsx # Indicador de carga
│   │   ├── ToastContainer.tsx # Contenedor para notificaciones
│   │   └── ToastContext.tsx   # Context provider para toast notifications
│   ├── lib/                   # Utilities y configuraciones
│   │   └── apiClient.ts       # Cliente HTTP singleton con Axios
│   ├── services/              # Servicios para interactuar con la API
│   │   ├── authService.ts     # Servicios de autenticación y usuarios
│   │   └── bookService.ts     # Servicios CRUD de libros
│   └── types/                 # Definiciones de tipos TypeScript
│       ├── api.types.ts       # Tipos para respuestas de API
│       ├── book.types.ts      # Tipos e interfaces de libros
│       └── user.types.ts      # Tipos e interfaces de usuarios
├── .env.local                 # Variables de entorno locales
├── .gitignore                # Archivos ignorados por Git
├── next-env.d.ts             # Declaraciones de tipos de Next.js
├── next.config.js            # Configuración personalizada de Next.js
├── package-lock.json         # Lock file de dependencias
├── package.json              # Dependencias y scripts del proyecto
├── postcss.config.js         # Configuración de PostCSS
├── tailwind.config.ts        # Configuración personalizada de Tailwind CSS
├── tsconfig.app.json         # Configuración específica para la app
├── tsconfig.json             # Configuración principal de TypeScript
└── README_frontned.md        # Documentación del frontend
```

## 📦 Dependencias del Proyecto

### Dependencias de Producción
- **next**: ^14.0.0 - Framework React full-stack
- **react**: ^18.2.0 - Biblioteca de UI
- **react-dom**: ^18.2.0 - Renderer de React para DOM
- **axios**: ^1.6.0 - Cliente HTTP para peticiones a la API

### Dependencias de Desarrollo
- **@types/node**: ^20.0.0 - Tipos TypeScript para Node.js
- **@types/react**: ^18.2.0 - Tipos TypeScript para React
- **@types/react-dom**: ^18.2.0 - Tipos TypeScript para React DOM
- **autoprefixer**: ^10.4.16 - Plugin PostCSS para prefijos CSS
- **eslint**: ^8.0.0 - Linter para JavaScript/TypeScript
- **eslint-config-next**: ^14.0.0 - Configuración ESLint para Next.js
- **postcss**: ^8.4.31 - Procesador CSS
- **tailwindcss**: ^3.3.5 - Framework CSS utilitario
- **typescript**: ^5.2.0 - Superset tipado de JavaScript

## ⚙️ Configuración Inicial

### Prerrequisitos

- Node.js 20+ y npm
- Backend de Flask ejecutándose en `http://localhost:5000`

### Instalación

1. **Navegar al directorio del frontend:**
   ```bash
   cd frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Variables de entorno (ya configuradas):**
   
   Archivo `.env.local` existente:
   ```env
   #Api configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en puerto 3000 |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia el servidor de producción en puerto 3000 |
| `npm run lint` | Ejecuta ESLint para análisis de código con Next.js |

## 🏗️ Arquitectura de la Aplicación

### Componentes Principales

#### 1. **ApiClient** (`src/lib/apiClient.ts`)
- Cliente HTTP singleton implementado con patrón Singleton
- Interceptores automáticos para tokens JWT en requests
- Interceptor de respuesta para manejo de errores 401
- Redirección automática a login en caso de tokens expirados
- Limpieza automática de storage (session y local)
- Base URL configurable mediante variables de entorno

#### 2. **Componentes UI** (`src/components/`)
- **ConfirmationModal**: Modal reutilizable para confirmaciones
- **LoadingSpinner**: Indicador de carga animado
- **ToastContainer & ToastContext**: Sistema de notificaciones toast
- **ErrorPage**: Página de error personalizada
- **index.ts**: Barrel export para importaciones limpias

#### 3. **Servicios** (`src/services/`)
- **AuthService**: Gestión completa de autenticación y usuarios
- **BookService**: Operaciones CRUD completas de libros

#### 4. **Tipos TypeScript** (`src/types/`)
- **api.types.ts**: Interfaces para respuestas de API y errores
- **book.types.ts**: Tipos para entidades y operaciones de libros
- **user.types.ts**: Tipos para usuarios y autenticación

### Páginas y Routing

Utiliza el **App Router** de Next.js 14:

- `/` - Página principal (landing page)
- `/login` - Autenticación de usuarios existentes
- `/register` - Registro de nuevos usuarios
- `/books` - Gestión completa de libros (CRUD)
- `/not-found` - Página 404 personalizada para rutas no encontradas

## 🔧 Funcionalidades

### Gestión de Usuarios
- ✅ Registro de nuevos usuarios
- ✅ Inicio de sesión con JWT
- ✅ Cierre de sesión seguro
- ✅ Persistencia de sesión con sessionStorage

### Gestión de Libros
- ✅ Listar todos los libros
- ✅ Crear nuevos libros
- ✅ Actualizar información de libros
- ✅ Eliminar libros
- ✅ Validación de formularios
- ✅ Manejo de estados de carga

### Características Técnicas
- ✅ Diseño responsive con Tailwind CSS y tema personalizado
- ✅ Tipado estático estricto con TypeScript 5.2+
- ✅ Interceptores HTTP para autenticación automática con JWT
- ✅ Manejo centralizado de errores con redirects automáticos
- ✅ Componentes reutilizables con barrel exports
- ✅ Sistema de notificaciones toast integrado
- ✅ Modal de confirmación para acciones críticas
- ✅ Página 404 personalizada
- ✅ Limpieza automática de tokens en múltiples storages
- ✅ Configuración de PostCSS y Autoprefixer
- ✅ ESLint configurado específicamente para Next.js

## 🌐 Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_API_BASE_URL` | URL base de la API Flask | `http://localhost:5000` |

## 🚀 Despliegue

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm run start
```

### Build para Producción
El comando `npm run build` genera una versión optimizada en la carpeta `.next/`

## 🔒 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación:

1. El usuario se autentica a través de `/login`
2. Se almacena el token en `sessionStorage`
3. El `ApiClient` incluye automáticamente el token en las peticiones
4. El token se valida en cada petición al backend

## 🎨 Estilos y UI

- **Tailwind CSS 3.3+**: Framework CSS utilitario para desarrollo rápido
- **Tema personalizado**: Paleta de colores primary con 9 tonalidades (50-900)
- **Diseño responsive**: Optimizado para dispositivos móviles y desktop
- **PostCSS**: Procesador CSS con Autoprefixer para compatibilidad
- **Componentes reutilizables**: Arquitectura modular para mantener consistencia
- **Configuración TypeScript**: `tailwind.config.ts` con tipado completo

## 🐛 Manejo de Errores

- Interceptores HTTP para captura automática de errores
- Mensajes de error user-friendly
- Logging de errores para desarrollo
- Redirección automática en caso de tokens expirados

## � Archivos de Configuración Clave

- **`next.config.js`**: Configuración de Next.js con variables de entorno
- **`tailwind.config.ts`**: Configuración TypeScript de Tailwind con tema custom
- **`tsconfig.json`** y **`tsconfig.app.json`**: Configuración TypeScript modular
- **`postcss.config.js`**: PostCSS con Tailwind y Autoprefixer
- **`.env.local`**: Variables de entorno para desarrollo local
- **`.gitignore`**: Exclusiones de Git (node_modules, .next, etc.)

## �📝 Notas de Desarrollo

- **App Router**: Utiliza el nuevo App Router de Next.js 14 (no Pages Router)
- **TypeScript Estricto**: Tipado estricto habilitado con configuración modular
- **ESLint**: Configurado específicamente con reglas de Next.js
- **Arquitectura**: Separación clara de responsabilidades con patrón de capas
- **Singleton Pattern**: Cliente HTTP implementado como singleton
- **Barrel Exports**: Componentes exportados desde index.ts para importaciones limpias
- **Error Boundaries**: Manejo de errores con páginas personalizadas
- **Storage Management**: Limpieza automática de sessionStorage y localStorage

## 🤝 Contribución

Para contribuir al proyecto:

1. Mantener la estructura de carpetas existente
2. Seguir las convenciones de TypeScript y React
3. Añadir tipos para nuevas funcionalidades
4. Documentar cambios significativos
5. Ejecutar `npm run lint` antes de commits

---

**Desarrollado con ❤️ usando Next.js 14 y TypeScript**
# Frontend - CRUD Flask Books Manager

## 📖 Descripción

Frontend de la aplicación de gestión de libros desarrollado con Next.js 14, React 18 y TypeScript. Esta aplicación proporciona una interfaz de usuario moderna y responsiva para interactuar con la API de Flask del backend, permitiendo operaciones CRUD completas sobre libros y gestión de usuarios.

## 🚀 Tecnologías Utilizadas

- **Next.js 14** - Framework de React para aplicaciones full-stack
- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - Superset de JavaScript con tipado estático
- **Tailwind CSS** - Framework CSS utilitario para diseño rápido
- **Axios** - Cliente HTTP para realizar peticiones a la API
- **ESLint** - Herramienta de análisis de código para JavaScript/TypeScript

## 📂 Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/                    # App Router de Next.js 14
│   │   ├── globals.css         # Estilos globales
│   │   ├── layout.tsx          # Layout principal de la aplicación
│   │   ├── page.tsx           # Página principal
│   │   ├── books/             # Páginas relacionadas con libros
│   │   │   └── page.tsx       # Lista y gestión de libros
│   │   ├── login/             # Sistema de autenticación
│   │   │   └── page.tsx       # Página de inicio de sesión
│   │   └── register/          # Registro de usuarios
│   │       └── page.tsx       # Página de registro
│   ├── lib/                   # Utilities y configuraciones
│   │   └── apiClient.ts       # Cliente HTTP configurado con Axios
│   ├── services/              # Servicios para interactuar con la API
│   │   ├── authService.ts     # Servicios de autenticación
│   │   └── bookService.ts     # Servicios de gestión de libros
│   └── types/                 # Definiciones de tipos TypeScript
│       ├── api.types.ts       # Tipos para respuestas de API
│       ├── book.types.ts      # Tipos relacionados con libros
│       └── user.types.ts      # Tipos relacionados con usuarios
├── public/                    # Archivos estáticos
├── .env.local                 # Variables de entorno locales
├── next.config.js            # Configuración de Next.js
├── tailwind.config.ts        # Configuración de Tailwind CSS
├── tsconfig.json             # Configuración de TypeScript
└── package.json              # Dependencias y scripts del proyecto
```

## ⚙️ Configuración Inicial

### Prerrequisitos

- Node.js 18+ y npm
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

3. **Configurar variables de entorno:**
   
   Crear archivo `.env.local` con:
   ```env
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
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint para análisis de código |

## 🏗️ Arquitectura de la Aplicación

### Componentes Principales

#### 1. **ApiClient** (`src/lib/apiClient.ts`)
- Cliente HTTP singleton configurado con Axios
- Interceptores para manejo automático de tokens JWT
- Manejo centralizado de errores HTTP
- Base URL configurable mediante variables de entorno

#### 2. **Servicios** (`src/services/`)
- **AuthService**: Gestión de autenticación (login, registro, logout)
- **BookService**: Operaciones CRUD de libros

#### 3. **Tipos TypeScript** (`src/types/`)
- Interfaces para entidades de dominio (Book, User)
- Tipos para datos de creación y actualización
- Tipos para respuestas de API y manejo de errores

### Páginas y Routing

Utiliza el **App Router** de Next.js 14:

- `/` - Página principal
- `/login` - Autenticación de usuarios
- `/register` - Registro de nuevos usuarios
- `/books` - Gestión completa de libros (CRUD)

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
- ✅ Diseño responsive con Tailwind CSS
- ✅ Tipado estático con TypeScript
- ✅ Interceptores HTTP para autenticación automática
- ✅ Manejo centralizado de errores
- ✅ Componentes reutilizables

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

- **Tailwind CSS**: Framework CSS utilitario para desarrollo rápido
- **Diseño responsive**: Optimizado para dispositivos móviles y desktop
- **Fuente Inter**: Tipografía moderna incluida desde Google Fonts
- **Componentes reutilizables**: Arquitectura modular para maintener consistencia

## 🐛 Manejo de Errores

- Interceptores HTTP para captura automática de errores
- Mensajes de error user-friendly
- Logging de errores para desarrollo
- Redirección automática en caso de tokens expirados

## 📝 Notas de Desarrollo

- Utiliza el App Router de Next.js 14 (no Pages Router)
- Tipado estricto de TypeScript habilitado
- ESLint configurado con reglas de Next.js
- Arquitectura escalable con separación de responsabilidades
- Singleton pattern para el cliente HTTP

## 🤝 Contribución

Para contribuir al proyecto:

1. Mantener la estructura de carpetas existente
2. Seguir las convenciones de TypeScript y React
3. Añadir tipos para nuevas funcionalidades
4. Documentar cambios significativos
5. Ejecutar `npm run lint` antes de commits

---

**Desarrollado con ❤️ usando Next.js 14 y TypeScript**
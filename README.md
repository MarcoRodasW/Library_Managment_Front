# Sistema de Gestión de Biblioteca - Frontend

Una aplicación moderna en React para gestionar un sistema de biblioteca, incluyendo administración de libros, clientes y préstamos.

## Stack Tecnológico

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de build y servidor de desarrollo
- **TailwindCSS 4** - Estilos
- **TanStack Query** - Gestión de estado del servidor
- **React Hook Form + Zod** - Manejo de formularios y validación
- **Radix UI** - Primitivos de UI accesibles
- **Lucide React** - Iconos

## Requisitos Previos

- Node.js 18+
- npm, yarn o pnpm

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd library_managment_front
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

4. Edita `.env` y configura la URL de la API:
```
VITE_API_URL=http://localhost:5124/api
```

## Desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Compilación

Compila para producción:
```bash
npm run build
```

Previsualiza la compilación de producción:
```bash
npm run preview
```

## Linting

Ejecuta ESLint:
```bash
npm run lint
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── books/          # Componentes relacionados con libros
│   ├── clients/        # Componentes relacionados con clientes
│   ├── loans/          # Componentes relacionados con préstamos
│   └── ui/             # Componentes de UI reutilizables
├── lib/
│   └── api/            # Funciones y tipos de API
├── App.tsx             # Componente principal de la aplicación
└── main.tsx            # Punto de entrada de la aplicación
```

## Funcionalidades

- **Gestión de Libros**: Ver, crear y eliminar libros
- **Gestión de Clientes**: Ver y crear clientes, consultar historial de préstamos
- **Gestión de Préstamos**: Ver todos los préstamos con detalles expandibles, crear nuevos préstamos
- **Diseño Responsivo**: Funciona en escritorio y dispositivos móviles

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL base de la API del backend | `http://localhost:5124/api` |

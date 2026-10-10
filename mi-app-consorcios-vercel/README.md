# Inspector App — Gestión de Consorcios

Proyecto React + Vite preparado para ejecutar localmente y desplegar en Vercel.

## Requisitos
- Node.js (versión LTS recomendada)
- npm

## Ejecutar en Visual Studio Code
1. Abrí esta carpeta en Visual Studio Code.
2. Abrí Terminal → Nueva terminal.
3. Ejecutá `npm install`.
4. Ejecutá `npm run dev`.
5. Abrí la dirección local que muestra la terminal (normalmente http://localhost:5173).

## Comprobar antes de publicar
Ejecutá `npm run build`. Vite genera el sitio listo para publicar dentro de `dist/`.

## Publicar en Vercel
1. Subí el contenido de esta carpeta a un repositorio de GitHub.
2. En Vercel, importá ese repositorio.
3. Framework Preset: Vite.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Hacé clic en Deploy.

## Nota sobre los datos
La aplicación actual usa localStorage del navegador. Cada navegador/dispositivo mantiene sus propios datos. Para compartir datos entre usuarios será necesario integrar una base de datos y autenticación.

# Desarrollar-front-end-en-React-main

Proyecto de Frontend en React para la gestión de una empresa CFE se usa 3 entidades.

## Entidades de Tablas que se agrego

- `jefes`: gestión de la dirección y liderazgo del negocio.
- `productos`: gestión de inventario de productos altas y bajas.
- `empleados`: gestión de empleados de la empresa.

## Tecnologías usadas

- Se usa React + Vite
- React Router Dom
- `json-server` para simular el backend
- `w3css` para los estilos visuales
- Fetch API para las operaciones CRUD

## Estructura principal del codigo

- `src/App.jsx` - rutas principales y configuración de React Router.
- `src/NavBar.jsx` - menú de navegación.
- `src/JefesCRUD.jsx` - Jefes.
- `src/ProductosCRUD.jsx` - Productos.
- `src/EmpleadosCRUD.jsx` - Empleados.
- `backend/db/datos.json` - Datos iniciales del servidor JSON su base de datos que registra en tablas.
- `backend/package.json` - Script para ejecutar `json-server`.

## Instalación y ejecución usando terminal o usar el githbash se tiene que hacer los pasos correspondientes para que funcione.

1. Abrir una terminal o el githbash y ejecutar en la carpeta del frontend en la carpeta administracion de negocio en el pc puede dar click derecho se abre open githbash y se usa el comando npm install directamente en la terminal de open gitbash "Si se ejecuta el comando npm install en la carpeta main se omite el npm install en el paso 2":

```bash
cd "Desarrollar-front-end-en-React-main"
npm install
```

2. Abrir otra open gitbash y ejecutar en la carpeta del backend simulado o puede abrirlo en open gitbash directo en la carpeta para no usar el cd "Desarrollar-front-end-en-React-main"/backend si se abre directamente en la carpeta puede ejecutar el npm install de ahi se ejecuta el npm run back para iniciar el servidor:

```bash
cd "Desarrollar-front-end-en-React-main"/backend
npm install
npm run back
```

3. Volver a la terminal del frontend o abrirla en la carpeta directo con open githbash el Desarrollar-front-end-en-React-main y ejecutar el npm run dev para iniciar el frontend:

```bash
cd "Desarrollar-front-end-en-React-main"
npm run dev
```

4. Abrir en el navegador la dirección que muestra Vite cuando se  ejecuta, en:

```text
http://localhost:5173
```

## Uso de la navegacion.

- Navegar a `Jefes`, `Productos` o `Empleados` desde el menú.
- Crear registros llenando el formulario.
- Editar un registro usando el botón `Editar` de la tabla.
- Eliminar un registro con el botón `Borrar`.

## Ejecucion del backend en la cual se simula

- El backend simulado se ejecuta en en general `http://localhost:3000`.
- El frontend consume las rutas de cada tabla:
  - `http://localhost:3000/jefes`
  - `http://localhost:3000/productos`
  - `http://localhost:3000/empleados`
- Se usa `w3css` usando como principal el `index.html`.
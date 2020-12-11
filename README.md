# BookLend

Proyecto para ayudar en la gestión de bibliotecas pequeñas que no se pueden permitir el desarrollo de una web propia con sistema de préstamos online. Tendrá un completo sistema de reservas, préstamos y catálogo de libros.

Este proyecto se engloba dentro del Bootcamp de Skylabs de Front-end developer. Es el proyecto final para el que hemos tenido 1 mes a tiempo parcial para desarrollarlo.

## Demo

[Ver proyecto BookLend](https://booklend-app.web.app)


## Tecnología utilizada

- HTML5
- CSS3 + SASS
- React + Reduz
- Firebase
- Google API
- Git

## Programación usada

- Listas
- CRUD (create, read, update, delete)
- Registro y login
- Formularios y validaciones
- Filtrar datos
- Recuperación de datos de API
- Conexión a BBDD (Firebase)
- Testing (Jest)
- Diseño responsive

## Visión según el tipo de usuario

### Admin

- Landing de acceso
	- Registro de biblioca + admin
	- Login
- Crear un catálogo propio (api google)
- Crear categorías propias
- Por cada libro:
	- Datos de la BBDD
	- Código propia biblioteca
	- Fecha adquisición
- Gestión de Colección:
	- Listado
	- Préstar libros
	- Devolver libros
	- Borrar libros
	- Edición de préstamos (Fase2)
- Gestión de usuarios: (Fase2)
	- Listado
	- Registro de nuevos usuarios
	- Borrar usuarios
	- Editar usuarios
- Área de notificaciones (Fase2)
	- Avisos de no devoluciones
- Configuración de biblioteca: (Fase2)
	- Días de penalización
	- Permitir autogestión
- Gestión de admin: (Fase2)
	- Listado
	- Nuevo admin
	- Editar admin
	- Borrar admin

### Usuario

- Landing de acceso
	- Registro
	- Login
- Catálogo de libros:
	- Listado
	- Buscar (Fase2)
	- Filtrar por categorías (Fase2)
	- Novedades (Fase2)
	- Más prestados (Fase2)
- Por cada libro:
	- Reservar
	- Comentar en libro (Fase2)
- Gestión de reservas:
	- Listado
	- Renovar libro (Fase2)
- Sugerir nuevos libros (Fase2)
- Estadísticas de lecturas (Fase2)

## Estructura de páginas

![paginas](https://github.com/saioacoder/booklend/blob/develop/src/img/Booklend-paginas.svg)

## Wireframes

![wireframe](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/87f69711-5a3c-4d39-bfad-e763a6035be6/Estructura_pantallas.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201210T170742Z&X-Amz-Expires=86400&X-Amz-Signature=3a4668300e80b528dc810f96177a9c017972d38164d1d0d85efb2c9a642f260b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D"Estructura_pantallas.svg")

## Diagrama de la BBDD

![diagram](https://github.com/saioacoder/booklend/blob/develop/src/img/Booklend_diagram.svg)

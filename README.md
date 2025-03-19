# Superhéroes - CRUD Avanzado con Node.js

Sistema CRUD con eliminación lógica y almacenamiento local de imágenes.  
Tecnologías: Node.js, Express, MySQL, EJS, Multer, Bootstrap.

## Nuevas Características
- Borrado lógico (soft delete) con columna deleted_at
- Almacenamiento local de imágenes
- Restauración de registros desde la vista de eliminados
- Validación de formularios para campos obligatorios
- Estructura organizada con vistas EJS

## Instalación
1. Clonar repositorio:
   git clone https://github.com/Mapka21/superheroes-db-act8.git
   cd superheroes-db-act8

2. Instalar dependencias:
   npm install

3. Configurar MySQL:
   CREATE DATABASE superheroes_db;
   USE superheroes_db;
   CREATE TABLE superheroes (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nombre_real VARCHAR(100) NOT NULL,
     nombre_heroe VARCHAR(100) NOT NULL,
     foto_url VARCHAR(255) NOT NULL,
     informacion_adicional TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     deleted_at TIMESTAMP NULL DEFAULT NULL
   );

4. Crear carpeta para imágenes:
   mkdir -p public/uploads

## Uso
npm start

Accesos principales:
- http://localhost:3001 (Listado activos)
- http://localhost:3001/create (Crear nuevo)
- http://localhost:3001/deleted (Registros eliminados)


## Estructura del Proyecto
superheroes-db-act8/
├── public/
│   ├── uploads/ (Imágenes subidas)
│   └── css/ (Estilos opcionales)
├── views/
│   ├── index.ejs (Listado principal)
│   ├── deleted.ejs (Eliminados lógicos)
│   ├── create.ejs (Formulario creación)
│   ├── edit.ejs (Formulario edición)
│   └── show.ejs (Detalle completo)
├── app.js (Configuración principal)
└── package.json (Dependencias)

## Enlace GitHub
https://github.com/Mapka21/superheroes-db-act8

Nota: Para producción, crear archivo .env con credenciales de MySQL y añadirlo a .gitignore.

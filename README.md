# Superhéroes - CRUD Avanzado con Node.js

Sistema CRUD para gestionar superhéroes con eliminación lógica y almacenamiento local de imágenes.  
Desarrollado con:
- Node.js
- Express
- MySQL
- EJS (plantillas)
- Multer (subida de archivos)

## 🚀 Nuevas Características
- **Borrado lógico (soft delete)**: Los registros se marcan como eliminados (no se borran físicamente).
- **Almacenamiento local de imágenes**: Sube fotos desde tu computadora (en lugar de URLs externas).
- **Vista de registros eliminados**: Restaura superhéroes eliminados con un clic.
- **Validación de formularios**: Campos obligatorios y soporte para imágenes.

## 📦 Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Mapka21/superheroes-db-act8.git
Instala las dependencias:

bash
Copy
cd superheroes-db-act8
npm install
Configura la base de datos:

sql
Copy
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
Crea la carpeta para imágenes:

bash
Copy
mkdir -p public/uploads
💻 Uso
Inicia el servidor:

bash
Copy
npm start
Accede a las rutas:

Registros activos: http://localhost:3001

Crear nuevo: http://localhost:3001/create

Registros eliminados: http://localhost:3001/deleted

📂 Estructura del Proyecto
Copy
superheroes-db-act8/
├── public/
│   └── uploads/          # Imágenes subidas
├── views/
│   ├── index.ejs         # Lista de superhéroes activos
│   ├── deleted.ejs       # Registros eliminados
│   ├── create.ejs        # Formulario de creación
│   └── edit.ejs          # Formulario de edición
└── app.js                # Lógica principal

🔗 Enlace al Repositorio
https://github.com/Mapka21/superheroes-db-act8

Nota: Asegúrate de tener MySQL y Node.js instalados. Las imágenes se almacenan en public/uploads/.

Copy

### Pasos Finales:
1. Crea una carpeta `screenshots/` en tu proyecto y añade las imágenes solicitadas.
2. Reemplaza los nombres de las capturas (`index.png`, `deleted.png`, etc.) con las tuyas.
3. ¡Listo para entregar! 🎉


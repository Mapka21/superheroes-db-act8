const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3001;

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Configuración de Express
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mezc.2868",
  database: "superheroes_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado a MySQL");
});

// ================= RUTAS ================= //
// Listar superhéroes activos
app.get("/", (req, res) => {
  db.query(
    "SELECT * FROM superheroes WHERE deleted_at IS NULL",
    (err, results) => {
      if (err) throw err;
      res.render("index", { superheroes: results });
    }
  );
});

// Mostrar formulario de creación
app.get("/create", (req, res) => {
  res.render("create");
});

// Procesar creación (con subida de imagen)
app.post("/create", upload.single("foto"), (req, res) => {
  const { nombre_real, nombre_heroe, informacion_adicional } = req.body;
  const foto_url = req.file ? "/uploads/" + req.file.filename : null;

  db.query(
    "INSERT INTO superheroes (nombre_real, nombre_heroe, foto_url, informacion_adicional) VALUES (?, ?, ?, ?)",
    [nombre_real, nombre_heroe, foto_url, informacion_adicional],
    (err) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

// Borrado lógico
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE superheroes SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?",
    [id],
    (err) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

// Mostrar eliminados
app.get("/deleted", (req, res) => {
  db.query(
    "SELECT * FROM superheroes WHERE deleted_at IS NOT NULL",
    (err, results) => {
      if (err) throw err;
      res.render("deleted", { superheroes: results });
    }
  );
});

// Restaurar registro
app.post("/restore/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE superheroes SET deleted_at = NULL WHERE id = ?",
    [id],
    (err) => {
      if (err) throw err;
      res.redirect("/deleted");
    }
  );
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
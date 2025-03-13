const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

// Configuración
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mezc.2868",
  database: "superheroes_db"
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado a MySQL");
});

// ======= RUTAS ======= //
// Listar todos los superhéroes
app.get("/", (req, res) => {
  db.query("SELECT * FROM superheroes", (err, results) => {
    if (err) throw err;
    res.render("index", { superheroes: results });
  });
});

// Mostrar formulario de creación
app.get("/create", (req, res) => {
  res.render("create");
});

// Procesar formulario de creación
app.post("/create", (req, res) => {
  const { nombre_real, nombre_heroe, foto_url, informacion_adicional } = req.body;
  db.query(
    "INSERT INTO superheroes (nombre_real, nombre_heroe, foto_url, informacion_adicional) VALUES (?, ?, ?, ?)",
    [nombre_real, nombre_heroe, foto_url, informacion_adicional],
    (err) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

// Mostrar detalles de un superhéroe
app.get("/show/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM superheroes WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.render("show", { superheroe: results[0] });
  });
});

// Mostrar formulario de edición
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM superheroes WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.render("edit", { superheroe: results[0] });
  });
});

// Procesar formulario de edición
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const { nombre_real, nombre_heroe, foto_url, informacion_adicional } = req.body;
  db.query(
    "UPDATE superheroes SET nombre_real = ?, nombre_heroe = ?, foto_url = ?, informacion_adicional = ? WHERE id = ?",
    [nombre_real, nombre_heroe, foto_url, informacion_adicional, id],
    (err) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

// Eliminar superhéroe
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM superheroes WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
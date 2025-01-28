const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Configurar el puerto
const PORT = 3000;

// Ruta para obtener todos los usuarios
app.get("/users", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data", "users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error al leer los usuarios" });
      }
      const users = JSON.parse(data);
      res.json(users);
    }
  );
});

// Ruta para obtener todas las tarjetas
app.get("/cards", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data", "cards.json"),
    "utf8",
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error al leer las tarjetas" });
      }
      const cards = JSON.parse(data);
      res.json(cards);
    }
  );
});

// Ruta para obtener un usuario por ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(
    path.join(__dirname, "data", "users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error al leer los usuarios" });
      }
      const users = JSON.parse(data);
      const user = users.find((u) => u.id === id);
      if (!user) {
        return res.status(404).json({ message: "ID de usuario no encontrado" });
      }
      res.json(user);
    }
  );
});

// Ruta para manejar recursos no encontrados
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

// Iniciar el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user"); // Importamos las rutas de usuarios
const cardRoutes = require("./routes/card"); // Importamos las rutas de tarjetas

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/aroundb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🔥 Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

app.use(express.json()); // Middleware para recibir JSON

// Middleware de autorización temporal
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // Reemplaza con el _id real del usuario de prueba
  };
  next();
});

// 📌 Usar las rutas de usuarios y tarjetas desde `routes/`
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

// 📌 Ruta para manejar recursos no encontrados
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

// 📌 Iniciar el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

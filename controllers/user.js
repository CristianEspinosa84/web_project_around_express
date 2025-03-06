const User = require("../models/user");

// 📌 Obtener todos los usuarios
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch(() =>
      res.status(500).json({ message: "Error interno del servidor" })
    );
};

// 📌 Obtener un usuario por ID con orFail()
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID de usuario inválido" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Crear un nuevo usuario con validación
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Datos inválidos para crear usuario" });
      }
      res.status(500).json({ message: "Error interno del servidor" });
    });
};

// 📌 Actualizar perfil (name y about)
const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Datos inválidos para actualizar perfil" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Actualizar avatar
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "URL del avatar inválida" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Exportar todas las funciones
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};

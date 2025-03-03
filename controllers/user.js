const User = require("../models/user");

// 📌 Actualizar perfil (name y about)
const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id, // ID del usuario obtenido del middleware
    { name, about },
    { new: true, runValidators: true } // Retorna el usuario actualizado y aplica validaciones
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};

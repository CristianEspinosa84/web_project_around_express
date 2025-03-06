const Card = require("../models/card");

// 📌 Obtener todas las tarjetas
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).json(cards))
    .catch(() =>
      res.status(500).json({ message: "Error interno del servidor" })
    );
};

// 📌 Crear una nueva tarjeta
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // Middleware asigna el usuario automáticamente

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Datos inválidos para crear tarjeta" });
      }
      res.status(500).json({ message: "Error interno del servidor" });
    });
};

// 📌 Eliminar una tarjeta por ID con orFail()
const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then(() =>
      res.status(200).json({ message: "Tarjeta eliminada con éxito" })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID de tarjeta inválido" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Dar like a una tarjeta
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // Agrega el ID del usuario si no está
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).json(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID de tarjeta inválido" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Quitar like de una tarjeta
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // Elimina el ID del usuario del array de likes
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).json(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID de tarjeta inválido" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Exportar todas las funciones
module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };

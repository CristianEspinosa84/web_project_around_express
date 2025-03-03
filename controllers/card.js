const Card = require("../models/card");

// 📌 Dar like a una tarjeta
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // Agrega el ID del usuario al array si no está
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

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };

const mongoose = require("mongoose");
const validator = require("validator"); // Librería para validar URLs

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    maxlength: [30, "El nombre no puede tener más de 30 caracteres"],
  },
  about: {
    type: String,
    required: [true, "La información es obligatoria"],
    minlength: [2, "Debe tener al menos 2 caracteres"],
    maxlength: [30, "No puede tener más de 30 caracteres"],
  },
  avatar: {
    type: String,
    required: [true, "El avatar es obligatorio"],
    validate: {
      validator: function (url) {
        return /^(https?:\/\/)(www\.)?[\w-]+(\.[\w-]+)+([/?#].*)?$/.test(url);
      },
      message: "El enlace del avatar no es válido",
    },
  },
});

module.exports = mongoose.model("user", userSchema);

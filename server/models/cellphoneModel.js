const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cellphoneSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  memory: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Cellphone", cellphoneSchema);

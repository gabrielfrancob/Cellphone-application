const express = require("express");
const Cellphone = require("../models/cellphoneModel");
const {
  createCellphone,
  getAllCellphones,
  deleteCellphone,
  updateCellphone,
} = require("../controllers/cellphoneController");

const router = express.Router();

router.get("/", getAllCellphones);

router.post("/", createCellphone);

router.delete("/:id", deleteCellphone);

router.patch("/:id", updateCellphone);

module.exports = router;

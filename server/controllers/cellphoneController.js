const Cellphone = require("../models/cellphoneModel");
const mongoose = require("mongoose");

// get all cellphones
const getAllCellphones = async (req, res) => {
  const cellphones = await Cellphone.find({});

  res.status(200).json(cellphones);
};

// create new cellphone
const createCellphone = async (req, res) => {
  let { brand, model, memory, launchDate } = req.body;

  launchDate = launchDate.split("T")[0];
  try {
    const cellphone = await Cellphone.create({
      brand,
      model,
      memory,
      launchDate,
    });
    res.status(200).json(cellphone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a cellphone
const deleteCellphone = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such cellphone" });

  const cellphone = await Cellphone.findByIdAndDelete({ _id: id });

  if (!cellphone) return res.status(400).json({ error: "No such cellphone" });

  res.status(200).json(cellphone);
};

// update a cellphone
const updateCellphone = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such cellphone" });

  const cellphone = await Cellphone.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!cellphone) return res.status(400).json({ error: "No such cellphone" });

  res.status(200).json(cellphone);
};

module.exports = {
  getAllCellphones,
  deleteCellphone,
  createCellphone,
  updateCellphone,
};

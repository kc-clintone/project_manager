// imports
const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "complete"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
  },
})

module.exports = mongoose.model("Project", projectSchema)

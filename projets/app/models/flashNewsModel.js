const mongoose = require("mongoose");

const flashNewsSchema = mongoose.Schema(
  {
    startDate: Date,
    endDate: Date,
    title: String,
    bodyText: String
  },
  {
    timestamps: true
  }
);

const flashNewsModel = mongoose.model('flashNews', flashNewsSchema);

module.exports = flashNewsModel;
const mongoose = require("mongoose");

const coachsSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  pictureUrl: String,
  pictureId: String,
  qualification: String
});

const picturesSchema = mongoose.Schema({
  pictureUrl: String,
  pictureId: String
});

const beachSchema = mongoose.Schema({
  title: String,
  coachs: [coachsSchema],
  training: {
    place: String,
    period1: String,
    period2: String,
    day1: String,
    day2: String,
  },
  subscription: {
    subscription: String,
    fees: String,
  },
  pictures: [picturesSchema]
},
  {
    timestamps: true
  }
)

const beachModel = mongoose.model('beach', beachSchema);

module.exports = beachModel;
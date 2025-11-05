const mongoose = require("mongoose");


const playersSchema = mongoose.Schema({
  firstName: String,
  lastName: String
});

const matchsSchema = mongoose.Schema({
  phase: String,
  gameDate: Date,
  gymnasium: String,
  address: String,
  zip: String,
  city: String,
  clubReceiving: String,
  teamReceiving: String,
  clubVisitor: String,
  teamVisitor: String,
  setsWonByTeamReceiving: Number,
  setsWonByTeamVisitor: Number,
  scores: String,
  accompanists: [{
    firstName: String,
    lastName: String,
  }]
});

const teamSchema = mongoose.Schema({
  seasonStartYear: Number,
  seasonEndYear: Number,
  category: String,
  championship: String,
  teamNumber: String,
  group: String,
  gender: String,
  teamName: String,
  format: String,
  coach : {
    firstName: String,
    lastName: String
  },
  players: [playersSchema],
  teamPicture: {
    id: String,
    url: String
  },
  matchs: [matchsSchema]
}, {
  timestamps: true,
})

const teamModel = mongoose.model('teams', teamSchema);

module.exports = teamModel;
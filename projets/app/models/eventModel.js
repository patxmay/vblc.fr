const mongoose = require("mongoose");

const teamsRegistrationSchema = mongoose.Schema({
  tournament: String,
  teamName: String,
  teamLevel: String,
  player1: {
    memberVblc: Boolean,
    firstName: String,
    lastName: String,
    birthday: String,
    email: String,
    mobile: String
  },
  player2: {
    memberVblc: Boolean,
    firstName: String,
    lastName: String,
    birthday: String,
    email: String,
    mobile: String
  },
  player3: {
    memberVblc: Boolean,
    firstName: String,
    lastName: String,
    birthday: String,
    email: String,
    mobile: String
  },
  player4: {
    memberVblc: Boolean,
    firstName: String,
    lastName: String,
    birthday: String,
    email: String,
    mobile: String
  },
  player5: {
    memberVblc: Boolean,
    firstName: String,
    lastName: String,
    birthday: String,
    email: String,
    mobile: String
  },
  player6: {
    memberVblc: Boolean,
    firstName: String,
    lastName: String,
    birthday: String,
    email: String,
    mobile: String
  }
})

const participantSchema = mongoose.Schema({
  participant: {
    firstName: String,
    lastName: String,
    isMemberVBLC: Boolean
  },
  guest1: {
    firstName: String,
    lastName: String,
    isMemberVBLC: Boolean
  },
  guest2: {
    firstName: String,
    lastName: String,
    isMemberVBLC: Boolean
  },
  guest3: {
    firstName: String,
    lastName: String,
    isMemberVBLC: Boolean
  },
  guest4: {
    firstName: String,
    lastName: String,
    isMemberVBLC: Boolean
  }
});

const tournamentSchema = mongoose.Schema({
  format: String,
  playersPerTeam: Number,
  teamFormat: String,
  teamsLimited: Number
});

const eventSchema = mongoose.Schema({
  category: String,
  otherEventName: String,
  year: Number,
  title: String,
  city: String,
  startDate: Date,
  endDate: Date,
  shortDescription: String,
  description: String,
  place: String,
  fees: String,
  poster: String,
  posterId: String,
  subscription: Boolean,
  eventType: String,
  tournament: [tournamentSchema],
  catering: {
    bar: Boolean,
    snack: Boolean,
    menu: Boolean,
    starter: String,
    mainCourse: String,
    dessert: String,
    beverage: String,
    coldFood: String,
    hotFood: String
  },
  registration: [teamsRegistrationSchema],
  eventRegistration: [participantSchema]
},
  {
    timestamps: true
  }
);


const eventModel = mongoose.model('events', eventSchema);

module.exports = eventModel;


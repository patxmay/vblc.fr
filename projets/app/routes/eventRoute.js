const express = require("express");
const router = express.Router();
require("dotenv").config()
const cloudinary = require("cloudinary").v2


const eventModel = require("../models/eventModel");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

//ROUTE POUR LA CRÉATION D'UN NOUVEL EVENEMENT 
router.post('/createEvent', async function (req, res, next) {
  var error = [];
  var success = [];
  result = false;
  var eventSaved = null;

  const eventAlreadyExists = await eventModel.findOne({ category: req.body.categoryFromFront, year: req.body.yearFromFront, otherEventName: req.body.nameForOtherEventCategoryFromFront });

  if (eventAlreadyExists != null) {
    error.push("Un événement du même nom et de la même année existe déjà.")
  }
  if (req.body.categoryFromFront === "" || req.body.yearFromFront === "" || req.body.titleFromFront === "" || req.body.startDateFromFront === "" || req.body.endDateFromFront === "" || req.body.cityFromFront === "" || req.body.descriptionFromFront === "" || req.body.placeFromFront === "") {
    error.push("Les champs Catégorie de l'événement, Année d'édition, Titre de l'événement, Dates de l'événement, Description de l'événement, lieu où se déroule l'événement sont obligatoires. ")
  }

  if (req.body.categoryFromFront === "Autre événement" && req.body.nameForOtherEventCategoryFromFront === "") {
    error.push("Pour la catégorie 'Autre événement', le nom de l'événement est obligatoire.")
  }

  if (error.length === 0) {
    var newEvent = new eventModel({
      category: req.body.categoryFromFront,
      otherEventName: req.body.nameForOtherEventCategoryFromFront,
      year: req.body.yearFromFront,
      title: req.body.titleFromFront,
      city: req.body.cityFromFront,
      startDate: req.body.startDateFromFront,
      endDate: req.body.endDateFromFront,
      shortDescription: req.body.shortDescriptionFromFront,
      description: req.body.descriptionFromFront,
      place: req.body.placeFromFront,
      fees: req.body.feesFromFront,
      poster: req.body.posterFromFront,
      posterId: req.body.posterIdFromFront,
      subscription: req.body.subscriptionFromFront,
      eventType: req.body.eventTypeFromFront,
      catering: {
        bar: req.body.barFromFront,
        snack: req.body.snackFromFront,
        menu: req.body.menuFromFront,
        starter: req.body.starterFromFront,
        mainCourse: req.body.mainCourseFromFront,
        dessert: req.body.dessertFromFront,
        beverage: req.body.beverageFromFront,
        coldFood: req.body.coldFoodFromFront,
        hotFood: req.body.hotFoodFromFront
      }
    });

    if (req.body.formatTournament1FromFront !== "") {
      newEvent.tournament.push(
        {
          format: req.body.formatTournament1FromFront,
          playersPerTeam: req.body.playersPerTeamTournament1FromFront,
          teamFormat: req.body.teamFormatTournament1FromFront,
          teamsLimited: req.body.teamsLimitedTournament1FromFront,
        }
      )
    };

    if (req.body.formatTournament2FromFront !== "") {
      newEvent.tournament.push(
        {
          format: req.body.formatTournament2FromFront,
          playersPerTeam: req.body.playersPerTeamTournament2FromFront,
          teamFormat: req.body.teamFormatTournament2FromFront,
          teamsLimited: req.body.teamsLimitedTournament2FromFront
        }
      )
    };

    if (req.body.formatTournament3FromFront !== "") {
      newEvent.tournament.push(
        {
          format: req.body.formatTournament3FromFront,
          playersPerTeam: req.body.playersPerTeamTournament3FromFront,
          teamFormat: req.body.teamFormatTournament3FromFront,
          teamsLimited: req.body.teamsLimitedTournament3FromFront
        }
      )
    };

    eventSaved = newEvent.save();

    if (eventSaved) {
      result = true;
      success.push("Vous venez de créer un nouvel événement avec succès! Merci pour votre contribution.")
    }
  }
  res.json({ result, eventSaved, error, success })
});

//ROUTE POUR RÉCUPERER LES EVENEMENTS MODIFIABLES 👍 
router.get('/loadAllEvents', async function (req, res, next) {
  let todayDate = new Date()
  let data = await eventModel
    .find()
    .sort({ startDate: 1 })
  res.json(data)
});

//ROUTE POUR UPDATER LA CATEGORY DE L'EVENEMENT 👍
router.put("/updateCategory", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      category: req.body.categoryFromFront
    }
  );
  res.json({ data })
})

//ROUTE POUR LA MODIFICATION DU NOM DE L'ÉVÉNEMENT SI LA CATEGORIE EST "AUTRE ÉVÉNEMENT" 👍
router.put("/updateOtherEventName", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      otherEventName: req.body.otherEventNameFromFront
    }
  );
  res.json({ data })
})

//ROUTE POUR UPDATER L'ANNÉE D'ÉDITION DE L'EVENEMENT 👍
router.put("/updateYear", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      year: req.body.yearFromFront
    }
  );
  res.json({ data })
})

//ROUTE POUR UPDATER LE TITRE DE L'EVENEMENT 👍
router.put("/updateTitle", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      title: req.body.titleFromFront
    }
  );
  res.json({ data })
})

//ROUTE POUR UPDATER LA VILLE DE L'EVENEMENT 👍
router.put("/updateCity", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      city: req.body.cityFromFront
    }
  );
  res.json({ data })
});

//ROUTE POUR UPDATER LA DESCRIPTION COURTE DE L'ÉVÉNEMENT 👍
router.put("/updateShortDescription", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      shortDescription: req.body.shortDescriptionFromFront
    }
  );
  res.json({ data })
});

//ROUTE POUR UPDATER LA DESCRIPTION DE L'EVENEMENT 👍
router.put("/updateDescription", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      description: req.body.descriptionFromFront
    }
  );
  res.json({ data })
});

//ROUTE POUR UPDATER L'ADRESSE DE L'EVENEMENT 👍
router.put("/updatePlace", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      place: req.body.placeFromFront
    }
  );
  res.json({ data })
})

//ROUTE POUR UPDATER L'ADRESSE DE L'EVENEMENT 👍
router.put("/updateStartDate", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      startDate: req.body.startDateFromFront
    }
  );
  res.json({ data })
})

//ROUTE POUR UPDATER L'ADRESSE DE L'EVENEMENT 👍
router.put("/updateEndDate", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      endDate: req.body.endDateFromFront
    }
  )
  res.json({ data })
})

//ROUTE POUR UPDATER LE TYPE D'EVENEMENT 👍
router.put("/updateEventType", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      eventType: req.body.eventTypeFromFront
    }
  );
  res.json({ data })
})

// XXXXXXXXXXXXXXXXXXXXX ROUTES POUR UPDATER LE(S) TOURNOI(S) DE L'EVENEMENT XXXXXXXXXXXXXXXXXXXXX

// 1 ROUTE POUR UPDATER LE FORMAT DU TOURNOI 1 👍
router.put("/updateFormatTournament1", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      $set: {
        "tournament.$.format": req.body.formatTournament1FromFront
      }
    }
  );
  res.json({ data })
});

// 1 ROUTE POUR UPDATER LE NOMBRE DE JOUEURS DU TOURNOI 1 👍
router.put("/updatePlayersPerTeamTournament1", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      $set: {
        "tournament.$.playersPerTeam": req.body.playersPerTeamTournament1FromFront
      }
    }
  );
  res.json({ data })
});

// 1 ROUTE POUR UPDATER LE FORMAT D'ÉQUIPE DU TOURNOI 1 👍
router.put("/updateTeamFormatTournament1", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      $set: {
        "tournament.$.teamFormat": req.body.teamFormatTournament1FromFront
      }
    }
  );
  res.json({ data })
});

// 1 ROUTE POUR UPDATER LE NOMBRE D'ÉQUIPES LIMITE DU TOURNOI 1 👍
router.put("/updateTeamsLimitedTournament1", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      "tournament.$.teamsLimited": req.body.teamsLimitedTournament1FromFront
    }
  );
  res.json({ data })
});


// 2 ROUTE POUR UPDATER LE FORMAT DU TOURNOI 2 👍
router.put("/updateFormatTournament2", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      $set: {
        "tournament.$.format": req.body.formatTournament2FromFront
      }
    }
  );
  res.json({ data })
});

// 2 ROUTE POUR UPDATER LE NOMBRE DE JOUEURS DU TOURNOI 2 👍
router.put("/updatePlayersPerTeamTournament2", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      $set: {
        "tournament.$.playersPerTeam": req.body.playersPerTeamTournament2FromFront
      }
    }
  );
  res.json({ data })
});

// 2 ROUTE POUR UPDATER LE FORMAT D'ÉQUIPE DU TOURNOI 2 👍
router.put("/updateTeamFormatTournament2", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      $set: {
        "tournament.$.teamFormat": req.body.teamFormatTournament2FromFront
      }
    }
  );
  res.json({ data })
});

// 2 ROUTE POUR UPDATER LE NOMBRE D'ÉQUIPES LIMITE DU TOURNOI 2 👍
router.put("/updateTeamsLimitedTournament2", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      $set: {
        "tournament.$.teamsLimited": req.body.teamsLimitedTournament2FromFront
      }
    }
  );
  res.json({ data })
});


// 3 ROUTE POUR UPDATER LE FORMAT DU TOURNOI 3 👍
router.put("/updateFormatTournament3", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      $set: {
        "tournament.$.format": req.body.formatTournament3FromFront
      }
    }
  );
  res.json({ data })
});

// 3 ROUTE POUR UPDATER LE NOMBRE DE JOUEURS DU TOURNOI 3 👍
router.put("/updatePlayersPerTeamTournament3", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      $set: {
        "tournament.$.playersPerTeam": req.body.playersPerTeamTournament3FromFront
      }
    }
  );
  res.json({ data })
});

// 3 ROUTE POUR UPDATER LE FORMAT D'ÉQUIPE DU TOURNOI 3 👍
router.put("/updateTeamFormatTournament3", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      $set: {
        "tournament.$.teamFormat": req.body.teamFormatTournament3FromFront
      }
    }
  );
  res.json({ data })
});

// 3 ROUTE POUR UPDATER LE NOMBRE D'ÉQUIPES LIMITE DU TOURNOI 3 👍
router.put("/updateTeamsLimitedTournament3", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { "tournament._id": req.query._id },
    {
      $set: {
        "tournament.$.teamsLimited": req.body.teamsLimitedTournament3FromFront
      }
    }
  );
  res.json({ data })
});



//UPDATE FRAIS D'INSCRIPTION À UN ÉVÉNEMENT 👍
router.put("/updateFees", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      fees: req.body.feesFromFront
    }
  )
  res.json({ data })
})

//UPDATE MENU REPAS (OUI OU NON) 👍
router.put("/updateMenu", async function (req, res, next) {

  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      $set: {
        "catering.menu": req.body.menuFromFront
      }
    }
  )
  res.json({ data })
})

//UPDATE MENU ENTRÉE DU REPAS
router.put("/updateStarter", async function (req, res, next) {

  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      $set: {
        "catering.starter": req.body.starterFromFront
      }
    }
  )
  res.json({ data })
})

//UPDATE MENU PLAT PRINCIPAL DU REPAS
router.put("/updateMainCourse", async function (req, res, next) {

  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      $set: {
        "catering.mainCourse": req.body.mainCourseFromFront
      }

    }
  )
  res.json({ data })
})

//UPDATE MENU DESSERT DU REPAS
router.put("/updateDessert", async function (req, res, next) {

  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      $set: {
        "catering.dessert": req.body.dessertFromFront
      }
    }
  )
  res.json({ data })
})

//UPDATE SERVICE BUVETTE (OUI OU NON)
router.put("/updateBar", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      $set: {
        "catering.bar": req.body.barFromFront
      }

    }
  )
  res.json({ data })
})

//UPDATE SERVICE SNACK (OUI OU NON)
router.put("/updateSnack", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      $set: {
        "catering.snack": req.body.snackFromFront
      }

    }
  )
  res.json({ data })
})

//UPDATE OFFRES DE BOISSON 
router.put("/updateBeverage", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      $set: {
        "catering.beverage": req.body.beverageFromFront
      }

    }
  )
  res.json({ data })
})

//UPDATE OFFRES DE SNACK FROID
router.put("/updateColdFood", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      $set: {
        "catering.coldFood": req.body.coldFoodFromFront
      }

    }
  )
  res.json({ data })
})

//UPDATE OFFRES DE SNACK CHAUD
router.put("/updateHotFood", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      $set: {
        "catering.hotFood": req.body.hotFoodFromFront
      }
    }
  )
  res.json({ data })
})

router.put("/updateSubscription", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      subscription: req.body.subscriptionFromFront
    }
  )
  res.json({ data })
})

router.put("/updatePoster", async function (req, res, next) {
  let data = await eventModel.updateOne(
    { _id: req.query._id },
    {
      poster: req.body.posterFromFront,
      posterId: req.body.posterIdFromFront
    }
  )
  res.json({ data })
})

router.post("/deleteCurrentPoster", async function (req, res, next) {

  const currentEvent = await eventModel.findById(req.query._id);
  const currentPosterId = currentEvent.posterId

  if (currentPosterId !== "" || currentPosterId !== undefined) {
    await cloudinary.uploader
      .destroy(currentPosterId, {
        resource_type: "image",
      })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    console.log("There is no poster in the data base.")
  }
})

router.post('/saveRegistrationForm', async function (req, res, next) {
  var error = [];
  var success = [];
  result = false;
  var registrationSaved = null;

  //SELECTION OBLIGATOIRE DU TOURNOI
  if (req.body.tournamentSelectedFromFront === "") {
    error.push("Veuillez svp sélectionner le tournoi auquel vous souhaitez participer.")
  };
  //CHAMPS OBLIGATOIRE: NOM DE L'ÉQUIPE
  if (req.body.teamNameFromFront === "") {
    error.push("Le nom de l'équipe est obligatoire.")
  };

  //CHAMPS OBLIGATOIRE DU JOUEUR 1
  if (req.body.player1IsMemberVBLCFromFront === false) {
    if (req.body.player1FirstNameFromFront === "" || req.body.player1LastNameFromFront === "" || req.body.player1BirthdayFromFront === "" || req.body.player1EmailFromFront === "" || req.body.player1PhoneFromFront === "") {
      error.push("Toutes les donnnées du joueur 1 sont obligatoires.")
    }
  } else {
    if (req.body.player1FirstNameFromFront === "" || req.body.player1LastNameFromFront === "" || req.body.player1EmailFromFront === "" || req.body.player1PhoneFromFront === "") {
      error.push("Toutes les donnnées du joueur 1 sont obligatoires.")
    }
  };

  //CHAMPS OBLIGATOIRE DU JOUEUR 2
  if (req.body.player2IsMemberVBLCFromFront === false) {
    if (req.body.player2FirstNameFromFront === "" || req.body.player2LastNameFromFront === "" || req.body.player2BirthdayFromFront === "" || req.body.player2EmailFromFront === "") {
      error.push("Toutes les donnnées du joueur 2 sont obligatoires.")
    }
  } else {
    if (req.body.player2FirstNameFromFront === "" || req.body.player2LastNameFromFront === "") {
      error.push("Le prénom et le nom du joueur 2 sont obligatoires.")
    }
  };


  if (error.length === 0) {
    var eventTargeted = await eventModel.findOne({ _id: req.query._id })

    eventTargeted.registration.push(
      {
        tournament: req.body.tournamentSelectedFromFront,
        teamName: req.body.teamNameFromFront,
        player1: {
          memberVblc: req.body.player1IsMemberVBLCFromFront,
          firstName: req.body.player1FirstNameFromFront,
          lastName: req.body.player1LastNameFromFront,
          birthday: req.body.player1BirthdayFromFront,
          email: req.body.player1EmailFromFront,
          mobile: req.body.player1PhoneFromFront
        },
        player2: {
          memberVblc: req.body.player2IsMemberVBLCFromFront,
          firstName: req.body.player2FirstNameFromFront,
          lastName: req.body.player2LastNameFromFront,
          birthday: req.body.player2BirthdayFromFront,
          email: req.body.player2EmailFromFront,
          mobile: req.body.player2PhoneFromFront
        },
        player3: {
          memberVblc: req.body.player3IsMemberVBLCFromFront,
          firstName: req.body.player3FirstNameFromFront,
          lastName: req.body.player3LastNameFromFront,
          birthday: req.body.player3BirthdayFromFront,
          email: req.body.player3EmailFromFront,
          mobile: req.body.player3PhoneFromFront
        },
        player4: {
          memberVblc: req.body.player4IsMemberVBLCFromFront,
          firstName: req.body.player4FirstNameFromFront,
          lastName: req.body.player4LastNameFromFront,
          birthday: req.body.player4BirthdayFromFront,
          email: req.body.player4EmailFromFront,
          mobile: req.body.player4PhoneFromFront
        },
        player5: {
          memberVblc: req.body.player5IsMemberVBLCFromFront,
          firstName: req.body.player5FirstNameFromFront,
          lastName: req.body.player5LastNameFromFront,
          birthday: req.body.player5BirthdayFromFront,
          email: req.body.player5EmailFromFront,
          mobile: req.body.player5PhoneFromFront
        },
        player6: {
          memberVblc: req.body.player6IsMemberVBLCFromFront,
          firstName: req.body.player6FirstNameFromFront,
          lastName: req.body.player6LastNameFromFront,
          birthday: req.body.player6BirthdayFromFront,
          email: req.body.player6EmailFromFront,
          mobile: req.body.player6PhoneFromFront
        },
        teamLevel: req.body.teamLevelFromFront
      }
    )
    var eventSaved = await eventTargeted.save()

    if (eventSaved) {
      result = true;
      success.push(`Votre équipe "${req.body.teamNameFromFront}" a bien été inscrite.`)
    }
  }
  res.json({ result, eventSaved, error, success })
});

router.post('/saveEventRegistration', async function (req, res, next) {
  var error = [];
  var success = [];
  result = false;
  var eventRegistrationSaved = null;

  // VÉRIFIER QUE LES CHAMPS SONT TOUS REMPLIS
  if (req.body.participantFirstNameFromFront === "" || req.body.participantLastNameFromFront === "") {
    error.push("Pour vous inscrire, votre prénom et votre nom sont obligatoire.")
  }

  if (error.length === 0) {
    var eventTargeted = await eventModel.findOne({ _id: req.query._id })

    eventTargeted.eventRegistration.push({
      participant: {
        firstName: req.body.participantFirstNameFromFront,
        lastName: req.body.participantLastNameFromFront,
        isMemberVBLC: req.body.participantIsMemberVBLCFromFront
      },
      guest1: {
        firstName: req.body.guest1FirstNameFromFront,
        lastName: req.body.guest1LastNameFromFront,
        isMemberVBLC: req.body.guest1IsMemberVBLCFromFront
      },
      guest2: {
        firstName: req.body.guest2FirstNameFromFront,
        lastName: req.body.guest2LastNameFromFront,
        isMemberVBLC: req.body.guest2IsMemberVBLCFromFront
      },
      guest3: {
        firstName: req.body.guest3FirstNameFromFront,
        lastName: req.body.guest3LastNameFromFront,
        isMemberVBLC: req.body.guest3IsMemberVBLCFromFront
      },
      guest4: {
        firstName: req.body.guest4FirstNameFromFront,
        lastName: req.body.guest4LastNameFromFront,
        isMemberVBLC: req.body.guest4IsMemberVBLCFromFront
      }
    });

    var eventSaved = await eventTargeted.save();

    if (eventSaved) {
      result = true;
      if (req.body.guest1FirstNameFromFront !== "" && req.body.guest2FirstNameFromFront !== "") {
        success.push(`Bonjour ${req.body.participantFirstNameFromFront}, votre participation à l'événement ${eventTargeted.title} ainsi celles de vos invités ont bien été enregistrées. A bientôt!`)
      } else if (req.body.guest1FirstNameFromFront !== "") {
        success.push(`Bonjour ${req.body.participantFirstNameFromFront}, votre participation à l'événement ${eventTargeted.title} ainsi celle de votre invité ont bien été enregistrées. A bientôt!`)
      } else {
        success.push(`Bonjour ${req.body.participantFirstNameFromFront}, votre participation à l'évenement ${eventTargeted.title} a bien été enregistrée. A bientôt!`)
      }
    }
  }
  res.json({ result, eventSaved, error, success })
});

// LES DEUX ROUTES POUR SUPPRIMER UN ÉVÉNEMENT DE DONNÉES MONGODB ET SUPPRIMER SON AFFICHE DE LA BASE MEDIA CLOUDINARY
// 1. On supprime la photo de l'événement de la base des media Cloudinary
router.post('/deleteAEventPosterFromCloudinary', async function (req, res, next) {

  console.log("*** REQ.BODY.POSTERID ***", req.body.selectedEventPosterIdFromFront)

  await cloudinary.uploader.destroy(req.body.selectedEventPosterIdFromFront, {
    resource_type: "image",
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
});

// 2. On supprime l'événement de la base de données MongoDB
router.delete('/deleteAEventFromMongDB', async function (req, res, next) {
  console.log("*** REQ.QUERY ***", req.query._id)
  await eventModel.deleteOne(
    { _id: req.query._id }
  )
});

module.exports = router;
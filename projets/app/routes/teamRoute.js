const express = require("express");
const router = express.Router();
require("dotenv").config()
const cloudinary = require("cloudinary").v2

const teamModel = require("../models/teamModel");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

//ROUTE POUR LA CREATION D'UNE NOUVELLE ÉQUIPE
router.post('/createTeam', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;
  var teamSaved = null;

  //VÉRIFICATION SI L'EQUIPE EXISTE
  const teamAlreadyExists = await teamModel.findOne({ seasonStartYear: req.body.seasonStartYearFromFront, seasonEndYear: req.body.seasonEndYearFromFront, category: req.body.categoryFromFront, championship: req.body.championshipFromFront, format: req.body.formatFromFront, group: req.body.groupFromFront, teamNumber: req.body.teamNumberFromFront, gender: req.body.genderFromFront, teamName: req.body.teamNameFromFront });

  if (teamAlreadyExists !== null) {
    errors.push("Il existe déjà une équipe correspondant aux données de l'équipe que vous souhaitez créez. Veuille svp vérifier les informations saisies ou sélectionnées.")
  }
  //VÉRIFICATION DES CHAMPS VIDES POUR LA CATÉGORIE PROXY:
  if ((req.body.categoryFromFront === "Proxy") && (req.body.seasonStartYearFromFront === "" || req.body.seasonEndYearFromFront === "" || req.body.championshipFromFront === "" || req.body.formatFromDront === "" || req.body.teamNumberFromFront === "" || req.body.genderFromFront === "" || req.body.coachFirstNameFromFront === "" || req.body.coachLastNameFromFront === "")) {
    errors.push("Pour la catégorie Proxy, les champs Année de début et de fin de saison, le championnat, le format de compétition, le n° de l'équipe, le genre, les informations du coach sont obligatoires.")
  }
  //VÉRIFICATION DES CHAMPS VIDES POUR LA CATÉGORIE JEUNES/SENIORS:
  if ((req.body.categoryFromFront === "Jeunes / Seniors") && (req.body.seasonStartYearFromFront === "" || req.body.seasonEndYearFromFront === "" || req.body.championshipFromFront === "" || req.body.formatFromDront === "" || req.body.groupFromFront === "" || req.body.teamNumberFromFront === "" || req.body.genderFromFront === "" || req.body.coachFirstNameFromFront === "" || req.body.coachLastNameFromFront === "")) {
    errors.push("Pour la catégorie Jeunes / Séniors, les champs Année de début et de fin de saison, le championnat, le format de compétition, le groupe / poule, le n° de l'équipe, le genre, les informations du coach sont obligatoires.")
  }

  //VÉRIFICATION DES CHAMPS VIDES POUR LA CATÉGORIE CORPORATE:
  if ((req.body.categoryFromFront === "Corporate") && (req.body.seasonStartYearFromFront === "" || req.body.seasonEndYearFromFront === "" || req.body.championshipFromFront === "" || req.body.formatFromFront === "" || req.body.groupFromFront === "" || req.body.teamNumberFromFront === "" || req.body.genderFromFront === "" || req.body.teamNameFromFront === "")) {
    errors.push("Pour la catégorie Corporate, les champs Année de début et de fin de saison, le championnat, le format de compétition, le groupe / poule, le n° de l'équipe, le genre et le nom de l'équipe sont obligatoires.")
  }

  if (errors.length === 0) {
    var newTeam = new teamModel({
      seasonStartYear: req.body.seasonStartYearFromFront,
      seasonEndYear: req.body.seasonEndYearFromFront,
      category: req.body.categoryFromFront,
      championship: req.body.championshipFromFront,
      format: req.body.formatFromFront,
      group: req.body.groupFromFront,
      teamNumber: req.body.teamNumberFromFront,
      gender: req.body.genderFromFront,
      teamName: req.body.teamNameFromFront,
      coach: {
        firstName: req.body.coachFirstNameFromFront,
        lastName: req.body.coachLastNameFromFront,
      },
      teamPicture: {
        id: req.body.teamPictureIdFromFront,
        url: req.body.teamPictureUrlFromFront
      }
    });

    newTeam.players.push(
      {
        firstName: req.body.player1FNameFromFront,
        lastName: req.body.player1LNameFromFront
      },
      {
        firstName: req.body.player2FNameFromFront,
        lastName: req.body.player2LNameFromFront
      },
      {
        firstName: req.body.player3FNameFromFront,
        lastName: req.body.player3LNameFromFront
      },
      {
        firstName: req.body.player4FNameFromFront,
        lastName: req.body.player4LNameFromFront
      },
      {
        firstName: req.body.player5FNameFromFront,
        lastName: req.body.player5LNameFromFront
      },
      {
        firstName: req.body.player6FNameFromFront,
        lastName: req.body.player6LNameFromFront
      },
      {
        firstName: req.body.player7FNameFromFront,
        lastName: req.body.player7LNameFromFront
      },
      {
        firstName: req.body.player8FNameFromFront,
        lastName: req.body.player8LNameFromFront
      },
      {
        firstName: req.body.player9FNameFromFront,
        lastName: req.body.player9LNameFromFront
      },
      {
        firstName: req.body.player10FNameFromFront,
        lastName: req.body.player10LNameFromFront
      },
      {
        firstName: req.body.player11FNameFromFront,
        lastName: req.body.player11LNameFromFront
      },
      {
        firstName: req.body.player12FNameFromFront,
        lastName: req.body.player12LNameFromFront
      },
      {
        firstName: req.body.player13FNameFromFront,
        lastName: req.body.player13LNameFromFront
      },
      {
        firstName: req.body.player14FNameFromFront,
        lastName: req.body.player14LNameFromFront
      },
      {
        firstName: req.body.player15FNameFromFront,
        lastName: req.body.player15LNameFromFront
      },
      {
        firstName: req.body.player16FNameFromFront,
        lastName: req.body.player16LNameFromFront
      }
    );

    teamSaved = newTeam.save();

    if (teamSaved) {
      result = true;
      if (req.body.categoryFromFront === "Proxy") {
        success.push(`Vous venez de créer l'${req.body.teamNumberFromFront} - ${req.body.championshipFromFront} - ${req.body.formatFromFront} - ${req.body.genderFromFront} pour la saison ${req.body.seasonStartYearFromFront}-${req.body.seasonEndYearFromFront} avec succès!`)
      } else if (req.body.categoryFromFront === "Jeunes / Seniors") {
        success.push(`Vous venez de créer l'${req.body.teamNumberFromFront} - ${req.body.championshipFromFront} - ${req.body.groupFromFront} - ${req.body.formatFromFront} - ${req.body.genderFromFront} pour la saison ${req.body.seasonStartYearFromFront}-${req.body.seasonEndYearFromFront} avec succès!`)
      } else if (req.body.categoryFromFront === "Corporate") {
        success.push(`Vous venez de créer l'équipe ${req.body.teamNameFromFront} - ${req.body.teamNumberFromFront} - ${req.body.championshipFromFront} - ${req.body.groupFromFront} - ${req.body.formatFromFront} - ${req.body.genderFromFront} pour la saison ${req.body.seasonStartYearFromFront}-${req.body.seasonEndYearFromFront} avec succès!`)
      };
    }
  };
  res.json({ result, teamSaved, errors, success })
});

//ROUTE POUR LA RÉCUPÉRATION DES DONNÉES DE TOUTES LES ÉQUIPES
router.get(`/loadAllTeams`, async function (req, res, next) {
  let data = await teamModel
    .find()
    .sort({ seasonStartYear: -1 })
  res.json(data)
})

//ROUTE POUR LA CREATION D'UN MATCH POUR UNE ÉQUIPE (PUSH UN TABLEAU D'OBJETS)
router.post("/createAMatch", async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if (req.body.phaseFromFront === "" || req.body.gameDateFromFront === "" || req.body.gymnasiumFromFront === "" || req.body.addressFromFront === "" || req.body.zipFromFront === "" || req.body.cityFromFront === "" || req.body.clubReceivingFromFront === "" || req.body.teamReceivingFromFront === "" || req.body.clubVisitorFromFront === "" || req.body.teamVisitorFromFront === "") {
    errors.push("Le match que vous tentez d'enregistrer n'a pas pu être enregistré. Vérifiez que tous les champs sont bien remplis.")
  }

  if (errors.length === 0) {
    let newMatch = await teamModel.updateOne({ _id: req.query._id },
      {
        $push: {
          matchs: {
            phase: req.body.phaseFromFront,
            gameDate: req.body.gameDateFromFront,
            gymnasium: req.body.gymnasiumFromFront,
            address: req.body.addressFromFront,
            zip: req.body.zipFromFront,
            city: req.body.cityFromFront,
            clubReceiving: req.body.clubReceivingFromFront,
            teamReceiving: req.body.teamReceivingFromFront,
            clubVisitor: req.body.clubVisitorFromFront,
            teamVisitor: req.body.teamVisitorFromFront,
            setsWonByTeamReceiving: req.body.setsWonByTeamReceivingFromFront,
            setsWonByTeamVisitor: req.body.setsWonByTeamVisitorFromFront,
            scores: req.body.scoresFromFront
          }
        }
      }
    );

    result = true;

    //RETRAVAIL DE DATE DU MATCH
    let gameDateReworked = new Date(req.body.gameDateFromFront)
    let day = gameDateReworked.getDate() < 10 ? "0" + gameDateReworked.getDate() : gameDateReworked.getDate();
    let month = [gameDateReworked.getMonth() + 1] < 10 ? "0" + [gameDateReworked.getMonth() + 1] : [gameDateReworked.getMonth() + 1];
    let year = gameDateReworked.getFullYear();
    let hour = gameDateReworked.getUTCHours() < 10 ? "0" + gameDateReworked.getUTCHours() : gameDateReworked.getUTCHours();
    let minute = gameDateReworked.getUTCMinutes() < 10 ? "0" + gameDateReworked.getUTCMinutes() : gameDateReworked.getUTCMinutes()

    success.push(`Vous venez bien de créer le match du ${day}/${month}/${year} à ${hour}:${minute}.`)
  };
  res.json({ result, errors, success })
});

router.post("/createAccompanist", async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;
  const teamSelectedId = req.query.id;
  const selectedMatchId = req.query.matchId;

  if (req.body.accompanistFirstNameFromFront === "" || req.body.accompanistLastNameFromFront === "") {
    errors.push("Le nom et le prénom de l'accompagnateur sont obligatoires.")
  };

  if (errors.length === 0) {
    let accompanistsToPush = await teamModel.updateOne({ "matchs._id": selectedMatchId },
      {
        $push: {
          "matchs.$.accompanists": {
            firstName: req.body.accompanistFirstNameFromFront,
            lastName: req.body.accompanistLastNameFromFront
          }
        }
      }
    );

    result = true;
    success.push(`L'accompagnteur ${req.body.accompanistFirstNameFromFront} ${req.body.accompanistLastNameFromFront} a bien été enregistré.`);
  };
  res.json({ result, errors, success });
})

router.put("/updateScores", async function (req, res, next) {

  var errors = [];
  var success = [];
  result = false;
  const teamSelectedId = req.query.id;
  const selectedMatchId = req.query.matchId;

  if (req.body.setsWonByTeamReceivingFromFront === "" || req.body.setsWonByTeamVisitorFromFront === "") {
    errors.push("Les 3 champs sont obligatroires pour enregistrer un score.")
  };

  if (errors.length === 0) {
    //IL SUFFIT DE FOURNIR L'ID DU MACTH EN QUESTION (pas besoin de fournir l'id de l'équipe)
    const scoresToUpdate = await teamModel.updateOne({ "matchs._id": selectedMatchId },
      {
        $set: {
          "matchs.$.scores": req.body.scoresFromFront,
          "matchs.$.setsWonByTeamReceiving": req.body.setsWonByTeamReceivingFromFront,
          "matchs.$.setsWonByTeamVisitor": req.body.setsWonByTeamVisitorFromFront
        }
      }
    );

    result = true;
    success.push("Le score a bien été enregistré pour le match sélectionné.")
  };
  res.json({ result, errors, success });
});


module.exports = router;
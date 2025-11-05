const express = require("express");
const router = express.Router();

const flashNewsModel = require("../models/flashNewsModel")

//ROUTE POUR LA CREATION D'UNE FLASH NEWS
router.post('/createFlashNews', async function (req, res, next) {
  var error = [];
  var success = [];
  result = false;
  var flashNewsSaved = null;

  if (req.body.displayStartDateFromFront === "") {
    error.push(`Veuillez sélectionner une date et une heure de début d'affichage.`)
  } else if (req.body.displayEndDateFromFront === "") {
    error.push(`Veuillez sélectionner une date et une heure de fin d'affichage.`)
  } else if (req.body.titleFromFront === "") {
    error.push('Le champs "Titre" est un champs obligatoire. Veuillez svp donner un titre à cette flash news.')
  } else if (req.body.bodyTextFromFront === "") {
    error.push(`Le champs "Text d'explication" est un champs obligatoire. Veuillez svp donner plus d'explication.`)
  }

  if (error.length === 0) {
    var newFlashNews = new flashNewsModel(
      {
        startDate: req.body.displayStartDateFromFront,
        endDate: req.body.displayEndDateFromFront,
        title: req.body.titleFromFront,
        bodyText: req.body.bodyTextFromFront
      }
    );

    flashNewsSaved = newFlashNews.save();

    if (flashNewsSaved) {
      result = true;
      success.push(`Le flash news "${req.body.titleFromFront}" a bien été enregistré`)
    }
  }
  res.json({ result, flashNewsSaved, error, success })

});

router.get('/loadFlashNews', async function (req, res, next) {
  let flashNewsInDB = await flashNewsModel.find().sort({ endDate: 1 })

  let commingFlashNewsInDB = flashNewsInDB.filter((item) => new Date(item.startDate) < new Date() && new Date()  < new Date(item.endDate))
  
  //let commingFlashNewsInDB = flashNewsInDB.filter((item) => new Date(item.endDate) > new Date())
  res.json(commingFlashNewsInDB)
})

module.exports = router
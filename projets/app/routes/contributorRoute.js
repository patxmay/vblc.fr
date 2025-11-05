const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const uid2 = require('uid2');


//Ci dessous:
//Créer une constante qui indique le chemin du model créé dans le dossier models
const contributorModel = require('../models/contributorModel')

//ROUTE POUR LA CREATION D'UN COMPTE CONTRIBUTEUR
router.post('/createContributor', async function (req, res, next) {
  var error = [];
  var success = [];
  result = false;
  var saveContributor = null;
  var token = null;

  //Rechercher dans la base de données dans la collection si l'e-mail saisi existe
  const emailAlreadyExistsInDB = await contributorModel.findOne({
    email: req.body.contriEmailFromFront
  });

  //Si l'adresse e-mail existe déjà dans la base de données des contributeur
  if (emailAlreadyExistsInDB != null) {
    error.push("Un compte contributeur existe déjà avec l'e-mail que vous avez saisi. Veuillez vous connecter avec cette adresse e-mail et son mot de passe associé.")
  }

  //Si l'un des inputs est vide...
  if (req.body.contriFirstNameFromFront === ""
    || req.body.contriLastNameFromFront === ""
    || req.body.contriEmailFromFront === ""
    || req.body.contriPasswordFromFront === ""
  ) {
    error.push('Tous les champs sont obligatoires. Merci de tous les renseigner.')
  }

  //S'il n'y a aucune erreur = si tout ok = email saisi n'existe pas dans le BD et que tous les champs sont remplis
  if (error.length === 0) {

    //on encrypt le mot de passe avec bcrypt et on l'enregistre dans une variable qui s'appelle hash
    const hash = bcrypt.hashSync(req.body.contriPasswordFromFront, 10);

    //on enregistre dans la collection contributors

    var newContributor = new contributorModel({
      //Ci dessous: partie à gauche = model et la partie à droite données saisies dans les input du front.
      firstName: req.body.contriFirstNameFromFront,
      lastName: req.body.contriLastNameFromFront,
      email: req.body.contriEmailFromFront,
      password: hash,
      token: uid2(32)
      //ci dessus = token : on génère un token "aleatoire" avec uid2(32)
    })

    //On utilise la méthode de mongoose pour enregistrer le nouveauy document contributor
    saveContributor = await newContributor.save();

    if (saveContributor) {
      result = true;
      token = saveContributor.token;
      success.push ("Le nouveau compte contributeur a bien été créé.")
    }

  }
  res.json({ result, saveContributor, error, token, success })
});


router.post('/contributorsignin', async function (req, res, next) {
  var result = false;
  var contributor = null;
  var error = [];
  var token = null;

  if (req.body.contriEmailFromFront == "" || req.body.contriPasswordFromFront == "") {
    error.push ("Tous les champs doivent être remplis.")
  };

  if (error.length == 0) {
    contributor = await contributorModel.findOne({
      email: req.body.contriEmailFromFront
    })
    if (contributor !== null) {
      var password = req.body.contriPasswordFromFront;

      if (bcrypt.compareSync(password, contributor.password)) {
        result = true;
        token = contributor.token
      } else {
        result = false;
        error.push("Mot de passe incorrect")
      }
    } else {
      result = false;
      error.push("Email incorrect")
    }
  };
  res.json({ contributor, result, token, error })
})

module.exports = router;
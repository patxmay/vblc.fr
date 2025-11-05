const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const uid2 = require('uid2');

//Ci dessous:
//Créer une constante qui indique le chemin du model créé dans le dossier models
const administratorModel = require('../models/administratorModel')



//ROUTE POUR LA CREATION D'UN NOUVEAU PROFIL ADMINISTRATEUR
router.post('/createAdministrator', async function (req, res, next) {
  var error = [];
  var success = [];
  result = false;
  var saveAdministrator = null;
  var token = null;

  //Rechercher dans la base de données dans la collection si l'e-mail saisi existe
  const emailAlreadyExistsInDB = await administratorModel.findOne({
    email: req.body.adminEmailFromFront
  });

  //Si l'adresse e-mail existe déjà dans la base de données des administrateurs
  if (emailAlreadyExistsInDB != null) {
    error.push("Un compte administrateur existe déjà avec l'e-mail que vous avez saisi. Veuillez vous connecter avec cette addresse e-mail et son mot de passe associé.")
  }

  //Si l'un des inputs est vide...
  if (req.body.adminFirstNameFromFront === ""
    || req.body.adminLastNameFromFront === ""
    || req.body.adminEmailFromFront === ""
    || req.body.adminPasswordFromFront === ""
  ) {
    error.push('Tous les champs sont obligatoires. Merci de tous les renseigner.')
  }

  //S'il n'y a aucune erreur = si tout ok = email saisi n'existe pas dans le BD et que tous les champs sont remplis
  if (error.length === 0) {

    //on encrypt le mot de passe avec bcrypt et on l'enregistre dans une variable qui s'appelle hash
    const hash = bcrypt.hashSync(req.body.adminPasswordFromFront, 10);

    //on enregistre dans la collection administrators
    var newAdministrator = new administratorModel({
      //Ci dessous: partie à gauche = model et la partie à droite données saisies dans les input du front.
      firstName: req.body.adminFirstNameFromFront,
      lastName: req.body.adminLastNameFromFront,
      email: req.body.adminEmailFromFront,
      password: hash,
      token: uid2(32)
      //ci dessus = token : on génère un token "aleatoire" avec uid2(32)
    });

    //on demande l'enregistrement des données du nouvel administrateur dans le base
    saveAdministrator = await newAdministrator.save()

    if (saveAdministrator) {
      result = true;
      token = saveAdministrator.token;
      success.push("Le nouveau compte administrateur a bien été créé.")
    }
  }
  res.json({ result, saveAdministrator, error, token, success })
});



//ROUTE POUR LE SIGN IN D'UN ADMINISTRATEUR
router.post('/administratorsignin', async function (req, res, next) {

  var result = false;
  var administrator = null;
  var error = [];
  var token = null;

  if (req.body.adminEmailFromFront == "" || req.body.adminPasswordFromFront == "") {
    error.push("Tous les champs doivent être remplis.")
  }

  if (error.length == 0) {
    administrator = await administratorModel.findOne({
      email: req.body.adminEmailFromFront
    }) 
    if (administrator !== null) {
      var password = req.body.adminPasswordFromFront;

      if (bcrypt.compareSync(password, administrator.password)) {
        result = true;
        token = administrator.token;
      } else {
        result = false;
        error.push("Mot de passe incorrect")
      }
    } else {
      result = false;
      error.push("Email incorrect")
    }
  }
  res.json({ administrator, result, token, error })
});


module.exports = router;
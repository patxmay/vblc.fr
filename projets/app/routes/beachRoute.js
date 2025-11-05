const express = require("express");
const router = express.Router();
require("dotenv").config()
const cloudinary = require("cloudinary").v2

const beachModel = require("../models/beachModel");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

//ROUTE POUR L'ENREGISTREMENT DES DONNÉES DES SECTIONS BEACH
router.post('/create', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;
  var beachSectionSaved = null;

  //VÉRIFIER SI LES DONNÉES EXISTENT DEJÀ OU NON

  const beachSectionAlreadyExists = await beachModel.findOne({ title: req.body.titleFromFront });

  //VÉRIFIER SI LES DONNÉES DES SECTIONS EXISTENT DÉJÀ
  if (beachSectionAlreadyExists !== null) {
    errors.push(`Les données de la ${req.body.titleFromFront} existent déjà. Il ne sera pas possible d'enregistrer d'autres données. Si vous souhatez les modifier, veillez svp utiliser l'écran Modifier les informations`)
  };

  //VÉRIFIER QUE LES CHAMPS OBLIGATOIRES SONT BIEN REMPLIS
  if (req.body.titleFromFront === "" || req.body.coach1FirstNameFromFront === "" || req.body.coach1LastNameFromFront === "" || req.body.coach1PictureUrlFromFront === "" || req.body.coach1PictureIdFromFront === "" || req.body.placeFromFront === "" || req.body.period1FromFront === "" || req.body.day1FromFront === "" || req.body.subscriptionFromFront === "" || req.body.feesFromFront === "") {
    errors.push("Le titre de la section, le nom, le prénom et la photo du coach 1, le lieu, la période 1, le jour d'entrainement 1, l'inscription et la cotisation sont des champs obligatoires.")
  }

  if (errors.length === 0) {
    var newBeachSection = new beachModel({
      title: req.body.titleFromFront,
      training: {
        place: req.body.placeFromFront,
        period1: req.body.period1FromFront,
        period2: req.body.period2FromFront,
        day1: req.body.day1FromFront,
        day2: req.body.day2FromFront
      },
      subscription: {
        subscription: req.body.subscriptionFromFront,
        fees: req.body.feesFromFront,
      }
    });


    newBeachSection.coachs.push(
      {
        firstName: req.body.coach1FirstNameFromFront,
        lastName: req.body.coach1LastNameFromFront,
        pictureUrl: req.body.coach1PictureUrlFromFront,
        pictureId: req.body.coach1PictureIdFromFront,
        qualification: req.body.coach1QualificationFromFront
      },
      {
        firstName: req.body.coach2FirstNameFromFront,
        lastName: req.body.coach2LastNameFromFront,
        pictureUrl: req.body.coach2PictureUrlFromFront,
        pictureId: req.body.coach2PictureIdFromFront,
        qualification: req.body.coach2QualificationFromFront
      }
    )


    beachSectionSaved = newBeachSection.save();

    if (beachSectionSaved) {
      result = true;
      success.push(`Les données de la ${req.body.titleFromFront} ont bien été enregistrées dans la base données.`)
    }
  };
  res.json({ result, beachSectionSaved, errors, success })
});


//ROUTE POUR LA RÉCUPÉRATION DES DONNÉES DES SECTIONS BEACH DE LA BASE DE DONNÉES
router.get('/loadBeachSectionData', async function (req, res, next) {
  let data = await beachModel.find();
  res.json(data)
});


//ROUTE POUR L'ENREGISTREMENT D'UNE PHOTO DE BEACH DANS LE BASE DE DONNÉES MONGO DB
router.post('/uploadBeachPicture', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  console.log("*** REQ.QUERY._ID ***", req.query._id)

  if (req.query._id === "") {
    errors.push("Veuillez sélectionner la section dans laquelle vous souhaitez uploader la photo.")
  };

  if (req.body.beachPictureUrlFromFront === "" || req.body.beachPictureIdFromFront === "") {
    errors.push("La photo n'a pas pu être enregistrée dans la base des médias. Veuilez rafraîchir la page et sélectionner puis enregistrer à nouveau la photo.")
  };

  if (errors.length === 0) {
    let newBeachPicture = await beachModel.updateOne({ _id: req.query._id },
      {
        $push: {
          pictures: {
            pictureUrl: req.body.beachPictureUrlFromFront,
            pictureId: req.body.beachPictureIdFromFront
          }
        }
      }
    );

    result = true;
    success.push("La photo a bien été envoyée dans le base de données.")
  }
  res.json({ result, errors, success })
});

//ROUTE POUR SUPPRIMER UNE PHOTO BEACH DANS CLOUDINARY
router.post('/deleteSelectedPictureFromCloudinary', async function (req, res, next) {
  if (req.query._id !== "" || req.query._id !== undefined) {
    await cloudinary.uploader
      .destroy(req.query._id, {
        ressource_type: "image"
      })
      .then((result) => {
        console.log(result)
      })
      .then((error) => {
        console.log(error)
      })
  } else {
    console.log("Il n'y a pas de photo.")
  }
})

//ROUTE POUR SUPPRIMER UNE PHOTO BEACH DANS MONGODB
router.post('/deleteSelectedPictureFromMongoDB', async function (req, res, next) {
  result = false;
  var errors = [];
  var success = [];

  console.log("*** REQ.QUERY._ID ***", req.query._id)
  console.log("*** REQ.BODY.PICTUREIDFROMFRONT ***", req.body.pictureIdFromFront)

  if (req.query._id === "" || req.query._id === undefined) {
    errors.push("Veuillez sélectionner une photo à supprimer")
  }

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      { _id: req.query._id },
      {
        $pull: {
          pictures:
            { pictureId: req.body.pictureIdFromFront }
        }
      }
    )
    result = true
    success.push("La photo sélectionnée a bien été supprimée.")
  }
  res.json({ result, success, errors })
});

//ROUTE POUR MODIFIER LE NOM ET PRÉNOM DU COACH 1
router.put('/updateCoach1', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if (req.query._id === "" || req.query._id === undefined) {
    errors.push("Veuillez sélectionner la section dans laquelle vous souhaitez effectuer des modifications.")
  }

  if (req.body.coach1FirstNameFromFront === "" || req.body.coach1FirstNameFromFront === undefined || req.body.coach1LastNameFromFront === "" || req.body.coach1LastNameFromFront === undefined) {
    errors.push("Les champs nom et prénom sont obligatoires. Veuillez vérifier que ces 2 champs sont remplis.")
  }

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      { "coachs._id": req.query._id },
      {
        $set: {
          "coachs.$.firstName": req.body.coach1FirstNameFromFront,
          "coachs.$.lastName": req.body.coach1LastNameFromFront
        }
      }
    );

    if (data) {
      result = true;
      success.push("Le nom et le prénom du coach 1 de la Section V.B.L.C Beach-Volley ont bien été modifiés.")
    }
  }
  res.json({ result, errors, success })
});

//ROUTE POUR MODIFIER LA QUALIFICATION DU COACH 1
router.put('/updateQualificationCoach1', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  let data = await beachModel.updateOne(
    { "coachs._id": req.query._id },
    {
      $set: {
        "coachs.$.qualification": req.body.coach1QualificationFromFront
      }
    }
  );

  if (data) {
    result = true;
    success.push("La qualification du coach 1 de la section V.B.L.C Beach-Volley a bien été modifiée.")
  }
  res.json({ result, errors, success })
})

//ROUTE POUR SUPPRIMER LA PHOTO EXISTANTE DU COACH 1 DE CLOUDINARY
router.post('/deleteCoach1CurrentPicture', async function (req, res, next) {

  let coach1PictureDeleted = await cloudinary.uploader.destroy(req.query._id, {
    ressource_type: "image"
  }).then((result) => {
    console.log(result)
  }).then((error) => {
    console.log(error)
  })
});

router.put('/updateCoach1PictureInMongoDG', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if ((req.body.coach1PictureUrlFromFront === "" || req.body.coach1PictureUrlFromFront === undefined) && (req.body.coach1PictureIdFromFront !== "" || req.body.coach1PictureIdFromFront !== undefined)) {
    errors.push("Pas d'URL, ni d'Id en provance de la base media. Il semblerait que la photo que vous tentez d'envoyer dans la base de données n'ait pas été enregitré au préalable dans la base des media.")
  }

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      { "coachs._id": req.query._id },
      {
        $set: {
          "coachs.$.pictureUrl": req.body.coach1PictureUrlFromFront,
          "coachs.$.pictureId": req.body.coach1PictureIdFromFront
        }
      }
    )

    if (data) {
      result = true;
      success.push("La photo du coach 1 a bien été modifiée.")
    }
  }
  res.json({ result, errors, success })
});

//ROUTE POUR MODIFIER LE NOM ET PRÉNOM DU COACH 1
router.put('/updateCoach2', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if (req.body.coach2FirstNameFromFront === "" || req.body.coach2LastNameFromFront === "") {
    errors.push("Les champs nom et prénom sont obligatoires. Veuillez vérifier que ces 2 champs sont remplis.")
  };

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      { "coachs._id": req.query._id },
      {
        $set: {
          "coachs.$.firstName": req.body.coach2FirstNameFromFront,
          "coachs.$.lastName": req.body.coach2LastNameFromFront
        }
      }
    )

    if (data) {
      result = true;
      success.push("Le nom et le prénom du coach 2 de la Section V.B.L.C Beach-Volley ont bien été modifiés.")
    }
  }
  res.json({ result, success, errors })
});

//ROUTE POUR MODIFIER LA QUALIFICATION DU COACH 1
router.put('/updateQualificationCoach2', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  let data = await beachModel.updateOne(
    { "coachs._id": req.query._id },
    {
      $set: {
        "coachs.$.qualification": req.body.coach2QualificationFromFront
      }
    }
  )

  if (data) {
    result = true;
    success.push("La qualification du coach 2 de la section V.B.L.C Beach-Volley a bien été modifiée.")
  }
  res.json({ result, errors, success })
});

//ROUTE POUR SUPPRIMER LA PHOTO EXISTANTE DU COACH 1 DE CLOUDINARY
router.post('/deleteCoach2CurrentPicture', async function (req, res, next) {

  let coach2PictureDeleted = await cloudinary.uploader.destroy(req.query._id, {
    ressource_type: "image"
  }).then((result) => {
    console.log(result)
  }).then((error) => {
    console.log(error)
  })
});

router.put('/updateCoach2PictureInMongoDG', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if ((req.body.coach2PictureUrlFromFront === "" || req.body.coach2PictureUrlFromFront === undefined) && (req.body.coach2PictureIdFromFront !== "" || req.body.coach2PictureIdFromFront !== undefined)) {
    errors.push("Pas d'URL, ni d'Id en provance de la base media. Il semblerait que la photo que vous tentez d'envoyer dans la base de données n'ait pas été enregitré au préalable dans la base des media.")
  }

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      { "coachs._id": req.query._id },
      {
        $set: {
          "coachs.$.pictureUrl": req.body.coach2PictureUrlFromFront,
          "coachs.$.pictureId": req.body.coach2PictureIdFromFront
        }
      }
    )

    if (data) {
      result = true;
      success.push("La photo du coach 2 a bien été modifiée.")
    }
  }
  res.json({ result, errors, success })
});

router.put('/updatePlace', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if (req.body.placeFromFront === "") {
    errors.push("Le champs Lieu d'entrainement est un champs obligatoire.")
  }

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      {
        _id: req.query._id
      },
      {
        $set: {
          "training.place": req.body.placeFromFront
        }

      }
    )
    if (data) {
      result = true;
      success.push("Le lieu d'entrainement à bien été modifié.")
    }
  }
  res.json({ result, success, errors })
});

//ROUTE POUR LA MODIFICATION DE LA PÉRIODE D'ENTRANEMENT 1
router.put('/updatePeriod1', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if (req.body.period1FromFront === "") {
    errors.push("Le champs Période d'Entrainement 1 est un champs obligatoire.")
  }

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      {
        _id: req.query._id
      },
      {
        $set: {
          "training.period1": req.body.period1FromFront
        }
      }
    )
    if (data) {
      result = true;
      success.push("La période d'entrainement 1 a bien été modifiée.")
    }
  }
  res.json({ result, success, errors })
});

//ROUTE POUR LA MODIFICATION DE LA PÉRIODE D'ENTRANEMENT 2
router.put('/updatePeriod2', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      {
        _id: req.query._id
      },
      {
        $set: {
          "training.period2": req.body.period2FromFront
        }
      }
    )
    if (data) {
      result = true;
      success.push("La période d'entrainement 2 a bien été modifiée.")
    }
  }

  res.json({ result, success, errors })
});

//ROUTE POUR LA MODIFICATION DU JOUR D'ENTRANEMENT 1
router.put('/updateDay1', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if (req.body.day1FromFront === "") {
    errors.push("Le champs Jour d'Entrainement 1 est un champs obligatoire.")
  }

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      {
        _id: req.query._id
      },
      {
        $set: {
          "training.day1": req.body.day1FromFront
        }
      }
    )
    if (data) {
      result = true;
      success.push("Le jour d'entrainement 1 a bien été modifié.")
    }
  }
  res.json({ result, success, errors })
});

//ROUTE POUR LA MODIFICATION DU JOUR D'ENTRANEMENT 2
router.put('/updateDay2', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      {
        _id: req.query._id
      },
      {
        $set: {
          "training.day2": req.body.day2FromFront
        }
      }
    )
    if (data) {
      result = true;
      success.push("Le jour d'entrainement 2 a bien été modifié.")
    }
  }
  res.json({ result, success, errors })
});

//ROUTE POUR LA MODIFICATION DU CONTACT POUR INSCRIPTION
router.put('/updateSubscription', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if (req.body.subscriptionFromFront === "") {
    errors.push("Le champs Contact pour inscription est un champs obligatoire.")
  }

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      {
        _id: req.query._id
      },
      {
        $set: {
          "subscription.subscription": req.body.subscriptionFromFront
        }
      }
    )
    if (data) {
      result = true;
      success.push("Le contact pour inscription a bien été mis à jour.")
    }
  }
  res.json({ result, success, errors })
});

//ROUTE POUR LA MODIFICATION DE LA COTISATION
router.put('/updateFees', async function (req, res, next) {
  var errors = [];
  var success = [];
  result = false;

  if (req.body.feesFromFront === "") {
    errors.push("Le champs Cotisation / Adhésion est un champs obligatoire.")
  }

  if (errors.length === 0) {
    let data = await beachModel.updateOne(
      {
        _id: req.query._id
      },
      {
        $set: {
          "subscription.fees": req.body.feesFromFront
        }
      }
    )
    if (data) {
      result = true;
      success.push("La cotisation a bien été mise à jour.")
    }
  }
  res.json({ result, success, errors })
});

module.exports = router
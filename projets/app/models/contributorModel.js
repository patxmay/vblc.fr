const mongoose = require('mongoose');

var contributorSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  token: String
});

//Ci dessous
//Créer une constante, qui indique le model, ici c'est "const contributorModel"
//Puis indiquer le nom de la collection qui sera créée et enregistré dans la base de données, ici c'est "contributors", et qui comprendra tous les documents administrateurs
//puis indiquer le nom du Schema, ici c'est "contributorSchema", créé initialement au dessus
const contributorModel = mongoose.model("contributors", contributorSchema);

//Surtout ne pas oublier d'exporter le model
module.exports = contributorModel;
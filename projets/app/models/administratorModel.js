const mongoose = require('mongoose');

var administratorSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  token: String,
});

//Ci dessous
//Créer une constante, qui indique le model, ici c'est "const administratorModel"
//Puis indiquer le nom de la collection qui sera créée et enregistré dans la base de données, ici c'est "administrators", et qui comprendra tous les documents administrateurs
//puis indiquer le nom du Schema, ici c'est "administratorSchema", créé initialement au dessus
const administratorModel = mongoose.model('administrators', administratorSchema)

//Surtout ne pas oublier d'exporter le model
module.exports = administratorModel

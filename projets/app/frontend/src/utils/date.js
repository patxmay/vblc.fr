export function getFullNumericDate(aTimestamp) {
  const aDateToTransform = new Date(aTimestamp);
  let date = aDateToTransform.getUTCDate() < 10 ? "0" + aDateToTransform.getUTCDate() : aDateToTransform.getUTCDate();
  let month = [aDateToTransform.getMonth() + 1] < 10 ? "0" + [aDateToTransform.getMonth() + 1] : [aDateToTransform.getMonth() + 1];
  let year = aDateToTransform.getFullYear();

  return date + " / " + month + " / " + year
};

export function getFullWrittenDate(aTimestamp) {
  const aDateToTransform = new Date(aTimestamp);
  const monthWritten = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  const dayWritten = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

  let writtenDay = dayWritten[aDateToTransform.getUTCDay()];
  let date = aDateToTransform.getUTCDate() < 10 ? "0" + aDateToTransform.getUTCDate() : aDateToTransform.getUTCDate();
  let writtenMonth = monthWritten[aDateToTransform.getUTCMonth()];
  let year = aDateToTransform.getUTCFullYear();

  return writtenDay + ", " + date + " " + writtenMonth + " " + year
};

export function getFullWrittenDateWithShortMonth(aTimestamp) {
  const aDateToTransform = new Date(aTimestamp);
  const monthWritten = ["Janv.", "Fév.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."]
  const dayWritten = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

  let writtenDay = dayWritten[aDateToTransform.getUTCDay()];
  let date = aDateToTransform.getUTCDate() < 10 ? "0" + aDateToTransform.getUTCDate() : aDateToTransform.getUTCDate();
  let writtenMonth = monthWritten[aDateToTransform.getUTCMonth()];
  let year = aDateToTransform.getFullYear();

  return writtenDay + ", " + date + " " + writtenMonth + " " + year
};

export function getHoursAndMinutes(aTimestamp) {
  const aDateToTransform = new Date(aTimestamp);
  let hours = aDateToTransform.getUTCHours() < 10 ? "0" + aDateToTransform.getUTCHours() : aDateToTransform.getUTCHours(); // Afficher l'heure saisie, utiliser getUTCHours(). Si on utilise getHours(), il va transformer l'heure internationale en heure locale (+1 ou +2 heures)
  let minutes = aDateToTransform.getMinutes() < 10 ? "0" + aDateToTransform.getMinutes() : aDateToTransform.getMinutes();

  return hours + "h" + minutes
}

export function getWrittenDay(aTimestamp) {
  const aDateToTransform = new Date(aTimestamp);
  const dayWritten = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
  let writtenDay = dayWritten[aDateToTransform.getUTCDay()];

  return writtenDay
}

export function getNumericDate(aTimestamp) {
  const aDateToTransform = new Date(aTimestamp);
  let numericDate = aDateToTransform.getUTCDate() < 10 ? "0" + aDateToTransform.getUTCDate() : aDateToTransform.getUTCDate();
  return numericDate
}

export function getFullWrittenMonth(aTimestamp) {
  const aDateToTransform = new Date(aTimestamp);
  const monthWritten = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  let fullWrittenMonth = monthWritten[aDateToTransform.getUTCMonth()];
  return fullWrittenMonth
}

export function getShortWrittenMonth(aTimestamp) {
  const aDateToTransform = new Date(aTimestamp);
  const monthWritten = ["Janv.", "Fév.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."]
  let shortWrittenMonth = monthWritten[aDateToTransform.getUTCMonth()];
  return shortWrittenMonth
}

export function getNumericYear(aTimestamp) {
  const aDateToTransform = new Date(aTimestamp);
  let numericYear = aDateToTransform.getFullYear();
  return numericYear
}
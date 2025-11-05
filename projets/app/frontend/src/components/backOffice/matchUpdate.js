import { useState, useEffect } from "react";
import "../../styles/backOffice/matchUpdate.css"
import { getFullNumericDate } from "../../utils/date";




function MatchUpdate() {

  const [teams, setTeams] = useState([]);
  const [seasonSelected, setSeasonSelected] = useState("");
  const [teamSelected, setTeamSelected] = useState("");
  const [teamSelectedId, setTeamSelectedId] = useState("");
  const [teamCardIndex, setTeamCardIndex] = useState("");
  const [teamSelectedMatchs, setTeamSelectedMatchs] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState("")
  const [selectedMatchIndex, setSelectedMatchIndex] = useState("");
  const [accompanistFirstName, setAccompanistFirstName] = useState("");
  const [accompanistLastName, setAccompanistLastName] = useState("");

  const [scores, setScores] = useState("")
  const [setsWonByTeamReceiving, setSetsWonByTeamReceiving] = useState("");
  const [setsWonByTeamVisitor, setSetsWonByTeamVisitor] = useState("");

  const [updateAccompanistsErrorsList, setUpdateAccompanistsErrorsList] = useState([]);
  const [updateAccompanistsSuccessList, setUpdateAccompanistsSuccessList] = useState([]);

  const [updateScoresErrorsList, setUpdateScoresErrorsList] = useState([]);
  const [updateScoresSuccessList, setUpdateScoresSuccessList] = useState([]);


  //VALIDATION DU FORMULAIRE DE SAISIE D'UN ACCOMPAGNATEUR
  const accompanistValidation = async () => {
    const accompanistToPush = await fetch(`/teamRoute/createAccompanist?id=${teamSelectedId}&matchId=${selectedMatchId}`,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `accompanistFirstNameFromFront=${accompanistFirstName}&accompanistLastNameFromFront=${accompanistLastName}`
      }
    )
    const body = await accompanistToPush.json();

    if (body.result === true) {
      setAccompanistFirstName("");
      setAccompanistLastName("");
      setUpdateAccompanistsErrorsList([]);
      setUpdateAccompanistsSuccessList(body.success);
    } else {
      setUpdateAccompanistsErrorsList(body.errors)
      setUpdateAccompanistsSuccessList([]);
    }
  };

  //AFFICHAGE DU MESSAGE D'ERREURS LORS DE LA VALIDATION DU FORMULAIRE DE SAISIE D'UN ACCOMPAGNATEUR = NON ENREGISTRE DE L'ACCOMPAGNATEUR DANS LA BASE DE DONNÉES
  const updateAccompanistsErrorsMessage = updateAccompanistsErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "15px", textAlign: "center" }}>{errors}</p>
    )
  });

  //AFFICHAGE DU MESSAGE DE RÉUSSITE LORS DE LA VALIDATION DU FORMULAIRE DE SAISIE D'UN ACCOMPAGNATEUR = ENREGISTREMENT DE L'ACCOMPAGNATEUR DANS LA BASE DE DONNÉES
  const updateAccompanistsSuccessMessage = updateAccompanistsSuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "15px", textAlign: "center" }}>{success}</p>
    )
  });

  //VALIDATION DU FORMULAIRE DE SAISIE DU SCORE
  const scoreValidation = async () => {
    const scoreToPush = await fetch(`/teamRoute/updateScores?id=$${teamSelectedId}&matchId=${selectedMatchId}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `scoresFromFront=${scores}&setsWonByTeamReceivingFromFront=${setsWonByTeamReceiving}&setsWonByTeamVisitorFromFront=${setsWonByTeamVisitor}`
      }
    );

    const body = await scoreToPush.json();

    if (body.result === true) {
      setSetsWonByTeamReceiving("");
      setSetsWonByTeamVisitor("");
      setScores("")
      setUpdateScoresErrorsList([]);
      setUpdateScoresSuccessList(body.success)
    } else {
      setUpdateScoresErrorsList(body.errors);
      setUpdateScoresSuccessList([])
    };
  };

  //AFFICHAGE DU MESSAGE D'ERREURS LORS DE LA VALIDATION DU FORMULAIRE DE SAISIE DU SCORE D'UN MATCH = NON ENREGISTRE DU SCORE DANS LA BASE DE DONNÉES
  const updateScoresErrorsMessage = updateScoresErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "15px", textAlign: "center" }}>{errors}</p>
    )
  });
  //AFFICHAGE DU MESSAGE DE RÉUSSITE LORS DE LA VALIDATION DU FORMULAIRE DE SAISIE DU SCORE D'UN MATCH = ENREGISTREMENT DU SCORE DANS LA BASE DE DONNÉES
  const updateScoresSuccessMessage = updateScoresSuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "15px", textAlign: "center" }}>{success}</p>
    )
  })

  //RÉCUPÉRATION DES DONNÉES DES ÉQUIPES QUI SE TROUVENT DU LOCALSTORAGE
  //LA RÉCUPÉRATION ET LA MISE DANS LE LOCALSTORAGE DES DONNÉES DES ÉQUIPES SE FONT DANS LE COMPOSANT TEAM
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("allTeams"))
    if (items) {
      setTeams(items)
    }
  }, [])

  //RÉCUPÉRER LA LISTE DE TOUTES LES SEASONS START YEAR SANS DOUBLON = METTRE LA LISTE DANS UN TABLEAU
  let yearSelectionList = [];
  for (var i = 0; i < teams.length; i++) {
    if (!yearSelectionList.includes(teams[i].seasonStartYear)) {
      yearSelectionList.push(teams[i].seasonStartYear)
    }
  };


  //FONCTIOND E SELECTION DE LA SAISON DANS LE FILTRE
  const onHandlSelectSeason = (e) => {
    setSeasonSelected(e.target.value)
    setTeamSelected("")
    setTeamCardIndex("")
  };

  //SÉLECTION DE LA SAISON PERMETTANT DE FILTRER LES ÉQUIPES QUI CORRESPONDENT À LA SAISON
  const filterTeamsBySeason = <select onChange={(e) => onHandlSelectSeason(e)} className="accompanists_teams_filter_by_season" id="matchs-teams-filter" name="matchs-teams-filter">
    <option hidden value="">Sélectionner une saison</option>
    {yearSelectionList.map((e, index) => {
      return (
        <option key={index} value={e} >{e}-{e + 1}</option>
      )
    })}
  </select>

  //EXTRAIRE LES ÉQUIPES QUI CORRESPONDENT À LA SAISON SÉLECTIONNÉE
  const teamsOfSeasonSelected = teams.filter((items) => {
    if (seasonSelected !== "" && seasonSelected !== undefined) {
      return (
        items.seasonStartYear === Number(seasonSelected)
      )
    } else {
      return (
        items.seasonStartYear === teams[0].seasonStartYear
      )
    }
  }).sort((a, b) => b.category.localeCompare(a.category));

  //SETTER DANS UNE VARIABLE L'ID DE L'EQUIPE ET L'INDEX DES CARTES (POUR LE CSS) POUR LAQUELLE ON VEUT SAISIR LES MATCHS
  const handleSelectThisTeam = (e, index) => {
    setTeamSelected(e)
    setTeamSelectedId(e._id)
    setTeamCardIndex(index)
    setTeamSelectedMatchs(e.matchs)
  }

  //AFFICHAGE DES CARTES DES ÉQUIPES
  const teamsCardsToDisplay = teamsOfSeasonSelected.map((e, index) => {
    return (
      <div key={index} onClick={() => handleSelectThisTeam(e, index)} className={`accompanists_teams_cards ${index === teamCardIndex ? "accompanists_teams_cards_selected" : "accompanists_teams_cards"}`}>
        {e.category === "Proxy" ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p className="black_text accompanists_teams_cards_category">{e.category}</p>
          <p className="black_text accompanists_teams_cards_name_highlighted">{e.championship} {e.gender} {e.format}</p>
          <p className="black_text">{e.seasonStartYear}-{e.seasonEndYear}</p>
        </div> : <div />}
        {e.category === "Jeunes / Seniors" ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p className="black_text accompanists_teams_cards_category">{e.category}</p>
          <p className="black_text accompanists_teams_cards_name_highlighted">{e.group} {e.gender}</p>
          <p className="black_text">{e.seasonStartYear}-{e.seasonEndYear}</p>
        </div> : <div />}
        {e.category === "Corporate" ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p className="black_text accompanists_teams_cards_category">{e.category}</p>
          <p className="black_text accompanists_teams_cards_name_highlighted">{e.teamName}</p>
          <p className="black_text">{e.seasonStartYear}-{e.seasonEndYear}</p>
        </div> : <div />}
      </div>
    )
  });

  //TRIER LES MATCHS PAR ORDRE DE DATE DU MOINS RECENTES AU PLUS RECENTES
  const teamSelectedMatchsSorted = teamSelectedMatchs.sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate))


  //FONCTION DE SELECTION DU MATCH
  const selectThisMatch = (e, index) => {
    setSelectedMatchId(e._id)
    setSelectedMatchIndex(index)
  };

  // AFFICHAGE DES MATCHS SELON LA CATEGORIE DE L'EQUIPE EN QUESTION
  const matchsOfTheTeamSelected = teamSelected !== "" && teamSelected !== undefined ? <div className="matchs_selection_big_frame">
    <div style={{ display: "flex" }}>
      <p className="black_text" style={{ marginRight: 5 }}>Sélectionner un match de la saison</p>
      <p className="black_text" style={{ marginRight: 5, color: "red", fontWeight: "bold" }}>{teamSelected.seasonStartYear}-{teamSelected.seasonEndYear}</p>
      <p className="black_text" style={{ marginRight: 5 }}>de l'équipe: </p>
      {teamSelected.category === "Proxy" ? <p className="black_text" style={{ color: "red", fontWeight: "bold" }}>{teamSelected.championship} {teamSelected.gender} {teamSelected.format}</p> : teamSelected.category === "Jeunes / Seniors" ? <p style={{ color: "red", fontWeight: "bold" }}>{teamSelected.group} {teamSelected.gender}</p> : teamSelected.category === "Corporate" ? <p style={{ color: "red", fontWeight: "bold" }}>{teamSelected.teamName}</p> : <div />}
    </div>
    <div style={{ marginBlock: "10px" }}>
      {teamSelectedMatchsSorted.map((e, index) => {
        return (
          <div>
            <div key={index} onClick={() => selectThisMatch(e, index)} className={`match_cards ${index === selectedMatchIndex ? "match_cards_selected" : "match_cards"}`}>
              <p className="black_text" style={{ marginRight: 20 }}>{getFullNumericDate(e.gameDate)}: {e.clubReceiving} vs {e.clubVisitor} à {e.city}</p>
              <div className="accompanists_frame">
                <p className="black_text" style={{ marginRight: 10 }}>Accompagnateur(s):</p>
                {e.accompanists !== undefined && e.accompanists.length > 0 ? e.accompanists.map((e, index) => {
                  return (
                    <p className="black_text" style={{ marginRight: 10 }} key={index}>{e.firstName} {e.lastName}</p>
                  )
                }) : <div>
                  <p className="black_text">Aucun accompagnateur inscrit</p>
                </div>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  </div> : <div />;

  //FORMULAIRE DE SAISIE D'UN ACCOMPAGNATEUR
  const accompanistsInput = selectedMatchId !== "" && selectedMatchId !== undefined ? <div className="accompanists_input_big_frame">
    <p className="black_text">Ajouter un accompagnateur au match sélectionné ci-dessus:</p>
    <div style={{ display: "flex", }}>
      <div className="accompanist_input_frame">
        <label className="black_text space_right">Accompagnateurs V.B.L.C:</label>
        <div style={{ display: "flex", alignItems: "center", }}>
          <p className="black_text space_right">Nom de l'accompagnateur:</p>
          <input onChange={(e) => setAccompanistFirstName(e.target.value)} className="match_update_input input_medium_width" value={accompanistFirstName} id="accompanists" name="accompanists" placeholder="Antoine" />
        </div>
        <div style={{ display: "flex", alignItems: "center", }}>
          <p className="black_text space_right">Prénom de l'accompagnateur:</p>
          <input onChange={(e) => setAccompanistLastName(e.target.value)} className="match_update_input input_medium_width" value={accompanistLastName} id="accompanists" name="accompanists" placeholder="Brizard" />
        </div>
        <button onClick={() => accompanistValidation()} className="match_update_validation_button">Valider</button>
        {updateAccompanistsErrorsMessage}
        {updateAccompanistsSuccessMessage}
      </div>
    </div>
  </div> : <div />;

  //FORMULAIRE DE SAISIE DU SCORE 
  const scoreInput = selectedMatchId !== "" && selectedMatchId !== undefined ? <div className="accompanists_input_big_frame">
    <p className="black_text">Saisir le score du match sélectionné ci-dessus:</p>
    <div style={{ display: "flex" }}>
      <div className="accompanist_input_frame">
        <label className="black_text space_right">Score du match:</label>
        <div style={{ display: "flex", alignItems: "center", }}>
          <p className="black_text space_right">Scores:</p>
          <input onChange={(e) => setScores(e.target.value)} className="match_update_input input_large_width" value={scores} id="scores" name="scores" placeholder="25:20 / 19:25 / 23:25 / 25:21 / 15:11" />
        </div>
        <div style={{ display: "flex", alignItems: "center", }}>
          <p className="black_text space_right">Set(s) gagné(s) par l'équipe receveuse :</p>
          <input onChange={(e) => setSetsWonByTeamReceiving(e.target.value)} className="match_update_input input_small_width" value={setsWonByTeamReceiving} id="setsWonByTeamVisitor" name="setsWonByTeamVisitor" placeholder="3" />
        </div>
        <div style={{ display: "flex", alignItems: "center", }}>
          <p className="black_text space_right">Set(s) gagné(s) par l'équipe visiteuse :</p>
          <input onChange={(e) => setSetsWonByTeamVisitor(e.target.value)} className="match_update_input input_small_width" value={setsWonByTeamVisitor} id="setsWonByTeamReceiving" name="setsWonByTeamReceiving" placeholder="2" />
        </div>
        <button onClick={() => scoreValidation()} className="match_update_validation_button">Valider</button>
        {updateScoresErrorsMessage}
        {updateScoresSuccessMessage}
      </div>
    </div>
  </div> : <div />;

  return (
    <div className="bo_matchs_accompanists_teams_big_frame">
      <p className="red_title">Saisir les accompagnateurs VBLC & le score d'un match</p>
      <div className="accompanists_matchs_teams_filter_frame">
        <p className="black_text" style={{fontWeight:""}}>Pour saisir les accompagnateurs d'un match, sélectionner la saison puis cliquer sur l'équipe concernée:</p>
        {filterTeamsBySeason}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {teamsCardsToDisplay}
        </div>
      </div>
      {matchsOfTheTeamSelected}
      <div className="input_update_big_frame" style={{ display: "flex" }}>
        <div className="input_update_frame">
          {accompanistsInput}
        </div>
        <div className="input_update_frame">
          {scoreInput}
        </div>
      </div>
    </div>
  );
};

export default MatchUpdate;
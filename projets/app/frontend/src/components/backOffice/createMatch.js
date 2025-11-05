import { useEffect, useState } from "react";
import "../../styles/backOffice/createMatch.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';




function CreateMatch() {

  const [teams, setTeams] = useState([]);
  const [seasonSelected, setSeasonSelected] = useState("");
  const [teamSelected, setTeamSelected] = useState("");
  const [teamSelectedId, setTeamSelectedId] = useState("");

  const [phase, setPhase] = useState("");
  const [gameDate, setGameDate] = useState(new Date());
  const [gymnasium, setGymnasium] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [clubReceiving, setClubReceiving] = useState("");
  const [teamReceiving, setTeamReceiving] = useState("");
  const [clubVisitor, setClubVisitor] = useState("");
  const [teamVisitor, setTeamVisitor] = useState("");
  const [setsWonByTeamReceiving, setSetsWonByTeamReceiving] = useState("");
  const [setsWonByTeamVisitor, setSetsWonByTeamVisitor] = useState("");
  const [scores, setScores] = useState("");

  const [createMatchErrors, setCreateMatchErrors] = useState([]);
  const [createMatchSuccess, setCreateMatchSuccess] = useState([]);

  const [teamCardIndex, setTeamCardIndex] = useState("")


  //RÉCUPÉRATION DES DONNÉES DES ÉQUIPES QUI SE TROUVENT DU LOCALSTORAGE
  //LA RÉCUPÉRATION ET LA MISE DANS LE LOCALSTORAGE DES DONNÉES DES ÉQUIPES SE FONT DANS LE COMPOSANT TEAM
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("allTeams"))
    if (items) {
      setTeams(items)
    }
  }, [])

  //VALIDATION DE DU FORMULAIRE DE CREATION D'UN MATCH
  const validateFormCreateAMatch = async () => {
    const matchToCreate = await fetch(`/teamRoute/createAMatch?_id=${teamSelected._id}`,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `phaseFromFront=${phase}&gameDateFromFront=${gameDate}&gymnasiumFromFront=${gymnasium}&addressFromFront=${address}&zipFromFront=${zip}&cityFromFront=${city}&clubReceivingFromFront=${clubReceiving}&teamReceivingFromFront=${teamReceiving}&clubVisitorFromFront=${clubVisitor}&teamVisitorFromFront=${teamVisitor}&setsWonByTeamReceivingFromFront=${setsWonByTeamReceiving}&setsWonByTeamVisitorFromFront=${setsWonByTeamVisitor}&scoresFromFront=${scores}`
      }
    );

    const body = await matchToCreate.json()

    if (body.result === true) {
      setPhase("");
      setGameDate("");
      setGymnasium("");
      setAddress("");
      setZip("");
      setCity("");
      setClubReceiving("");
      setClubVisitor("");
      setTeamReceiving("");
      setTeamVisitor("");
      setSetsWonByTeamReceiving("");
      setSetsWonByTeamVisitor("");
      setScores("");
      setCreateMatchErrors([]);
      setCreateMatchSuccess(body.success);
    } else {
      setCreateMatchErrors(body.errors);
      setCreateMatchSuccess([]);
    }
  };
  
  //AFFICHAGE DU MESSAGE D'ERREURS LORS DE LA VALIDATION DU FORMULAIRE DE CRÉATION D'UN MATCH = NON ENREGISTRE DU MATCH DANS LA BASE DE DONNÉES
  const createMatchErrorsMessage = createMatchErrors.map((errors, index) => {
    return (
      <p key={index} style={{color: "red", fontSize: "15px", textAlign: "center"}}>{errors}</p>
    )
  })

  //AFFICHAGE DU MESSAGE DE RÉUSSITE LORS DE LA VALIDATION DU FORMULAIRE DE CRÉATION D'UN MATCH = ENREGISTREMENT DU MACTH DANS LA BASE DE DONNÉES
  const createMatchSuccessMessage = createMatchSuccess.map((success, index) => {
    return (
      <p key={index} style={{color: "green", fontSize: "15px", textAlign: "center"}}>{success}</p>
    )
  })

  //RÉCUPÉRER LA LISTE DE TOUTES LES SEASONS START YEAR SANS DOUBLON
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
  const filterTeamsBySeason = <select onChange={(e) => onHandlSelectSeason(e)} className="teams_filter_by_season" id="matchs-teams-filter" name="matchs-teams-filter">
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
  };

  //AFFICHAGE DES CARTES DES ÉQUIPES
  const teamsCardsToDisplay = teamsOfSeasonSelected.map((e, index) => {
    return (
      <div key={index} onClick={() => handleSelectThisTeam(e, index)} className={`teams_cards ${index === teamCardIndex ? "teams_cards_selected" : "teams_cards"}`}>
        {e.category === "Proxy" ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p className="black_text teams_cards_category">{e.category}</p>
          <p className="black_text teams_cards_name_highlighted">{e.championship} {e.gender} {e.format}</p>
          <p className="black_text">{e.seasonStartYear}-{e.seasonEndYear}</p>
        </div> : <div />}
        {e.category === "Jeunes / Seniors" ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p className="black_text teams_cards_category">{e.category}</p>
          <p className="black_text teams_cards_name_highlighted">{e.group} {e.gender}</p>
          <p>{e.seasonStartYear}-{e.seasonEndYear}</p>
        </div> : <div />}
        {e.category === "Corporate" ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p className="black_text teams_cards_category">{e.category}</p>
          <p className="black_text teams_cards_name_highlighted">{e.teamName}</p>
          <p className="black_text">{e.seasonStartYear}-{e.seasonEndYear}</p>
        </div> : <div />}
      </div>
    )
  });


  //FORMUALAIRE DE CRÉATION D'UN MATCH
  const matchsFormForInput = teamSelected !== "" && teamSelected !== undefined ? <div className="matchs_input_big_frame">
    <div style={{ display: "flex" }}>
      <p className="black_text" style={{ marginRight: 5 }}>Saisir un match </p>
      <p className="black_text" style={{ marginRight: 5 }}>de la saison</p>
      <p className="black_text" style={{ marginRight: 5, color: "red", fontWeight: "bold" }}>{teamSelected.seasonStartYear}-{teamSelected.seasonEndYear}</p>
      <p className="black_text" style={{ marginRight: 5 }}>de l'équipe: </p>
      {teamSelected.category === "Proxy" ? <p className="black_text" style={{ color: "red", fontWeight: "bold" }}>{teamSelected.championship} {teamSelected.gender} {teamSelected.format}</p> : teamSelected.category === "Jeunes / Seniors" ? <p style={{ color: "red", fontWeight: "bold" }}>{teamSelected.group} {teamSelected.gender}</p> : teamSelected.category === "Corporate" ? <p style={{ color: "red", fontWeight: "bold" }}>{teamSelected.teamName}</p> : <div />}
    </div>
    <div className="matchs_form_big_frame">
      {/* SELECTION DE LA PHASE 1 OU 2 POUR PROXY ET CORPO. ALL SEASON POUR JEUNES / SENIORS */}
      <div className="form_items">
        <label className="black_text form_item_label">Phase: </label>
        {teamSelected.category === "Proxy" || teamSelected.category === "Corporate" ? <select onChange={(e) => setPhase(e.target.value)} value={phase} className="match_form_text_input_medium" id="phase_selection" name="phase_selection" type="select">
          <option hidden value="">Sélectionner une phase</option>
          <option value="phase 1">Phase 1</option>
          <option value="phase 2">Phase 2</option>
        </select> : teamSelected.category === "Jeunes / Seniors" ? <select onChange={(e) => setPhase(e.target.value)} value={phase} className="match_form_text_input_medium" id="phase_selection" name="phase_selection" type="select">
          <option hidden value="">Sélectionner une phase</option>
          <option value="season">Saison</option>
        </select> : <div />}
      </div>
      {/* SELECTION DE LA DATE DU MATCH */}
      <div className="form_items">
        <label className="black_text form_item_label">Date & heure du match: </label>
        <DatePicker className="match_form_text_input_medium" id="game_date" name="game_date"
          // showIcon
          selected={gameDate}
          selectsStart
          onChange={(date) => setGameDate(date)}
          locale="fr"
          showTimeSelect
          timeFormat="p"
          timeIntervals={30}
          timeCaption="Heure"
          dateFormat="Pp"
          // dateFormat="d MMMM yyyy à hh:mm"
          showYearDropdown
          scrollableMonthYearDropdown
        />
      </div>
      {/* NOM DU COMPLEXE SPORTIF OU A LIEU LE MARCH */}
      <div className="form_items">
        <label className="black_text form_item_label">Gymnase: </label>
        <input onChange={(e) => setGymnasium(e.target.value)} className="match_form_text_input_large" value={gymnasium} id="sport-center" name="sport-center" placeholder="Gymnase Chantaco" />
      </div>
      {/* ADRESSE OÙ A LIEU LE MARCH */}
      <div className="form_items">
        <label className="black_text form_item_label">Adresse:</label>
        <input onChange={(e) => setAddress(e.target.value)} className="match_form_text_input_large" value={address} id="address" name="address" placeholder="Adresse" />
        <input onChange={(e) => setZip(e.target.value)} className="match_form_text_input_short" value={zip} id="zip" name="zip" placeholder="Code postal" />
        <input onChange={(e) => setCity(e.target.value)} className="match_form_text_input_medium" value={city} id="city" name="city" placeholder="Ville" />
      </div>
      {/* CLUB ET ÉQUIPE QUI REÇOIVENT */}
      <div className="form_items">
        <label className="black_text form_item_label" style={{ display: "flex" }}>Club & Équipe qui {<p style={{ color: "red", textDecoration: "underline", fontWeight: "bold", marginLeft: 5 }}>reçoivent</p>}:</label>
        <input onChange={(e) => setClubReceiving(e.target.value)} className="match_form_text_input_large" value={clubReceiving} id="club-receiving" name="club-receiving" placeholder="Nom du club" />
        <input onChange={(e) => setTeamReceiving(e.target.value)} className="match_form_text_input_large" value={teamReceiving} id="team-receiving" name="team-receiving" placeholder="Nom de l'équipe" />
      </div>
      {/* CLUB ET ÉQUIPE QUI REÇOIVENT */}
      <div className="form_items">
        <label className="black_text form_item_label" style={{ display: "flex" }}>Club & Équipe qui {<p style={{ color: "red", textDecoration: "underline", fontWeight: "bold", marginLeft: 5 }}>se déplacent</p>}:</label>
        <input onChange={(e) => setClubVisitor(e.target.value)} className="match_form_text_input_large" value={clubVisitor} id="club-visitor" name="club-visitor" placeholder="Nom du club" />
        <input onChange={(e) => setTeamVisitor(e.target.value)} className="match_form_text_input_large" value={teamVisitor} id="team-visitor" name="team-visitor" placeholder="Nom de l'équipe" />
      </div>
      <div className="match_form_submit_button_frame">
        <button onClick={() => validateFormCreateAMatch()} className="match_form_submit_button">Enregistrer ce match dans les matchs de la {phase}</button>
      </div>
    </div>
    {createMatchErrorsMessage}
    {createMatchSuccessMessage}
  </div> : <div className="matchs_input_big_frame">
    <p className="black_text">Aucune équipe sélectionnée.</p>
  </div>




  return (
    <div className="bo_matchs_teams_big_frame">
      <p className="red_title">Saisir les matchs d'une équipe</p>
      <div className="matchs_teams_filter_frame">
        <p className="black_text">Pour saisir les matchs à venir d'une équipe, sélectionner la saison puis cliquer sur l'équipe concernée:</p>
        {filterTeamsBySeason}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {teamsCardsToDisplay}
        </div>
      </div>
      {matchsFormForInput}
    </div>
  )
};

export default CreateMatch;
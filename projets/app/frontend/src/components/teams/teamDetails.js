import "../../styles/teams/teamDetails.css"
import { useSelector } from "react-redux";
import { getFullNumericDate, getHoursAndMinutes } from "../../utils/date"

function TeamDetails() {

  const teamSelected = useSelector((state) => state.teamReducer)

  //FILTRE DES MATCHS DE LA PHASE 1 (PROXY ET BLVB)
  const matchsPhase1 = teamSelected.matchs.filter((items) => {
    return (
      items.phase === "phase 1"
    )
  });

  // AFFICHAGE DES MATCHS DE LA PHASE 1 (PROXY ET BLVB)
  const matchPhase1ToDisplay = matchsPhase1.length > 0 ? matchsPhase1.map((e, index) => {

    const accompanistsOfEachMatch = e.accompanists
    const accompanists = accompanistsOfEachMatch.length > 0 ? accompanistsOfEachMatch.map((e, index) => {
      return (
        <div style={{ marginRight: 10 }}>
          <p className="black_text">{e.firstName} {e.lastName}</p>
        </div>
      )
    }) : <p className="black_text">Aucun accompagnateur inscrit</p>;

    return (
      <div key={index} className="match_frame">
        <div className="match_info_row">
          <div className="match_info_date">
            <p className="match_info_label">Date</p>
            <p className="black_text" style={{fontWeight: "bold"}}>{getFullNumericDate(e.gameDate)} à {getHoursAndMinutes(e.gameDate)}</p>
          </div>
          <div className="match_info_gymnase">
            <p className="match_info_label">Gymnase</p>
            <p className="black_text">{e.gymnasium}</p>
          </div>
          <div className="match_info_address">
            <p className="match_info_label">Adresse</p>
            <p className="black_text">{e.address} {e.zip} {e.city}</p>
          </div>
          {teamSelected.category === "Proxy" || teamSelected.category === "Jeunes / Seniors" ? <div className="match_info_accompanists">
            <p className="match_info_label">Accompagnateur(s) V.B.L.C</p>
            <div className="match_info_accompanists_list">
              {accompanists}
            </div>
          </div> : <div />}
        </div>
        <div className="match_info_row">
          <div className="match_teams_club_team">
            <div className="match_teams_club">
              <p className="match_info_label">Club receveur</p>
              <p className="black_text">{e.clubReceiving}</p>
            </div>
            <div className="match_teams_team">
              <p className="match_info_label">Équipe receveuse</p>
              <p className="black_text">{e.teamReceiving}</p>
            </div>
          </div>
          <div className="match_teams_sets">
            <p className="match_info_label">Set(s) gagné(s)</p>
            {e.setsWonByTeamReceiving !== null ? <p className="black_text">{e.setsWonByTeamReceiving}</p> : <p className="black_text">N/A</p>}
          </div>
          <div className="match_teams_score">
            <p className="match_info_label">Score</p>
            {e.scores ? <p className="black_text">{e.scores}</p> : <p className="black_text">N/A</p>}
          </div>
          <div className="match_teams_sets">
            <p className="match_info_label">Set(s) gagné(s)</p>
            {e.setsWonByTeamVisitor !== null ? <p className="black_text">{e.setsWonByTeamVisitor}</p> : <p className="black_text">N/A</p>}
          </div>
          <div className="match_teams_club_team">
            <div className="match_teams_team">
              <p className="match_info_label">Équipe visiteuse</p>
              <p className="black_text">{e.teamVisitor}</p>
            </div>
            <div className="match_teams_club">
              <p className="match_info_label">Club visiteur</p>
              <p className="black_text">{e.clubVisitor}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }) : <p className="black_text">Aucun match inscrit pour le moment en phase 1</p>;


  //FILTRE DES MATCHS DE LA PHASE 2 (PROXY ET BLVB)
  const matchsPhase2 = teamSelected.matchs.filter((items) => {
    return (
      items.phase === "phase 2"
    )
  });

  // AFFICHAGE DES MATCHS DE LA PHASE 2 (PROXY ET BLVB)
  const matchPhase2ToDisplay = matchsPhase2.length > 0 ? matchsPhase2.map((e, index) => {

    const accompanistsOfEachMatch = e.accompanists
    const accompanists = accompanistsOfEachMatch.length > 0 ? accompanistsOfEachMatch.map((e, index) => {
      return (
        <div style={{ marginRight: 15 }}>
          <p className="black_text">{e.firstName} {e.lastName}</p>
        </div>
      )
    }) : <p className="black_text">Aucun accompagnateur inscrit</p>;

    return (
      <div key={index} className="match_frame">
        <div className="match_info_row">
          <div className="match_info_date">
            <p className="match_info_label">Date</p>
            <p className="black_text" style={{fontWeight: "bold"}}>{getFullNumericDate(e.gameDate)} à {getHoursAndMinutes(e.gameDate)}</p>
          </div>
          <div className="match_info_gymnase">
            <p className="match_info_label">Gymnase</p>
            <p className="black_text">{e.gymnasium}</p>
          </div>
          <div className="match_info_address">
            <p className="match_info_label">Adresse</p>
            <p className="black_text">{e.address} {e.zip} {e.city}</p>
          </div>
          {teamSelected.category === "Proxy" || teamSelected.category === "Jeunes / Seniors" ? <div className="match_info_accompanists">
            <p className="match_info_label">Accompagnateur(s) V.B.L.C</p>
            <div className="match_info_accompanists_list">
              {accompanists}
            </div>
          </div> : <div />}
        </div>
        <div className="match_info_row">
          <div className="match_teams_club_team">
            <div className="match_teams_club">
              <p className="match_info_label">Club receveur</p>
              <p className="black_text">{e.clubReceiving}</p>
            </div>
            <div className="match_teams_team">
              <p className="match_info_label">Équipe receveuse</p>
              <p className="black_text">{e.teamReceiving}</p>
            </div>
          </div>
          <div className="match_teams_sets">
            <p className="match_info_label">Set(s) gagné(s)</p>
            {e.setsWonByTeamReceiving !== null ? <p className="black_text">{e.setsWonByTeamReceiving}</p> : <p className="black_text">N/A</p>}
          </div>
          <div className="match_teams_score">
            <p className="match_info_label">Score</p>
            {e.scores ? <p className="black_text">{e.scores}</p> : <p className="black_text">N/A</p>}
          </div>
          <div className="match_teams_sets">
            <p className="match_info_label">Set(s) gagné(s)</p>
            {e.setsWonByTeamVisitor !== null ? <p className="black_text">{e.setsWonByTeamVisitor}</p> : <p className="black_text">N/A</p>}
          </div>
          <div className="match_teams_club_team">
            <div className="match_teams_team">
              <p className="match_info_label">Équipe visiteuse</p>
              <p className="black_text">{e.teamVisitor}</p>
            </div>
            <div className="match_teams_club">
              <p className="match_info_label">Club visiteur</p>
              <p className="black_text">{e.clubVisitor}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }) : <p className="black_text">Aucun match inscrit pour le moment en phase 2</p>

  //FILTRE DES MATCHS DE LA SAISON ENTIÈRE POUR LES JEUNES / SENIORS
  const matchsSeason = teamSelected.matchs.filter((items) => {
    return (
      items.phase === "season"
    )
  });
  //AFFICHAGE DES MATCH DE LA SAISON ENTIÈRE POUR LES JEUNES / SENIORS
  const matchsSeasonToDisplay = matchsSeason.length > 0 ? matchsSeason.map((e, index) => {

    const accompanistsOfEachMatch = e.accompanists;
    const accompanists = accompanistsOfEachMatch.length > 0 ? accompanistsOfEachMatch.map((e, index) => {
      return (
        <div style={{ marginRight: 15 }}>
          <p className="black_text">{e.firstName} {e.lastName}</p>
        </div>
      )
    }) : <p className="black_text">Aucun accompagnateur inscrit</p>;

    return (
      <div key={index} className="match_frame">
        <div className="match_info_row">
          <div className="match_info_date">
            <p className="match_info_label">Date</p>
            <p className="black_text">{getFullNumericDate(e.gameDate)} à {getHoursAndMinutes(e.gameDate)}</p>
          </div>
          <div className="match_info_gymnase">
            <p className="match_info_label">Gymnase</p>
            <p className="black_text">{e.gymnasium}</p>
          </div>
          <div className="match_info_address">
            <p className="match_info_label">Adresse</p>
            <p className="black_text">{e.address} {e.zip} {e.city}</p>
          </div>
          {teamSelected.category === "Proxy" || teamSelected.category === "Jeunes / Seniors" ? <div className="match_info_accompanists">
            <p className="match_info_label">Accompagnateur(s) V.B.L.C</p>
            <div className="match_info_accompanists_list">
              {accompanists}
            </div>
          </div> : <div />}
        </div>
        <div className="match_info_row">
          <div className="match_teams_club_team">
            <div className="match_teams_club">
              <p className="match_info_label">Club receveur</p>
              <p className="black_text">{e.clubReceiving}</p>
            </div>
            <div className="match_teams_team">
              <p className="match_info_label">Équipe receveuse</p>
              <p className="black_text">{e.teamReceiving}</p>
            </div>
          </div>
          <div className="match_teams_sets">
            <p className="match_info_label">Set(s) gagné(s)</p>
            {e.setsWonByTeamReceiving !== null ? <p className="black_text">{e.setsWonByTeamReceiving}</p> : <p className="black_text">N/A</p>}
          </div>
          <div className="match_teams_score">
            <p className="match_info_label">Score</p>
            {e.scores !== "" ? <p className="black_text">{e.scores}</p> : <p className="black_text">N/A</p>}
          </div>
          <div className="match_teams_sets">
            <p className="match_info_label">Set(s) gagné(s)</p>
            {e.setsWonByTeamVisitor !== null ? <p className="black_text">{e.setsWonByTeamVisitor}</p> : <p className="black_text">N/A</p>}
          </div>
          <div className="match_teams_club_team">
            <div className="match_teams_team">
              <p className="match_info_label">Équipe visiteuse</p>
              <p className="black_text">{e.teamVisitor}</p>
            </div>
            <div className="match_teams_club">
              <p className="match_info_label">Club visiteur</p>
              <p className="black_text">{e.clubVisitor}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }) : <p className="black_text">Aucun match inscrit pour le moment.</p>;




  return (
    <div className="main">
      <div className="team_details_frame">
        {teamSelected.category === "Proxy" ? <div>
          <div className="team_title_bloc">
            <p className="red_title team_title_item">{teamSelected.championship} {teamSelected.gender.toUpperCase()}</p>
            <p className="red_title">{teamSelected.format}</p>
          </div>
          <p className="red_title">{teamSelected.seasonStartYear}-{teamSelected.seasonEndYear}</p>
        </div> : teamSelected.category === "Jeunes / Seniors" ? <div>
          <p className="red_title">{teamSelected.group.toUpperCase()} {teamSelected.gender.toUpperCase()}</p>
          <p className="red_title">{teamSelected.seasonStartYear}-{teamSelected.seasonEndYear}</p>
        </div> : teamSelected.category === "Corporate" ? <div>
          <div className="team_title_bloc">
            <p className="red_title team_title_item">{teamSelected.teamName.toUpperCase()}</p>
            <p className="red_title">{teamSelected.group}</p>
          </div>
          <p className="red_title">{teamSelected.seasonStartYear}-{teamSelected.seasonEndYear}</p>
        </div> : <div />}

        <div className="team_details_picture_players">
          <div className="team_details_picture_frame">
            <img src={teamSelected.teamPicture.url} className="team_details_picture" alt=""/>
          </div>
          <div className="team_details_players">
            <p className="red_title" >Membres de l'équipe:</p>
            {teamSelected.category === "Proxy" || teamSelected.category === "Jeunes / Seniors" ? <div className="coach_frame">
              <p className="coach_label">Coach:</p>
              <p className="coach_data">{teamSelected.coach.firstName} {teamSelected.coach.lastName}</p>
            </div> : <div />}
            {teamSelected.players.map((e, index) => {
              return (
                <p key={index} className="players_data">{e.firstName} {e.lastName}</p>
              )
            })}
          </div>
        </div>
        <div className="team_details_picture_players" style={{ flexDirection: "column" }}>
          {teamSelected.category === "Proxy" || teamSelected.category === "Corporate" ? <div>
            <div className="team_details_match">
              <p className="red_title">Matchs de la phase 1</p>
              {matchPhase1ToDisplay}
            </div>
            <div className="team_details_match">
              <p className="red_title">Matchs de la phase 2</p>
              {matchPhase2ToDisplay}
            </div>
          </div> : teamSelected.category === "Jeunes / Seniors" ? <div className="team_details_match">
            <p className="red_title">Matchs de la saison</p>
            {matchsSeasonToDisplay}
          </div> : <div />}
        </div>
      </div>
    </div>
  )
};

export default TeamDetails;
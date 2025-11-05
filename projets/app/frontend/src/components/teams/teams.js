import { useState, useEffect } from "react";
import "../../styles/teams/teams.css";
import { FaFilter, FaCircleXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const TEAM_SELECTED_FROM_TEAMS = "TEAM_SELECTED_FROM_TEAMS"


function Teams() {

  const [allTeams, setAllTeams] = useState([]);
  const [yearSelected, setYearSelected] = useState("");

  const [openFilters, setOpenFilters] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //RÉCUPÉRATION DES DONNÉES DE TOUTES LES ÉQUPES DEPUIS LA BASE DE DONNÉES
  useEffect(() => {
    const loadAllTeams = async () => {
      const data = await fetch(`teamRoute/loadAllTeams`)
      const body = await data.json()
      setAllTeams(body)
    }
    loadAllTeams();
  }, []);

  //MISE DANS LE LOCALSTORAGE DES DONNÉES DES EQUIPES
  useEffect(() => {
    localStorage.setItem("allTeams", JSON.stringify(allTeams))
  },[allTeams]);

  //METTRE LES DONNÉES DE L'ÉQUIPE SÉLECTIONNÉES DANS UN REDUCER ET NAVIGUER VERS TEAM DETAILS
  const onHandleDisplayTeam = (e) => {
		dispatch({ type: TEAM_SELECTED_FROM_TEAMS, payload: e })
		navigate('/teamDetails')
	};

  //RÉCUPÉRER LA LISTE DE TOUTES LES SEASONS START YEAR SANS DOUBLON
  let yearSelectionList = [];
  for (var i = 0; i < allTeams.length; i++) {
    if (!yearSelectionList.includes(allTeams[i].seasonStartYear)) {
      yearSelectionList.push(allTeams[i].seasonStartYear)
    }
  };

  //SUPPRIMER ET FERMER LE FILTRE
  const closeAndClearFilters = () => {
    setYearSelected("")
    setOpenFilters(false)
  };

  //FILTRE
  const filterBySeason = <div className="filter_frame">
    <button className="filter_button" >Filtre:
      <FaFilter onClick={() => setOpenFilters(true)} className="filter_icon" style={{ color: "red", width: 15, height: 15 }} />
      {openFilters === true ? <div className="filters_frame_when_opend">
        <select onChange={(e) => setYearSelected(e.target.value)} className="filters_frame" id="search-year" name="search-year" >
          <option hidden value="">Sélectionner une saison</option>
          {yearSelectionList.map((e, index) => {
            return (
              <option key={index} value={e} >{e}-{e + 1}</option>
            )
          })}
        </select>
        <FaCircleXmark onClick={() => closeAndClearFilters()} className="filter_icon" style={{ color: "red", width: 20, height: 20 }} />
      </div> : <div />}
    </button>
  </div>;


  //ISOLER LES ÉQUIPES PAR SAISON
  //FILTRER LES ÉQUIPES PAR LA SAISON
  const teamsBySeason = allTeams.filter((items) => {
    if (yearSelected !== "" && yearSelected !== undefined) {
      return items.seasonStartYear === Number(yearSelected)
    } else {
      return items.seasonStartYear === allTeams[0].seasonStartYear
    }
  });

  //FILTRER LES ÉQUIPES DE LA SAISON ACTUELLE PAR CATEGORY PROXY ET AFFICHER
  const currentSeasonProxy = teamsBySeason.filter((items) => {
    return items.category === "Proxy"
  });

  //FILTRER LES ÉQUIPES DE LA SAISON ACTUELLE PAR CATEGORY JEUNES / SENIORS ET AFFICHER
  const currentSeasonJeunesSenior = teamsBySeason.filter((items) => {
    return items.category === "Jeunes / Seniors"
  });

  //FILTRER LES ÉQUIPES DE LA SAISON ACTUELLE PAR CATEGORY JEUNES / SENIORS ET AFFICHER 
  const currentSeasonCorporate = teamsBySeason.filter((items) => {
    return items.category === "Corporate"
  });

  const teamsToDisplay = <div className="teams_display_block">
    <p className="red_title">LES ÉQUIPES</p>
    {currentSeasonProxy.length > 0 ? <div className="teams_frame">
      <p className="red_title">Équipes Proxy</p>
      <div className="teams_display_range">
        {currentSeasonProxy.map((e, index) => {
          return (
            <div onClick={() => onHandleDisplayTeam(e)} key={index} className="team_thumbnail">
              <div className="teams_picture_frame">
                <img src={e.teamPicture.url} className="team_picture_thumbnail" alt="" />
              </div>
              <div className="teams_info">
                <p className="black_text" style={{fontWeight:"bold"}}>{e.championship} {e.gender} {e.format}</p>
                <p className="black_text">{e.seasonStartYear}-{e.seasonEndYear}</p>
                {/* {e.group !== ""? <p>{e.group}</p> : <p/> } */}
              </div>
            </div>
          )
        })}
      </div>
    </div> : <div />}
    {currentSeasonJeunesSenior.length > 0 ? <div className="teams_frame">
      <p className="red_title">Équipes Jeunes / Séniors</p>
      <div className="teams_display_range">
        {currentSeasonJeunesSenior.map((e, index) => {
          return (
            <div onClick={() => onHandleDisplayTeam(e)} key={index} className="team_thumbnail">
              <div className="teams_picture_frame">
                <img src={e.teamPicture.url} className="team_picture_thumbnail" alt="" />
              </div>
              <div className="teams_info">
                <p className="black_text" style={{fontWeight:"bold"}}>{e.group} {e.gender}</p>
                <p className="black_text">{e.seasonStartYear}-{e.seasonEndYear}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div> : <div />}
    {currentSeasonCorporate.length > 0 ? <div className="teams_frame">
      <p className="red_title">Équipes Corpo</p>
      <div className="teams_display_range">
        {currentSeasonCorporate.map((e, index) => {
          return (
            <div onClick={() => onHandleDisplayTeam(e)} key={index} className="team_thumbnail">
              <div className="teams_picture_frame">
                <img src={e.teamPicture.url} className="team_picture_thumbnail" alt="" />
              </div>
              <div className="teams_info">
                <p className="black_text" style={{fontWeight:"bold"}}>{e.teamName}</p>
                <p className="black_text">{e.group}</p>
                <p className="black_text">{e.seasonStartYear}-{e.seasonEndYear}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div> : <div />}
  </div>;


  return (
    <div className="main">
      {filterBySeason}

      {teamsToDisplay}

    </div>
  )
};

export default Teams;
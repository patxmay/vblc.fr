import { useEffect, useState } from "react";
import "../../styles/events/eventsDetails.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFullWrittenDateWithShortMonth, getHoursAndMinutes } from "../../utils/date"

export const EVENT_DATAS_FOR_REGISTRATION = "EVENT_DATA_FOR_REGISTRATION"


function EventsDetails() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [events, setEvents] = useState([]);

  //RÉCUPÊRER TOUS LES EVENEMENTS QUI ONT ÉTÉ ENREGISTRÉS DANS LE LOCAL STORAGE
  useEffect(() => {
    const eventItem = JSON.parse(localStorage.getItem("allEvents"))
    if (eventItem) {
      setEvents(eventItem)
    }
  }, []);

  //RECUPÉRER LE VALEUR DE LA CATEGORY QUI A ÉTÉ SELECTIONNÉE DANS L'ÉCRAN EVENTS
  const eventCategorySelected = useSelector((state) => state.eventCategoryReducer);

  // FILTRER TOUS LES ÉVÉNEMENTS QUI ONT POUR CATEGORIE LA CATEGORIE SELECTIONNÉE ET RETOURNER QUE LES EVENEMENTS DE CETTE CATEGORIE
  const filteredEvent = events.filter((items) => {
    return items.category === eventCategorySelected
  });

  //TRIER LES ÉVÉNEMENTS PAR DATE DE FIN ET PAR ORDRE DECROISSANT
  const filteredEventSorted = filteredEvent.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  //ALLER À L'ECRAN DES INSCRIPTIONS D'UN ÉVÉNEMENT
  const goToRegistrationForm = (e) => {
    //Enregistrer les données dans un reducer
    dispatch({ type: EVENT_DATAS_FOR_REGISTRATION, payload: e })
    //Naviguer vers le formulaire d'inscription à un événement
    navigate('/eventRegistrationForm')
  }

  //AFFICHAGE DES ÉVÉNEMENTS DE LA MEME CATEGORIE UNE FOIS TRIÉS PAR DATE DESCROISSANTE
  const filteredEventSortedToDisplay = filteredEventSorted.map((e, index) => {

    const sectionLine = <div className="event_details_data_info_section_line">
      <div className="section_line" />
    </div>;

    //AFFICHAGE DES TYPES DE TOURNOI
    const tournamentDisplay = e.eventType === "Tournoi avec inscription préalable" ? <div>
      {sectionLine}
      <p className="event_details_data_info_subtitle_first_level">Type(s) de tournoi:</p>
      <div className="event_details_tournament">
        {e.tournament.map((e, index) => {
          return (
            <div key={index} className="event_details_tournament_type ">
              <div className="event_details_tournament_type_info">
                <p className="black_text event_details_tournament_type_info_subtitle">Tournoi {index + 1}: </p>
                <p className="black_text">{e.format}</p>
              </div>
              <div className="event_details_tournament_type_info">
                <p className="black_text event_details_tournament_type_info_subtitle">Nombre: </p>
                <p className="black_text">{e.playersPerTeam} joueurs / équipe</p>
              </div>
              <div className="event_details_tournament_type_info">
                <p className="black_text event_details_tournament_type_info_subtitle">Equipe: </p>
                <p className="black_text">{e.teamFormat}</p>
              </div>
              {e.teamsLimitedTournament1 !== null ? <div className="event_details_tournament_type_info">
                <p className="black_text event_details_tournament_type_info_subtitle">Limité à: </p>
                <p className="black_text">{e.teamsLimited} équipes</p>
              </div> : <div />}
            </div>
          )
        })}
      </div>
    </div> : <div />;

    //AFFICHAGE DES FRAIS DE PARTICIPATIONS
    let tournamentFees = <div />
    if (e.fees !== "") {
      tournamentFees = <div>
        {sectionLine}
        <p className="event_details_data_info_subtitle_first_level">Frais de participation:</p>
        <p className="black_text">{e.fees}€ par participant</p>
      </div>
    };

    //AFFICHAGE DE LA SECTION REPAS / BAR / SNACK
    const menuDisplay = e.catering.menu === true ? <div>
      {e.catering.starter !== "" ? <div className="event_details_snack_and_bar_items">
        <p className="black_text event_selected_data_info_subtitle_second_level">Entrée / Tapas:</p>
        <p className="black_text event_selected_snack_and_bar_datas">{e.catering.starter}</p>
      </div> : <div />}
      {e.catering.mainCourse !== "" ? <div className="event_details_snack_and_bar_items" >
        <p className="black_text event_selected_data_info_subtitle_second_level">Plat principal:</p>
        <p className="black_text event_selected_snack_and_bar_datas" >{e.catering.mainCourse}</p>
      </div> : <div />}
      {e.catering.dessert !== "" ? <div className="event_details_snack_and_bar_items">
        <p className="black_text event_selected_data_info_subtitle_second_level">Dessert:</p>
        <p className="black_text event_selected_snack_and_bar_datas">{e.catering.dessert}</p>
      </div> : <div />}
    </div> : <div />;

    const barDisplay = e.catering.bar === true ? <div>
      {e.catering.beverage !== "" ? <div className="event_details_snack_and_bar_items">
        <p className="black_text event_selected_data_info_subtitle_second_level">Boisson:</p>
        <p className="black_text event_selected_snack_and_bar_datas">{e.catering.beverage}</p>
      </div> : <div />}
    </div> : <div />;

    const snackDisplay = e.catering.snack === true ? <div>
      {e.catering.coldFood !== "" ? <div className="event_details_snack_and_bar_items">
        <p className="event_selected_data_info_subtitle_second_level">Tapas:</p>
        <p className="black_text event_selected_snack_and_bar_datas">{e.catering.coldFood}</p>
      </div> : <div />}
      {e.catering.hotFood !== "" ? <div className="event_details_snack_and_bar_items">
        <p className="event_selected_data_info_subtitle_second_level">Plancha: </p>
        <p className="black_text event_selected_snack_and_bar_datas">{e.catering.hotFood}</p>
      </div> : <div />}
    </div> : <div />

    const cateringDisplay = e.catering.menu === true || e.catering.bar === true || e.catering.snack === true ? <div>
      {sectionLine}
      <p className="event_details_data_info_subtitle_first_level">Offre de restauration:</p>
      {barDisplay}
      {menuDisplay}
      {snackDisplay}
    </div> : <div />

    //LES ÉQUIPES ENGAGÉES
    const tournament1 = e.registration.filter((items) => {
      console.log("*** E.TOURNAMENT[0].FORMAT ***", e.tournament[0].format)
      if (e.tournament[0].format !== "") {
        return items.tournament === e.tournament[0].format
      }
      return false
    });
    console.log("*** TOURNAMENT1 ***", tournament1);

    const tournament2 = e.registration.filter((items) => {
      // console.log("*** E.TOURNAMENT[1].FORMAT ***", e.tournament[1].format)
      if (e.tournament[1]) {
        return items.tournament === e.tournament[1].format
      } else {
        return false
      }

    });
    console.log("*** TOURNAMENT2 ***", tournament2);

    const tournament3 = e.registration.filter((items) => {
      // console.log("*** E.TOURNAMENT[2].FORMAT ***", e.tournament[2].format)
      if (e.tournament[2]) {
        return items.tournament === e.tournament[2].format
      }
      return false
    });
    console.log("*** TOURNAMENT3 ***", tournament3);


    let teamsEnrolledPerType = <div />
    let eventParticipant = <div />
    if (e.eventType === "Tournoi avec inscription préalable") {
      if (e.registration.length > 0) {
        teamsEnrolledPerType = <div>
          {sectionLine}
          <p className="event_details_data_info_subtitle_first_level">Les équipes engagées dans ce(s) tournoi(s):</p>
          {tournament1.length > 0 ? <div>
            <div className="tournament_section">
              <p className="black_text tournament_typeName">Tournoi {e.tournament[0].format}</p>
              {tournament1.map((e, index) => {
                const teamLevelCode = e.teamLevel === "Expert" ? <p className="black_text tournament_enrolled_data_team_level">Niveau 1</p> : e.teamLevel === "Confirmé" ? <p className="tournament_enrolled_data_team_level">Niveau 2</p> : e.teamLevel === "Niveau moyen" ? <p className="tournament_enrolled_data_team_level">Niveau 3</p> : e.teamLevel === "Loisir" ? <p className="tournament_enrolled_data_team_level">Niveau 4</p> : e.teamLevel === "Débutant" ? <p className="tournament_enrolled_data_team_level">Niveau 5</p> : <div />
                return (
                  <div key={index} className="team_enrolled_big_big_frame">
                    <div className="team_enrolled_big_frame">
                      <div className="tournament_enrolled_data_teamName_teamLavel_frame">
                        <p className="black_text tournament_enrolled_data_team_name">{index + 1} - {e.teamName}</p>
                        {teamLevelCode}
                      </div>
                      <div className="tournament_enrolled_data_team_datas">
                        {e.player1.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player1.firstName} {e.player1.lastName}</p> : <div />}
                        {e.player2.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player2.firstName} {e.player2.lastName}</p> : <div />}
                        {e.player3.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player3.firstName} {e.player3.lastName}</p> : <div />}
                        {e.player4.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player4.firstName} {e.player4.lastName}</p> : <div />}
                        {e.player5.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player5.firstName} {e.player5.lastName}</p> : <div />}
                        {e.player6.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player6.firstName} {e.player6.lastName}</p> : <div />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div> : <div />}
          {tournament2.length > 0 ? <div>
            <div className="tournament_section">
              <p className="tournament_typeName">Tournoi {e.tournament[1].format}</p>
              {tournament2.map((e, index) => {
                const teamLevelCode = e.teamLevel === "Expert" ? <p className="black_text tournament_enrolled_data_team_level">Niveau 1</p> : e.teamLevel === "Confirmé" ? <p className="tournament_enrolled_data_team_level">Niveau 2</p> : e.teamLevel === "Niveau moyen" ? <p className="tournament_enrolled_data_team_level">Niveau 3</p> : e.teamLevel === "Loisir" ? <p className="tournament_enrolled_data_team_level">Niveau 4</p> : e.teamLevel === "Débutant" ? <p className="tournament_enrolled_data_team_level">Niveau 5</p> : <div />
                return (
                  <div key={index} className="team_enrolled_big_big_frame">
                    <div className="team_enrolled_big_frame">
                      <div className="tournament_enrolled_data_teamName_teamLavel_frame">
                        <p className="black_text tournament_enrolled_data_team_name">{index + 1} - {e.teamName}</p>
                        {teamLevelCode}
                      </div>
                      <div className="tournament_enrolled_data_team_datas">
                        {e.player1.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player1.firstName} {e.player1.lastName}</p> : <div />}
                        {e.player2.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player2.firstName} {e.player2.lastName}</p> : <div />}
                        {e.player3.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player3.firstName} {e.player3.lastName}</p> : <div />}
                        {e.player4.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player4.firstName} {e.player4.lastName}</p> : <div />}
                        {e.player5.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player5.firstName} {e.player5.lastName}</p> : <div />}
                        {e.player6.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player6.firstName} {e.player6.lastName}</p> : <div />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div> : <div />}
          {tournament3.length > 0 ? <div>
            <div className="tournament_section">
              <p className="tournament_typeName">Tournoi {e.tournament[2].format}</p>
              {tournament3.map((e, index) => {
                const teamLevelCode = e.teamLevel === "Expert" ? <p className="black_text tournament_enrolled_data_team_level">Niveau 1</p> : e.teamLevel === "Confirmé" ? <p className="tournament_enrolled_data_team_level">Niveau 2</p> : e.teamLevel === "Niveau moyen" ? <p className="tournament_enrolled_data_team_level">Niveau 3</p> : e.teamLevel === "Loisir" ? <p className="tournament_enrolled_data_team_level">Niveau 4</p> : e.teamLevel === "Débutant" ? <p className="tournament_enrolled_data_team_level">Niveau 5</p> : <div />
                return (
                  <div key={index} className="team_enrolled_big_big_frame">
                    <div className="team_enrolled_big_frame">
                      <div className="tournament_enrolled_data_teamName_teamLavel_frame">
                        <p className="black_text tournament_enrolled_data_team_name">{index + 1} - {e.teamName}</p>
                        {teamLevelCode}
                      </div>
                      <div className="tournament_enrolled_data_team_datas">
                        {e.player1.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player1.firstName} {e.player1.lastName}</p> : <div />}
                        {e.player2.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player2.firstName} {e.player2.lastName}</p> : <div />}
                        {e.player3.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player3.firstName} {e.player3.lastName}</p> : <div />}
                        {e.player4.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player4.firstName} {e.player4.lastName}</p> : <div />}
                        {e.player5.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player5.firstName} {e.player5.lastName}</p> : <div />}
                        {e.player6.firstName !== "" ? <p className="tournament_enrolled_data_team_member_name">{e.player6.firstName} {e.player6.lastName}</p> : <div />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div> : <div />}
        </div>
      } else {
        teamsEnrolledPerType = <div>
          {sectionLine}
          <p className="event_details_data_info_subtitle_first_level">Les équipes engagées dans ce(s) tournoi(s):</p>
          <p className="participant_datas">Aucune équipe engagée à date.</p>
        </div>
      }
    } else if (e.eventType === "Événement avec inscription préalable") {
      if (e.eventRegistration.length > 0) {
        eventParticipant = <div>
          {sectionLine}
          <p className="event_details_data_info_subtitle_first_level">Les participants à cet événement:</p>
          <div className="tournament_section">
            {e.eventRegistration.map((e, index) => {
              return (
                <div key={index} className="team_enrolled_big_big_frame in_line">
                  {e.participant.firstName !== "" ? <p className="participant_datas">{index + 1} - {e.participant.firstName} {e.participant.lastName}</p> : <p />}
                  {e.guest1.firstName !== "" ? <p className="participant_datas">{e.guest1.firstName} {e.guest1.lastName}</p> : <p />}
                  {e.guest2.firstName !== "" ? <p className="participant_datas">{e.guest2.firstName} {e.guest2.lastName}</p> : <p />}
                  {e.guest3.firstName !== "" ? <p className="participant_datas">{e.guest3.firstName} {e.guest3.lastName}</p> : <p />}
                  {e.guest4.firstName !== "" ? <p className="participant_datas">{e.guest4.firstName} {e.guest4.lastName}</p> : <p />}
                </div>
              )
            })}
          </div>
        </div>
      } else {
        eventParticipant = <div>
          {sectionLine}
          <p className="event_details_data_info_subtitle_first_level">Les participants à cet événement:</p>
          <p className="black_text participant_datas">Aucun participant inscrit pour le moment.</p>
        </div>
      }
    };

    //BUTTTON AFFICHAGE DU BOUTON "S'INSCRIRE" SI LA DATE DU DÉBUT DE L'EVENEMENT N'EST PAS ENCORE DÉPASSÉE
    let eventRegistrationButton = <div/>
    if ((e.eventType === "Événement avec inscription préalable" || e.eventType === "Tournoi avec inscription préalable") && new Date(e.startDate) >= new Date() ) {
      eventRegistrationButton = <button onClick={() => goToRegistrationForm(e)} className="event_details_data_button">
        S'inscrire
      </button>
    }

    // const eventRegistrationButton = new Date(e.startDate) >= new Date() ? <button
    //   onClick={() => goToRegistrationForm(e)} className="event_details_data_button">S'inscrire
    // </button> : <div />

    return (
      <div key={index} className="event_details">
        <div className="event_details_data">
          <div className="event_details_data_poster_frame">
            <img className="event_details_data_poster" src={e.poster} alt="" />
            {/* <button onClick={() => goToRegistrationForm(e)} className="event_details_data_button">S'inscrire</button> */}
            {eventRegistrationButton}
          </div>
          <div className="event_details_data_info">
            <p className="event_details_data_info_title">{e.title}</p>
            <p className="event_details_data_info_date">{getFullWrittenDateWithShortMonth(e.startDate)}</p>
            <p className="black_text event_details_data_info_city">{e.city}</p>
            {/* <div className="event_details_data_info_section_line">
              <div className="section_line" />
            </div> */}
            {sectionLine}
            <p className="black_text event_details_data_info_content display_linebreak ">{e.description}</p>
            {sectionLine}
            <p className="event_details_data_info_subtitle_first_level">Date de l'événement:</p>
            <p className="black_text event_details_data_info_content">{getFullWrittenDateWithShortMonth(e.startDate)} à {getHoursAndMinutes(e.startDate)}</p>
            {sectionLine}
            <p className="event_details_data_info_subtitle_first_level">Lieu de l'événement:</p>
            <p className="black_text event_details_data_info_content">{e.place}</p>


            {tournamentDisplay}

            {tournamentFees}

            {cateringDisplay}

            {teamsEnrolledPerType}

            {eventParticipant}

          </div>
        </div>
      </div>
    )
  });


  return (
    <div className="main">

      {filteredEventSortedToDisplay}

    </div>
  )
};

export default EventsDetails;
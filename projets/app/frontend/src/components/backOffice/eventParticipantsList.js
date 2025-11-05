import { useState, useEffect, useRef } from "react";
import "../../styles/backOffice/eventParticipantsList.css"
import { useReactToPrint } from "react-to-print"
import { getFullNumericDate } from "../../utils/date"

function EventParticipantsList() {

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedEventIndex, setSelectedEventIndex] = useState("");
  const [yearSelectedFromFilter, setYearSelectedFromFilter] = useState("");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "participants-list",
    // onAfterPrint: () => alert('Print success!')
  })

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("allEvents"))
    if (items) {
      setEvents(items)
    }
  }, []);

  //RÉCUPÉRER LA LISTE DE TOUTES LES ANNÉES DES ÉVÉNEMENTS
  let eventsYearList = []
  for (var i = 0; i < events.length; i++) {
    if (!eventsYearList.includes(events[i].year)) {
      eventsYearList.push(events[i].year)
    }
  };
  // ORDONNER EVENT YEAR LIST PAR ORDRE DÉCROISSANT
  const eventsYearListSorted = eventsYearList.sort(function (a, b) {
    return b - a
  });

  const editionYearSelectedFromFilter = (e) => {
    //setSelectedEvent(-1)
    setYearSelectedFromFilter(e.target.value)
  };

  //FILTRE DES ÉVÉNEMENTS PAR ANNÉE D'ÉDITION
  const filterByYear = <div>
    <select className="edit_event_filter" onChange={(e) => editionYearSelectedFromFilter(e)} id="event-filter-by-year" name="event-filter-by-year">
      <option hidden value="">Sélectionner une année</option>
      {eventsYearListSorted.map((e, index) => {
        return (
          <option key={index} value={e} >{e}</option>
        )
      })}
    </select>
  </div>;

  //EXTRAIRE UNIQUEMENT LES ÉVÉNEMENTS CORRESPONDANT À L'ANNÉE D'ÉDITION
  let eventsCorrespondingYearSelected = events.filter((items) => {
    if (yearSelectedFromFilter !== "" || yearSelectedFromFilter !== undefined) {
      return items.year === Number(yearSelectedFromFilter)
    }
    return false

  });

  // AFFICHER LES ÉVÉNEMENTS SOUS FORME DE CARTE
  const eventsCards = eventsCorrespondingYearSelected.map((e, index) => {
    const titleToDisplay = e.category === "Autre événement" ? <p className="black_text events_cards_title_participants">{e.otherEventName}</p> : <p className="black_text events_cards_title_participants">{e.category}</p>
    return (
      <div key={index} className={`events_cards_participants ${index === selectedEventIndex ? "events_cards_participants_selected" : "events_cards_participants"}`} onClick={() => handleSelectEvent(e, index)}>
        {titleToDisplay}
        <p className="black_text">Edition: {e.year}</p>
      </div>
    )
  });

  //FONCTION DE SELECTION DE LA CARTE DE L'ÉVÉNEMENT A MODIFIER => EXTRAIRE L'ID DE L'EVENEMENT PUIS TROUVER L'OBJECT (DATAS) DE L'ÉVÉNEMENT
  const handleSelectEvent = (e, index) => {
    setSelectedEventId(e._id)
    setSelectedEventIndex(index)
    setSelectedEvent(e)
  };
  
  let eventCheckListToPrint = <div />;

  if (selectedEvent !== "") {

    const tournament1 = selectedEvent.registration.filter((items) => {
      if (selectedEvent.tournament[0]) {
        return (
          items.tournament === selectedEvent.tournament[0].format
        )
      } else {
        return false
      }
    });

    const tournament2 = selectedEvent.registration.filter((items) => {
      
      if (selectedEvent.tournament[1]) {
        return (
          items.tournament === selectedEvent.tournament[1].format
        )
      } else {
        return false
      }
    });

    const tournament3 = selectedEvent.registration.filter((items) => {
      if (selectedEvent.tournament[2]) {
        return (
          items.tournament === selectedEvent.tournament[2].format
        )
      } else {
        return false
      }
    });

    eventCheckListToPrint = selectedEvent.eventType === "Tournoi avec inscription préalable" ? <div>
      <div>
        <p className="black_text participants_list_title">{selectedEvent.title}</p>
        <p className="black_text participants_list_title">{getFullNumericDate(selectedEvent.startDate)}</p>
      </div>
      {selectedEvent.tournament[0] !== undefined ? <div>
        <p className="black_text participants_list_tournament_type">Tournoi {selectedEvent.tournament[0].format}</p>
        {tournament1.length > 0 ? tournament1.map((e, index) => {
          return (
            <div key={index} className="participants_table_by_tournament_type">
              <div className="participants_table_by_tournament_type_team_name_frame">
                <p className="black_text participants_table_by_tournament_type_team_name">{e.teamName.toUpperCase()}</p>
                <p className="black_text">{e.teamLevel}</p>
              </div>
              <div style={{ display: "flex" }}>
                {e.player1.firstName !== "" && e.player1.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player" >
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player1.firstName} {e.player1.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player2.firstName !== "" && e.player2.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player2.firstName} {e.player2.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player3.firstName !== "" && e.player3.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player3.firstName} {e.player3.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player4.firstName !== "" && e.player4.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player4.firstName} {e.player4.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player5.firstName !== "" && e.player5.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player5.firstName} {e.player5.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player6.firstName !== "" && e.player6.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player6.firstName} {e.player6.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
              </div>
            </div>
          )
        }) : <p className="black_text">Aucune inscription dans ce tournoi pour le moment.</p>}
      </div> : <div />}
      {selectedEvent.tournament[1] !== undefined ? <div>
        <p className="participants_list_tournament_type">Tournoi {selectedEvent.tournament[1].format}</p>
        {tournament2.length > 0 ? tournament2.map((e, index) => {
          return (
            <div key={index} className="participants_table_by_tournament_type">
              <div className="black_text participants_table_by_tournament_type_team_name_frame">
                <p className="black_text participants_table_by_tournament_type_team_name">{e.teamName.toUpperCase()}</p>
                <p className="black_text">{e.teamLevel}</p>
              </div>
              <div style={{ display: "flex" }}>
                {e.player1.firstName !== "" && e.player1.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player" >
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player1.firstName} {e.player1.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player2.firstName !== "" && e.player2.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player2.firstName} {e.player2.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player3.firstName !== "" && e.player3.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player3.firstName} {e.player3.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player4.firstName !== "" && e.player4.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player4.firstName} {e.player4.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player5.firstName !== "" && e.player5.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player5.firstName} {e.player5.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player6.firstName !== "" && e.player6.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player6.firstName} {e.player6.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
              </div>
            </div>
          )
        }) : <p>Aucune inscription dans ce tournoi pour le moment.</p>}

      </div> : <div />}
      {selectedEvent.tournament[2] !== undefined ? <div>
        <p className="participants_list_tournament_type">Tournoi {selectedEvent.tournament[2].format}</p>
        {tournament3.length > 0 ? tournament3.map((e, index) => {
          return (
            <div key={index} className="participants_table_by_tournament_type">
              <div className="black_text participants_table_by_tournament_type_team_name_frame">
                <p className="black_text participants_table_by_tournament_type_team_name">{e.teamName.toUpperCase()}</p>
                <p className="black_text">{e.teamLevel}</p>
              </div>
              <div style={{ display: "flex" }}>
                {e.player1.firstName !== "" && e.player1.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player" >
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player1.firstName} {e.player1.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player2.firstName !== "" && e.player2.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player2.firstName} {e.player2.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player3.firstName !== "" && e.player3.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player3.firstName} {e.player3.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player4.firstName !== "" && e.player4.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player4.firstName} {e.player4.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player5.firstName !== "" && e.player5.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player5.firstName} {e.player5.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
                {e.player6.firstName !== "" && e.player6.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                  <p className="black_text participants_table_by_tournament_type_team_player_name">{e.player6.firstName} {e.player6.lastName}</p>
                  <input className="check_case" />
                </div> : <div />}
              </div>
            </div>
          )
        }) : <p className="black_text">Aucune inscription dans ce tournoi pour le moment.</p>}
      </div> : <div />}


    </div> : selectedEvent.eventType === "Événement avec inscription préalable" ? <div>
      <div>
        <p className="black_text participants_list_title">{selectedEvent.title}</p>
        <p className="black_text participants_list_title">{getFullNumericDate(selectedEvent.startDate)}</p>
      </div>
      <div className="black_text  participants_list_tournament_type">La liste des participants: </div>
      {selectedEvent.eventRegistration.length > 0 ? selectedEvent.eventRegistration.map((e, index) => {
        return (
          <div key={index} className="participants_table_by_tournament_type">
            <div style={{ display: "flex" }}>
              {e.participant.firstName !== "" && e.participant.lastName !== "" ? <div className="black_text participants_table_by_tournament_type_team_player">
                <p className="black_text participants_table_by_tournament_type_team_player_name">{e.participant.firstName} {e.participant.lastName}</p>
                <input className="check_case" />
              </div> : <div />}
              {e.guest1.firstName !== "" && e.guest1.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                <p className="black_text participants_table_by_tournament_type_team_player_name">{e.guest1.firstName} {e.guest1.lastName}</p>
                <input className="check_case" />
              </div> : <div />}
              {e.guest2.firstName !== "" && e.guest2.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                <p className="black_text participants_table_by_tournament_type_team_player_name">{e.guest2.firstName} {e.guest2.lastName}</p>
                <input className="check_case" />
              </div> : <div />}
              {e.guest3.firstName !== "" && e.guest3.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                <p className="black_text participants_table_by_tournament_type_team_player_name">{e.guest3.firstName} {e.guest3.lastName}</p>
                <input style={{ width: 15, height: 15 }} />
              </div> : <div />}
              {e.guest4.firstName !== "" && e.guest4.lastName !== "" ? <div className="participants_table_by_tournament_type_team_player">
                <p className="black_text participants_table_by_tournament_type_team_player_name">{e.guest4.firstName} {e.guest4.lastName}</p>
                <input className="check_case" />
              </div> : <div />}
            </div>
          </div>
        )
      }) : <div>
        <p className="black_text non_inscription">Aucune inscription dans cet événement pour le moment.</p>
      </div>}
    </div> : selectedEvent.eventType === "Événement sans inscription préalable" || selectedEvent.eventType === "Tournoi sans inscription préalable" ? <div>
      <p className="black_text non_inscription">Aucune liste disponible. L'événement {selectedEvent.title} est un événement sans inscription.</p>
    </div> : <div />
  } else {
    eventCheckListToPrint = <p className="black_text">Aucun événement n'a été sélectionné.</p>
  }








  return (
    <div className="bo_event_participants_list_big_frame">
      <p className="red_title">Extration de la liste des participants d'un événement</p>
      <div className="events_cards_frame">
        <h4 className="section_big_title">Pour extraire la liste des participants d'un événement, sélectionner l'année de l'événement puis cliquer sur l'événement :</h4>
        {filterByYear}
        <div className="events_cards_display_participants">
          {eventsCards}
        </div>
      </div>
      <div ref={componentRef} className="edit_big_frame">
        {eventCheckListToPrint}
      </div>
      <div className="print_button_frame">
        {selectedEventId !== "" ? <button className="print_button_activated" onClick={() => handlePrint()}>IMPRIMER</button> : <button className="print_button_disactivated">IMPRIMER</button>}
      </div>
    </div>
  )
};

export default EventParticipantsList;
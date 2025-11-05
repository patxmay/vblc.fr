import { useState, useEffect } from "react";
import "../../styles/backOffice/deleteEvents.css";




function DeleteEvents() {

  //SETTERS FOR FILTER
  const [eventsDatas, setEventsDatas] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("")
  const [selectedEventIndex, setSelectedEventIndex] = useState("")
  const [yearSelectedFromFilter, setYearSelectedFromFilter] = useState("");

  const [selectedEventPosterId, setSelectedEventPosterId] = useState("")



  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("allEvents"))
    if (items) {
      setEventsDatas(items)
    }
  }, []);

  //RÉCUPÉRER LA LISTE DE TOUTES LES ANNÉES DES ÉVÉNEMENTS
  let eventsYearList = []
  for (var i = 0; i < eventsDatas.length; i++) {
    if (!eventsYearList.includes(eventsDatas[i].year)) {
      eventsYearList.push(eventsDatas[i].year)
    }
  };
  // ORDONNER EVENT YEAR LIST PAR ORDRE DÉCROISSANT
  const eventsYearListSorted = eventsYearList.sort(function (a, b) {
    return b - a
  });

  const editionYearSelectedFromFilter = (e) => {
    setSelectedEvent(-1)
    setYearSelectedFromFilter(e.target.value)
    setSelectedEventIndex("")
  }

  //FILTRE DES ÉVÉNEMENTS PAR ANNÉE D'ÉDITION
  const filterByYear = <div>
    <select className="bo_delete_event_filter" onChange={(e) => editionYearSelectedFromFilter(e)} id="event-filter-by-year" name="event-filter-by-year">
      <option hidden value="">Sélectionner une année</option>
      {eventsYearListSorted.map((e, index) => {
        return (
          <option key={index} value={e} >{e}</option>
        )
      })}
    </select>
  </div>;


  //EXTRAIRE UNIQUEMENT LES ÉVÉNEMENTS CORRESPONDANT À L'ANNÉE D'ÉDITION
  let eventsCorrespondingYearSelected = eventsDatas.filter((items) => {
    if (yearSelectedFromFilter !== "" || yearSelectedFromFilter !== undefined) {
      return items.year === Number(yearSelectedFromFilter)
    }
    return false
  });

  // AFFICHER LES ÉVÉNEMENTS SOUS FORME DE CARTE
  const eventsCards = eventsCorrespondingYearSelected.map((e, index) => {
    const titleToDisplay = e.category === "Autre événement" ? <p className="black_text bo_delete_events_cards_title">{e.otherEventName}</p> : <p className="black_text bo_delete_events_cards_title">{e.category}</p>
    return (
      <div key={index} onClick={() => handleSelectEvent(e, index)} className={`bo_delete_events_cards ${index === selectedEventIndex ? "bo_delete_events_cards_selected" : "bo_delete_events_cards"}`}>
        {titleToDisplay}
        <p className="black_text">Edition: {e.year}</p>
      </div>
    )
  });

  //FONCTION DE SELECTION DE LA CARTE DE L'ÉVÉNEMENT A MODIFIER => EXTRAIRE L'ID DE L'EVENEMENT PUIS TROUVER L'OBJECT (DATAS) DE L'ÉVÉNEMENT
  const handleSelectEvent = (e, index) => {
    setSelectedEventId(e._id);
    setSelectedEventPosterId(e.posterId)
    setSelectedEventIndex(index);
  };

  //DÈS QU'ON A L'INDEX DE L'EVENEMENT SÉLECTIONNÉ, ON "SET" LES DONNÉES DE L'ÉVÉNEMENT SELECTIONNÉ DANS UNE VARIABLE
  useEffect(() => {
    const eventSelectedForModifycation = eventsCorrespondingYearSelected.find((items) => {
      return (
        items._id === selectedEventId
      )
    })
    setSelectedEvent(eventSelectedForModifycation)
  }, [selectedEventId]);


  //FONCTION QUI SUPPRIMER LE POSTER D'UN EVENTMENT DE LA BASE DES MEDIA CLOUDINARY
  const deleteThatEventPosterFromCloudinary = async () => {
    if (selectedEventPosterId !== "") {
      await fetch(`/eventRoute/deleteAEventPosterFromCloudinary`, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `selectedEventPosterIdFromFront=${selectedEventPosterId}`
      })
    }
  };

  //FONCTION QUI SUPPRIMER UN EVENTMENT DE LA BASE DE DONNÉES MONGODB
  const deleteThatEventFromMongoDB = async () => {
    if (selectedEventId !== "") {
      await fetch(`/eventRoute/deleteAEventFromMongDB?_id=${selectedEventId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
    }
  };

  //FONCTION QUI DÉCLENCHE LES 2 FONCTIONS CI-DESSUS : SUPPRESSION DU POSTER D'UN EVENEMENT SELECTIONNÉ DANS CLOUDINARY ET SUPPRESSION DE L'EVENEMENT DANS MONGODB
  const deleteThatEvent = () => {
    deleteThatEventPosterFromCloudinary();
    deleteThatEventFromMongoDB();
  };

  const deleteButton = selectedEventIndex !== "" ? <button className="bo_delete_events_delete_button activated" onClick={() => deleteThatEvent()}>Supprimer
  </button> : <button
    className="bo_delete_events_delete_button disactivated">Supprimer
  </button>

  return (
    <div className="bo_delete_events_big_frame" >
      <p className="red_title">Supprimer un événement</p>
      <div className="bo_delete_events_cards_frame">
        <h4 className="black_text bo_delete_section_big_title">Pour supprimer un événement, sélectionner l'année de l'événement puis cliquer sur l'événement à supprimer:</h4>
        {filterByYear}
        <div className="bo_delete_events_cards_display">
          {eventsCards}
        </div>
        <div className="bo_delete_events_button_frame">
          {deleteButton}
        </div>
      </div>
    </div>

  )
};


export default DeleteEvents;
import { useEffect, useState } from "react";
import "../../styles/events/events.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFullWrittenDateWithShortMonth } from "../../utils/date"

export const EVENT_CATEGORY_FROM_THUMBNAIL = "EVENT_CATEGORY_FROM_THUMBNAIL";
export const EVENT_CATEGORY_FROM_LIST = "EVENT_CATEGORY_FROM_LIST";

function Events() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [events, setEvents] = useState([]);

  //RÉCUPERER TOUTES LES INFORMATIONS DES EVENEMENTS ENREGISTRÉES DANS LE LOCAL STORAGE
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("allEvents"))
    if (items) {
      setEvents(items)
    }
  }, []);

  const goToEventsDetailsFromThumbnail = (e) => {
    dispatch({ type: EVENT_CATEGORY_FROM_THUMBNAIL, payload: e.category })
    navigate('/eventsDetails')
  };

  //FILTRER POUR UNIQUEMENT AFFICHER LES ÉVÉNEMENTS QUI NE SONT PAS ENCORE TERMINÉES
  let incomingEvents = events.filter((item) => {
    let today = new Date()
    let eventsEndDate = new Date(item.endDate);
    if (eventsEndDate > today) {
      return item
    }
    return false
  });

  let incomingEventsToDisplay = incomingEvents.map((e, index) => {

    const buttonType = e.eventType === "Événement avec inscription préalable" || e.eventType === "Tournoi avec inscription préalable" ? <button onClick={() => goToEventsDetailsFromThumbnail(e)} className="events_info_button">Info & inscription</button> : <button onClick={() => goToEventsDetailsFromThumbnail(e)} className="events_info_button">En savoir plus...</button>
    return (
      <div key={index} className="event_frame_thumbnail">
        <div className="events_picture">
          {e.poster !== "" ? <img src={e.poster} alt="" className="poster_size_thumbnail" /> : <img alt="Affiche à venir" className="poster_size_thumbnail" />}
          {/* <img src={e.poster} alt="" className="poster_size_thumbnail" /> */}
        </div>
        <div className="events_title_bloc">
          <p className="events_title">{e.title}</p>
        </div>
        <div className="events_date_bloc">
          <p className="events_date">{getFullWrittenDateWithShortMonth(e.startDate)}</p>
        </div>
        <div className="events_button_bloc">
          {buttonType}
        </div>
      </div>
    )
  });

  //LES BOUTONS DES CATEGORIES EN BAS DE PAGE
  //Fonction qui met dans un reducer la nom de la categorie et qui fait naviguer vers la page eventsDteails
  const goToEventsDetailsFromList = (e) => {
    dispatch({ type: EVENT_CATEGORY_FROM_LIST, payload: e })
    navigate('/eventsDetails')
  };

  //Mapping des eventnement de la base de données et pusher dans un tableau le nom de la category sans doublon
  let categoryList = [];
  for (var i = 0; i < events.length; i++) {
    if (!categoryList.includes(events[i].category)) {
      categoryList.push(events[i].category)
    }
  };

  //Afficher la liste des evenements sans doublon sous forme de boutons
  const eventsCards = categoryList.map((e, index) => {
    return (
      <div key={index} onClick={() => goToEventsDetailsFromList(e)} className="event_list_frame">
        <p className="event_list">{e}</p>
      </div>
    )
  });

  return (
    <div className="main">
      <div className="presentation_blocs">
        <p className="red_title">Les événements organisés par V.B.L.C</p>
        <p className="black_text">Faire décourvrir et promouvoir le volley-ball ainsi que la culture basque fait partie de l’ADN du club V.B.L.C. Chaque année, le club organise 4 tournois ouverts à tous: Tournoi de beach Volley-Ball (septembre), Tournoi de Volley-Ball au carnaval (février), Tournoi de beach Volley-Ball le samedi des fêtes patronales de Saint Jean de Luz, Tournoi de beach Volley-Ball <a href='https://www.facebook.com/groups/586091801977659/' className="" target="_blank" rel='noopener noreferrer'>Basko-Beach.</a> À partir de Juin jusqu'à fin Septembre, le club propose à travers sa section Beach Volley, des entrainements de Beach Volley sur la plage de Socoa, encadrés par Mathieu CONAN et Florian CORDELIER et pendant 4 semaines en Juillet et Août, des sessions gratuites d'initiation et de perfectionnement au Beach Volley sont offertes sur la plage de Socoa, encadré par Éric BROUETTE. </p>
        {/* <div>
          <p>- Tournoi de beach Volley-Ball en septembre, sur la plage à Socoa,</p>
          <p>- Tournoi de Volley-Ball au carnaval de février, en salle à Chantaco</p>
          <p>- Tournoi de beach Volley-Ball le samedi des fêtes patronales de Saint Jean de Luz, sur la grande plage </p>
          <p>- Tournoi de beach Volley-Ball <a href='https://pass.sports.gouv.fr/' className="" target="_blank" rel='noopener noreferrer'>Basko-Beach</a></p>
        </div> */}
      </div>
      <div className="events_thumbnail_big_blocs">
        <p className="red_title">Événements à venir</p>
        <div className="events_thumbnail_blocs">
          {incomingEventsToDisplay}
        </div>
      </div>
      <div className="event_list_big_bloc">
        <p className="red_title">Tous les événements</p>
        <div className="event_list_bloc">
          {/* {eventList} */}
          {eventsCards}
        </div>
      </div>
    </div>
  )
};

export default Events;
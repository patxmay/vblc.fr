import { useState, useEffect } from "react";
import "../../styles/backOffice/editeEvents.css";
import DatePicker from "react-datepicker";
import { getFullWrittenDate, getHoursAndMinutes } from "../../utils/date"


function EditeEvents() {

  const [eventsDatas, setEventsDatas] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("")
  const [selectedEventIndex, setSelectedEventIndex] = useState("")

  //MODIFICTION STATES
  const [modifyCategory, setModifyCategory] = useState(false);
  const [modifyOtherEventName, setModifyOtherEventName] = useState(false)
  const [modifyYear, setModifyYear] = useState(false);
  const [modifyTitle, setModifyTitle] = useState(false);
  const [modifyCity, setModifyCity] = useState(false);
  const [modifyShortDescription, setModifyShortDescription] = useState(false)
  const [modifyDescription, setModifyDescription] = useState(false);
  const [modifyPlace, setModifyPlace] = useState(false);

  const [modifyStartDate, setModifyStartDate] = useState(false);
  const [modifyEndDate, setModifyEndDate] = useState(false)
  const [modifyEventType, setModifyEventType] = useState("");

  const [modifyFormatTournament1, setModifyFormatTournament1] = useState(false);
  const [modifyTeamFormatTournament1, setModifyTeamFormatTournament1] = useState(false);
  const [modifyPlayersPerTeamTournament1, setModifyPlayersPerTeamTournament1] = useState(false);
  const [modifyTeamsLimitedTournament1, setModifyTeamsLimitedTournament1] = useState(false);

  const [modifyFormatTournament2, setModifyFormatTournament2] = useState(false);
  const [modifyTeamFormatTournament2, setModifyTeamFormatTournament2] = useState(false);
  const [modifyPlayersPerTeamTournament2, setModifyPlayersPerTeamTournament2] = useState(false);
  const [modifyTeamsLimitedTournament2, setModifyTeamsLimitedTournament2] = useState(false);

  const [modifyFormatTournament3, setModifyFormatTournament3] = useState(false);
  const [modifyTeamFormatTournament3, setModifyTeamFormatTournament3] = useState(false);
  const [modifyPlayersPerTeamTournament3, setModifyPlayersPerTeamTournament3] = useState(false);
  const [modifyTeamsLimitedTournament3, setModifyTeamsLimitedTournament3] = useState(false);


  const [modifyFees, setModifyFees] = useState(false);

  const [modifyMenu, setModifyMenu] = useState(false)
  const [modifyStarter, setModifyStarter] = useState(false)
  const [modifyMainCourse, setModifyMainCourse] = useState(false)
  const [modifyDessert, setModifyDessert] = useState(false)
  const [modifyBar, setModifyBar] = useState(false)
  const [modifySnack, setModifySnack] = useState(false)
  const [modifyBeverage, setModifyBeverage] = useState(false);
  const [modifyColdFood, setModifyColdFood] = useState(false);
  const [modifyHotFood, setModifyHotFood] = useState(false);

  const [modifyPoster, setModifyPoster] = useState(false);
  const [modifySubscription, setModifySubscription] = useState(false)

  const [posterPreview, setPosterPreview] = useState("");


  //SET STATE
  const [category, setCategory] = useState("");
  const [otherEventName, setOtherEventName] = useState("");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [fees, setFees] = useState("");
  const [poster, setPoster] = useState("");
  const [posterId, setPosterId] = useState("");
  const [subscription, setSubscription] = useState("");
  const [eventType, setEventType] = useState("");

  const [formatTournament1, setFormatTournament1] = useState("");
  const [playersPerTeamTournament1, setPlayersPerTeamTournament1] = useState("");
  const [teamFormatTournament1, setTeamFormatTournament1] = useState("");
  const [teamsLimitedTournament1, setTeamsLimitedTournament1] = useState("");

  const [formatTournament2, setFormatTournament2] = useState("");
  const [playersPerTeamTournament2, setPlayersPerTeamTournament2] = useState("");
  const [teamFormatTournament2, setTeamFormatTournament2] = useState("");
  const [teamsLimitedTournament2, setTeamsLimitedTournament2] = useState("");

  const [formatTournament3, setFormatTournament3] = useState("");
  const [playersPerTeamTournament3, setPlayersPerTeamTournament3] = useState("");
  const [teamFormatTournament3, setTeamFormatTournament3] = useState("");
  const [teamsLimitedTournament3, setTeamsLimitedTournament3] = useState("");

  const [bar, setBar] = useState(false);
  const [beverage, setBeverage] = useState("");

  const [snack, setSnack] = useState(false);
  const [coldFood, setColdFood] = useState("");
  const [hotFood, setHotFood] = useState("");

  const [menu, setMenu] = useState(false)
  const [starter, setStarter] = useState("");
  const [mainCourse, setMainCourse] = useState("");
  const [dessert, setDessert] = useState("");

  //FOR CLOUDINARY
  const [posterSelected, setPosterSelected] = useState("");

  //FILTER
  const [editionYearSelectedFromFilter, setEditionYearSelectedFromFilter] = useState("");

  const [eventSelectedTournament, setEventSelectedTournament] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("allEvents"))
    if (items) {
      setEventsDatas(items)
    }
  }, []);

  //RÉCUPÉRER LA LISTE DES ANNÉES D'ÉDITION DES ÉVÉNEMENTS (ici la liste des années sont en ordre croissant)
  let eventsYearList = []
  for (var i = 0; i < eventsDatas.length; i++) {
    if (!eventsYearList.includes(eventsDatas[i].year)) {
      eventsYearList.push(eventsDatas[i].year)
    }
  };



  // ORDONNER EVENT YEAR LIST PAR ORDRE DÉCROISSANT (On veut que la liste soit par ordre décroissant)
  const eventsYearListDescendintOrder = eventsYearList.sort(function (a, b) {
    return b - a
  });

  const handleSelectEditionYear = (e) => {
    setEditionYearSelectedFromFilter(e.target.value)
    setSelectedEventIndex(-1)
    setSelectedEvent([])
    setSelectedEventId("")
  };

  //FILTRE DES ÉVÉNEMENTS PAR ANNÉE D'ÉDITION
  const filterByEditionYear = <div>
    <select className="edit_event_filter" onChange={(e) => handleSelectEditionYear(e)} id="event-filter-by-year" name="event-filter-by-year">
      <option hidden value="">Sélectionner une année</option>
      {eventsYearListDescendintOrder.map((e, index) => {
        return (
          <option key={index} value={e} >{e}</option>
        )
      })}
    </select>
  </div>;

  //EXTRAIRE UNIQUEMENT LES ÉVÉNEMENTS CORRESPONDANT À L'ANNÉE D'ÉDITION SÉLECTIONNÉE DANS LE FILTRE
  let eventsCorrespondingEditionYearSelected = eventsDatas.filter((items) => {
    if (editionYearSelectedFromFilter !== "" || editionYearSelectedFromFilter !== undefined) {
      return items.year === Number(editionYearSelectedFromFilter)
    }
    return false
  });

  //FONCTION DE SELECTION DE LA CARTE DE L'ÉVÉNEMENT A MODIFIER => EXTRAIRE L'ID DE L'EVENEMENT PUIS TROUVER L'OBJECT (DATAS) DE L'ÉVÉNEMENT
  const handleSelectEvent = (e, index) => {
    //setSelectedEvent(e)
    setSelectedEventId(e._id);
    setSelectedEventIndex(index); // Sert a entourer la carte de l'événement sélectionnée
    setEventSelectedTournament(e.tournament)
  };

  // AFFICHER LES ÉVÉNEMENTS CORRESPONDANT A L'ANNÉE D'ÉDITION SELECTIONNÉE DANS LE FILTRE SOUS FORME DE CARTE
  const eventsCards = eventsCorrespondingEditionYearSelected.map((e, index) => {
    const titleToDisplay = e.category === "Autre événement" ? <p className="black_text events_cards_title">{e.otherEventName}</p> : <p className="black_text events_cards_title">{e.category}</p>
    return (
      <div key={index} onClick={() => handleSelectEvent(e, index)} className={`events_cards ${index === selectedEventIndex ? "events_cards_selected" : "events_cards"}`}>
        {titleToDisplay}
        <p>Edition: {e.year}</p>
      </div>
    )
  });

  //DÈS QU'ON A L'INDEX DE L'EVENEMENT SÉLECTIONNÉ, ON "SET" LES DONNÉES DE L'ÉVÉNEMENT SELECTIONNÉ DANS UNE VARIABLE
  useEffect(() => {
    const eventSelectedForModifycation = eventsCorrespondingEditionYearSelected.find((items) => {
      return (
        items._id === selectedEventId
      )
    })
    setSelectedEvent(eventSelectedForModifycation)
  }, [selectedEventId]);


  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX API POUR LES MODIFICATIONS XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //API MODIFICATION DE LA CATEGORIE
  const updateCategory = async () => {
    const categoryToUpdate = await fetch(`/eventRoute/updateCategory?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `categoryFromFront=${category}`
      }
    );
    setModifyCategory(false)
  };

  //API MODIFICATION DU NOM DE L'ÉVÉNEMENT (SI AUTRE EVENEMENT)
  const updateOtherEventName = async () => {
    const nameForOtherEventToUpdate = fetch(`/eventRoute/updateOtherEventName?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `otherEventNameFromFront=${otherEventName}`
      }
    )
    setModifyOtherEventName(false)
  };

  //API MODIFICATION DE L'ANNÉE D'ÉDITION
  const updateYear = async () => {
    const yearToUpdate = await fetch(`/eventRoute/updateYear?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `yearFromFront=${year}`
      }
    );
    setModifyYear(false)
  };

  //API MODIFICATION DU TITRE DE L'EVENEMENT
  const updateTitle = async () => {
    const titleToUpdate = await fetch(`/eventRoute/updateTitle?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `titleFromFront=${title}`
      }
    );
    setModifyTitle(false)
  };

  //API MODIFICATION DU LA VILLE DE L'EVENEMENT
  const updateCity = async () => {
    const cityToUpdate = await fetch(`/eventRoute/updateCity?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `cityFromFront=${city}`
      }
    );
    setModifyCity(false)
  };

  //MODIFICATION DE LA SHORT DESCRIPTION DE L'ÉVÉNEMENT 
  const updateShortDescription = async () => {
    const descriptionToUpdate = await fetch(`/eventRoute/updateShortDescription?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `shortDescriptionFromFront=${shortDescription}`
      }
    );
    setModifyShortDescription(false)
  };

  //API MODIFICATION DE LA DESCRIPTION DE L'EVENEMENT
  const updateDescription = async () => {
    const descriptionToUpdate = await fetch(`/eventRoute/updateDescription?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `descriptionFromFront=${description}`
      }
    );
    setModifyDescription(false)
  };

  //API MODIFICATION DE L'ADDRESSE' DE L'EVENEMENT
  const updatePlace = async () => {
    const placeToUpdate = await fetch(`/eventRoute/updatePlace?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `placeFromFront=${place}`
      }
    );
    setModifyPlace(false)
  };

  //API MODIFICATION DE LA DATE DE DÉBUT DE L'EVENEMENT
  const updateStartDate = async () => {
    const startDateToUpdate = await fetch(`/eventRoute/updateStartDate?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `startDateFromFront=${startDate}`
      }
    );
    setModifyStartDate(false)
  };

  //API MODIFICATION DE LA DATE DE FIN DE L'EVENEMENT
  const updateEndDate = async () => {
    const endDateToUpdate = await fetch(`/eventRoute/updateEndDate?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `endDateFromFront=${endDate}`
      }
    );

    setModifyEndDate(false)
  };

  //API MODIFICATION DES TYPES DE TOURNOI
  const updateEventType = async () => {
    const eventTypeToUpdate = await fetch(`/eventRoute/updateEventType?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `eventTypeFromFront=${eventType}`
      }
    );
    setModifyEventType(false)
  };

  // ************************* API TOURNOI 1 *************************

  //API MODIFICATION DU FORMAT DU TOURNOI 1  👍
  const updateFormatTournament1 = async () => {
    const formatTournament1ToUpdate = await fetch(`/eventRoute/updateFormatTournament1?_id=${selectedEvent.tournament[0]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `formatTournament1FromFront=${formatTournament1}`
      }
    );
    setModifyFormatTournament1(false)
  };

  //API MODIFICATION DU NOMBRE DE JOUREURS PAR ÉQUIPE DU TOURNOI 1  👍
  const updatePlayersPerTeamTournament1 = async () => {
    const playersPerTeamTournament1ToUpdate = await fetch(`/eventRoute/updatePlayersPerTeamTournament1?_id=${selectedEvent.tournament[0]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `playersPerTeamTournament1FromFront=${playersPerTeamTournament1}`
      }
    );
    setModifyPlayersPerTeamTournament1(false)
  };

  //API MODIFICATION DU FORMAT D'ÉQUIPES DU TOURNOI 1  👍
  const updateTeamFormatTournament1 = async () => {
    const teamFormatTournament1ToUpdate = await fetch(`/eventRoute/updateTeamFormatTournament1?_id=${selectedEvent.tournament[0]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `teamFormatTournament1FromFront=${teamFormatTournament1}`
      }
    );

    setModifyTeamFormatTournament1(false)
  };

  //API MODIFICATION DE LA LIMITE DU NOMBRE LIMITE D'EQUIPES DU TOURNOI 1  👍
  const updateTeamsLimitedTournament1 = async () => {
    const teamsLimitedTournament1ToUpdate = await fetch(`/eventRoute/updateTeamsLimitedTournament1?_id=${selectedEvent.tournament[0]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `teamsLimitedTournament1FromFront=${teamsLimitedTournament1}`
      }
    );
    setModifyTeamsLimitedTournament1(false)
  };

  // ************************* API TOURNOI 2 *************************
  //API MODIFICATION DU FORMAT DU TOURNOI 2 👍
  const updateFormatTournament2 = async () => {
    const formatTournament2ToUpdate = await fetch(`/eventRoute/updateFormatTournament2?_id=${selectedEvent.tournament[1]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `formatTournament2FromFront=${formatTournament2}`
      }
    );
    setModifyFormatTournament2(false)
  };

  //API MODIFICATION DU NOMBRE DE JOUREURS PAR ÉQUIPE DU TOURNOI 2 👍
  const updatePlayersPerTeamTournament2 = async () => {
    const playersPerTeamTournament2ToUpdate = await fetch(`/eventRoute/updatePlayersPerTeamTournament2?_id=${selectedEvent.tournament[1]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `playersPerTeamTournament2FromFront=${playersPerTeamTournament2}`
      }
    );

    setModifyPlayersPerTeamTournament2(false)
  };

  //API MODIFICATION DU FORMAT D'ÉQUIPES DU TOURNOI 2 👍
  const updateTeamFormatTournament2 = async () => {
    const teamFormatTournament2ToUpdate = await fetch(`/eventRoute/updateTeamFormatTournament2?_id=${selectedEvent.tournament[1]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `teamFormatTournament2FromFront=${teamFormatTournament2}`
      }
    );
    setModifyTeamFormatTournament2(false)
  };

  //API MODIFICATION DE LA LIMITE DU NOMBRE LIMITE D'EQUIPES DU TOURNOI 2 👍
  const updateTeamsLimitedTournament2 = async () => {
    const teamsLimitedTournament2ToUpdate = await fetch(`/eventRoute/updateTeamsLimitedTournament2?_id=${selectedEvent.tournament[1]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `teamsLimitedTournament2FromFront=${teamsLimitedTournament2}`
      }
    );
    setModifyTeamsLimitedTournament2(false)
  };

  // ************************* API TOURNOI 3 *************************
  //API MODIFICATION DU FORMAT DU TOURNOI 3 👍
  const updateFormatTournament3 = async () => {
    const formatTournament3ToUpdate = await fetch(`/eventRoute/updateFormatTournament3?_id=${selectedEvent.tournament[2]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `formatTournament3FromFront=${formatTournament3}`
      }
    );
    setModifyFormatTournament3(false)
  };

  //API MODIFICATION DU NOMBRE DE JOUREURS PAR ÉQUIPE DU TOURNOI 3 👍
  const updatePlayersPerTeamTournament3 = async () => {
    const playersPerTeamTournament3ToUpdate = await fetch(`/eventRoute/updatePlayersPerTeamTournament3?_id=${selectedEvent.tournament[2]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `playersPerTeamTournament3FromFront=${playersPerTeamTournament3}`
      }
    );

    setModifyPlayersPerTeamTournament3(false)
  };

  //API MODIFICATION DE LA REGLE DE FORMATION DES ÉQUIPES DU TOURNOI 3 👍
  const updateTeamFormatTournament3 = async () => {
    const teamFormatTournament3ToUpdate = await fetch(`/eventRoute/updateTeamFormatTournament3?_id=${selectedEvent.tournament[2]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `teamFormatTournament3FromFront=${teamFormatTournament3}`
      }
    );

    setModifyTeamFormatTournament3(false)
  };

  //API MODIFICATION DE LA LIMITE DU NOMBRE LIMITE D'EQUIPES DU TOURNOI 3 👍
  const updateTeamsLimitedTournament3 = async () => {
    const nbrLimitedTeamsType3ToUpdate = await fetch(`/eventRoute/updateTeamsLimitedTournament3?_id=${selectedEvent.tournament[2]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `teamsLimitedTournament3FromFront=${teamsLimitedTournament3}`
      }
    );
    setModifyTeamsLimitedTournament3(false)
  };

  //API MODIFICATION DES FRAIS D'INSCRIPTION 👍
  const updateFees = async () => {
    const feesToUpdate = await fetch(`/eventRoute/updateFees?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `feesFromFront=${fees}`
      }
    )
    setModifyFees(false)
  };

  //API MODIFICATION DE L'INSCRIPTION (OUVERTE OU FERMÉ) 👍
  const handleActiveSubscription = () => {
    setSubscription(!selectedEvent.subscription)
  };
  const updateSubscription = async () => {
    const subscriptionToUpdate = await fetch(`/eventRoute/updateSubscription?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `subscriptionFromFront=${subscription}`
      }
    )
    setModifySubscription(false)
  };


  //MODIFICATION S'IL Y A UN REPAS OU NON 👍
  const handleActiveMenu = () => {
    if (selectedEvent.catering !== undefined) {
      setMenu(!selectedEvent.catering.menu)
    }
  };

  const updateMenu = async () => {
    await fetch(`/eventRoute/updateMenu?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `menuFromFront=${menu}`
      }
    )
    setModifyMenu(false)
  }

  //MODIFICATION DE LA PRESENCE D'UNE OFFRE DE BAR 👍
  const handleActiveBar = () => {
    if (selectedEvent.catering !== undefined) {
      setBar(!selectedEvent.catering.bar)
    }
  };

  const updateBar = async () => {
    const barToUpdate = await fetch(`/eventRoute/updateBar?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `barFromFront=${bar}`
      }
    )
    setModifyBar(false)
  };

  //MODIFICATION DE LA PRESENCE D'UNE OFFRE DE SNACK 👍
  const handleActiveSnack = () => {
    if (selectedEvent.catering !== undefined) {
      setSnack(!selectedEvent.catering.snack)
    }
  };

  const updateSnack = async () => {
    const snackToUpdate = await fetch(`/eventRoute/updateSnack?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `snackFromFront=${snack}`
      }
    )
    setModifySnack(false)
  };

  //MODIFICATION DE L'ENTRÉE DU REPAS 👍
  const updateStarter = async () => {
    await fetch(`/eventRoute/updateStarter?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `starterFromFront=${starter}`
      }
    )
    setModifyStarter(false)
  };

  //MODIFICATION DE LE PLAT PRINCIPAL DU REPAS 👍
  const updateMainCourse = async () => {
    await fetch(`/eventRoute/updateMainCourse?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `mainCourseFromFront=${mainCourse}`
      }
    )
    setModifyMainCourse(false)
  };

  //MODIFICATION DE LE DESSERT PRINCIPAL DU REPAS 👍
  const updateDessert = async () => {
    await fetch(`/eventRoute/updateDessert?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `dessertFromFront=${dessert}`
      }
    )
    setModifyDessert(false)
  };

  //MODIFICATION DE L'OFFRE DE BOISSON 👍
  const updateBeverage = async () => {
    const beverageToUpdate = await fetch(`/eventRoute/updateBeverage?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `beverageFromFront=${beverage}`
      }
    )
    setModifyBeverage(false)
  };

  //MODIFICATION DE L'OFFRE DE SNACK FROID 👍
  const updateColdFood = async () => {
    const coldFoodToUpdate = await fetch(`/eventRoute/updateColdFood?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `coldFoodFromFront=${coldFood}`
      }
    )
    setModifyColdFood(false)
  };

  //MODIFICATION DE L'OFFRE DE SNACK CHAUD 👍
  const updateHotFood = async () => {
    const hotFoodToUpdate = await fetch(`/eventRoute/updateHotFood?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `hotFoodFromFront=${hotFood}`
      }
    )
    setModifyHotFood(false)
  };

  //API MODIFICATION DE L'AFFICHE DE L'ÉVÉNEMENT
  // ANNUELER LA MODIFICATION DE L'AFFICHE
  const posterEditCancellation = () => {
    setModifyPoster(false);
    setPosterPreview("");
    setPosterSelected("")
  };
  // PRÉVISUALISATION DE LA NOUVELLE AFFICHE AVANT LA VALIDATION ET AVANT L'ENVOI SUR CLOUDINARY
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPosterPreview(URL.createObjectURL(e.target.files[0])) // prévisualisation de la nouvelle affiche 
      setPosterSelected(e.target.files[0]) // préparation à l'envoi de la nouvelle affiche sur Cloudinary
    }
  };

  //ENREGISTREMENT LA NOUVELLE AFFICHE DANS CLOUDINARY
  const uploadPosterToCloudinary = () => {

    const formData = new FormData();
    formData.append("file", posterSelected);
    formData.append("upload_preset", "gj6ckq1o");
    formData.append("cloud_name", "dummxlbjp");
    formData.append("folder", "events-pictures-folder");

    fetch(
      `https://api.cloudinary.com/v1_1/dummxlbjp/image/upload`, {
      method: "POST",
      body: formData
    })
      .then(resp => resp.json())
      .then(formData => {
        setPoster(formData.url);
        setPosterId(formData.public_id);
      })
      .catch(err => console.log(err))
  };

  const deleteCurrentPosterFromCloudinary = async () => {
    if (selectedEvent._id !== "") {
      await fetch(`/eventRoute/deleteCurrentPoster?_id=${selectedEvent._id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `eventIdFromFront=${selectedEvent._id}`
      });
    } else {
      console.log("*** Il n'y a pas d'affiche actuellement ***")
    }
  };

  //ENREGISTREMENT AUTOMATIQUE DE L'URL ET L'ID DE LA NOUVELLE AFFICHE DANS LE DOCUMENT DE L'EVENEMENT CONCERNÉ DANS MONGODB
  const updatePosterDataInMongoDB = async () => {
    const posterToUpdate = await fetch(`eventRoute/updatePoster?_id=${selectedEvent._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `posterFromFront=${poster}&posterIdFromFront=${posterId}`
      }
    )
    setModifyPoster(false);
  };

  useEffect(() => {
    if (poster !== "") {
      updatePosterDataInMongoDB()
    }
  }, [poster])

  //SUPPRIMER L'ANCIENNE AFFICHE ET ACTUALISER AVEC UNE NOUVELLE AFFICHE DANS CLOUDINARY
  const deleteFormerPosterAndUpdloadANewOne = () => {
    deleteCurrentPosterFromCloudinary();
    uploadPosterToCloudinary();
  }
  //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX AFFICHAGE DE L'ÉVÉNEMENT À MODIFIER XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  let eventToModify = <div />;

  if (selectedEvent !== undefined && selectedEventId !== "") {


    // NOM DE L'ÉVÉNEMENT
    const selectedEventName = selectedEvent.category === "Autre événement" ? <p className="black_text event_item">{selectedEvent.otherEventName} {selectedEvent.year}</p> : <p className="black_text event_item">{selectedEvent.category} {selectedEvent.year}</p>

    //MODIFICATION DE LA CATÉGORIE DE L'ÉVÉNEMENT
    const eventCategoryToModify = modifyCategory === true ? <select onChange={(e) => setCategory(e.target.value)} className="large_input" id="eventCategorySelect" name="eventCategorySelect" type="select" value={category} >
      <option hidden value="">{selectedEvent.category}</option>
      <option value="Animation estivale de Beach-Volley">Animation estivale de Beach-Volley</option>
      <option value="Beach-Volley V.B.L.C">Beach-Volley V.B.L.C</option>
      <option value="Fête du thon">Fête du thon</option>
      <option value="Finale B.L.V.B">Finale B.L.V.B</option>
      <option value="Forum des associations">Forum des associations</option>
      <option value="Sorties du club V.B.L.C">Sorties du club V.B.L.C</option>
      <option value="Tournoi Basko Beach">Tournoi Basko Beach</option>
      <option value="Tournoi de la rentrée">Tournoi de la rentrée</option>
      <option value="Tournoi des Fêtes">Tournoi des Fêtes</option>
      <option value="Tournoi du carnaval">Tournoi du carnaval</option>
    </select> : <p className="black_text event_item">{selectedEvent.category}</p>;

    const eventCategoryToModifyButton = modifyCategory === true ? <div className="button_frame">
      <button className="buttonInEditEvent validate_button" onClick={() => updateCategory()}>Valider</button>
      <button onClick={() => setModifyCategory(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyCategory(true)} >Modifier</button>;

    //MODIFICATION DU NOM DE L'ÉVENEMENT SI AUTRE ÉVÉNEMENT
    const otherEventNameToModify = modifyOtherEventName === true ? <input onChange={(e) => setOtherEventName(e.target.value)} className="large_input" id="nameForOtherEvent" name="nameForOtherEvent" type="text" defaultValue={selectedEvent.otherEventName} /> : selectedEvent.otherEventName !== "" ? <p className="black_text event_item">{selectedEvent.otherEventName}</p> : <p className="black_text event_item text_color_grey" >Non renseigné: non obligatoire</p>

    const otherEventNameToModifyButton = modifyOtherEventName === true ? <div className="button_frame">
      <button onClick={() => updateOtherEventName()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyOtherEventName(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyOtherEventName(true)} >Modifier</button>;

    //MODIFICATION DE L'ANNÉE D'ÉDITION
    const eventYearToModify = modifyYear === true ? <input onChange={(e) => setYear(e.target.value)} className="small_input" id="year" name="year" type="text" defaultValue={selectedEvent.year} /> : <p className="black_text event_item">{selectedEvent.year}</p>;
    const eventYearToModifyButton = modifyYear === true ? <div className="button_frame">
      <button onClick={() => updateYear()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyYear(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyYear(true)} >Modifier</button>;

    //MODIFICATION DU TITRE DE L'ÉVÉNEMENT
    const eventTitleToModify = modifyTitle === true ? <input onChange={(e) => setTitle(e.target.value.toUpperCase())} className="large_input" id="title" name="title" type="text" defaultValue={selectedEvent.title} /> : <p className="black_text event_item">{selectedEvent.title}</p>;
    const eventTitleToModifyButton = modifyTitle === true ? <div className="button_frame">
      <button onClick={() => updateTitle()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyTitle(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyTitle(true)} >Modifier</button>;

    //MODIFICATION DE LA VILLE OU A LIEU L'EVENEMENT
    const eventCityToModify = modifyCity === true ? <input onChange={(e) => setCity(e.target.value)} className="large_input" id="city" name="city" type="text" defaultValue={selectedEvent.city} /> : <p className="black_text event_item">{selectedEvent.city}</p>;
    const eventCityToModifyButton = modifyCity === true ? <div className="button_frame">
      <button onClick={() => updateCity()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyCity(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyCity(true)} >Modifier</button>;

    //MODIFICATION DE LA DESCRIPTION COURTE DE L'ÉVÉNEMENT
    const eventShortDescriptionToModify = modifyShortDescription === true ? <textarea onChange={(e) => setShortDescription(e.target.value)} className="extra_large_input" id="shortDescription" name="shortDescription" type="textarea" defaultValue={selectedEvent.shortDescription} /> : <p className="black_text large_event_item">{selectedEvent.shortDescription}</p>
    const eventShortDescriptionToModifyButton = modifyShortDescription === true ? <div className="button_frame">
      <button onClick={() => updateShortDescription()} className="buttonInEditEvent validate_button">Valider</button>
      <button onClick={() => setModifyShortDescription(false)} className="buttonInEditEvent cancel_button">Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyShortDescription(true)} >Modifier</button>;

    //MODIFICATION DE LA DESCRIPTION DE L'EVENEMENT
    const eventDescriptionToModify = modifyDescription === true ? <textarea onChange={(e) => setDescription(e.target.value)} className="extra_large_input tall_input" id="description" name="description" type="textarea" defaultValue={selectedEvent.description} /> : <p className="black_text large_event_item">{selectedEvent.description}</p>;
    const eventDescriptionToModifyButton = modifyDescription === true ? <div className="button_frame">
      <button onClick={() => updateDescription()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyDescription(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyDescription(true)} >Modifier</button>;

    //MODIFICATION DU LIEU DE L'EVENEMENT
    const eventPlaceToModify = modifyPlace === true ? <input onChange={(e) => setPlace(e.target.value)} className="large_input" id="place" name="place" defaultValue={selectedEvent.place} /> : <p className="black_text event_item">{selectedEvent.place}</p>;
    const eventPlaceToModifyButton = modifyPlace === true ? <div className="button_frame">
      <button onClick={() => updatePlace()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyPlace(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyPlace(true)} >Modifier</button>;

    //MODIFICATION DE LA DATE DE DÉBUT DE L'ÉVÉNEMENT
    const eventStartDateToModify = modifyStartDate === true ? <DatePicker className="medium_input" id="startDate" name="startDate"
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      locale="fr"
      showTimeSelect
      timeFormat="p"
      timeIntervals={30}
      dateFormat="Pp"
      showYearDropdown
      scrollableMonthYearDropdown /> : <p className="black_text event_item">
      {getFullWrittenDate(selectedEvent.startDate)} à {getHoursAndMinutes(selectedEvent.startDate)}
    </p>
    const eventStartDateToModifyButton = modifyStartDate === true ? <div className="button_frame">
      <button onClick={() => updateStartDate()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyStartDate(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyStartDate(true)} >Modifier</button>;


    //MODIFICATION DE LA DATE DE FIN DE L'ÉVÉNEMENT
    const eventEndDateToModify = modifyEndDate === true ? <DatePicker className="medium_input"
      showIcon
      value={selectedEvent.endDate}
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      locale="fr"
      showTimeSelect
      timeFormat="p"
      timeIntervals={30}
      dateFormat="Pp"
      showYearDropdown
      scrollableMonthYearDropdown /> : <p className="black_text event_item">
      {getFullWrittenDate(selectedEvent.endDate)} à {getHoursAndMinutes(selectedEvent.endDate)}
    </p>
    const eventEndDateToModifyButton = modifyEndDate === true ? <div className="button_frame">
      <button onClick={() => updateEndDate()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyEndDate(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyEndDate(true)} >Modifier</button>;

    //MODIFICATION DU TYPE D'ÉVÉNEMENT
    const eventTypeToModify = modifyEventType === true ? <select onChange={(e) => setEventType(e.target.value)} className="large_input" id="eventType" name="eventType" type="select" value={eventType} >
      <option hidden value="">Sélectionner</option>
      <option value="Événement avec inscription préalable">Événement avec inscription préalable</option>
      <option value="Événement sans inscription préalable">Événement sans inscription préalable</option>
      <option value="Tournoi avec inscription préalable">Tournoi avec inscription préalable</option>
      <option value="Tournoi sans inscription préalable">Tournoi sans inscription préalable</option>
    </select> : <p className="black_text event_item">{selectedEvent.eventType}</p>;
    const eventTypeToModifyButton = modifyEventType === true ? <div className="button_frame">
      <button className="buttonInEditEvent validate_button" onClick={() => updateEventType()}>Valider</button>
      <button onClick={() => setModifyEventType(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyEventType(true)} >Modifier</button>;

    //******************** TOURNOI ********************
    let tournamentToModify = <div />

    if (selectedEvent.eventType === "Tournoi avec inscription préalable") {

      //MODIFICATION DU TOURNOI 1
      //MODIFICATION DU FORMAT DU TOURNOI 1
      const tournament1FormatToModify = selectedEvent.tournament !== undefined ? <div className="section_subTitle">
        <label className="tournament_type_label">Tournoi 1:</label>
        {modifyFormatTournament1 === true ? <input onChange={(e) => setFormatTournament1(e.target.value)} className="small_input" id="type1" name="type1" type="text" defaultValue={selectedEvent.tournament[0].format} /> : <p className="black_text event_item">{selectedEvent.tournament[0].format}</p>}
      </div> : <div />

      const tournament1FormatToModifyButton = modifyFormatTournament1 === true ? <div className="button_frame">
        <button onClick={() => updateFormatTournament1()} className="buttonInEditEvent validate_button" >Valider</button>
        <button onClick={() => setModifyFormatTournament1(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
      </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyFormatTournament1(true)} >Modifier</button>;


      //MODIFICATION DU NOMBRE DE JOUEURS PAR ÉQUIPE DU TOURNOI 1
      const tournament1PlayersPerTeamToModify = selectedEvent.tournament !== undefined ? <div className="section_subTitle">
        <label className="tournament_type_label">Nombre de joueurs / équipe:</label>
        {modifyPlayersPerTeamTournament1 === true ? <input onChange={(e) => setPlayersPerTeamTournament1(e.target.value)} className="tiny_input" id="teamRuleType1" name="teamFormatTournament1" type="text" defaultValue={selectedEvent.tournament[0].playersPerTeam} /> : <p className="<black_text event_item">{selectedEvent.tournament[0].playersPerTeam}</p>}
      </div> : <div />

      const tournament1PlayersPerTeamToModifyButton = modifyPlayersPerTeamTournament1 === true ? <div className="button_frame">
        <button onClick={() => updatePlayersPerTeamTournament1()} className="buttonInEditEvent validate_button" >Valider</button>
        <button onClick={() => setModifyPlayersPerTeamTournament1(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
      </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyPlayersPerTeamTournament1(true)} >Modifier</button>;


      //MODIFICATION DU FORMAT D'ÉQUIPE DU TOURNOI 1
      const tournament1TeamFormatToModify = selectedEvent.tournament !== undefined ? <div className="section_subTitle">
        <label className="tournament_type_label">Format d'équipe:</label>
        {modifyTeamFormatTournament1 === true ? <input onChange={(e) => setTeamFormatTournament1(e.target.value)} className="medium_input" id="teamRuleType1" name="teamFormatTournament1" type="text" defaultValue={selectedEvent.tournament[0].teamFormat} /> : <p className="black_text event_item">{selectedEvent.tournament[0].teamFormat}</p>}
      </div> : <div />

      const tournament1TeamFormatToModifyButton = modifyTeamFormatTournament1 === true ? <div className="button_frame">
        <button onClick={() => updateTeamFormatTournament1()} className="buttonInEditEvent validate_button" >Valider</button>
        <button onClick={() => setModifyTeamFormatTournament1(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
      </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyTeamFormatTournament1(true)} >Modifier</button>;

      //MODIFICATION DE LA LIMITE DU NOMBRE D'ÉQUIPES PARTICIPANTES AU TOURNOI 1
      const tournament1TeamsLimitedToModify = selectedEvent.tournament !== undefined ? <div className="section_subTitle">
        <label className="tournament_type_label">Nbre d'équipe limité à:</label>
        {modifyTeamsLimitedTournament1 === true ? <input onChange={(e) => setTeamsLimitedTournament1(e.target.value)} className="tiny_input" id="nbrPlayersPerTeamType1" name="nbrPlayersPerTeamType1" type="text" defaultValue={selectedEvent.tournament[0].teamsLimited} /> : <p className="black_text event_item">{selectedEvent.tournament[0].teamsLimited}</p>}
      </div> : <div />

      const tournament1TeamsLimitedToModifyButton = modifyTeamsLimitedTournament1 === true ? <div className="button_frame">
        <button onClick={() => updateTeamsLimitedTournament1()} className="buttonInEditEvent validate_button" >Valider</button>
        <button onClick={() => setModifyTeamsLimitedTournament1(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
      </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyTeamsLimitedTournament1(true)} >Modifier</button>;

      //MODIFICATION DU TOURNOI 2 S'IL EXISTE !!!!! 

      //MODIFICATION DU FORMAT DU TOURNOI 2
      const tournament2FormatToModify = selectedEvent.tournament !== undefined && selectedEvent.tournament[1] ? <div className="section_subTitle">
        <label className="tournament_type_label">Tournoi 2:</label>
        {modifyFormatTournament2 === true ? <input onChange={(e) => setFormatTournament2(e.target.value)} className="small_input" id="type1" name="type1" type="text" defaultValue={selectedEvent.tournament[1].format} /> : <p className="black_text event_item">{selectedEvent.tournament[1].format}</p>}
      </div> : <div />

      const tournament2FormatToModifyButton = selectedEvent.tournament !== undefined && selectedEvent.tournament[1] ? <div className="button_frame">
        {modifyFormatTournament2 === true ? <div className="button_frame">
          <button onClick={() => updateFormatTournament2()} className="buttonInEditEvent validate_button" >Valider</button>
          <button onClick={() => setModifyFormatTournament2(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
        </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyFormatTournament2(true)} >Modifier</button>}
      </div> : <div />

      //MODIFICATION DU NOMBRE DE JOUEURS PAR ÉQUIPE DU TOURNOI 2
      const tournament2PlayersPerTeamToModify = selectedEvent.tournament !== undefined && selectedEvent.tournament[1] ? <div className="section_subTitle">
        <label className="tournament_type_label">Nombre de joueurs / équipe:</label>
        {modifyPlayersPerTeamTournament2 === true ? <input onChange={(e) => setPlayersPerTeamTournament2(e.target.value)} className="tiny_input" id="playersPerTeamType2" name="playersPerTeamType2" type="text" defaultValue={selectedEvent.tournament[1].playersPerTeam} /> : <p className="black_text event_item">{selectedEvent.tournament[1].playersPerTeam}</p>}
      </div> : <div />

      const tournament2PlayersPerTeamToModifyButton = selectedEvent.tournament !== undefined && selectedEvent.tournament[1] ? <div className="">
        {modifyPlayersPerTeamTournament2 === true ? <div className="button_frame">
          <button onClick={() => updatePlayersPerTeamTournament2()} className="buttonInEditEvent validate_button" >Valider</button>
          <button onClick={() => setModifyPlayersPerTeamTournament2(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
        </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyPlayersPerTeamTournament2(true)} >Modifier</button>}
      </div> : <div />

      //MODIFICATION DU FORMAT D'ÉQUIPE DU TOURNOI 2
      const tournament2TeamFormatToModify = selectedEvent.tournament !== undefined && selectedEvent.tournament[1] ? <div className="section_subTitle">
        <label className="tournament_type_label">Format d'équipe:</label>
        {modifyTeamFormatTournament2 === true ? <input onChange={(e) => setTeamFormatTournament2(e.target.value)} className="medium_input" id="teamRuleType2" name="teamFormatTournament2" type="text" defaultValue={selectedEvent.tournament[1].teamFormat} /> : <p className="black_text event_item">{selectedEvent.tournament[1].teamFormat}</p>}
      </div> : <div />

      const tournament2TeamFormatToModifyButton = selectedEvent.tournament !== undefined && selectedEvent.tournament[1] ? <div>
        {modifyTeamFormatTournament2 === true ? <div className="button_frame">
          <button onClick={() => updateTeamFormatTournament2()} className="buttonInEditEvent validate_button" >Valider</button>
          <button onClick={() => setModifyTeamFormatTournament2(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
        </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyTeamFormatTournament2(true)} >Modifier</button>}
      </div> : <div />

      //MODIFICATION DE LA LIMITE DU NOMBRE D'ÉQUIPES PARTICIPANTES AU TOURNOI 2
      const tournament2TeamsLimitedToModify = selectedEvent.tournament !== undefined && selectedEvent.tournament[1] ? <div className="section_subTitle">
        <label className="tournament_type_label">Nbre d'équipe limité à:</label>
        {modifyTeamsLimitedTournament2 === true ? <input onChange={(e) => setTeamsLimitedTournament2(e.target.value)} className="tiny_input" id="teamsLimitedType2" name="teamsLimitedType2" type="text" defaultValue={selectedEvent.tournament[1].teamsLimited} /> : <p className="black_text event_item">{selectedEvent.tournament[1].teamsLimited}</p>}
      </div> : <div />

      const tournament2TeamsLimitedToModifyButton = selectedEvent.tournament !== undefined && selectedEvent.tournament[1] ? <div>
        {modifyTeamsLimitedTournament2 === true ? <div className="button_frame">
          <button onClick={() => updateTeamsLimitedTournament2()} className="buttonInEditEvent validate_button" >Valider</button>
          <button onClick={() => setModifyTeamsLimitedTournament2(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
        </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyTeamsLimitedTournament2(true)} >Modifier</button>}
      </div> : <div />


      //MODIFICATION DU TOURNOI 3 S'IL EXISTE !!!!! 

      //MODIFICATION DU FORMAT DU TOURNOI 3
      const tournament3FormatToModify = selectedEvent.tournament !== undefined && selectedEvent.tournament[2] ? <div className="section_subTitle">
        <label className="tournament_type_label">Tournoi 3:</label>
        {modifyFormatTournament3 === true ? <input onChange={(e) => setFormatTournament3(e.target.value)} className="small_input" id="type1" name="type1" type="text" defaultValue={selectedEvent.tournament[2].format} /> : <p className="black_text event_item">{selectedEvent.tournament[2].format}</p>}
      </div> : <div />

      const tournament3FormatToModifyButton = selectedEvent.tournament !== undefined && selectedEvent.tournament[2] ? <div className="button_frame">
        {modifyFormatTournament3 === true ? <div className="button_frame">
          <button onClick={() => updateFormatTournament3()} className="buttonInEditEvent validate_button" >Valider</button>
          <button onClick={() => setModifyFormatTournament3(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
        </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyFormatTournament3(true)} >Modifier</button>}
      </div> : <div />

      //MODIFICATION DU NOMBRE DE JOUEURS PAR ÉQUIPE DU TOURNOI 3
      const tournament3PlayersPerTeamToModify = selectedEvent.tournament !== undefined && selectedEvent.tournament[2] ? <div className="section_subTitle">
        <label className="tournament_type_label">Nombre de joueurs / équipe:</label>
        {modifyPlayersPerTeamTournament3 === true ? <input onChange={(e) => setPlayersPerTeamTournament3(e.target.value)} className="tiny_input" id="playersPerTeamType3" name="playersPerTeamType3" type="text" defaultValue={selectedEvent.tournament[2].playersPerTeam} /> : <p className="black_text event_item">{selectedEvent.tournament[2].playersPerTeam}</p>}
      </div> : <div />

      const tournament3PlayersPerTeamToModifyButton = selectedEvent.tournament !== undefined && selectedEvent.tournament[2] ? <div className="">
        {modifyPlayersPerTeamTournament3 === true ? <div className="button_frame">
          <button onClick={() => updatePlayersPerTeamTournament3()} className="buttonInEditEvent validate_button" >Valider</button>
          <button onClick={() => setModifyPlayersPerTeamTournament3(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
        </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyPlayersPerTeamTournament3(true)} >Modifier</button>}
      </div> : <div />

      //MODIFICATION DU FORMAT D'ÉQUIPE DU TOURNOI 3
      const tournament3TeamFormatToModify = selectedEvent.tournament !== undefined && selectedEvent.tournament[2] ? <div className="section_subTitle">
        <label className="tournament_type_label">Format d'équipe:</label>
        {modifyTeamFormatTournament3 === true ? <input onChange={(e) => setTeamFormatTournament3(e.target.value)} className="medium_input" id="teamRuleType3" name="teamFormatTournament3" type="text" defaultValue={selectedEvent.tournament[2].teamFormat} /> : <p className="black_text event_item">{selectedEvent.tournament[2].teamFormat}</p>}
      </div> : <div />

      const tournament3TeamFormatToModifyButton = selectedEvent.tournament !== undefined && selectedEvent.tournament[2] ? <div>
        {modifyTeamFormatTournament3 === true ? <div className="button_frame">
          <button onClick={() => updateTeamFormatTournament3()} className="buttonInEditEvent validate_button" >Valider</button>
          <button onClick={() => setModifyTeamFormatTournament3(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
        </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyTeamFormatTournament3(true)} >Modifier</button>}
      </div> : <div />

      //MODIFICATION DE LA LIMITE DU NOMBRE D'ÉQUIPES PARTICIPANTES AU TOURNOI 3
      const tournament3TeamsLimitedToModify = selectedEvent.tournament !== undefined && selectedEvent.tournament[2] ? <div className="section_subTitle">
        <label className="tournament_type_label">Nbre d'équipe limité à:</label>
        {modifyTeamsLimitedTournament3 === true ? <input onChange={(e) => setTeamsLimitedTournament3(e.target.value)} className="tiny_input" id="teamsLimitedType3" name="teamsLimitedType3" type="text" defaultValue={selectedEvent.tournament[2].teamsLimited} /> : <p className="black_text event_item">{selectedEvent.tournament[2].teamsLimited}</p>}
      </div> : <div />

      const tournament3TeamsLimitedToModifyButton = selectedEvent.tournament !== undefined && selectedEvent.tournament[2] ? <div>
        {modifyTeamsLimitedTournament3 === true ? <div className="button_frame">
          <button onClick={() => updateTeamsLimitedTournament3()} className="buttonInEditEvent validate_button" >Valider</button>
          <button onClick={() => setModifyTeamsLimitedTournament3(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
        </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyTeamsLimitedTournament3(true)} >Modifier</button>}
      </div> : <div />

      tournamentToModify = <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Types de tournoi:</label>
        <div>
          <div className="tournament_data">
            <div className="tournament_items_to_modify">
              {tournament1FormatToModify}
              {tournament1FormatToModifyButton}
            </div>
            <div>
              <div className="tournament_items_to_modify">
                {tournament1PlayersPerTeamToModify}
                {tournament1PlayersPerTeamToModifyButton}
              </div>
              <div className="tournament_items_to_modify">
                {tournament1TeamFormatToModify}
                {tournament1TeamFormatToModifyButton}
              </div>
              <div className="tournament_items_to_modify">
                {tournament1TeamsLimitedToModify}
                {tournament1TeamsLimitedToModifyButton}
              </div>
            </div>
          </div>
          <div className="tournament_data">
            <div className="tournament_items_to_modify">
              {tournament2FormatToModify}
              {tournament2FormatToModifyButton}
            </div>
            <div>
              <div className="tournament_items_to_modify">
                {tournament2PlayersPerTeamToModify}
                {tournament2PlayersPerTeamToModifyButton}
              </div>
              <div className="tournament_items_to_modify">
                {tournament2TeamFormatToModify}
                {tournament2TeamFormatToModifyButton}
              </div>
              <div className="tournament_items_to_modify">
                {tournament2TeamsLimitedToModify}
                {tournament2TeamsLimitedToModifyButton}
              </div>
            </div>
          </div>
          <div className="tournament_data">
            <div className="tournament_items_to_modify">
              {tournament3FormatToModify}
              {tournament3FormatToModifyButton}
            </div>
            <div>
              <div className="tournament_items_to_modify">
                {tournament3PlayersPerTeamToModify}
                {tournament3PlayersPerTeamToModifyButton}
              </div>
              <div className="tournament_items_to_modify">
                {tournament3TeamFormatToModify}
                {tournament3TeamFormatToModifyButton}
              </div>
              <div className="tournament_items_to_modify">
                {tournament3TeamsLimitedToModify}
                {tournament3TeamsLimitedToModifyButton}
              </div>
            </div>
          </div>
        </div>
      </div>
    } else if (selectedEvent.eventType === "Événement avec inscription préalable" || selectedEvent.eventType === "Événement sans inscription préalable" || selectedEvent.eventType === "Tournoi sans inscription préalable") {
      tournamentToModify = <div />
    };

    //MODIFICATION DES FRAIS DE PARTICIPATION
    const eventFeesToModify = modifyFees === true ? <input onChange={(e) => setFees(e.target.value)} className="small_input" id="fees" name="fees" defaultValue={selectedEvent.fees} /> : <p className="black_text event_item">{selectedEvent.fees} € / joueur</p>;
    const eventFeesToModifyButton = modifyFees === true ? <div className="button_frame">
      <button onClick={() => updateFees()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyFees(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyFees(true)} >Modifier</button>;


    //MODIFICATION DES FRAIS DE L'OUVERTURE DES INSCRIPTION
    const eventSubscriptionToModify = modifySubscription === true ? <div className="subscription_section">
      <label>Ouverture des inscriptions:</label>
      <input onChange={(e) => handleActiveSubscription()} type="checkbox" className="input" defaultChecked={selectedEvent.subscription} />
    </div> : selectedEvent.subscription === true ? <p className="black_text event_item">Ouverte</p> : <p className="black_text event_item">Fermée</p>
    const eventSubscriptionToModifyButton = modifySubscription === true ? <div className="button_frame">
      <button onClick={() => updateSubscription()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifySubscription(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifySubscription(true)} >Modifier</button>


    //MODIFICATION DU TYPE D'OFFRES DE RESTAURATION LORS DES TOURNOIS OU DES ÉVÉNEMENTS (DES CHECKBOX A COCHER)
    const eventMenuToModify = selectedEvent.catering !== undefined ? <div className="section_subTitle">
      <label className="black_text">Repas:</label>
      {modifyMenu === true ? <div className="subscription_section">
        <input onChange={(e) => handleActiveMenu()} className="input" id="menu-checkbox" name="menu-checkbox" type="checkbox" defaultChecked={selectedEvent.catering.menu} />
      </div> : selectedEvent.catering.menu === true ? <p className="black_text event_item">Oui</p> : <p className="black_text event_item">Non</p>}
    </div> : <div />;
    const eventMenuToModifyButton = modifyMenu === true ? <div className="button_frame">
      <button onClick={() => updateMenu()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyMenu(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyMenu(true)} >Modifier</button>;

    const eventBarToModify = selectedEvent.catering !== undefined ? <div className="section_subTitle">
      <label className="black_text">Buvette:</label>
      {modifyBar === true ? <div className="subscription_section">
        <input onChange={(e) => handleActiveBar()} type="checkbox" className="input" defaultChecked={selectedEvent.catering.bar} />
      </div> : selectedEvent.catering.bar === true ? <p className="black_text event_item">Oui</p> : <p className="black_text event_item">Non</p>}
    </div> : <div />;
    const eventBarToModifyButton = modifyBar === true ? <div className="button_frame">
      <button onClick={() => updateBar()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyBar(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyBar(true)} >Modifier</button>;

    const eventSnackToModify = selectedEvent.catering !== undefined ? <div className="section_subTitle">
      <label className="black_text">Snack:</label>
      {modifySnack === true ? <div className="subscription_section">
        <input onChange={(e) => handleActiveSnack()} type="checkbox" className="input" defaultChecked={selectedEvent.catering.snack} />
      </div> : selectedEvent.catering.snack === true ? <p className="black_text event_item">Oui</p> : <p className="black_text event_item">Non</p>}
    </div> : <div />;
    const eventSnackToModifyButton = modifySnack === true ? <div className="button_frame">
      <button onClick={() => updateSnack()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifySnack(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifySnack(true)} >Modifier</button>;

    //MODIFICATION DU DESCRIPTIF DES OFFRES DE RESTAURATION LORS DES TOURNOIS OU DES ÉVÉNEMENTS (INPUT TEXTE)
    //STARTER
    const eventStarterToModify = selectedEvent.catering !== undefined ? <div className="section_subTitle">
      <label className="black_text service_title">Entrée / Tapas:</label>
      {modifyStarter === true ? <textarea onChange={(e) => setStarter(e.target.value)} className="large_input" id="starter" name="starter" type="textarea" defaultValue={selectedEvent.catering.starter} /> : <p className="event_data_catering">{selectedEvent.catering.starter}</p>}
    </div> : <div />;

    const eventStarterToModifyButton = modifyStarter === true ? <div className="button_frame">
      <button onClick={() => updateStarter()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyStarter(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyStarter(true)} >Modifier</button>;

    //PLAT PRINCIPAL
    const eventMainCourseToModify = selectedEvent.catering !== undefined ? <div className="section_subTitle">
      <label className="black_text service_title">Plat principal</label>
      {modifyMainCourse === true ? <textarea onChange={(e) => setMainCourse(e.target.value)} className="large_input" id="mainCourse" name="mainCourse" type="textarea" defaultValue={selectedEvent.catering.mainCourse} /> : <p className="event_data_catering">{selectedEvent.catering.mainCourse}</p>}
    </div> : <div />;

    const eventMainCourseToModifyButton = modifyMainCourse === true ? <div className="button_frame">
      <button onClick={() => updateMainCourse()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyMainCourse(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyMainCourse(true)} >Modifier</button>;


    //DESSERT
    const eventDessertToModify = selectedEvent.catering !== undefined ? <div className="section_subTitle">
      <label className="black_text service_title">Dessert</label>
      {modifyDessert === true ? <textarea onChange={(e) => setDessert(e.target.value)} className="large_input" id="dessert" name="dessert" type="textarea" defaultValue={selectedEvent.catering.dessert} /> : <p className="event_data_catering">{selectedEvent.catering.dessert}</p>}
    </div> : <div />;

    const eventDessertToModifyButton = modifyDessert === true ? <div className="button_frame">
      <button onClick={() => updateDessert()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyDessert(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyDessert(true)} >Modifier</button>;


    //BEVERAGE
    const eventBeverageToModify = selectedEvent.catering !== undefined ? <div className="section_subTitle">
      <label className="black_text service_title">Boisson:</label>
      {modifyBeverage === true ? <textarea onChange={(e) => setBeverage(e.target.value)} className="large_input" id="beverage" name="beverage" type="textarea" defaultValue={selectedEvent.catering.beverage} /> : <p className="event_data_catering">{selectedEvent.catering.beverage}</p>}
    </div> : <div />;

    const eventBeverageToModifyButton = modifyBeverage === true ? <div className="button_frame">
      <button onClick={() => updateBeverage()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyBeverage(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyBeverage(true)} >Modifier</button>;

    //COLD FOOD
    const eventColdFoodToModify = selectedEvent.catering !== undefined ? <div className="section_subTitle">
      <label className="black_text service_title">Restauration froide:</label>
      {modifyColdFood === true ? <textarea onChange={(e) => setColdFood(e.target.value)} className="large_input" id="eventColdFood" name="eventColdFood" type="textarea" defaultValue={selectedEvent.catering.coldFood} /> : <p className="event_data_catering">{selectedEvent.catering.coldFood}</p>}
    </div> : <div />;
    const eventColdFoodToModifyButton = modifyColdFood === true ? <div className="button_frame">
      <button onClick={() => updateColdFood()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyColdFood(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyColdFood(true)} >Modifier</button>;

    //HOT FOOD
    const eventHotFoodToModify = selectedEvent.catering !== undefined ? <div className="section_subTitle">
      <label className="black_text service_title">Restauration chaude:</label>
      {modifyHotFood === true ? <textarea onChange={(e) => setHotFood(e.target.value)} className="large_input" id="eventHotFood" name="eventHotFood" type="textarea" defaultValue={selectedEvent.catering.hotFood} /> : <p className="event_data_catering">{selectedEvent.catering.hotFood}</p>}
    </div> : <div />;
    const eventHotFoodToModifyButton = modifyHotFood === true ? <div className="button_frame">
      <button onClick={() => updateHotFood()} className="buttonInEditEvent validate_button" >Valider</button>
      <button onClick={() => setModifyHotFood(false)} className="buttonInEditEvent cancel_button" >Annuler</button>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyHotFood(true)} >Modifier</button>;

    // MODIFICATION DE L'AFFICHE DE L'ÉVÉNEMENT

    const eventPosterToModify = modifyPoster === true ? <div className="display_image">
      {posterPreview !== "" ? <img className="poster_display" width={100} height={150} src={posterPreview} alt='' /> : selectedEvent.poster !== "" && selectedEvent.poster !== null ? <img className="poster_display" width={100} height={150} src={selectedEvent.poster} alt='' /> : <div />}
      <input className="upload_button"
        onChange={onImageChange}
        // onChange={(e) => setPosterSelected(e.target.files[0])}
        id="poster"
        accept=".png, .jpeg, .jpg"
        name="file"
        type="file"
      />
    </div> : <div className="display_image">
      {selectedEvent.poster !== "" && selectedEvent.poster !== null ? <img className="poster_display" width={100} height={150} src={selectedEvent.poster} alt='' /> : <div />}
    </div>
    const eventPosterToModifyButton = modifyPoster === true ? <div>
      <div className="button_frame">
        <button onClick={() => deleteFormerPosterAndUpdloadANewOne()} className="buttonInEditEvent validate_button" >Valider</button>
        <button onClick={() => posterEditCancellation()} className="buttonInEditEvent cancel_button" >Annuler</button>
      </div>
    </div> : <button className="buttonInEditEvent modify" onClick={() => setModifyPoster(true)} >Modifier</button>;



    eventToModify = <div>
      <p className="black_text section_big_title">L'événement à modifier:</p>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">L'événement:</label>
        {selectedEventName}
      </div>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Catégorie de l'événement:</label>
        {eventCategoryToModify}
        {eventCategoryToModifyButton}
      </div>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Nom de l'événènement:</label>
        {otherEventNameToModify}
        {otherEventNameToModifyButton}
      </div>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Année d'édition:</label>
        {eventYearToModify}
        {eventYearToModifyButton}
      </div>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Title de l'événement:</label>
        {eventTitleToModify}
        {eventTitleToModifyButton}
      </div>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Ville où se déroule l'événement:</label>
        {eventCityToModify}
        {eventCityToModifyButton}
      </div>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Description courte de l'éVénement:</label>
        {eventShortDescriptionToModify}
        {eventShortDescriptionToModifyButton}
      </div>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Description de l'événement:</label>
        {eventDescriptionToModify}
        {eventDescriptionToModifyButton}
      </div>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Lieu / adresse de l'événement:</label>
        {eventPlaceToModify}
        {eventPlaceToModifyButton}
      </div>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">L'événement commence le:</label>
        {eventStartDateToModify}
        {eventStartDateToModifyButton}
      </div>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">L'événement se termine le:</label>
        {eventEndDateToModify}
        {eventEndDateToModifyButton}
      </div>
      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Type d'événement:</label>
        {eventTypeToModify}
        {eventTypeToModifyButton}
      </div>

      {tournamentToModify}

      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Frais de participation:</label>
        {eventFeesToModify}
        {eventFeesToModifyButton}
      </div>

      <div className="each_item_to_modify">
        <div className="black_text edit_event_item_subsection">
          <p className="black_text">Ouverture des inscriptions:</p>
          <p check className="checkbox_label_small">Coché: Ouverte / décoché: Fermée</p>
        </div>
        {eventSubscriptionToModify}
        {eventSubscriptionToModifyButton}
      </div>

      <div className="each_item_to_modify">
        <div className="black_text edit_event_item_subsection">
          <p className="black_text">Restauration:</p>
          <p check className="checkbox_label_small">Coché: Oui / décoché: Non</p>
        </div>
        <div className="row">
          <div className="row">
            {eventMenuToModify}
            {eventMenuToModifyButton}
          </div>
          <div className="row">
            {eventBarToModify}
            {eventBarToModifyButton}
          </div>
          <div className="row">
            {eventSnackToModify}
            {eventSnackToModifyButton}
          </div>
        </div>
      </div>

      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Détail restauration:</label>
        <div>
          <div className="display_catering_data_frame">
            {eventStarterToModify}
            {eventStarterToModifyButton}
          </div>
          <div className="display_catering_data_frame">
            {eventMainCourseToModify}
            {eventMainCourseToModifyButton}
          </div>
          <div className="display_catering_data_frame">
            {eventDessertToModify}
            {eventDessertToModifyButton}
          </div>
          <div className="display_catering_data_frame">
            {eventBeverageToModify}
            {eventBeverageToModifyButton}
          </div>
          <div className="display_catering_data_frame">
            {eventColdFoodToModify}
            {eventColdFoodToModifyButton}
          </div>
          <div className="display_catering_data_frame">
            {eventHotFoodToModify}
            {eventHotFoodToModifyButton}
          </div>
        </div>
      </div>

      <div className="each_item_to_modify">
        <label className="black_text edit_event_item_subsection">Affiche de l'événement:</label>
        {eventPosterToModify}
        {eventPosterToModifyButton}
      </div>
    </div>
  } else {
    eventToModify = <div>
      <p className="black_text">Aucun événement n'a été sélectionné</p>
    </div>
  };


  return (
    <div className="bo_edit_events_big_frame" >
      <p className="red_title">Modifier un événement</p>
      <div className="events_cards_frame">
        <p className="black_text section_big_title">Pour modifier un événement, sélectionner l'année de l'événement puis cliquer sur l'événement à modifier:</p>
        {filterByEditionYear}
        <div className="events_cards_display">
          {eventsCards}
        </div>
      </div>
      <div className="edit_big_frame">
        {eventToModify}
      </div>
    </div>
  )
};

export default EditeEvents;
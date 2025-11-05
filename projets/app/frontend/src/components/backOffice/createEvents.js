import { useState, useEffect } from "react";
import "../../styles/backOffice/createEvents.css";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from 'date-fns/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';
// import 'react-time-picker/dist/TimePicker.css'
// import 'react-clock/dist/Clock.css';
// import Axios from "axios";

registerLocale('fr', fr);

function CreateEvents() {

  const [category, setCategory] = useState("");
  const [nameForOtherEventCategory, setNameForOtherEventCategory] = useState("")
  const [eventType, setEventType] = useState("")
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [shortDescription, setShortDescription] = useState("")
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [fees, setFees] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [poster, setPoster] = useState("");
  const [posterId, setPosterId] = useState("");



  const [formatTournament1, setFormatTournament1] = useState("");
  const [playersPerTeamTournament1, setPlayersPerTeamTournament1] = useState("")
  const [teamFormatTournament1, setTeamFormatTournament1] = useState("");
  const [teamsLimitedTournament1, setTeamsLimitedTournament1] = useState("")

  const [formatTournament2, setFormatTournament2] = useState("");
  const [playersPerTeamTournament2, setPlayersPerTeamTournament2] = useState("")
  const [teamFormatTournament2, setTeamFormatTournament2] = useState("");
  const [teamsLimitedTournament2, setTeamsLimitedTournament2] = useState("")

  const [formatTournament3, setFormatTournament3] = useState("");
  const [playersPerTeamTournament3, setPlayersPerTeamTournament3] = useState("");
  const [teamFormatTournament3, setTeamFormatTournament3] = useState("");
  const [teamsLimitedTournament3, setTeamsLimitedTournament3] = useState("")

  const [bar, setBar] = useState(false);
  const [beverage, setBeverage] = useState("");

  const [snack, setSnack] = useState(false);
  const [coldFood, setColdFood] = useState("");
  const [hotFood, setHotFood] = useState("");

  const [menu, setMenu] = useState(false)
  const [starter, setStarter] = useState("");
  const [mainCourse, setMainCourse] = useState("");
  const [dessert, setDessert] = useState("");


  const [listSuccesEventCreation, setListSuccessEventCreation] = useState([]);
  const [listErrorEventCreation, setListErrorEventCreation] = useState([]);

  const [posterPreview, setPosterPreview] = useState("");

  //FOR CLOUDINARY
  const [posterSelected, setPosterSelected] = useState("");

  const sectionLine = <div className="event_creation_tournament_section_line">
    <div className="tournament_section_line" />
  </div>

  //FONCTION POUR ACTIVER L'INSCRIPTION
  const handleActivateSubscription = () => {
    setSubscription(!subscription)
  };


  //ENREGISTREMENT DES DONNÉES DE LA CREATION DE L'ÉVÉNEMENT DANS LA BASE MEDIA CLOUDINARY PUIS DANS LA BASE DE DONNÉES MONGODB

  // Prévisualisation et préparation de l'affiche à uploader dans Cloudinary
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPosterPreview(URL.createObjectURL(event.target.files[0])) // prévisualisation
      setPosterSelected(event.target.files[0]) // préparation à l'enregistrement sur cloudinary
    }
  };

  // Upload du poster dans Cloudinary et obtenir l'url et l'id du poster
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

  //Dans la base des media Cloudinary
  const handleSubmitEventCreation = () => {
    uploadPosterToCloudinary()
  };

  //Dans la base de données MongoDB de manière automatique des que la base des media aura fournir l'url et l'id du poster
  useEffect(() => {
    if (poster !== "" && posterId !== "") {
      uploadEventCreationDatasToMongoDB()
    }
  }, [poster]);

  //Fonction de soumission du formulaire dans MongoDB
  const uploadEventCreationDatasToMongoDB = async () => {
    const eventDataToCreate = await fetch('/eventRoute/createEvent', {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `categoryFromFront=${category}&nameForOtherEventCategoryFromFront=${nameForOtherEventCategory}&yearFromFront=${year}&titleFromFront=${title}&cityFromFront=${city}&startDateFromFront=${startDate}&endDateFromFront=${endDate}&shortDescriptionFromFront=${shortDescription}&descriptionFromFront=${description}&placeFromFront=${place}&feesFromFront=${fees}&posterFromFront=${poster}&posterIdFromFront=${posterId}&subscriptionFromFront=${subscription}&eventTypeFromFront=${eventType}&formatTournament1FromFront=${formatTournament1}&playersPerTeamTournament1FromFront=${playersPerTeamTournament1}&teamFormatTournament1FromFront=${teamFormatTournament1}&teamsLimitedTournament1FromFront=${teamsLimitedTournament1}&formatTournament2FromFront=${formatTournament2}&playersPerTeamTournament2FromFront=${playersPerTeamTournament2}&teamFormatTournament2FromFront=${teamFormatTournament2}&teamsLimitedTournament2FromFront=${teamsLimitedTournament2}&formatTournament3FromFront=${formatTournament3}&playersPerTeamTournament3FromFront=${playersPerTeamTournament3}&teamFormatTournament3FromFront=${teamFormatTournament3}&teamsLimitedTournament3FromFront=${teamsLimitedTournament3}&menuFromFront=${menu}&barFromFront=${bar}&snackFromFront=${snack}&starterFromFront=${starter}&mainCourseFromFront=${mainCourse}&dessertFromFront=${dessert}&beverageFromFront=${beverage}&coldFoodFromFront=${coldFood}&hotFoodFromFront=${hotFood}`
    });

    const body = await eventDataToCreate.json();

    if (body.result === true) {
      setCategory("");
      setNameForOtherEventCategory("");
      setYear("");
      setTitle("");
      setCity("");
      setStartDate("");
      setEndDate("");
      setShortDescription("")
      setDescription("");
      setPlace("");
      setFees("");
      setPoster("")
      setPosterId("")
      setPosterSelected("")
      setPosterPreview("")
      setSubscription(false)
      setEventType("")

      setFormatTournament1("");
      setPlayersPerTeamTournament1("");
      setTeamFormatTournament1("")
      setTeamsLimitedTournament1("")

      setFormatTournament2("");
      setPlayersPerTeamTournament2("");
      setTeamFormatTournament2("");
      setTeamsLimitedTournament2("")

      setFormatTournament3("");
      setPlayersPerTeamTournament3("");
      setTeamFormatTournament3("");
      setTeamsLimitedTournament3("")

      setBar(false)
      setSnack(false)
      setBeverage("");
      setColdFood("");
      setHotFood("");
      setMenu(false);
      setStarter("");
      setMainCourse("");
      setDessert("");

      setListErrorEventCreation([]);
      setListSuccessEventCreation(body.success);
    } else {
      setListSuccessEventCreation([]);
      setListErrorEventCreation(body.error)
    }

  };

  const tabSuccessEventCreation = listSuccesEventCreation.map((success, i) => {
    return (<p style={{ color: "green" }}>{success}</p>)
  });
  const tabErrorEventCreation = listErrorEventCreation.map((error, i) => {
    return (<p style={{ color: "red" }}>{error}</p>)
  });

  const tournamentDetails = <div>
    <div className="create_event_form_group">
      <p className="black_text title_frame_width" >Types de tournoi: </p>
      <div className="input_frame_width">
        <div className="tournament_types_frame">
          <FormGroup className="tournament_types">
            <Label htmlFor="tournamentType1" >Tournoi 1:</Label>
            <Input onChange={(e) => setFormatTournament1(e.target.value)} value={formatTournament1} className="input small_width_input" placeholder="3x3 mixte" type="text" id="tournamentType1" name="tournamentType1" />
          </FormGroup>
          <div>
            <FormGroup className="tournament_types margin_block">
              <Label htmlFor="tournamentType1NbrPlayers" >Nbr de joueurs / équipe:</Label>
              <Input onChange={(e) => setPlayersPerTeamTournament1(e.target.value)} value={playersPerTeamTournament1} className="input tiny_width_input" placeholder="3" type="number" id="tournamentType1NbrPlayers" name="tournamentType1NbrPlayers" />
            </FormGroup>
            <FormGroup className="tournament_types margin_block">
              <Label htmlFor="tournamentType1TeamRules" >Formation d'équipe:</Label>
              <Input onChange={(e) => setTeamFormatTournament1(e.target.value)} value={teamFormatTournament1} className="input large_width_input" placeholder="Obligatoirement mixte." type="text" id="tournamentType1TeamRules" name="tournamentType1TeamRules" />
            </FormGroup>
            <FormGroup className="tournament_types margin_block">
              <Label htmlFor="tournamentType1LimitedTeams" >Nbr d'équipes limité à:</Label>
              <Input onChange={(e) => setTeamsLimitedTournament1(e.target.value)} value={teamsLimitedTournament1} className="input tiny_width_input" placeholder="8" type="number" id="tournamentType1LimitedTeams" name="tournamentType1LimitedTeams" />
            </FormGroup>
          </div>
        </div>
        {sectionLine}
        <div className="tournament_types_frame">
          <FormGroup className="tournament_types">
            <Label htmlFor="tournamentType2" >Tournoi 2:</Label>
            <Input onChange={(e) => setFormatTournament2(e.target.value)} value={formatTournament2} className="input small_width_input" placeholder="2x2 filles" type="text" id="tournamentType2" name="tournamentType2" />
          </FormGroup>
          <div>
            <FormGroup className="tournament_types margin_block">
              <Label htmlFor="tournamentType2NbrPlayers" >Nbr de joueurs / équipe:</Label>
              <Input onChange={(e) => setPlayersPerTeamTournament2(e.target.value)} value={playersPerTeamTournament2} className="input tiny_width_input" placeholder="3" type="number" id="tournamentType2NbrPlayers" name="tournamentType2NbrPlayers" />
            </FormGroup>
            <FormGroup className="tournament_types margin_block">
              <Label htmlFor="tournamentType2TeamRules" >Formation d'équipe:</Label>
              <Input onChange={(e) => setTeamFormatTournament2(e.target.value)} value={teamFormatTournament2} className="input large_width_input" placeholder="100% feminine." type="text" id="tournamentType2TeamRules" name="tournamentType2TeamRules" />
            </FormGroup>
            <FormGroup className="tournament_types margin_block">
              <Label htmlFor="tournamentType2LimitedTeams" >Nbr d'équipes limité à:</Label>
              <Input onChange={(e) => setTeamsLimitedTournament2(e.target.value)} value={teamsLimitedTournament2} className="input tiny_width_input" placeholder="8" type="number" id="tournamentType2LimitedTeams" name="tournamentType2LimitedTeams" />
            </FormGroup>
          </div>
        </div>
        {sectionLine}
        <div className="tournament_types_frame">
          <FormGroup className="tournament_types">
            <Label htmlFor="tournamentType3" >Tournoi 3:</Label>
            <Input onChange={(e) => setFormatTournament3(e.target.value)} value={formatTournament3} className="input small_width_input" placeholder="2x2 garçons" type="text" id="tournamentType3" name="tournamentType3" />
          </FormGroup>
          <div>
            <FormGroup className="tournament_types margin_block">
              <Label htmlFor="tournamentType3NbrPlayers" >Nbr de joueurs / équipe:</Label>
              <Input onChange={(e) => setPlayersPerTeamTournament3(e.target.value)} value={playersPerTeamTournament3} className="input tiny_width_input" placeholder="3" type="number" id="tournamentType3NbrPlayers" name="tournamentType3NbrPlayers" />
            </FormGroup>
            <FormGroup className="tournament_types margin_block">
              <Label htmlFor="tournamentType3TeamRules" >Formation d'équipe:</Label>
              <Input onChange={(e) => setTeamFormatTournament3(e.target.value)} value={teamFormatTournament3} className="input large_width_input" placeholder="100% masculine." type="text" id="tournamentType3TeamRules" name="tournamentType3TeamRules" />
            </FormGroup>
            <FormGroup className="tournament_types margin_block">
              <Label htmlFor="tournamentType3LimitedTeams" >Nbr d'équipes limité à:</Label>
              <Input onChange={(e) => setTeamsLimitedTournament3(e.target.value)} value={teamsLimitedTournament3} className="input tiny_width_input" placeholder="8" type="number" id="tournamentType3LimitedTeams" name="tournamentType3LimitedTeams" />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  </div>

  const subscriptionEnable = <FormGroup className="create_event_form_group">
    <Label htmlFor="subscription" className="black_text title_frame_width">Ouverture des inscriptions:</Label>
    <Input onChange={() => handleActivateSubscription()} type="checkbox" className="input" checked={subscription} id="subscription" name="subscription" />
    <Label htmlFor="subscription" check>Cocher pour ouvrir les inscriptions</Label>
  </FormGroup>


  let eventWithSubscription = <div />
  if (eventType === "Tournoi avec inscription préalable") {
    eventWithSubscription = <div>
      {tournamentDetails}
      {subscriptionEnable}
    </div>
  } else if (eventType === "Tournoi sans inscription préalable") {
    eventWithSubscription = <div>
      {tournamentDetails}
    </div>
  } else if (eventType === "Événement avec inscription préalable") {
    eventWithSubscription = <div>
      {subscriptionEnable}
    </div>
  };
// ******************* PARTIE DES OFFRES DE RESTAURATION *******************
  const handleActiveBar = () => {
    setBar(!bar)
  }
  const handleActiveSnack = () => {
    setSnack(!snack)
  };

  const handleActiveMenu = () => {
    setMenu(!menu)
  };

  const menuInput = menu === true ? <div>
    <FormGroup className="service_offer">
      <Label htmlFor="starter" className="service_items">Entrée(s) / Tapas:</Label>
      <Input onChange={(e) => setStarter(e.target.value)} className="input input_service" id="starter" name="starter" type="textarea" value={starter} placeholder="Tapas au choix"></Input>
    </FormGroup>
    <FormGroup className="service_offer">
      <Label htmlFor="mainCourse" className="service_items">Plat(s):</Label>
      <Input onChange={(e) => setMainCourse(e.target.value)} className="input input_service" id="mainCourse" name="mainCourse" type="textarea" value={mainCourse} placeholder="Txulete pour 2 personnes"></Input>
    </FormGroup>
    <FormGroup className="service_offer">
      <Label htmlFor="dessert" className="service_items">Dessert(s):</Label>
      <Input onChange={(e) => setDessert(e.target.value)} className="input input_service" id="dessert" name="dessert" type="textarea" value={dessert} placeholder="Gâteau basque"></Input>
    </FormGroup>
  </div> : <div />;

  const beverageInput = bar === true ? <div >
    <FormGroup className="service_offer">
      <Label htmlFor="drink" className="service_items">Boisson:</Label>
      <Input onChange={(e) => setBeverage(e.target.value)} className="input input_service" id="drink" name="drink" type="textarea" value={beverage} placeholder="ex: Boissons non alcoolisées, Sangria, Cidre basque Sagardoa, Bière Akerbeltz, Vin..." />
    </FormGroup>
  </div> : <div />;

  const snackInput = snack === true ? <div>
    <FormGroup className="service_offer" >
      <Label htmlFor="tapas" className="service_items">Restauration froide:</Label>
      <Input onChange={(e) => setColdFood(e.target.value)} className="input input_service" id="tapas" name="tapas" type="textarea" value={coldFood} placeholder="ex: Une offre large de tapas: Saumon fumé, Thon piquant, Thon mayonnaise, Surimi... de notre partenaire Frigeral-Relais d'Or" />
    </FormGroup>
    <FormGroup className="service_offer" >
      <Label htmlFor="plancha" className="service_items">Restauration chaude:</Label>
      <Input onChange={(e) => setHotFood(e.target.value)} className="input input_service" id="plancha" name="plancha" type="textarea" value={hotFood} placeholder="ex: Talo Ventrèche, Txistorra, Lomo, Brebis, Basquella" />
    </FormGroup>
  </div> : <div />

  const catering = menu === true || bar === true || snack === true ? <div className="create_event_form_group">
    <p className="black_text title_frame_width">Détail restauration:</p>
    <div className="service">
      {beverageInput}
      {menuInput}
      {snackInput}
    </div>
  </div> : <div />


  return (
    <div className="bo_create_events_big_frame">
      <p className="red_title">Créer un évévement</p>
      <p className="black_text" style={{ marginBlock: "10px", fontWeight: "bold" }}>- - - informations générales de l'événement - - -</p>
      <div className="creation_frame">
        <Form className="form-Frame">
          {/* CATEGORIE */}
          <FormGroup className="create_event_form_group">
            <Label htmlFor="categorySelect" className="black_text title_frame_width">Catégorie de l'événement:</Label>
            <Input onChange={(e) => setCategory(e.target.value)} className="input" id="categorySelect" value={category} name="categorySelect" type="select" >
              <option hidden value="">Sélectionner</option>
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
              <option value="Autres événements">Autres événements</option>
            </Input>
            {category === "Autre événement" ? <input onChange={(e) => setNameForOtherEventCategory(e.target.value)} className="input large_width_input" id="otherEvent" name="otherEvent" value={nameForOtherEventCategory} type="text" placeholder="Nom de l'événement (obligatoire)" /> : <div />}
          </FormGroup>

          {/* ANNÉE D'ÉDITION */}
          <FormGroup className="create_event_form_group">
            <Label htmlFor="edition" className="black_text title_frame_width">Année d'édition:</Label>
            <Input onChange={(e) => setYear(e.target.value)} className="input small_width_input" id="edition" name="edition" value={year} placeholder="2023 " type="text" />
          </FormGroup>

          {/* UPLOAD DE L'AFFICHE DE L'EVENEMENT VERS CLOUDINARY*/}
          <FormGroup className="create_event_form_group">
            <Label htmlFor="poster" className="black_text title_frame_width">Affiche de l'événement:</Label>
            {posterPreview !== "" ?  <img className="poster" width={100} height={150} src={posterPreview} alt='' /> : <img className="empty_poster" width={100} height={150}  alt=""/>}
            <Input className="upload_button"
              // onChange={(e) => setPosterSelected(e.target.files[0])}
              onChange={onImageChange}
              id="poster"
              accept=".png, .jpeg, .jpg"
              name="file"
              type="file"
            />
          </FormGroup>

          {/* TITRE DE L'ÉVÉNEMENT */}
          <FormGroup className="create_event_form_group">
            <Label htmlFor="title" className="black_text title_frame_width">Titre de l'événement:</Label>
            <Input onChange={(e) => setTitle(e.target.value.toUpperCase())} className="input large_width_input" id="title" name="title" value={title} placeholder="TOURNOI DE LA RENTRÉE 2023" type="text" />
          </FormGroup>

          {/* VILLE DE L'ÉVÉNEMENT */}
          <FormGroup className="create_event_form_group">
            <Label htmlFor="city" className="black_text title_frame_width">Ville où se déroule l'événement:</Label>
            <Input onChange={(e) => setCity(e.target.value)} className="input large_width_input" id="city" name="city" value={city} placeholder="Saint-Jean-de-Luz" type="text" />
          </FormGroup>

          {/* DATE DE DÉBUT ET DE FIN */}
          <div className="create_event_form_group">
            <p className="black_text title_frame_width">L'événement commence le:</p>
            <DatePicker className="date_input input large_width_input" id="startDate" name="startDate"
              // showIcon
              selected={startDate}
              selectsStart
              onChange={(date) => setStartDate(date)}
              locale="fr"
              showTimeSelect
              timeFormat="p"
              timeIntervals={15}
              timeCaption="Heure"
              dateFormat="Pp"
              // dateFormat="d MMMM yyyy à hh:mm"
              showYearDropdown
              scrollableMonthYearDropdown
            />
          </div>
          <div className="create_event_form_group">
            <p className="black_text title_frame_width">L'événement se termine le:</p>
            <DatePicker className="input large_width_input" id="endDate" name="endDate"
              // showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              locale="fr"
              showTimeSelect
              timeFormat="p"
              timeIntervals={15}
              timeCaption="Heure"
              dateFormat="Pp"
              // dateFormat="d MMMM yyyy à hh:mm"
              showYearDropdown
              scrollableMonthYearDropdown
            />
          </div>

          {/* SHORT DESCRIPTION DE L'ÉVÉNEMENT */}
          <FormGroup className="create_event_form_group">
            <Label htmlFor="shortDescription" className="black_text title_frame_width">Description courte de l'événement:</Label>
            <Input onChange={(e) => setShortDescription(e.target.value)} className="input shortDescription" id="shortDescription" name="shortDescription" maxLength={200} value={shortDescription} type="textarea" placeholder="Inscrivez-vous et venez partager ce moment convivial." />
          </FormGroup>

          {/* DESCRIPTION DE L'ÉVÉNEMENT */}
          <FormGroup className="create_event_form_group">
            <Label htmlFor="description" className="black_text title_frame_width">Description de l'événement:</Label>
            <Input onChange={(e) => setDescription(e.target.value)} className="input description" id="description" name="description" value={description} type="textarea" placeholder="A l’occasion des Fêtes de Saint Jean de Luz, le club VOLLEY-BALL LUZIEN CIBOURIEN organise son tournoi annuel de Beach Volley Ball 3x3, mixtes et ouvert à tous. Au fil des années, ce tournoi est de plus en plus connu des clubs de volley ball basques et landais. En 2023, prés de 30 équipes se sont affrontées dans une ambiance sportive, conviviale et détendue." />
          </FormGroup>

          {/* ADDRESSE DE L'ÉVÉNEMENT */}
          <FormGroup className="create_event_form_group">
            <Label htmlFor="place" className="black_text title_frame_width">Lieu / adresse de l'événement:</Label>
            <Input onChange={(e) => setPlace(e.target.value)} className="input extra_large_width_input" id="place" name="place" value={place} placeholder="La grande plage de Saint-Jean-de-Luz ou Gymnase Chantaco" type="text" />
          </FormGroup>

          {/* FRAIS D'INSCRIPTION */}
          <FormGroup className="create_event_form_group">
            <Label htmlFor="fees" className="black_text title_frame_width">Frais de participation:</Label>
            <Input onChange={(e) => setFees(e.target.value)} className="input tiny_width_input " id="fees" name="fees" value={fees} placeholder="5" type="text" />
            <p className="black_text">€ / participant</p>
          </FormGroup>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <p className="black_text" style={{ marginBlock: "10px", fontWeight: "bold" }}>- - - informations particulières de l'événement - - -</p>
          </div>

          {/* TYPE D'ÉVÉNEMENT */}
          <FormGroup className="create_event_form_group">
            <Label htmlFor="eventType" className="black_text title_frame_width">Type d'événement</Label>
            <Input onChange={(e) => setEventType(e.target.value)} className="input" id="eventType" value={eventType} name="eventType" type="select" >
              <option hidden value="">Sélectionner</option>
              <option value="Événement avec inscription préalable">Événement avec inscription préalable</option>
              <option value="Événement sans inscription préalable">Événement sans inscription préalable</option>
              <option value="Tournoi avec inscription préalable">Tournoi avec inscription préalable</option>
              <option value="Tournoi sans inscription préalable">Tournoi sans inscription préalable</option>
            </Input>
          </FormGroup>

          {/* DÉTAILS DU OU DES TOURNOIS */}
          {eventWithSubscription}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <p className="black_text" style={{ marginBlock: "10px", fontWeight: "bold" }}>- - - Présence d'un service buvette & restauration - - -</p>
          </div>
          {/* PRESENCE D'UN SERVICE DE BUVETTE ET DE RESTAURATION */}
          <div className="create_event_form_group">
            <p className="black_text title_frame_width">Restauration:</p>
            <FormGroup className="service_offer" >
              <Input onChange={() => handleActiveMenu()} type="checkbox" className="input" checked={menu} id="menuCheckBox" name="menuCheckBox" />
              <Label className="black_text" htmlFor="menuCheckBox" >Repas</Label>
            </FormGroup>
            <FormGroup className="service_offer" >
              <Input onChange={() => handleActiveBar()} type="checkbox" className="input" checked={bar} id="barCheckBox" name="barCheckBox" />
              <Label className="black_text" htmlFor="barCheckBox">Boisson</Label>
            </FormGroup>
            <FormGroup className="service_offer" >
              <Input onChange={() => handleActiveSnack()} type="checkbox" className="input" checked={snack} id="snackCheckBox" name="snackCheckBox" />
              <Label className="black_text" htmlFor="snackCheckBox" >Snack</Label>
            </FormGroup>
          </div>

          {/* LES OFFRES DE BUVETTE ET DE RESTAURATION */}
          {catering}

        </Form>
      </div>
      {tabSuccessEventCreation}
      {tabErrorEventCreation}
      {/* {formValidationButton} */}
      <Button className="button validation" onClick={() => handleSubmitEventCreation()}>Valider</Button>
    </div>

  )
};

export default CreateEvents;
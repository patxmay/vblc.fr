import { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { useSelector } from "react-redux";
import "../../styles/events/eventsRegistrationForm.css"
import { useNavigate } from "react-router-dom";

function EventRegistrationForm() {

  const navigate = useNavigate()

  const [player1IsMemberVBLC, setPlayer1IsMemberVBLC] = useState(false);
  const [player2IsMemberVBLC, setPlayer2IsMemberVBLC] = useState(false);
  const [player3IsMemberVBLC, setPlayer3IsMemberVBLC] = useState(false);
  const [player4IsMemberVBLC, setPlayer4IsMemberVBLC] = useState(false);
  const [player5IsMemberVBLC, setPlayer5IsMemberVBLC] = useState(false);
  const [player6IsMemberVBLC, setPlayer6IsMemberVBLC] = useState(false);


  const [tournamentSelected, setTournamentSelected] = useState("");

  const [teamName, setTeamName] = useState("");

  const [player1FirstName, setPlayer1FirstName] = useState("");
  const [player1LastName, setPlayer1LastName] = useState("");
  const [player1Birthday, setPlayer1Birthday] = useState("");
  const [player1Email, setPlayer1Email] = useState("");
  const [player1Phone, setPlayer1Phone] = useState("");

  const [player2FirstName, setPlayer2FirstName] = useState("");
  const [player2LastName, setPlayer2LastName] = useState("");
  const [player2Birthday, setPlayer2Birthday] = useState("");
  const [player2Email, setPlayer2Email] = useState("");

  const [player3FirstName, setPlayer3FirstName] = useState("");
  const [player3LastName, setPlayer3LastName] = useState("");
  const [player3Birthday, setPlayer3Birthday] = useState("");
  const [player3Email, setPlayer3Email] = useState("");

  const [player4FirstName, setPlayer4FirstName] = useState("");
  const [player4LastName, setPlayer4LastName] = useState("");
  const [player4Birthday, setPlayer4Birthday] = useState("");
  const [player4Email, setPlayer4Email] = useState("");

  const [player5FirstName, setPlayer5FirstName] = useState("");
  const [player5LastName, setPlayer5LastName] = useState("");
  const [player5Birthday, setPlayer5Birthday] = useState("");
  const [player5Email, setPlayer5Email] = useState("");

  const [player6FirstName, setPlayer6FirstName] = useState("");
  const [player6LastName, setPlayer6LastName] = useState("");
  const [player6Birthday, setPlayer6Birthday] = useState("");
  const [player6Email, setPlayer6Email] = useState("");

  const [teamLevel, setTeamLevel] = useState("")

  const [openTeamLevelInfoModal, setOpenTeamLevelInfoModal] = useState(false);

  const [participantFirstName, setParticipantFirstName] = useState("");
  const [participantLastName, setParticipantLastName] = useState("");
  const [participantIsMemberVBLC, setParticipantIsMemberVBLC] = useState(false)

  const [guest1FirstName, setGuest1FirstName] = useState("")
  const [guest1LastName, setGuest1LastName] = useState("")
  const [guest1IsMemberVBLC, setGuest1IsMemberVBLC] = useState(false)
  const [guest2FirstName, setGuest2FirstName] = useState("")
  const [guest2LastName, setGuest2LastName] = useState("")
  const [guest2IsMemberVBLC, setGuest2IsMemberVBLC] = useState(false)
  const [guest3FirstName, setGuest3FirstName] = useState("")
  const [guest3LastName, setGuest3LastName] = useState("")
  const [guest3IsMemberVBLC, setGuest3IsMemberVBLC] = useState(false)
  const [guest4FirstName, setGuest4FirstName] = useState("")
  const [guest4LastName, setGuest4LastName] = useState("")
  const [guest4IsMemberVBLC, setGuest4IsMemberVBLC] = useState(false)



  const [listRegistrationSuccess, setListRegistrationSuccess] = useState([]);
  const [listRegistrationError, setListRegistrationError] = useState([]);

  const [openRegistrationSuccesOrErrorModal, setOpenRegistrationSuccesOrErrorModal] = useState(false);


  //RÉCUPÉRATION DES DONNÉES DU REDUCER EVENT DATAS FOR REGISTRATION
  const eventDatas = useSelector((state) => state.eventDatasForRegistrationReducer);

  //FONCTION ANNULATION DU FORMULAIRE
  const handleCancelTheFormDatas = () => {
    setPlayer1IsMemberVBLC(false);
    setPlayer2IsMemberVBLC(false);
    setPlayer3IsMemberVBLC(false);
    setPlayer4IsMemberVBLC(false);
    setPlayer5IsMemberVBLC(false);
    setPlayer6IsMemberVBLC(false);
    setTournamentSelected("");
    setTeamName("");
    setPlayer1FirstName("");
    setPlayer1LastName("");
    setPlayer1Birthday("");
    setPlayer1Email("");
    setPlayer1Phone("");
    setPlayer2FirstName("");
    setPlayer2LastName("");
    setPlayer2Birthday("");
    setPlayer2Email("");
    setPlayer3FirstName("");
    setPlayer3LastName("");
    setPlayer3Birthday("");
    setPlayer3Email("");
    setPlayer4FirstName("");
    setPlayer4LastName("");
    setPlayer4Birthday("");
    setPlayer4Email("");
    setPlayer5FirstName("");
    setPlayer5LastName("");
    setPlayer5Birthday("");
    setPlayer5Email("");
    setPlayer6FirstName("");
    setPlayer6LastName("");
    setPlayer6Birthday("");
    setPlayer6Email("");
    setTeamLevel("")
    //RETOUR À LA PAGE PRÉCENDENTE
    navigate(-1)
  };

  //FONCTION DE SOUMISSION DU FORMULAIRE D'INSCRIPTION D'ÉQUIPE À UN TOURNOI
  const handleSubmitRegistrationForm = async () => {
    const registrationForm = await fetch(`/eventRoute/saveRegistrationForm?_id=${eventDatas._id}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `tournamentSelectedFromFront=${tournamentSelected}&teamNameFromFront=${teamName}&player1IsMemberVBLCFromFront=${player1IsMemberVBLC}&player1FirstNameFromFront=${player1FirstName}&player1LastNameFromFront=${player1LastName}&player1BirthdayFromFront=${player1Birthday}&player1EmailFromFront=${player1Email}&player1PhoneFromFront=${player1Phone}&player2IsMemberVBLCFromFront=${player2IsMemberVBLC}&player2FirstNameFromFront=${player2FirstName}&player2LastNameFromFront=${player2LastName}&player2BirthdayFromFront=${player2Birthday}&player2EmailFromFront=${player2Email}&player3IsMemberVBLCFromFront=${player3IsMemberVBLC}&player3FirstNameFromFront=${player3FirstName}&player3LastNameFromFront=${player3LastName}&player3BirthdayFromFront=${player3Birthday}&player3EmailFromFront=${player3Email}&player4IsMemberVBLCFromFront=${player4IsMemberVBLC}&player4FirstNameFromFront=${player4FirstName}&player4LastNameFromFront=${player4LastName}&player4BirthdayFromFront=${player4Birthday}&player4EmailFromFront=${player4Email}&player5IsMemberVBLCFromFront=${player5IsMemberVBLC}&player5FirstNameFromFront=${player5FirstName}&player5LastNameFromFront=${player5LastName}&player5BirthdayFromFront=${player5Birthday}&player5EmailFromFront=${player5Email}&player6IsMemberVBLCFromFront=${player6IsMemberVBLC}&player6FirstNameFromFront=${player6FirstName}&player6LastNameFromFront=${player6LastName}&player6BirthdayFromFront=${player6Birthday}&player6EmailFromFront=${player6Email}&teamLevelFromFront=${teamLevel}`
    });

    const body = await registrationForm.json();

    if (body.result === true) {
      setListRegistrationSuccess(body.success)
      setOpenRegistrationSuccesOrErrorModal(true)
      setListRegistrationError([])
    } else {
      setListRegistrationError(body.error)
      setOpenRegistrationSuccesOrErrorModal(true)
      setListRegistrationSuccess([])
    }
  };

  // FONCTION DE SOUMISSION DU FORMULAIRE D'INSCRIPTION À UN ÉVÉNEMENT

  const handleSubmitParticipationForm = async () => {
    const eventRegistration = await fetch(`/eventRoute/saveEventRegistration?_id=${eventDatas._id}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `participantFirstNameFromFront=${participantFirstName}&participantLastNameFromFront=${participantLastName}&participantIsMemberVBLCFromFront=${participantIsMemberVBLC}&guest1FirstNameFromFront=${guest1FirstName}&guest1LastNameFromFront=${guest1LastName}&guest1IsMemberVBLCFromFront=${guest1IsMemberVBLC}&guest2FirstNameFromFront=${guest2FirstName}&guest2LastNameFromFront=${guest2LastName}&guest2IsMemberVBLCFromFront=${guest2IsMemberVBLC}&guest3FirstNameFromFront=${guest3FirstName}&guest3LastNameFromFront=${guest3LastName}&guest3IsMemberVBLCFromFront=${guest3IsMemberVBLC}&guest4FirstNameFromFront=${guest4FirstName}&guest4LastNameFromFront=${guest4LastName}&guest4IsMemberVBLCFromFront=${guest4IsMemberVBLC}`
    });

    const body = await eventRegistration.json();

    if (body.result === true) {
      setListRegistrationSuccess(body.success)
      setOpenRegistrationSuccesOrErrorModal(true)
      setListRegistrationError([])
    } else {
      setListRegistrationError(body.error)
      setListRegistrationSuccess([])
      setOpenRegistrationSuccesOrErrorModal(true)
    }
  };

  //TITRE DE LA PAGE EN FONCTION SI C'EST UN TOURNOI AVEC INSCRIPTION OU EVENEMENT AVEC INSCRIPTION
  let screenTitle = <div />
  if (eventDatas.eventType === "Tournoi avec inscription préalable") {
    screenTitle = <p className="red_title">INSCRIPTION AU TOURNOI</p>
  } else if (eventDatas.eventType === "Événement avec inscription préalable") {
    screenTitle = <p className="red_title">INSCRIPTION À L'ÉVÉNEMENT</p>
  };


  // ********************************** DÉBUT PARTIE POUR UN TOURNOI AVEC INSCRIPTION PRÉALABLE **********************************
  //CHOIX DU TOURNOI
  const selectTournament = <div className="checkbox_form_item">
    <p className="black_text form_item_question">- Sélectionnez le tournoi auquel vous souhaitez participer:</p>
    {eventDatas.tournament.map((e, index) => {
      return (
        <label key={index} className="check_box_label_frame">
          <input onChange={(e) => setTournamentSelected(e.target.value)} className="checkbox_input" type="radio" name="tounamentTypeRadio" value={e.format} />
          <p className="black_text check_box_label">{e.format}</p>
        </label>
      )
    })}
  </div>

  //NOM DE L'ÉQUIPE
  const teamNameInput = <div className="team_name_frame">
    <p className="black_text form_item_question">- Saisissez le nom de votre équipe:</p>
    <input onChange={(e) => setTeamName(e.target.value.toUpperCase())} value={teamName} id="team name" name="team name" type="text" className="team_name_input" placeholder="NOM DE L'ÉQUIPE" />
  </div>


  // NOUVEAU FORMULAIRE DONNÉES DU JOUEUR 1 (CAPITAINE)
  const handleSetPlayer1Membership = () => {
    setPlayer1IsMemberVBLC(!player1IsMemberVBLC)
  }
  const player1Datas = player1IsMemberVBLC === true ? <div>
    <input onChange={(e) => setPlayer1FirstName(e.target.value)} value={player1FirstName} id="player1 first name" name="player1 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer1LastName(e.target.value)} value={player1LastName} id="player1 last name" name="player1 last name" type="text" className="team_data_input" placeholder="Nom" />
    <input onChange={(e) => setPlayer1Email(e.target.value)} value={player1Email} id="player1 email" name="player1 email" type="text" className="team_data_input" placeholder="Adresse e-mail" />
    <input onChange={(e) => setPlayer1Phone(e.target.value)} value={player1Phone} id="player1 phone" name="player1 phone" type="text" className="team_data_input" placeholder="Tél. mobile" />
  </div> : <div>
    <input onChange={(e) => setPlayer1FirstName(e.target.value)} value={player1FirstName} id="player1 first name" name="player1 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer1LastName(e.target.value)} value={player1LastName} id="player1 last name" name="player1 last name" type="text" className="team_data_input" placeholder="Nom" />
    <input onChange={(e) => setPlayer1Birthday(e.target.value)} value={player1Birthday} id="player1 birthday" name="player1 birthday" type="text" className="team_data_input" placeholder="Date de naissance: JJ/MM/AAAA" />
    <input onChange={(e) => setPlayer1Email(e.target.value)} value={player1Email} id="player1 email" name="player1 email" type="email" className="team_data_input" placeholder="Adresse e-mail" />
    <input onChange={(e) => setPlayer1Phone(e.target.value)} value={player1Phone} id="player1 phone" name="player1 phone" type="text" className="team_data_input" placeholder="Tél. mobile" />
  </div>

  const player1Form = <div className="player_form_big_frame">
    <p className="black_text space_block">Joueur 1 (Capitaine)</p>
    <div className="membership_checkbox">
      <p className="black_text form_item_question space_block" >Adhérent VBLC?</p>
      <label className="black_text" >
        <input onClick={() => handleSetPlayer1Membership()} className="checkbox_membership" type="checkbox" name="membershipCheckbox" />
        Oui
      </label>
    </div>
    {player1Datas}
  </div>

  // NOUVEAU FORMULAIRE DONNÉES DU JOUEUR 2
  const handleSetPlayer2Membership = () => {
    setPlayer2IsMemberVBLC(!player2IsMemberVBLC)
  }
  const player2Datas = player2IsMemberVBLC === true ? <div>
    <input onChange={(e) => setPlayer2FirstName(e.target.value)} value={player2FirstName} id="player2 first name" name="player2 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer2LastName(e.target.value)} value={player2LastName} id="player2 last name" name="player2 last name" type="text" className="team_data_input" placeholder="Nom" />

  </div> : <div>
    <input onChange={(e) => setPlayer2FirstName(e.target.value)} value={player2FirstName} id="player2 first name" name="player2 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer2LastName(e.target.value)} value={player2LastName} id="player2 last name" name="player2 last name" type="text" className="team_data_input" placeholder="Nom" />
    <input onChange={(e) => setPlayer2Birthday(e.target.value)} value={player2Birthday} id="player2 birthday" name="player2 birthday" type="text" className="team_data_input" placeholder="Date de naissance: JJ/MM/AAAA" />
    <input onChange={(e) => setPlayer2Email(e.target.value)} value={player2Email} id="player2 email" name="player2 email" type="email" className="team_data_input" placeholder="Adresse e-mail" />
  </div>

  const player2Form = <div className="player_form_big_frame">
    <p className="black_text space_block">Joueur 2</p>
    <div className="membership_checkbox  space_block">
      <p className="black_text form_item_question" >Adhérent VBLC?</p>
      <label className="black_text">
        <input onClick={() => handleSetPlayer2Membership()} className="checkbox_membership" type="checkbox" name="membershipCheckbox" />
        Oui
      </label>
    </div>
    {player2Datas}
  </div>

  // NOUVEAU FORMULAIRE DONNÉES DU JOUEUR 3
  const handleSetPlayer3Membership = () => {
    setPlayer3IsMemberVBLC(!player3IsMemberVBLC)
  }
  const player3Datas = player3IsMemberVBLC === true ? <div>
    <input onChange={(e) => setPlayer3FirstName(e.target.value)} value={player3FirstName} id="player3 first name" name="player3 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer3LastName(e.target.value)} value={player3LastName} id="player3 last name" name="player3 last name" type="text" className="team_data_input" placeholder="Nom" />
  </div> : <div>
    <input onChange={(e) => setPlayer3FirstName(e.target.value)} value={player3FirstName} id="player3 first name" name="player3 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer3LastName(e.target.value)} value={player3LastName} id="player3 last name" name="player3 last name" type="text" className="team_data_input" placeholder="Nom" />
    <input onChange={(e) => setPlayer3Birthday(e.target.value)} value={player3Birthday} id="player3 birthday" name="player3 birthday" type="text" className="team_data_input" placeholder="Date de naissance: JJ/MM/AAAA" />
    <input onChange={(e) => setPlayer3Email(e.target.value)} value={player3Email} id="player3 email" name="player3 email" type="email" className="team_data_input" placeholder="Adresse e-mail" />
  </div>

  const player3Form = <div className="player_form_big_frame">
    <p className="black_text space_block">Joueur 3</p>
    <div className="membership_checkbox  space_block">
      <p className="black_text form_item_question" >Adhérent VBLC?</p>
      <label className="black_text">
        <input onClick={() => handleSetPlayer3Membership()} className="checkbox_membership" type="checkbox" name="membershipCheckbox" />
        Oui
      </label>
    </div>
    {player3Datas}
  </div>

  // NOUVEAU FORMULAIRE DONNÉES DU JOUEUR 4
  const handleSetPlayer4Membership = () => {
    setPlayer4IsMemberVBLC(!player4IsMemberVBLC)
  }
  const player4Datas = player4IsMemberVBLC === true ? <div>
    <input onChange={(e) => setPlayer4FirstName(e.target.value)} value={player4FirstName} id="player4 first name" name="player4 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer4LastName(e.target.value)} value={player4LastName} id="player4 last name" name="player4 last name" type="text" className="team_data_input" placeholder="Nom" />
  </div> : <div>
    <input onChange={(e) => setPlayer4FirstName(e.target.value)} value={player4FirstName} id="player4 first name" name="player4 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer4LastName(e.target.value)} value={player4LastName} id="player4 last name" name="player4 last name" type="text" className="team_data_input" placeholder="Nom" />
    <input onChange={(e) => setPlayer4Birthday(e.target.value)} value={player4Birthday} id="player4 birthday" name="player4 birthday" type="text" className="team_data_input" placeholder="Date de naissance: JJ/MM/AAAA" />
    <input onChange={(e) => setPlayer4Email(e.target.value)} value={player4Email} id="player4 email" name="player4 email" type="email" className="team_data_input" placeholder="Adresse e-mail" />
  </div>

  const player4Form = <div className="player_form_big_frame">
    <p className="black_text space_block">Joueur 4</p>
    <div className="membership_checkbox">
      <p className="black_text form_item_question  space_block" >Adhérent VBLC?</p>
      <label className="black_text">
        <input onClick={() => handleSetPlayer4Membership()} className="checkbox_membership" type="checkbox" name="membershipCheckbox" />
        Oui
      </label>
    </div>
    {player4Datas}
  </div>

  // NOUVEAU FORMULAIRE DONNÉES DU JOUEUR 5
  const handleSetPlayer5Membership = () => {
    setPlayer5IsMemberVBLC(!player5IsMemberVBLC)
  }
  const player5Datas = player5IsMemberVBLC === true ? <div>
    <input onChange={(e) => setPlayer5FirstName(e.target.value)} value={player5FirstName} id="player5 first name" name="player5 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer5LastName(e.target.value)} value={player5LastName} id="player5 last name" name="player5 last name" type="text" className="team_data_input" placeholder="Nom" />
  </div> : <div>
    <input onChange={(e) => setPlayer5FirstName(e.target.value)} value={player5FirstName} id="player5 first name" name="player5 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer5LastName(e.target.value)} value={player5LastName} id="player5 last name" name="player5 last name" type="text" className="team_data_input" placeholder="Nom" />
    <input onChange={(e) => setPlayer5Birthday(e.target.value)} value={player5Birthday} id="player5 birthday" name="player5 birthday" type="text" className="team_data_input" placeholder="Date de naissance: JJ/MM/AAAA" />
    <input onChange={(e) => setPlayer5Email(e.target.value)} value={player5Email} id="player5 email" name="player5 email" type="email" className="team_data_input" placeholder="Adresse e-mail" />
  </div>

  const player5Form = <div className="player_form_big_frame">
    <p className="black_text space_block">Joueur 5</p>
    <div className="membership_checkbox">
      <p className="black_text form_item_question  space_block" >Adhérent VBLC?</p>
      <label className="black_text">
        <input onClick={() => handleSetPlayer5Membership()} className="checkbox_membership" type="checkbox" name="membershipCheckbox" />
        Oui
      </label>
    </div>
    {player5Datas}
  </div>

  // NOUVEAU FORMULAIRE DONNÉES DU JOUEUR 6
  const handleSetPlayer6Membership = () => {
    setPlayer6IsMemberVBLC(!player6IsMemberVBLC)
  }
  const player6Datas = player6IsMemberVBLC === true ? <div>
    <input onChange={(e) => setPlayer6FirstName(e.target.value)} value={player6FirstName} id="player6 first name" name="player6 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer6LastName(e.target.value)} value={player6LastName} id="player6 last name" name="player6 last name" type="text" className="team_data_input" placeholder="Nom" />
  </div> : <div>
    <input onChange={(e) => setPlayer6FirstName(e.target.value)} value={player6FirstName} id="player6 first name" name="player6 first name" type="text" className="team_data_input" placeholder="Prénom" />
    <input onChange={(e) => setPlayer6LastName(e.target.value)} value={player6LastName} id="player6 last name" name="player6 last name" type="text" className="team_data_input" placeholder="Nom" />
    <input onChange={(e) => setPlayer6Birthday(e.target.value)} value={player6Birthday} id="player6 birthday" name="player6 birthday" type="text" className="team_data_input" placeholder="Date de naissance: JJ/MM/AAAA" />
    <input onChange={(e) => setPlayer6Email(e.target.value)} value={player6Email} id="player6 email" name="player6 email" type="email" className="team_data_input" placeholder="Adresse e-mail" />
  </div>

  const player6Form = <div className="player_form_big_frame">
    <p className="black_text space_block">Joueur 6</p>
    <div className="membership_checkbox">
      <p className="black_text form_item_question space_block" >Adhérent VBLC?</p>
      <label className="black_text">
        <input onClick={() => handleSetPlayer6Membership()} className="checkbox_membership" type="checkbox" name="membershipCheckbox" />
        Oui
      </label>
    </div>
    {player6Datas}
  </div>

  //L'ENSEMBLE DU FORMULAIRE DES DONNÉES DES JOUEURS
  const playersForm = <div className="players_datas_section_frame">
    <p className="black_text form_item_question space_block">- Saisissez les données des joueurs:</p>
    <div className="player_form">
      {player1Form}
      {player2Form}
      {player3Form}
      {player4Form}
      {player5Form}
      {player6Form}
    </div>
  </div>

  //SELECTION DU NIVEAU DE JEU DE L'ÉQUIPE
  const selectTeamLevel = <div className="checkbox_form_item">
    <div className="form_item_question_frame">
      <p className="black_text form_item_question">- Sélectionnez le niveau de l'équipe:</p>
      < FaCircleInfo onClick={() => openTeamLevelModal()} style={{ color: "red", width: 20, height: 20 }} />
    </div>
    <div className="team_level_check_box_frame">
      <label onClick={(e) => setTeamLevel(e.target.value)} className="check_box_label_frame">
        <input className="checkbox_input" type="radio" name="myRadio" value="Expert" />
        <p className="black_text check_box_label">Expert</p>
      </label>
      <label onClick={(e) => setTeamLevel(e.target.value)} className="check_box_label_frame">
        <input className="checkbox_input" type="radio" name="myRadio" value="Confirmé" />
        <p className="black_text check_box_label">Confirmé</p>
      </label>
      <label onClick={(e) => setTeamLevel(e.target.value)} className="check_box_label_frame">
        <input className="checkbox_input" type="radio" name="myRadio" value="Niveau moyen" />
        <p className="black_text check_box_label">Niveau moyen</p>
      </label>
      <label onClick={(e) => setTeamLevel(e.target.value)} className="check_box_label_frame">
        <input className="checkbox_input" type="radio" name="myRadio" value="Loisir" />
        <p className="black_text check_box_label">Loisir</p>
      </label>
      <label onClick={(e) => setTeamLevel(e.target.value)} className="check_box_label_frame">
        <input className="checkbox_input" type="radio" name="myRadio" value="Débutant" />
        <p className="black_text check_box_label">Débutant</p>
      </label>
    </div>
  </div>


  //INFORMATION SUR LA CONFIDENTIALITÉ DES DONNÉES DES JOUEURS
  const datasInfo = <div className="datas_privacy_info">
    <p className="player_level_explanation">Information sur les données des joueurs:</p>
    <p className="player_level_explanation">Vos données personnelles restent strictement confidentielles au sein du club et de la F.F.V.B. Elles servent à créer des "licences événementielles" liées à votre participation et ainsi permettent au club VBLC de bénéficier d'une une meilleure visibilité au niveau national. Par "licence événementielle" crée, le club bénéficie d'1€ de crédit sur les licences F.F.V.B pour la saison en cours.</p>
  </div>;

  //FONCTION QUI OUVRE LA MODAL D'INFORMATION SUR LE CHOIX DU NIVEAU DE L'ÉQUIPE
  const openTeamLevelModal = () => {
    setOpenTeamLevelInfoModal(true)
  }

  //MODAL D'INFORMATION DU NIVEAU DE L'ÉQUIPE
  const teamLevelInfoModal = <div className="modal_big_frame">
    <div className="modal_white_frame">
      <p className="modal_title">Comment définir le niveau de votre équipe?</p>
      <div>
        <p className="modal_text">Expert: vous jouez dans un club en championnat en FFVB, le week-end, au niveau national</p>
        <p className="modal_text">Confirmé: vous jouez dans un club en championnat en FFVB, le week-end, au niveau départemental ou régional</p>
        <p className="modal_text">Niveau moyen: vous jouez régulièrement toutes les semaines en match amical ou dans un championnat corporatif ou loisir senior</p>
        <p className="modal_text">Loisir: vous jouez occasionnellement depuis le lycée, de temps en temps sur la plage, ...</p>
        <p className="modal_text">Débutant: vous avez très peu joué</p>
      </div>
      <button onClick={() => setOpenTeamLevelInfoModal(false)} className="modal_close_button">FERMER</button>
    </div>
  </div>;

  // ********************************** FIN PARTIE POUR UN TOURNOI AVEC INSCRIPTION PRÉALABLE **********************************

  // ********************************** DEBUT PARTIE POUR UN ÉVÉNEMENT AVEC INSCRIPTION PRÉALABLE **********************************
  const handleCancelParticipationForm = () => {
    setParticipantFirstName("");
    setParticipantLastName("");
    setParticipantIsMemberVBLC(false);
    setGuest1FirstName("");
    setGuest1LastName("");
    setGuest1IsMemberVBLC(false)
    setGuest2FirstName("");
    setGuest2LastName("");
    setGuest2IsMemberVBLC(false)
    setGuest3FirstName("");
    setGuest3LastName("");
    setGuest3IsMemberVBLC(false)
    setGuest4FirstName("");
    setGuest4LastName("");
    setGuest4IsMemberVBLC(false)
    navigate(-1)
  }


  const eventParticipationForm = <div className="participant_form_big_frame">
    <div className="participant_form_frame">
      <p className="black_text participant_form_item">Participant: </p>
      <div className="participant_data_frame">
        <div className="participant_data_input_frame">
          <input onChange={(e) => setParticipantFirstName(e.target.value)} value={participantFirstName} className="participant_data_input" id="participantFirstName" name="participantFirstName" type="text" placeholder="Prénom" />
          <input onChange={(e) => setParticipantLastName(e.target.value)} value={participantLastName} className="participant_data_input" id="participantLastName" name="participantLastName" type="text" placeholder="Nom" />
        </div>
        <div className="event_membership_checkbox">
          <p className="black_text form_item_question space_block" >Adhérent VBLC?</p>
          <label className="black_text">
            <input onClick={() => setParticipantIsMemberVBLC(true)} className="checkbox_membership" type="checkbox" name="membershipCheckbox" />
            Oui
          </label>
        </div>
      </div>
    </div>
    <div className="participant_form_frame">
      <p className="black_text participant_form_item">Invité: </p>
      <div className="participant_data_frame">
        <div className="participant_data_input_frame">
          <input onChange={(e) => setGuest1FirstName(e.target.value)} value={guest1FirstName} className="participant_data_input" id="guest1FirstName" name="guest1FirstName" type="text" placeholder="Prénom" />
          <input onChange={(e) => setGuest1LastName(e.target.value)} value={guest1LastName} className="participant_data_input" id="guest1LastName" name="guest1LastName" type="text" placeholder="Nom" />
        </div>
        <div className="event_membership_checkbox">
          <p className="black_text form_item_question space_block" >Adhérent VBLC?</p>
          <label className="black_text">
            <input onClick={() => setGuest1IsMemberVBLC(true)} className="checkbox_membership" type="checkbox" name="membershipCheckbox" />
            Oui
          </label>
        </div>
      </div>
    </div>
    <div className="participant_form_frame">
      <p className="black_text participant_form_item">Invité: </p>
      <div className="participant_data_frame">
        <div className="participant_data_input_frame">
          <input onChange={(e) => setGuest2FirstName(e.target.value)} value={guest2FirstName} id="guest2FirstName" name="guest2FirstName" type="text" className="participant_data_input" placeholder="Prénom" />
          <input onChange={(e) => setGuest2LastName(e.target.value)} value={guest2LastName} id="guest2LastName" name="guest2LastName" type="text" className="participant_data_input" placeholder="Nom" />
        </div>
        <div className="event_membership_checkbox">
          <p className="black_text form_item_question space_block" >Adhérent VBLC?</p>
          <label className="black_text">
            <input onClick={() => setGuest2IsMemberVBLC(true)} className="checkbox_membership" type="checkbox" name="membershipCheckbox" />
            Oui
          </label>
        </div>
      </div>
    </div>
    <div className="participant_form_frame">
      <p className="black_text participant_form_item">Invité: </p>
      <div className="participant_data_frame">
        <div className="participant_data_input_frame">
          <input onChange={(e) => setGuest3FirstName(e.target.value)} value={guest3FirstName} id="guest3FirstName" name="guest3FirstName" type="text" className="participant_data_input" placeholder="Prénom" />
          <input onChange={(e) => setGuest3LastName(e.target.value)} value={guest3LastName} id="guest3LastName" name="guest3LastName" type="text" className="participant_data_input" placeholder="Nom" />
        </div>
        <div className="event_membership_checkbox">
          <p className="black_text form_item_question space_block" >Adhérent VBLC?</p>
          <label className="black_text">
            <input onClick={() => setGuest3IsMemberVBLC(true)} className="checkbox_membership" type="checkbox" name="membershipCheckbox" />
            Oui
          </label>
        </div>
      </div>
    </div>
    <div className="participant_form_frame">
      <p className="black_text participant_form_item">Invité: </p>
      <div className="participant_data_frame">
        <div className="participant_data_input_frame">
          <input onChange={(e) => setGuest4FirstName(e.target.value)} value={guest4FirstName} id="guest4FirstName" name="guest4FirstName" type="text" className="participant_data_input" placeholder="Prénom" />
          <input onChange={(e) => setGuest4LastName(e.target.value)} value={guest4LastName} id="guest4LastName" name="guest4LastName" type="text" className="participant_data_input" placeholder="Nom" />
        </div>
        <div className="event_membership_checkbox">
          <p className="black_text form_item_question space_block" >Adhérent VBLC?</p>
          <label className="black_text">
            <input onClick={() => setGuest4IsMemberVBLC(true)} className="checkbox_membership" type="checkbox" name="membershipCheckbox" />
            Oui
          </label>
        </div>
      </div>
    </div>
    <div className="event_form_validation_buttons">
      <button onClick={() => handleCancelParticipationForm()} className="form_cancel_button">Annuler</button>
      <button onClick={() => handleSubmitParticipationForm()} className="form_validation_button">Valider</button>
    </div>
  </div>

  // ********************************** FIN PARTIE POUR UN ÉVÉNEMENT AVEC INSCRIPTION PRÉALABLE **********************************

  // ********************************** DÉBUT PART DE LA MODALE SUCCES OU ERROR DANS FORMULAIRE D'INSCRIPTION TOURNOI OU ÉVÉNEMENT AVEC INSCRIPTION PRÉALABLE **********************************
  const handleCloseErrorModal = () => {
    setListRegistrationError([]);
    setOpenRegistrationSuccesOrErrorModal(false)
  };

  const handleCloseSuccessModal = () => {
    setOpenRegistrationSuccesOrErrorModal(false);
    setPlayer1IsMemberVBLC(false);
    setPlayer2IsMemberVBLC(false);
    setPlayer3IsMemberVBLC(false);
    setPlayer4IsMemberVBLC(false);
    setPlayer5IsMemberVBLC(false);
    setPlayer6IsMemberVBLC(false);
    setTournamentSelected("");
    setTeamName("");
    setPlayer1FirstName("");
    setPlayer1LastName("");
    setPlayer1Birthday("");
    setPlayer1Email("");
    setPlayer1Phone("");
    setPlayer2FirstName("");
    setPlayer2LastName("");
    setPlayer2Birthday("");
    setPlayer2Email("");
    setPlayer3FirstName("");
    setPlayer3LastName("");
    setPlayer3Birthday("");
    setPlayer3Email("");
    setPlayer4FirstName("");
    setPlayer4LastName("");
    setPlayer4Birthday("");
    setPlayer4Email("");
    setPlayer5FirstName("");
    setPlayer5LastName("");
    setPlayer5Birthday("");
    setPlayer5Email("");
    setPlayer6FirstName("");
    setPlayer6LastName("");
    setPlayer6Birthday("");
    setPlayer6Email("");
    setTeamLevel("");
    setListRegistrationSuccess([]);
    //RETOUR À LA PAGE PRÉCENDENTE
    navigate(-1)
  };

  //MODAL DANS LE CAS D'UNE INSCRIPTION RÉUSSIE AU TOURNOI
  const registrationSuccessOrErrorModal = listRegistrationError.length !== 0 ? <div className="modal_big_frame">
    <div className="modal_white_frame">
      <p className="modal_title">Erreur sur le formulaire d'inscription</p>
      <div>
        {listRegistrationError.map((error, index) => {
          return (<div>
            <p key={index}>{error}</p>
          </div>
          )
        })}
      </div>
      <button onClick={() => handleCloseErrorModal()} className="modal_close_button">FERMER</button>
    </div>
  </div> : <div className="modal_big_frame">
    <div className="modal_white_frame">
      <p className="modal_title">Inscription</p>
      <div>
        {listRegistrationSuccess.map((success, index) => {
          return (<div>
            <p key={index}>{success}</p>
          </div>
          )
        })}
      </div>
      <button onClick={() => handleCloseSuccessModal()} className="modal_close_button">FERMER</button>
    </div>
  </div>

  // AFFICHAGE DU FORMULAIRE EN FONCTION DE L'ÉVÉNEMENT AVEC INSCRIPTION
  let registryFormForEvent = <div />
  if (eventDatas.eventType === "Tournoi avec inscription préalable") {
    registryFormForEvent = <div className="form_outer_frame">
      {selectTournament}
      {teamNameInput}
      {playersForm}
      {selectTeamLevel}
      {datasInfo}
      <div className="event_form_validation_buttons">
        <button onClick={() => handleCancelTheFormDatas()} className="form_cancel_button">Annuler</button>
        <button onClick={() => handleSubmitRegistrationForm()} className="form_validation_button">Valider</button>
      </div>
    </div>
  } else if (eventDatas.eventType === "Événement avec inscription préalable") {
    registryFormForEvent = <div className="form_outer_frame">
      {eventParticipationForm}
    </div>
  };




  return (
    <div className="main">
      <div className="form_big_frame">
        {screenTitle}
        <img className="form_poster" src={eventDatas.poster} alt="" />
        <p className="event_title">{eventDatas.title}</p>
        {registryFormForEvent}
      </div>
      {openTeamLevelInfoModal && teamLevelInfoModal}
      {openRegistrationSuccesOrErrorModal && registrationSuccessOrErrorModal}
    </div>
  );
};

export default EventRegistrationForm;
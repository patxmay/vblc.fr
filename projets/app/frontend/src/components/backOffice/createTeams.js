import { useState, useEffect } from "react";
import "../../styles/backOffice/createTeams.css";



function CreateTeams() {

  const [seasonStartYear, setSeasonStartYear] = useState("");
  const [seasonEndYear, setSeasonEndYear] = useState("");
  const [category, setCategory] = useState("");
  const [championship, setChampionship] = useState("");
  const [teamNumber, setTeamNumber] = useState("")
  const [group, setGroup] = useState("");
  const [format, setFormat] = useState("");
  const [gender, setGender] = useState("");
  const [coachFirstName, setCoachFirstName] = useState("");
  const [coachLastName, setCoachLastName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [player1FName, setPlayer1FName] = useState("");
  const [player1LName, setPlayer1LName] = useState("");
  const [player2FName, setPlayer2FName] = useState("");
  const [player2LName, setPlayer2LName] = useState("");
  const [player3FName, setPlayer3FName] = useState("");
  const [player3LName, setPlayer3LName] = useState("");
  const [player4FName, setPlayer4FName] = useState("");
  const [player4LName, setPlayer4LName] = useState("");
  const [player5FName, setPlayer5FName] = useState("");
  const [player5LName, setPlayer5LName] = useState("");
  const [player6FName, setPlayer6FName] = useState("");
  const [player6LName, setPlayer6LName] = useState("");
  const [player7FName, setPlayer7FName] = useState("");
  const [player7LName, setPlayer7LName] = useState("");
  const [player8FName, setPlayer8FName] = useState("");
  const [player8LName, setPlayer8LName] = useState("");
  const [player9FName, setPlayer9FName] = useState("");
  const [player9LName, setPlayer9LName] = useState("");
  const [player10FName, setPlayer10FName] = useState("");
  const [player10LName, setPlayer10LName] = useState("");
  const [player11FName, setPlayer11FName] = useState("");
  const [player11LName, setPlayer11LName] = useState("");
  const [player12FName, setPlayer12FName] = useState("");
  const [player12LName, setPlayer12LName] = useState("");
  const [player13FName, setPlayer13FName] = useState("");
  const [player13LName, setPlayer13LName] = useState("");
  const [player14FName, setPlayer14FName] = useState("");
  const [player14LName, setPlayer14LName] = useState("");
  const [player15FName, setPlayer15FName] = useState("");
  const [player15LName, setPlayer15LName] = useState("");
  const [player16FName, setPlayer16FName] = useState("");
  const [player16LName, setPlayer16LName] = useState("");

  const [teamPicturePreview, setTeamPicturePreview] = useState("");
  const [teamPictureSelected, setTeamPictureSelected] = useState("");
  const [teamPictureUrl, setTeamPictureUrl] = useState("");
  const [teamPictureId, setTeamPictureId] = useState("");

  const [teamCreationErrorsList, setTeamCreationErrorsList] = useState([]);
  const [teamCreationSuccessList, setTeamCreationSuccessList] = useState([]);

  //VALIDATION DU FORMULAIRE DE CRÉATION DE L'ÉQUIPE

  // ENVOI DE LA PHOTO DANS CLOUDINARY
  const teamCreationValidationButton = <div className="team_creation_validation_button">
    <button onClick={() => uploadTeamPictureToCloudinary()} className="create_team_buttons save_button_activated">Valider la création de l'équipe
    </button>
  </div>

  // DÈS QUE CLOUDINARY RENVOIE L'ID ET L'URL DE LA PHOTO ==> ON DÉCLENCHE AUTOMATIQUEMENT L'ENVOI DES DONNÉES DANS MONGO DB 
  useEffect(() => {
    if (teamPictureId !== "" && teamPictureUrl !== "") {
      handleValidateTeamCreation()
    }
  }, [teamPictureUrl])

  const handleValidateTeamCreation = async () => {

    const teamToCreate = await fetch('/teamRoute/createTeam', {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `seasonStartYearFromFront=${seasonStartYear}&seasonEndYearFromFront=${seasonEndYear}&categoryFromFront=${category}&championshipFromFront=${championship}&formatFromFront=${format}&groupFromFront=${group}&teamNumberFromFront=${teamNumber}&genderFromFront=${gender}&teamNameFromFront=${teamName}&coachFirstNameFromFront=${coachFirstName}&coachLastNameFromFront=${coachLastName}&player1FNameFromFront=${player1FName}&player1LNameFromFront=${player1LName}&player2FNameFromFront=${player2FName}&player2LNameFromFront=${player2LName}&player3FNameFromFront=${player3FName}&player3LNameFromFront=${player3LName}&player4FNameFromFront=${player4FName}&player4LNameFromFront=${player4LName}&player5FNameFromFront=${player5FName}&player5LNameFromFront=${player5LName}&player6FNameFromFront=${player6FName}&player6LNameFromFront=${player6LName}&player7FNameFromFront=${player7FName}&player7LNameFromFront=${player7LName}&player8FNameFromFront=${player8FName}&player8LNameFromFront=${player8LName}&player9FNameFromFront=${player9FName}&player9LNameFromFront=${player9LName}&player10FNameFromFront=${player10FName}&player10LNameFromFront=${player10LName}&player11FNameFromFront=${player11FName}&player11LNameFromFront=${player11LName}&player12FNameFromFront=${player12FName}&player12LNameFromFront=${player12LName}&player13FNameFromFront=${player13FName}&player13LNameFromFront=${player13LName}&player14FNameFromFront=${player14FName}&player14LNameFromFront=${player14LName}&player15FNameFromFront=${player15FName}&player15LNameFromFront=${player15LName}&player16FNameFromFront=${player16FName}&player16LNameFromFront=${player16LName}&teamPictureUrlFromFront=${teamPictureUrl}&teamPictureIdFromFront=${teamPictureId}`
    });

    const body = await teamToCreate.json();

    if (body.result === true) {
      setSeasonStartYear("");
      setSeasonEndYear("");
      setCategory("");
      setChampionship("");
      setTeamNumber("");
      setFormat("")
      setGroup("");
      setGender("");
      setCoachFirstName("");
      setCoachLastName("");
      setTeamName("");

      setPlayer1FName("");
      setPlayer1LName("");
      setPlayer2FName("");
      setPlayer2LName("");
      setPlayer3FName("");
      setPlayer3LName("");
      setPlayer4FName("");
      setPlayer4LName("");
      setPlayer5FName("");
      setPlayer5LName("");
      setPlayer6FName("");
      setPlayer6LName("");
      setPlayer7FName("");
      setPlayer7LName("");
      setPlayer8FName("");
      setPlayer8LName("");
      setPlayer9FName("");
      setPlayer9LName("");
      setPlayer10FName("");
      setPlayer10LName("");
      setPlayer11FName("");
      setPlayer11LName("");
      setPlayer12FName("");
      setPlayer12LName("");
      setPlayer13FName("");
      setPlayer13LName("");
      setPlayer14FName("");
      setPlayer14LName("");
      setPlayer15FName("");
      setPlayer15LName("");
      setPlayer16FName("");
      setPlayer16LName("");

      setTeamPicturePreview("");
      setTeamPictureSelected("")

      setTeamPictureUrl("");
      setTeamPictureId("");

      setTeamCreationSuccessList(body.success);
      setTeamCreationErrorsList([]);
    } else {
      setTeamCreationErrorsList(body.errors);
    }
  };

  const errorsMessage = teamCreationErrorsList.map((errors, i) => {
    return (<p style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>)
  })
  const successMessage = teamCreationSuccessList.map((success, i) => {
    return (<p style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>)
  })

  //ENREGISTREMENT DE LA PHOTO DE L'ÉQUIPE DANS LA BASE MEDIA CLOUDINARY
  const onTeamPictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setTeamPicturePreview(URL.createObjectURL(event.target.files[0])) // prévisualisation
      setTeamPictureSelected(event.target.files[0]) // préparation à l'enregistrement sur cloudinary
    }
  };

  const uploadTeamPictureToCloudinary = () => {
    const formData = new FormData();
    formData.append("file", teamPictureSelected);
    formData.append("upload_preset", "gj6ckq1o");
    formData.append("cloud_name", "dummxlbjp")
    formData.append("folder", "teams-pictures-folder");

    fetch(
      `https://api.cloudinary.com/v1_1/dummxlbjp/image/upload`, {
      method: "POST",
      body: formData
    })
      .then(resp => resp.json())
      .then(formData => {
        setTeamPictureUrl(formData.url)
        setTeamPictureId(formData.public_id)
      })
      .catch(err => console.log(err))
  };

  //DATE DE DÉBUT DE SAISON
  const teamSeasonStart = <div className="create_team_form_group">
    <label for="seasonStartDate" className="black_text create_team_item_label_frame">Année de début de saison:</label>
    <input onChange={(e) => setSeasonStartYear(e.target.value)} className="team_input team_input_short_width" value={seasonStartYear} type="text" id="seasonStartDate" name="seasonStartDate" placeholder="2023" />
  </div>
  //DATE DE FIN DE SAISON
  const teamSeasonEnd = <div className="create_team_form_group">
    <label htmlFor="seasonEndDate" className="black_text create_team_item_label_frame">Année de fin de saison:</label>
    <input onChange={(e) => setSeasonEndYear(e.target.value)} className="team_input team_input_short_width" value={seasonEndYear} id="seasonEndDate" name="seasonEndDate" type="text" placeholder="2024" />
  </div>

  const teamCategorySelection = <div className="create_team_form_group">
    <label htmlFor="category" className="black_text create_team_item_label_frame">Catégorie:</label>
    <select onChange={(e) => setCategory(e.target.value)} className="team_input team_input_medium_width " id="category" value={category} name="category" >
      <option hidden value="">Sélectionner</option>
      <option value="Proxy">Proxy (Jeunes)</option>
      <option value="Jeunes / Seniors">Jeunes / Séniors</option>
      <option value="Corporate">Corporate</option>
    </select>
  </div>

  const championshipSelection = <div className="create_team_form_group">
    <label className="black_text create_team_item_label_frame">Championnat:</label>
    {category === "Proxy" ? <select onChange={(e) => setChampionship(e.target.value)} className="team_input team_input_medium_width" id="teamLevel" value={championship} name="teamLevel" type="select" >
      <option hidden value="">Sélectionner</option>
      <option value="M9">Moins de 9 ans</option>
      <option value="M11">Moins de 11 ans</option>
      <option value="M13">Moins de 13 ans</option>
      <option value="M15">Moins de 15 ans</option>
      <option value="M17">Moins de 17 ans</option>
      <option value="M18">Moins de 18 ans</option>
      <option value="M21">Moins de 21 ans</option>
    </select> : category === "Jeunes / Seniors" ? <select onChange={(e) => setChampionship(e.target.value)} className="team_input team_input_medium_width" id="teamLevel" value={championship} name="teamLevel" type="select" >
      <option hidden value="">Sélectionner</option>
      <option value="Départemental">Départemental</option>
      <option value="Régional">Régional</option>
    </select> : category === "Corporate" ? <select onChange={(e) => setChampionship(e.target.value)} className="team_input team_input_medium_width" id="teamLevel" value={championship} name="teamLevel" type="select" >
      <option hidden value="">Sélectionner</option>
      <option value="BLVB">BLVB</option>
    </select> : <select onChange={(e) => setChampionship(e.target.value)} className="team_input team_input_medium_width" id="teamLevel" value={championship} name="teamLevel" type="select" >
      <option hidden value="">Sélectionner</option>
      <option value="M9">Moins de 9 ans</option>
      <option value="M11">Moins de 11 ans</option>
      <option value="M13">Moins de 13 ans</option>
      <option value="M15">Moins de 15 ans</option>
      <option value="M17">Moins de 17 ans</option>
      <option value="M18">Moins de 18 ans</option>
      <option value="M21">Moins de 21 ans</option>
      <option value="Départemental">Départemental</option>
      <option value="Régional">Régional</option>
      <option value="BLVB">BLVB</option>
    </select>}
  </div>;

  //POULE ou GROUPE
  const groupSelection = <div className="create_team_form_group">
    <label className="black_text create_team_item_label_frame">Groupe / Poule:</label>
    {championship === "M9" || championship === "M11" || championship === "M13" || championship === "M15" || championship === "M17" || championship === "M18" || championship === "M21" ? <select onChange={(e) => setGroup(e.target.value)} className="team_input team_input_medium_width " id="group" value={group} name="group" >
      <option hidden value="">Sélectionner</option>
      {/* RIEN */}
      <option value="Poule A">Poule A</option>
      <option value="Poule B">Poule B</option>
      <option value="Poule C">Poule C</option>
    </select> : championship === "Départemental" ? <select onChange={(e) => setGroup(e.target.value)} className="team_input team_input_medium_width " id="group" value={group} name="group" >
      <option hidden value="">Sélectionner</option>
      <option value="Départemental 1">Départemental 1</option>
      <option value="Départemental 2">Départemental 2</option>
      <option value="Départemental 3">Départemental 3</option>
    </select> : championship === "Régional" ? <select onChange={(e) => setGroup(e.target.value)} className="team_input team_input_medium_width " id="group" value={group} name="group" >
      <option hidden value="">Sélectionner</option>
      <option value="Régional 1">Régional 1</option>
      <option value="Régional 2">Régional 2</option>
      <option value="Régional 3">Régional 3</option>
    </select> : championship === "BLVB" ? <select onChange={(e) => setGroup(e.target.value)} className="team_input team_input_medium_width " id="group" value={group} name="group" >
      <option hidden value="">Sélectionner</option>
      <option value="Poule A">Poule A</option>
      <option value="Poule B">Poule B</option>
      <option value="Poule C">Poule C</option>
    </select> : <select onChange={(e) => setGroup(e.target.value)} className="team_input team_input_medium_width " id="group" value={group} name="group" >
      <option hidden value="">Sélectionner</option>
      <option value="Départemental 1">Départemental 1</option>
      <option value="Départemental 2">Départemental 2</option>
      <option value="Départemental 3">Départemental 3</option>
      <option value="Régional 1">Régional 1</option>
      <option value="Régional 2">Régional 2</option>
      <option value="Régional 3">Régional 3</option>
      <option value="Poule A">Poule A</option>
      <option value="Poule B">Poule B</option>
      <option value="Poule C">Poule C</option>
    </select>}
  </div>;

  const teamNumberSelection = <div className="create_team_form_group">
    <div className="black_text create_team_item_label_frame" style={{ display: "flex", flexDirection: "column" }}>
      <p>N° de l'équipe</p>
      <p style={{ fontSize: "10px" }}>(si plusieurs équipes dans la même Catégorie/Championnat/Poule)</p>
    </div>
    <select onChange={(e) => setTeamNumber(e.target.value)} className="team_input team_input_medium_width " id="team-number" value={teamNumber} name="team-number" >
      <option hidden value="">Sélectionner</option>
      <option value="Équipe 1">Équipe 1</option>
      <option value="Équipe 2">Équipe 2</option>
      <option value="Équipe 3">Équipe 3</option>
    </select>
  </div>

  //FORMAT DE COMPETITION
  const competitionFormatSelection = <div className="create_team_form_group">
    <label className="black_text create_team_item_label_frame">Format de compétition:</label>
    <select onChange={(e) => setFormat(e.target.value)} className="team_input team_input_medium_width " id="format" value={format} name="format" >
      <option hidden value="">Sélectionner</option>
      <option value="2x2">2x2</option>
      <option value="3x3">3x3</option>
      <option value="4x4">4x4</option>
      <option value="5x5">5x5</option>
      <option value="6x6">6x6</option>
    </select>
  </div>;

  //NOM DE L'ÉQUIPE
  const teamNameInput = <div className="create_team_form_group" >
    <div className="black_text create_team_item_label_frame" style={{ display: "flex", flexDirection: "column" }}>
      <p>Nom de l'équipe:</p>
      <p style={{ fontSize: "10px" }}>(uniquement pour le championnat BLVB)</p>
    </div>
    <input onChange={(e) => setTeamName(e.target.value)} className="team_input team_input_medium_width" id="team_name" name="team-name" value={teamName} placeholder="Nom de l'équipe" />
  </div>;

  //FORMAT FILLES / GARÇONS / MIXTE
  const teamGenderSelection = <div className="create_team_form_group" >
    <p className="black_text create_team_item_label_frame">Genre:</p>
    <div className="">
      <label onClick={(e) => setGender(e.target.value)} className="teamGender_item">
        <input style={{ marginRight: "10px" }} type="radio" name="teamGender" value="Fille" />
        Fille
      </label>
      <label onClick={(e) => setGender(e.target.value)} className="teamGender_item">
        <input style={{ marginRight: "10px" }} type="radio" name="teamGender" value="Garçon" />
        Garçon
      </label>
      <label onClick={(e) => setGender(e.target.value)} className="teamGender_item">
        <input style={{ marginRight: "10px" }} type="radio" name="teamGender" value="Mixte" />
        Mixte
      </label>
    </div>
  </div>;

  //DONNÉES DU COACH DE L'ÉQUIPE
  const teamCoach = <div className="create_team_form_group">
    <label htmlFor="coachData" className="black_text create_team_item_label_frame">Coach:</label>
    <input onChange={(e) => setCoachFirstName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "20px" }} value={coachFirstName} id="coach-first-name" name="ccoach-first-name" placeholder="Prénom" />
    <input onChange={(e) => setCoachLastName(e.target.value)} className="team_input team_input_short_width" value={coachLastName} id="coach-last-name" name="coach-last-name" placeholder="Nom" />
  </div>;

  //NOM ET PRÉNOM DES JOUEURS DE L'ÉQUIPE
  const teamMembers = <div className="create_team_form_group">
    <label htmlFor="playerData" className="black_text create_team_item_label_frame" >Joueurs / Joueuses:</label>
    <div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">1:</p>
        <input onChange={(e) => setPlayer1FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player1FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer1LName(e.target.value)} className="team_input team_input_short_width" value={player1LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">2:</p>
        <input onChange={(e) => setPlayer2FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player2FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer2LName(e.target.value)} className="team_input team_input_short_width" value={player2LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">3:</p>
        <input onChange={(e) => setPlayer3FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player3FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer3LName(e.target.value)} className="team_input team_input_short_width" value={player3LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">4:</p>
        <input onChange={(e) => setPlayer4FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player4FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer4LName(e.target.value)} className="team_input team_input_short_width" value={player4LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">5:</p>
        <input onChange={(e) => setPlayer5FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player5FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer5LName(e.target.value)} className="team_input team_input_short_width" value={player5LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">6:</p>
        <input onChange={(e) => setPlayer6FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player6FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer6LName(e.target.value)} className="team_input team_input_short_width" value={player6LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">7:</p>
        <input onChange={(e) => setPlayer7FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player7FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer7LName(e.target.value)} className="team_input team_input_short_width" value={player7LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">8:</p>
        <input onChange={(e) => setPlayer8FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player8FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer8LName(e.target.value)} className="team_input team_input_short_width" value={player8LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">9:</p>
        <input onChange={(e) => setPlayer9FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player9FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer9LName(e.target.value)} className="team_input team_input_short_width" value={player9LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">10:</p>
        <input onChange={(e) => setPlayer10FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player10FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer10LName(e.target.value)} className="team_input team_input_short_width" value={player10LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">11:</p>
        <input onChange={(e) => setPlayer11FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player11FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer11LName(e.target.value)} className="team_input team_input_short_width" value={player11LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">12:</p>
        <input onChange={(e) => setPlayer12FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player12FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer12LName(e.target.value)} className="team_input team_input_short_width" value={player12LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">13:</p>
        <input onChange={(e) => setPlayer13FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player13FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer13LName(e.target.value)} className="team_input team_input_short_width" value={player13LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">14:</p>
        <input onChange={(e) => setPlayer14FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player14FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer14LName(e.target.value)} className="team_input team_input_short_width" value={player14LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">15:</p>
        <input onChange={(e) => setPlayer15FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player15FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer15LName(e.target.value)} className="team_input team_input_short_width" value={player15LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
      <div className="create_team_player_input_frame">
        <p className="create_team_player_input_number">16:</p>
        <input onChange={(e) => setPlayer16FName(e.target.value)} className="team_input team_input_short_width" style={{ marginRight: "5px" }} value={player16FName} id="playerData" name="playerData" placeholder="Prénom" />
        <input onChange={(e) => setPlayer16LName(e.target.value)} className="team_input team_input_short_width" value={player16LName} id="playerData" name="playerData" placeholder="Nom" />
      </div>
    </div>
  </div>




  const teamPictureUpload = <div className="create_team_form_group">
    <label className="black_text create_team_item_label_frame">Photo de l'équipe:</label>
    {teamPicturePreview === "" || teamPicturePreview === null ? <img className="team_picture" width={150} height={100} alt="Aucune photo" /> : <img className="" src={teamPicturePreview} width={150} height={100} alt="" />}
    <div className="team_picture_uplaod">
      <input onChange={onTeamPictureChange} type="file" id="team-picture-upload" name="team-picture-upload" />
    </div>
  </div>;



  return (
    <div className="bo_create_teams_big_frame">
      <p className="red_title">Créer une équipe</p>
      <div className="creation_frame">
        {teamSeasonStart}
        {teamSeasonEnd}
        {teamCategorySelection}
        {championshipSelection}
        {competitionFormatSelection}
        {groupSelection}
        {teamNumberSelection}
        {teamGenderSelection}
        {teamNameInput}
        {teamCoach}
        {teamMembers}
        {teamPictureUpload}
        {teamCreationValidationButton}
        {errorsMessage}
        {successMessage}
      </div>
    </div>
  )

};

export default CreateTeams;
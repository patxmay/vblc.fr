import { useState } from "react";
import "../../styles/backOffice/createVblcBeachSection.css";


function CreateVblcBeachSection() {

  const [title, setTitle] = useState("");

  const [coach1FirstName, setCoach1FirstName] = useState("");
  const [coach1LastName, setCoach1LastName] = useState("");
  const [coach1PictureUrl, setCoach1PictureUrl] = useState("");
  const [coach1PictureId, setCoach1PictureId] = useState("");
  const [coach1Qualification, setCoach1Qualification] = useState("")
  const [coach1PictureSelected, setCoach1PictureSelected] = useState("")
  const [coach1PicturePreview, setCoach1PicturePreview] = useState("");



  const [coach2FirstName, setCoach2FirstName] = useState("");
  const [coach2LastName, setCoach2LastName] = useState("");
  const [coach2PictureUrl, setCoach2PictureUrl] = useState("");
  const [coach2PictureId, setCoach2PictureId] = useState("");
  const [coach2Qualification, setCoach2Qualification] = useState("")
  const [coach2PictureSelected, setCoach2PictureSelected] = useState("")
  const [coach2PicturePreview, setCoach2PicturePreview] = useState("")

  const [place, setPlace] = useState("");
  const [period1, setPeriod1] = useState("");
  const [period2, setPeriod2] = useState("");
  const [day1, setDay1] = useState("");
  const [day2, setDay2] = useState("");

  const [subscription, setSubscription] = useState("");
  const [fees, setFees] = useState("");


  const [successList, setSuccessList] = useState([]);
  const [errorsList, setErrorsList] = useState([]);


  //FONCTION DE VALIDATION DE LA CREATION DES DONNÉES DE VBLC BEACH SECTION (ENVOI DES DONNÉES DANS LE BACKEND POUR ENREGISTREMENT DANS LA BASE DE DONNÉES)
  const validadteVblcBeachCreation = async () => {
    const beachSectionToCreate = await fetch('/beachRoute/create', {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titleFromFront=${title}&coach1FirstNameFromFront=${coach1FirstName}&coach1LastNameFromFront=${coach1LastName}&coach1QualificationFromFront=${coach1Qualification}&coach1PictureUrlFromFront=${coach1PictureUrl}&coach1PictureIdFromFront=${coach1PictureId}&coach2FirstNameFromFront=${coach2FirstName}&coach2LastNameFromFront=${coach2LastName}&coach2QualificationFromFront=${coach2Qualification}&coach2PictureUrlFromFront=${coach2PictureUrl}&coach2PictureIdFromFront=${coach2PictureId}&placeFromFront=${place}&period1FromFront=${period1}&period2FromFront=${period2}&day1FromFront=${day1}&day2FromFront=${day2}&subscriptionFromFront=${subscription}&feesFromFront=${fees}`
    });

    const body = await beachSectionToCreate.json();

    if (body.result === true) {
      setTitle("")
      setCoach1FirstName("");
      setCoach1LastName("");
      setCoach1PictureUrl("");
      setCoach1PictureId("");
      setCoach1Qualification("");
      setCoach1PictureSelected("");
      setCoach1PicturePreview("");
      setCoach2FirstName("");
      setCoach2LastName("");
      setCoach2PictureUrl("");
      setCoach2PictureId("");
      setCoach2Qualification("");
      setCoach2PictureSelected("");
      setCoach2PicturePreview("");
      setPlace("");
      setPeriod1("");
      setPeriod2("");
      setDay1("");
      setDay2("");
      setSubscription("");
      setFees("");

      setSuccessList(body.success);
      setErrorsList([]);
    } else {
      setErrorsList(body.errors);
      setSuccessList([])
    }
  };
  //AFFICHAGE DES ERRORS LORS DE L'ENREGISTREMENT DES DONNÉES DANS LA BASE DE DONNÉES
  const errorsMessage = errorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });

  //AFFICHAGE DU MESSAGE SI SUCCES LORS DE L'ENREGISTREMENT DES DONNÉES DANS LA BASE DE DONNÉES
  const successMessage = successList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });

  //SECTION TITLE
  const titleForSection = <div className="create_vblc_beach_section_form_group">
    <label htmlFor="titleForSection" className="black_text create_vblc_beach_section_label_frame">Title de la section:</label>
    <select onChange={(e) => setTitle(e.target.value)} value={title} id="training day 1" name="training day 1" type="select" className="vblc_beach_section_input vblc_beach_section_medium_width" placeholder="Section V.B.L.C Beach-Volley">
      <option hidden value="">Sélectionner</option>
      <option value="Section V.B.L.C Beach-Volley">Section V.B.L.C Beach-Volley</option>
      <option value="Section Initiation au Beach-Volley">Section Initiation au Beach-Volley</option>
    </select>
  </div>


  //DONNÉES DU COACH 1
  const coach1Data = <div className="create_vblc_beach_section_form_group">
    <label htmlFor="coach1Data" className="black_text create_vblc_beach_section_label_frame">Coach 1:</label>
    <input onChange={(e) => setCoach1FirstName(e.target.value)} className="vblc_beach_section_input vblc_beach_section_short_width" style={{ marginRight: "20px" }} value={coach1FirstName} id="coach-first-name" name="ccoach-first-name" placeholder="Prénom" />
    <input onChange={(e) => setCoach1LastName(e.target.value)} className="team_input vblc_beach_section_short_width" value={coach1LastName} id="coach-last-name" name="coach-last-name" placeholder="Nom" />
  </div>

    //QUALIFICATION DU COACH 2
    const coach1QualificationData = <div className="create_vblc_beach_section_form_group">
    <label htmlFor="coach2Qualification" className="black_text create_vblc_beach_section_label_frame">Diplôme coach 1:</label>
    <input onChange={(e) => setCoach1Qualification(e.target.value)} className="vblc_beach_section_input vblc_beach_section_medium_width" value={coach1Qualification} id="coach1-qualification" name="coach1-qualification" placeholder="Diplômé d'état FFVB" />
  </div>

  //UPLOAD DE LA PHOTO DU COACH 1
  const onCoach1PictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCoach1PicturePreview(URL.createObjectURL(event.target.files[0])) // Prévisualisation
      setCoach1PictureSelected(event.target.files[0]) // préparation à l'enregistrement sur cloudinary
    }
  };

  const uploadCoach1PictureToCloudinary = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", coach1PictureSelected);
    formData.append("upload_preset", "gj6ckq1o");
    formData.append("cloud_name", "dummxlbjp");
    formData.append("folder", "vblc-beach-section");

    fetch(
      `https://api.cloudinary.com/v1_1/dummxlbjp/image/upload`, {
      method: "POST",
      body: formData
    })
      .then(resp => resp.json())
      .then(formData => {
        setCoach1PictureUrl(formData.url);
        setCoach1PictureId(formData.public_id);
      })
      .catch(err => console.log(err))
  }

  //Button d'enregistrement de la photo du coach 1
  const coach1PictureUploadButton = coach1PictureSelected !== "" ? <button onClick={uploadCoach1PictureToCloudinary} className="coach_1_picture_upload_button coach_1_picture_upload_button_activated">Enregistrer la photo Coach 1</button> : <button className="coach_1_picture_upload_button">Enregistrer la photo Coach 1</button>

  //Message d'enregistrement de la photo du coach 1
  const coach1PictureUploadMessage = coach1PictureUrl !== "" && coach1PictureId !== "" && coach1PictureUrl !== undefined && coach1PictureId !== undefined ? <p style={{ fontSize: "12px", color: "green" }}>La photo du coach 1 a bien été enregistrée.</p> : <p style={{ fontSize: "12px", color: "red" }}>Enregistrer la photo du coach 1 avant la validation du formulaire.</p>

  const coach1PictureUpload = <div className="create_vblc_beach_section_form_group">
    <label htmlFor="coach 1 picture" className="black_text create_vblc_beach_section_label_frame">Photo coach 1:</label>
    {coach1PicturePreview === "" || coach1PicturePreview === null ? <img className="coach_picture_shape" alt="" /> : <img src={coach1PicturePreview} className="coach_picture_shape" alt="" />}
    <div className="coach_picture_uplaod">
      <input onChange={onCoach1PictureChange} type="file" id="coach picture updload" name="coach picture updload" />
      {coach1PictureUploadButton}
      <div style={{ width: "150px" }}>
        {coach1PictureUploadMessage}
      </div>
    </div>
  </div>

  //DONNÉES DU COACH 2
  const coach2Data = <div className="create_vblc_beach_section_form_group">
    <label htmlFor="coach2Data" className="black_text create_vblc_beach_section_label_frame">Coach 2:</label>
    <input onChange={(e) => setCoach2FirstName(e.target.value)} className="vblc_beach_section_input vblc_beach_section_short_width" style={{ marginRight: "20px" }} value={coach2FirstName} id="coach-first-name" name="ccoach-first-name" placeholder="Prénom" />
    <input onChange={(e) => setCoach2LastName(e.target.value)} className="vblc_beach_section_input vblc_beach_section_short_width" value={coach2LastName} id="coach-last-name" name="coach-last-name" placeholder="Nom" />
  </div>

  //QUALIFICATION DU COACH 2
  const coach2QualificationData = <div className="create_vblc_beach_section_form_group">
    <label htmlFor="coach2Qualification" className="black_text create_vblc_beach_section_label_frame">Diplôme coach 2:</label>
    <input onChange={(e) => setCoach2Qualification(e.target.value)} className="vblc_beach_section_input vblc_beach_section_medium_width" value={coach2Qualification} id="coach2-qualification" name="coach2-qualification" placeholder="Diplômé d'état FFVB" />
  </div>


  //UPLOAD DE LA PHOTO DU COACH 2
  const onCoach2PictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCoach2PicturePreview(URL.createObjectURL(event.target.files[0])) // Prévisualisation
      setCoach2PictureSelected(event.target.files[0]) // préparation à l'enregistrement sur cloudinary
    }
  };

  const uploadCoach2PictureToCloudinary = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", coach2PictureSelected);
    formData.append("upload_preset", "gj6ckq1o");
    formData.append("cloud_name", "dummxlbjp");
    formData.append("folder", "vblc-beach-section");

    fetch(
      `https://api.cloudinary.com/v1_1/dummxlbjp/image/upload`, {
      method: "POST",
      body: formData
    })
      .then(resp => resp.json())
      .then(formData => {
        setCoach2PictureUrl(formData.url);
        setCoach2PictureId(formData.public_id);
      })
      .catch(err => console.log(err))
  }

  //Button d'enregistrement de la photo du coach 2
  const coach2PictureUploadButton = coach2PictureSelected !== "" ? <button onClick={uploadCoach2PictureToCloudinary} className="coach_1_picture_upload_button coach_1_picture_upload_button_activated">Enregistrer la photo Coach 2</button> : <button className="coach_1_picture_upload_button">Enregistrer la photo Coach 2</button>

  //Message d'enregistrement de la photo du coach 2
  const coach2PictureUploadMessage = coach2PictureUrl !== "" && coach2PictureId !== "" && coach1PictureUrl !== undefined && coach2PictureId !== undefined ? <p style={{ fontSize: "12px", color: "green" }}>La photo du coach 2 a bien été enregistrée.</p> : <p style={{ fontSize: "12px", color: "red" }}>Enregistrer la photo du coach 2 avant la validation du formulaire.</p>

  const coach2PictureUpload = <div className="create_vblc_beach_section_form_group">
    <label htmlFor="coach 1 picture" className="black_text create_vblc_beach_section_label_frame">Photo coach 2:</label>
    {coach2PicturePreview === "" || coach2PicturePreview === null ? <img className="coach_picture_shape" alt=""/> : <img src={coach2PicturePreview} className="coach_picture_shape" alt="" />}
    <div className="coach_picture_uplaod">
      <input onChange={onCoach2PictureChange} type="file" id="coach picture updload" name="coach picture updload" />
      {coach2PictureUploadButton}
      <div style={{ width: "150px" }}>
        {coach2PictureUploadMessage}
      </div>
    </div>
  </div>


  //LIEU DES ENTRAINEMENTS
  const beachTrainingPlace = <div>
    <div className="create_vblc_beach_section_form_group">
      <label htmlFor="training place" className="black_text create_vblc_beach_section_label_frame" >Lieu de l'entrainement:</label>
      <input onChange={(e) => setPlace(e.target.value)} value={place} id="training place" name="training place" className="vblc_beach_section_input vblc_beach_section_medium_width" placeholder="Plage de Socoa" />
    </div>
  </div>

  //PÉRIODE DES ENTRAINEMENT DE LA SECTION VBLC BEACH
  const beachTrainingPeriod1 = <div>
    <div className="create_vblc_beach_section_form_group">
      <label htmlFor="training period 1" className="black_text create_vblc_beach_section_label_frame">Période 1:</label>
      <input onChange={(e) => setPeriod1(e.target.value)} value={period1} id="training period 1" name="training period 1" className="vblc_beach_section_input vblc_beach_section_medium_width" placeholder="Du 1er Avril au 31 Juillet 2024" />
    </div>
  </div>

    //PÉRIODE DES ENTRAINEMENT DE LA SECTION VBLC BEACH
    const beachTrainingPeriod2 = <div>
    <div className="create_vblc_beach_section_form_group">
      <label htmlFor="training period 2" className="black_text create_vblc_beach_section_label_frame">Période 2:</label>
      <input onChange={(e) => setPeriod2(e.target.value)} value={period2} id="training period 2" name="training period 2" className="vblc_beach_section_input vblc_beach_section_medium_width" placeholder="Du 15 Août au 31 Octobre 2024" />
    </div>
  </div>

  //JOUR 1 DES ENTRAINEMENTS
  const beachTrainingDay1AndHour = <div>
    <div className="create_vblc_beach_section_form_group">
      <label htmlFor="training day 1" className="black_text create_vblc_beach_section_label_frame">Jour d'entrainement 1:</label>
      <input onChange={(e) => setDay1(e.target.value)} value={day1} id="training day 1" name="training day 1" className="vblc_beach_section_input vblc_beach_section_medium_width" placeholder="Jeudi: de 18h30 à 20h00" />
    </div>
  </div>

  //JOUR 2 DES ENTRAINEMENTS
  const beachTrainingDay2AndHour = <div>
    <div className="create_vblc_beach_section_form_group">
      <label htmlFor="training day 2" className="black_text create_vblc_beach_section_label_frame">Jour d'entrainement 2:</label>
      <input onChange={(e) => setDay2(e.target.value)} value={day2} id="training day 2" name="training day 2" className="vblc_beach_section_input vblc_beach_section_medium_width" placeholder="Samedi: de 10h00 à 12h00" />
    </div>
  </div>

  //CONTACT DE LA SECTION VBLC BEACH
  const beachContactEmail = <div>
    <div className="create_vblc_beach_section_form_group">
      <label htmlFor="beach contact e-mail" className="black_text create_vblc_beach_section_label_frame">Inscription:</label>
      <input onChange={(e) => setSubscription(e.target.value)} value={subscription} id="beach contact e-mail" name="beach contact e-mail" className="vblc_beach_section_input vblc_beach_section_medium_width" placeholder="vblcbeach@gmail.com" />
    </div>
  </div>

  //COTISATION DE LA SECTION VBLC BEACH POUR LES MEMBRES DE VBLC
  const beachFees = <div>
    <div className="create_vblc_beach_section_form_group">
      <label htmlFor="fees" className="black_text create_vblc_beach_section_label_frame">Cotisation en €:</label>
      <input onChange={(e) => setFees(e.target.value)} value={fees} id="member fees" name="fees" className="vblc_beach_section_input vblc_beach_section_medium_width" placeholder="V.B.L.C: 20€ / Extérieur: 50€" />
    </div>
  </div>



  //BOUTON DE VALIDATION DU FORMULAIRE
  const formValidationButton = (coach1PictureUrl !== "" && coach1PictureUrl !== undefined) || (coach1PictureId !== "" && coach1PictureId !== undefined) ? <button onClick={() => validadteVblcBeachCreation()} className="coach_1_picture_upload_button coach_1_picture_upload_button_activated">Enregistrer les informations</button> : <button className="coach_1_picture_upload_button">Enregistrer les informations</button>


  return (
    <div className="bo_create_vblc_beach_section_big_frame">
      <p className="red_title">Saisir les informations de la Section V.B.L.C Beach & Summer Beach</p>
      <p style={{ color: "red" }}>Pour modifier les informations, veuillez utiliser l'écran "Modifier les informations".</p>
      <div className="vblc_beach_section_creation_frame">
        {titleForSection}
        {coach1Data}
        {coach1QualificationData}
        {coach1PictureUpload}
        {coach2Data}
        {coach2QualificationData}
        {coach2PictureUpload}
        {beachTrainingPlace}
        {beachTrainingPeriod1}
        {beachTrainingPeriod2}
        {beachTrainingDay1AndHour}
        {beachTrainingDay2AndHour}
        {beachContactEmail}
        {beachFees}

      </div>
      {errorsMessage}
      {successMessage}

      {formValidationButton}

    </div>
  )
};

export default CreateVblcBeachSection;
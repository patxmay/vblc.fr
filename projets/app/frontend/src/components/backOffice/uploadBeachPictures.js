import { useState, useEffect } from "react"
import "../../styles/backOffice/uploadBeachPictures.css"


function UploadBeachPictures() {

  const [bothSections, setBothSections] = useState([])

  const [selectedSection, setSelectedSection] = useState("")
  const [selectedSectionIndex, setSelectedSectionIndex] = useState("")
  const [selectedSectionId, setSelectedSectionId] = useState("")

  const [beachPicturePreview, setBeachPicturePreview] = useState("")
  const [beachPictureSelected, setBeachPictureSelected] = useState("")

  const [beachPictureUrl, setBeachPictureUrl] = useState("")
  const [beachPictureId, setBeachPictureId] = useState("")

  const [uploadBeachPictureErrors, setUploadBeachPictureErrors] = useState([]);
  const [uploadBeachPictureSuccess, setUploadBeachPictureSucces] = useState([])

  const [selectedPictureIndex, setSelectedPictureIndex] = useState("")
  const [selectedPictureId, setSelectedPictureId] = useState("")
  const [selectedPicture, setSelectedPicture] = useState("")

  const [deleteBeachPitureErrors, setDeleteBeachPitureError] = useState([]);
  const [deleteBeachPitureSuccess, setDeleteBeachPictureSuccess] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("vblcBeachData"))
    if (items) {
      setBothSections(items)
    }
  }, []);

  //******************** PARTIE POUR LA SÉLECTION DE LA SECTION VBLC BEACH ********************

  // Sélection de la section
  const handleSelectThisSection = (e, index) => {
    setSelectedSection(e)
    setSelectedSectionId(e._id)
    setSelectedSectionIndex(index)
  };

  const selectBeachSectionCards = bothSections.map((e, index) => {
    return (
      <div key={index} onClick={() => handleSelectThisSection(e, index)} className={`card ${index === selectedSectionIndex ? "card_selected" : " card"}`}>
        <p>{e.title}</p>
      </div>
    )
  });

  //******************** PARTIE POUR UPLOADER UNE PHOTO DANS LA SECTION VBLC BEACH ********************
  // Sélection de la photo
  const onBeachPictureChange = (event) => {
    setUploadBeachPictureErrors([]);
    setUploadBeachPictureSucces([]);
    if (event.target.files || event.target.files[0]) {
      setBeachPicturePreview(URL.createObjectURL(event.target.files[0])); // Prévisualisation
      setBeachPictureSelected(event.target.files[0]) // préparation à l'enregistrement sur cloudinary
    }
  };

  // Fonction d'enregistrement dans CLOUDINARY
  const uploadABeachPictureToCloudinary = (e) => {
    //e.preventDefault();
    const formData = new FormData();
    formData.append("file", beachPictureSelected);
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
        setBeachPictureUrl(formData.url);
        setBeachPictureId(formData.public_id);
      })
      .catch(err => console.log(err))
  };

  //Enregistrement automatique de l'url et de l'id de la photo dans Mongo DB
  useEffect(() => {
    if (beachPictureId !== "" && beachPictureUrl !== "") {
      uploadBeachPictureToMongoDB()
    }
  }, [beachPictureId])

  // Fonction d'enregistrement de la photo dans Mongo DB
  const uploadBeachPictureToMongoDB = async () => {
    const beachPhotoToUpload = await fetch(`/beachRoute/uploadBeachPicture?_id=${selectedSectionId}`,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `beachPictureUrlFromFront=${beachPictureUrl}&beachPictureIdFromFront=${beachPictureId}`
      }
    );

    const body = await beachPhotoToUpload.json()

    if (body.result === true) {
      // setSelectedSection("")
      setSelectedSectionId("")
      setSelectedSectionIndex("")

      setBeachPicturePreview("");
      setBeachPictureSelected("");

      setBeachPictureUrl("");
      setBeachPictureId("");

      setUploadBeachPictureErrors([]);
      setUploadBeachPictureSucces(body.success);
    } else {
      setUploadBeachPictureErrors(body.errors);
      setUploadBeachPictureSucces([]);
    }
  };

  const uploadBeachPictureErrorsMessage = uploadBeachPictureErrors.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "15px", textAlign: "center" }}>{errors}</p>
    )
  });

  const uploadBeachPictureSuccessMessage = uploadBeachPictureSuccess.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "15px", textAlign: "center" }}>{success}</p>
    )
  });

  // UI de l'upload d'un photo de la section VBLC Beach
  const uploadPicturePart = selectedSection !== "" && selectedSection !== undefined ? <div className="upload_beach_picture_sections">
    <p className="black_text">Pour uploader une photo dans la section sélectionnée ci-dessus:</p>
    <div className="upload_big_frame">
      <div className="upload_a_picture">
        {beachPicturePreview === "" || beachPicturePreview === null ? <div className="picture_shape" /> : <img src={beachPicturePreview} className="picture_shape" alt="" />}
        <input onChange={onBeachPictureChange} type="file" id="beach picture" name="beach picture" />
      </div>
      {uploadBeachPictureErrorsMessage}
      {uploadBeachPictureSuccessMessage}
      <div className="upload_beach_picture_button_mongodb_frame">
        <button onClick={() => uploadABeachPictureToCloudinary()} className={`upload_beach_picture_button_mongodb ${beachPictureSelected !== "" && beachPictureSelected !== undefined && selectedSection !== "" && selectedSection !== undefined ? "upload_beach_picture_button_mongodb_activated" : "upload_beach_picture_button_mongodb"}`}>Envoyer la photo</button>
      </div>
    </div>
  </div> : <div />


  // ******************** PARTIE POUR LA SUPPRESSION D'UNE PHOTO BEACH SECTION ********************
  // Fonction de sélection de la photo à supprimer
  const handleSelectdPictureToDelete = (e, index) => {
    setSelectedPictureIndex(index);
    setSelectedPictureId(e._id);
    setSelectedPicture(e);
  };

  // Fonction suppression de la photo de la base de média Cloudinary
  const deleteSelectedPictureFromCloudinary = async () => {
    if (selectedPicture !== "") {
      await fetch(`/beachRoute/deleteSelectedPictureFromCloudinary?_id=${selectedPicture.pictureId}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `pictureIdFromFront=${selectedPicture.pictureId}`
      })
    } else {
      console.log("*** Aucune photo actuellement dans Cloudinary")
    }
  };

  // Fonction de supression de la photo de la base de données Mongo DB
  const deleteSelectedPictureFromMongoDB = async () => {
    console.log ("*** SELECTED PICTURE ID ***", selectedPictureId)
    console.log ("*** SELECTED PICTURE.PICTUREID ***", selectedPicture.pictureId)
    
    const deletePicture = await fetch(`/beachRoute/deleteSelectedPictureFromMongoDB?_id=${selectedSectionId}`,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `pictureIdFromFront=${selectedPicture.pictureId}`
      }
    )

    const body = await deletePicture.json()

    if (body.result === true) {
      setDeleteBeachPictureSuccess(body.success)
      setDeleteBeachPitureError([])
      console.log("Le photo sélectionnée a bien été supprimée.")
    } else {
      setDeleteBeachPitureError(body.errors)
      setDeleteBeachPictureSuccess([])
    }
  };

  const deleteBeachPictureErrorsMessage = deleteBeachPitureErrors.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "15px", textAlign: "center" }}>{errors}</p>
    )
  });

  const deleteBeachPictureSuccessMessage = deleteBeachPitureSuccess.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "15px", textAlign: "center" }}>{success}</p>
    )
  });

  // Fonction de supression simultanée de la photo de la base des média Cloudinary et de la base de données Mongo DB 
  const handleDeleteThisPicture = () => {
    deleteSelectedPictureFromCloudinary()
    deleteSelectedPictureFromMongoDB()
  };

  // UI du management des photos de la section VBLC Beach
  const deletePicturePart = selectedSection !== "" && selectedSection !== undefined ? <div className="upload_beach_picture_sections">
    <p className="black_text">Pour supprimer une photo de la section sélectionnée ci-dessus:</p>
    <div className="upload_big_frame">
      <div className="pictures_frame">
        {selectedSection.pictures.map((e, index) => {
          return (
            <div key={index} onClick={() => handleSelectdPictureToDelete(e, index)} className={`picture_to_delete ${index === selectedPictureIndex ? "picture_to_delete_selected" : "picture_to_delete"}`}>
              <img src={e.pictureUrl} width={200} alt="" />
            </div>
          )
        })}
      </div>
      {deleteBeachPictureErrorsMessage}
      {deleteBeachPictureSuccessMessage}
      <div className="picture_delete_button_frame">
        {selectedPictureIndex !== "" && selectedPictureIndex !== undefined ? <button onClick={() => handleDeleteThisPicture()} className="delete_picture_button delete_picture_button_activated" >Supprimer la photo sélectionnée</button> : <button className="delete_picture_button" >Supprimer la photo sélectionnée</button>}
      </div>
    </div>
  </div> : <div />

  return (
    <div className="bo_upload_beach_picture_section_big_frame">
      <p className="red_title">Upload des photos de la section V.B.L.C Beach-Volley</p>
      <div className="upload_beach_picture_sections">
        <p className="black_text">Sélectionner la section:</p>
        <div className="card_big_frame">
          {selectBeachSectionCards}
        </div>
      </div>
      {uploadPicturePart}
      {deletePicturePart}
    </div>
  )
};

export default UploadBeachPictures;
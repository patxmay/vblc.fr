import { useState, useEffect } from "react";
import "../../styles/backOffice/editVblcBeachSection.css";


function EditVblcBeachSection() {

  const [bothSections, setBothSections] = useState([]);

  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(-1);
  const [selectedSectionId, setSelectedSectionId] = useState("");

  const [modifyCoach1, setModifyCoach1] = useState(false);
  const [modifyCoach1Qualification, setModifyCoach1Qualification] = useState(false);
  const [modifyCoach1Picture, setModifyCoach1Picture] = useState(false);

  const [modifyCoach2, setModifyCoach2] = useState(false);
  const [modifyCoach2Qualification, setModifyCoach2Qualification] = useState(false);
  const [modifyCoach2Picture, setModifyCoach2Picture] = useState(false);
  const [modifyPeriod1, setModifyPeriod1] = useState(false);
  const [modifyPeriod2, setModifyPeriod2] = useState(false);
  const [modifyDay1, setModifyDay1] = useState(false);
  const [modifyDay2, setModifyDay2] = useState(false);
  const [modifySubscription, setModifySubscription] = useState(false);
  const [modifyFees, setModifyFees] = useState(false);

  const [modifyPlace, setModifyPlace] = useState(false)

  const [coach1FirstName, setCoach1FirstName] = useState("");
  const [coach1LastName, setCoach1LastName] = useState("");
  const [coach1PictureUrl, setCoach1PictureUrl] = useState("");
  const [coach1PictureId, setCoach1PictureId] = useState("");
  const [coach1Qualification, setCoach1Qualification] = useState("");
  const [coach1PictureSelected, setCoach1PictureSelected] = useState("");
  const [coach1PicturePreview, setCoach1PicturePreview] = useState("");

  const [coach2FirstName, setCoach2FirstName] = useState("");
  const [coach2LastName, setCoach2LastName] = useState("");
  const [coach2PictureUrl, setCoach2PictureUrl] = useState("");
  const [coach2PictureId, setCoach2PictureId] = useState("");
  const [coach2Qualification, setCoach2Qualification] = useState("");
  const [coach2PictureSelected, setCoach2PictureSelected] = useState("");
  const [coach2PicturePreview, setCoach2PicturePreview] = useState("");

  const [place, setPlace] = useState("");
  const [period1, setPeriod1] = useState("");
  const [period2, setPeriod2] = useState("");
  const [day1, setDay1] = useState("");
  const [day2, setDay2] = useState("");

  const [subscription, setSubscription] = useState("");
  const [fees, setFees] = useState("");

  const [coach1ErrorsList, setCoach1ErrorsList] = useState([]);
  const [coach1SuccessList, setCoach1SuccessList] = useState([]);
  const [coach1QualificationErrorsList, setCoach1QualificationErrorsList] = useState([]);
  const [coach1QualificationSuccessList, setCoach1QualificationSuccessList] = useState([]);
  const [coach1PictureUpdateErrorsList, setCoach1PictureUpdateErrorsList] = useState([]);
  const [coach1PictureUpdateSuccessList, setCoach1PictureUpdateSuccessList] = useState([]);

  const [coach2ErrorsList, setCoach2ErrorsList] = useState([]);
  const [coach2SuccessList, setCoach2SuccessList] = useState([]);
  const [coach2QualificationErrorsList, setCoach2QualificationErrorsList] = useState([]);
  const [coach2QualificationSuccessList, setCoach2QualificationSuccessList] = useState([]);
  const [coach2PictureUpdateErrorsList, setCoach2PictureUpdateErrorsList] = useState([]);
  const [coach2PictureUpdateSuccessList, setCoach2PictureUpdateSuccessList] = useState([]);

  const [placeErrorsList, setPlaceErrorsList] = useState([]);
  const [placeSuccessList, setPlaceSuccessList] = useState([]);
  const [period1ErrorsList, setPeriod1ErrorsList] = useState([]);
  const [period1SuccessList, setPeriod1SuccessList] = useState([]);
  const [period2ErrorsList, setPeriod2ErrorsList] = useState([]);
  const [period2SuccessList, setPeriod2SuccessList] = useState([]);
  const [day1ErrorsList, setDay1ErrorsList] = useState([]);
  const [day1SuccessList, setDay1SuccessList] = useState([]);
  const [day2ErrorsList, setDay2ErrorsList] = useState([]);
  const [day2SuccessList, setDay2SuccessList] = useState([]);

  const [subscriptionErrorsList, setSubscriptionErrorsList] = useState([]);
  const [subscriptionSuccessList, setSubscriptionSuccessList] = useState([]);
  const [feesErrorsList, setFeesErrorsList] = useState([]);
  const [feesSuccessList, setFeesSuccessList] = useState([]);


  //DOWN LOAD DES DONNÉES DES SECTIONS BEACH
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("vblcBeachData"))
    if (items) {
      setBothSections(items)
    }
  }, []);

  //FONCTION DE SELECTION DE LA SECTION
  const handleSelectThisSection = (e, index) => {
    setSelectedSection(e)
    setSelectedSectionId(e._id)
    setSelectedSectionIndex(index)
    //IL FAUT VIDER TOUS LES SETTERS, NOTAMMENT LES EMSSAGE D'ERREUR ET DE SUCCESS
    setCoach1SuccessList([]);
    setCoach1ErrorsList([])
    setCoach1QualificationSuccessList([]);
    setCoach1QualificationErrorsList([]);
    setCoach1PictureUpdateSuccessList([]);
    setCoach1PictureUpdateErrorsList([]);
    setCoach2SuccessList([]);
    setCoach2ErrorsList([]);
    setCoach2QualificationSuccessList([]);
    setCoach2QualificationErrorsList([]);
    setCoach2PictureUpdateSuccessList([]);
    setCoach2PictureUpdateErrorsList([]);
    setPlaceSuccessList([]);
    setPlaceErrorsList([]);
    setPeriod1SuccessList([]);
    setPeriod1ErrorsList([]);
    setPeriod2SuccessList([]);
    setPeriod2ErrorsList([]);
    setDay1SuccessList([]);
    setDay1ErrorsList([]);
    setDay2SuccessList([]);
    setDay2ErrorsList([])
    setSubscriptionSuccessList([]);
    setSubscriptionErrorsList([]);
    setFeesSuccessList([]);
    setFeesErrorsList([])
  };

  const selectBeachSectionCards = bothSections.map((e, index) => {
    return (
      <div key={index} onClick={() => handleSelectThisSection(e, index)} className={`card ${index === selectedSectionIndex ? "card_selected" : " card"}`}>
        <p>{e.title}</p>
      </div>
    )
  });

  //FONCTION DE MODIFICATION DU NOM ET PRÉNOM DU COACH 1
  const updateCoach1 = async () => {
    const coach1ToUpdate = await fetch(`/beachRoute/updateCoach1?_id=${selectedSection.coachs[0]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `coach1FirstNameFromFront=${coach1FirstName}&coach1LastNameFromFront=${coach1LastName}`
      }
    );

    const body = await coach1ToUpdate.json()

    if (body.result === true) {
      setCoach1FirstName("");
      setCoach1LastName("")
      setSelectedSection("")
      setSelectedSectionIndex(-1)
      setCoach1SuccessList(body.success);
      setCoach1ErrorsList([])
      setModifyCoach1(false)
    } else {
      setCoach1SuccessList([]);
      setCoach1ErrorsList(body.errors)
    }
  };

  const coach1UpdateErrorsMessage = coach1ErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });
  const coach1UpdateSuccessMessage = coach1SuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });

  //FONCTIOND DE MODIFICATION DE LA QUALIFICATION DU COACH 1
  const updateQualificationCoach1 = async () => {
    const coach1QualificationToUpdate = await fetch(`/beachRoute/updateQualificationCoach1?_id=${selectedSection.coachs[0]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `coach1QualificationFromFront=${coach1Qualification}`
      }
    )
    const body = await coach1QualificationToUpdate.json();

    if (body.result === true) {
      setCoach1Qualification("");
      setSelectedSection("");
      setSelectedSectionIndex(-1);
      setCoach1QualificationSuccessList(body.success);
      setCoach1QualificationErrorsList([]);
      setModifyCoach1Qualification(false);
    } else {
      setCoach1QualificationSuccessList([]);
      setCoach1QualificationErrorsList(body.errors)
    }
  };

  const coach1QualificationUpdateErrorsMessage = coach1QualificationErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });
  const coach1QualificationUpdateSuccessMessage = coach1QualificationSuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });

  //FONCTIOND DE MODIFICATION DE LA PHOTO DU COACH 1
  //Suppression de la photo actuelle du coach 1 dans Cloudinary
  const deleteCoach1CurrentPictureFromCloudinary = async () => {
    const coach1CurrentPictureToDelete = await fetch(`/beachRoute/deleteCoach1CurrentPicture?_id=${selectedSection.coachs[0].pictureId}`,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `coach1CurrentPictureIdFromFront=${selectedSection.coachs[0].pictureId}`
      }
    )

    const body = await coach1CurrentPictureToDelete.json()
  };

  //Sélection et prévisualisation de la nouvelle photo du coach 1 + set dans une variable la photo sélectionnée
  const onCoach1PictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCoach1PicturePreview(URL.createObjectURL(event.target.files[0])) // Prévisualisation
      setCoach1PictureSelected(event.target.files[0]) // préparation à l'enregistrement sur cloudinary
    }
  };

  //Upload de la nouvelle photo du coach 1 dans Cloudinary + récupération de son Id et de son URL Cloudinary
  const uploadCoach1NewPictureToCloudinary = (e) => {
    // e.preventDefault();
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
  };

  //Remplacement de l'url et de l'id de la photo actuelle avec l'url et l'id de la nouvelle dans Mongo DB
  const updateCoach1PictureInMongoDG = async () => {
    const coach1PictureToUpdate = await fetch(`/beachRoute/updateCoach1PictureInMongoDG?_id=${selectedSection.coachs[0]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `coach1PictureUrlFromFront=${coach1PictureUrl}&coach1PictureIdFromFront=${coach1PictureId}`
      }
    )
    const body = await coach1PictureToUpdate.json();

    if (body.result === true) {
      setSelectedSection("");
      setSelectedSectionIndex(-1)
      setCoach1PictureUrl("");
      setCoach1PictureId("");
      setCoach1PictureSelected("");
      setCoach1PicturePreview("");
      setModifyCoach1Picture(false);
      setCoach1PictureUpdateSuccessList(body.success);
      setCoach1PictureUpdateErrorsList([]);
    } else {
      setCoach1PictureUpdateSuccessList([]);
      setCoach1PictureUpdateErrorsList(body.errors);
    }
  };
  const coach1PictureUpdateSuccessMessage = coach1PictureUpdateSuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });
  const coach1PictureUpdateErrorsMessage = coach1PictureUpdateErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  })

  //Fonction d'enregistrement de l'URL et de l'Id la nouvelle photo dans Mongo DB si et seulement si on a récupéré l'URL et l'Id de la nouvelle photo enregistrée dans Cloudinary
  useEffect(() => {
    if (selectedSection !== "") {
      updateCoach1PictureInMongoDG()
    }
  }, [coach1PictureUrl])

  //Fonction de validation de la nouvele photo (suppression de l'ancienne + upload de la nouvelle dans Cloudinary)
  const updatePictureCoach1 = () => {
    deleteCoach1CurrentPictureFromCloudinary()
    uploadCoach1NewPictureToCloudinary()
  }

  //FONCTION DE MODIFICATION DU NOM ET PRÉNOM DEU COACH 2
  const updateCoach2 = async () => {
    const coach2ToUpdate = await fetch(`/beachRoute/updateCoach2?_id=${selectedSection.coachs[1]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `coach2FirstNameFromFront=${coach2FirstName}&coach2LastNameFromFront=${coach2LastName}`
      }
    );

    const body = await coach2ToUpdate.json();

    if (body.result === true) {
      setCoach2FirstName("");
      setCoach2LastName("");
      setModifyCoach2(false);
      setSelectedSection("");
      setSelectedSectionIndex(-1);
      setCoach2SuccessList(body.success);
      setCoach2ErrorsList([]);
    } else {
      setCoach2SuccessList([]);
      setCoach2ErrorsList(body.errors);
    };
  };

  const coach2UpdateSuccessMessage = coach2SuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });
  const coach2UpdateErrorsMessage = coach2ErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });

  //FONCTIOND DE MODIFICATION DE LA QUALIFICATION DU COACH 1
  const updateQualificationCoach2 = async () => {
    const coach2QualificationToUpdate = await fetch(`/beachRoute/updateQualificationCoach2?_id=${selectedSection.coachs[1]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `coach2QualificationFromFront=${coach2Qualification}`
      }
    )
    const body = await coach2QualificationToUpdate.json();

    if (body.result === true) {
      setCoach2Qualification("");
      setModifyCoach2Qualification(false);
      setSelectedSection("");
      setSelectedSectionIndex(-1);
      setCoach2QualificationSuccessList(body.success);
      setCoach2QualificationErrorsList([]);

    } else {
      setCoach2QualificationSuccessList([]);
      setCoach2QualificationErrorsList(body.errors)
    }
  };

  const coach2QualificationUpdateErrorsMessage = coach2QualificationErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });
  const coach2QualificationUpdateSuccessMessage = coach2QualificationSuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });

  //FONCTIOND DE MODIFICATION DE LA PHOTO DU COACH 2
  //Suppression de la photo actuelle du coach 1 dans Cloudinary
  const deleteCoach2CurrentPictureFromCloudinary = async () => {
    const coach2CurrentPictureToDelete = await fetch(`/beachRoute/deleteCoach2CurrentPicture?_id=${selectedSection.coachs[1].pictureId}`,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `coach2CurrentPictureIdFromFront=${selectedSection.coachs[1].pictureId}`
      }
    )

    const body = await coach2CurrentPictureToDelete.json()
  };

  //Sélection et prévisualisation de la nouvelle photo du coach 2 + set dans une variable la photo sélectionnée
  const onCoach2PictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCoach2PicturePreview(URL.createObjectURL(event.target.files[0])) // Prévisualisation
      setCoach2PictureSelected(event.target.files[0]) // préparation à l'enregistrement sur cloudinary
    }
  };

  //Upload de la nouvelle photo du coach 2 dans Cloudinary + récupération de son Id et de son URL Cloudinary
  const uploadCoach2NewPictureToCloudinary = (e) => {
    // e.preventDefault();
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
  };

  //Remplacement de l'url et de l'id de la photo actuelle avec l'url et l'id de la nouvelle dans Mongo DB
  const updateCoach2PictureInMongoDG = async () => {
    const coach2PictureToUpdate = await fetch(`/beachRoute/updateCoach2PictureInMongoDG?_id=${selectedSection.coachs[1]._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `coach2PictureUrlFromFront=${coach2PictureUrl}&coach2PictureIdFromFront=${coach2PictureId}`
      }
    )
    const body = await coach2PictureToUpdate.json();

    if (body.result === true) {
      setSelectedSection("");
      setSelectedSectionIndex(-1)
      setCoach2PictureUrl("");
      setCoach2PictureId("");
      setCoach2PictureSelected("");
      setCoach2PicturePreview("");
      setModifyCoach2Picture(false);
      setCoach2PictureUpdateSuccessList(body.success);
      setCoach2PictureUpdateErrorsList([]);
    } else {
      setCoach2PictureUpdateSuccessList([]);
      setCoach2PictureUpdateErrorsList(body.errors);
    }
  };
  const coach2PictureUpdateSuccessMessage = coach2PictureUpdateSuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });
  const coach2PictureUpdateErrorsMessage = coach2PictureUpdateErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });

  //Fonction d'enregistrement de l'URL et de l'Id la nouvelle photo dans Mongo DB si et seulement si on a récupéré l'URL et l'Id de la nouvelle photo enregistrée dans Cloudinary
  useEffect(() => {
    if (selectedSection !== "") {
      updateCoach2PictureInMongoDG()
    }
  }, [coach2PictureUrl])

  //Fonction de validation de la nouvele photo (suppression de l'ancienne + upload de la nouvelle dans Cloudinary)
  const updatePictureCoach2 = () => {
    deleteCoach2CurrentPictureFromCloudinary()
    uploadCoach2NewPictureToCloudinary()
  };

  //FONCTION DE MODIFICATION DU LIEU DE L'ENTRAINEMENT
  const updatePlace = async () => {
    const trainingPlaceToUpdate = await fetch(`/beachRoute/updatePlace?_id=${selectedSection._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `placeFromFront=${place}`
      }
    )

    const body = await trainingPlaceToUpdate.json()

    if (body.result === true) {
      setPlace("")
      setModifyPlace(false)
      setSelectedSection("")
      setSelectedSectionIndex(-1)
      setPlaceErrorsList([]);
      setPlaceSuccessList(body.success);
    } else {
      setPlaceErrorsList(body.errors);
      setPlaceSuccessList([]);
    }
  };

  const placeUpdateSuccesMessage = placeSuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });

  const placeUpdateErrorsMessage = placeErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });

  //FONCTION DE MODIFICATION DE LA PERIODE D'ENTRAINEMENT 1
  const updatePeriod1 = async () => {
    const period1ToUpdate = await fetch(`/beachRoute/updatePeriod1?_id=${selectedSection._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `period1FromFront=${period1}`
      }
    )
    const body = await period1ToUpdate.json();

    if (body.result === true) {
      setPeriod1("");
      setModifyPeriod1(false);
      setSelectedSection("");
      setSelectedSectionIndex(-1);
      setPeriod1SuccessList(body.success);
      setPeriod1ErrorsList([])
    } else {
      setPeriod1ErrorsList(body.errors);
      setPeriod1SuccessList([])
    }
  };

  const period1UpdateSuccessMessage = period1SuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });

  const period1UpdateErrorsMessage = period1ErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });

  //FONCTION DE MODIFICATION DE LA PERIODE D'ENTRAINEMENT 1
  const updatePeriod2 = async () => {
    const period2ToUpdate = await fetch(`/beachRoute/updatePeriod2?_id=${selectedSection._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `period2FromFront=${period2}`
      }
    )
    const body = await period2ToUpdate.json();

    if (body.result === true) {
      setPeriod2("");
      setModifyPeriod2(false);
      setSelectedSection("");
      setSelectedSectionIndex(-1);
      setPeriod2SuccessList(body.success);
      setPeriod2ErrorsList([])
    } else {
      setPeriod2ErrorsList(body.errors);
      setPeriod2SuccessList([])
    }
  };

  const period2UpdateSuccessMessage = period2SuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });

  const period2UpdateErrorsMessage = period2ErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });

  //FONCTION DE MODIFICATION DU JOUR D'ENTRAINEMENT 1
  const updateDay1 = async () => {
    const day1ToUpdate = await fetch(`/beachRoute/updateDay1?_id=${selectedSection._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `day1FromFront=${day1}`
      }
    )

    const body = await day1ToUpdate.json();

    if (body.result === true) {
      setDay1("");
      setModifyDay1(false);
      setSelectedSection("")
      setSelectedSectionIndex(-1);
      setDay1SuccessList(body.success);
      setDay1ErrorsList([])
    } else {
      setDay1SuccessList([]);
      setDay1ErrorsList(body.errors)
    }
  };

  const day1UpdateSuccessMessage = day1SuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });
  const day1UpdateErrorsMessage = day1ErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });

  //FONCTION DE MODIFICATION DU JOUR D'ENTRAINEMENT 2
  const updateDay2 = async () => {
    const day2ToUpdate = await fetch(`/beachRoute/updateDay2?_id=${selectedSection._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `day2FromFront=${day2}`
      }
    )

    const body = await day2ToUpdate.json();

    if (body.result === true) {
      setDay2("");
      setModifyDay2(false);
      setSelectedSection("")
      setSelectedSectionIndex(-1);
      setDay2SuccessList(body.success);
      setDay2ErrorsList([])
    } else {
      setDay2SuccessList([]);
      setDay2ErrorsList(body.errors)
    }
  };

  const day2UpdateSuccessMessage = day2SuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });
  const day2UpdateErrorsMessage = day2ErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });

  //FONCTION DE MODIFICATION DU JOUR D'ENTRAINEMENT 2
  const updateSubscription = async () => {
    const subscriptionToUpdate = await fetch(`/beachRoute/updateSubscription?_id=${selectedSection._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `subscriptionFromFront=${subscription}`
      }
    )

    const body = await subscriptionToUpdate.json();

    if (body.result === true) {
      setSubscription("");
      setModifySubscription(false);
      setSelectedSection("")
      setSelectedSectionIndex(-1);
      setSubscriptionSuccessList(body.success);
      setSubscriptionErrorsList([])
    } else {
      setSubscriptionSuccessList([]);
      setSubscriptionErrorsList(body.errors)
    }
  };

  const subscriptionUpdateSuccessMessage = subscriptionSuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });
  const subscriptionUpdateErrorsMessage = subscriptionErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });

  //FONCTION DE MODIFICATION DU JOUR D'ENTRAINEMENT 2
  const updateFees = async () => {
    const feesToUpdate = await fetch(`/beachRoute/updateFees?_id=${selectedSection._id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `feesFromFront=${fees}`
      }
    )

    const body = await feesToUpdate.json();

    if (body.result === true) {
      setFees("");
      setModifyFees(false);
      setSelectedSection("")
      setSelectedSectionIndex(-1);
      setFeesSuccessList(body.success);
      setFeesErrorsList([])
    } else {
      setFeesSuccessList([]);
      setFeesErrorsList(body.errors)
    }
  };

  const feesUpdateSuccessMessage = feesSuccessList.map((success, index) => {
    return (
      <p key={index} style={{ color: "green", fontSize: "20px", textAlign: "center" }}>{success}</p>
    )
  });
  const feesUpdateErrorsMessage = feesErrorsList.map((errors, index) => {
    return (
      <p key={index} style={{ color: "red", fontSize: "20px", textAlign: "center" }}>{errors}</p>
    )
  });

  //AFFICHAGE DES MODIFICATIONS DES SECTIONS BEACH
  let selectedSectionToModify = <div />
  if (selectedSection !== "" && selectedSection !== undefined) {
    selectedSectionToModify = <div className="edit_beach_sections">
      <p className="black_text">Modifier les informations: {selectedSection.title}</p>
      <div className="upload_big_frame">
        <p className="black_text edit_beach_text_data_500">{selectedSection.title}</p>
        {/* COACH 1 PRÉNOM ET NOM */}
        {modifyCoach1 === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="coach1Data" className="black_text edit_beach_items_label_frame">Coach 1:</label>
            <input onChange={(e) => setCoach1FirstName(e.target.value)} className="edit_beach_input edit_beach_short_width" style={{ marginRight: "20px" }} value={coach1FirstName} id="coach-first-name" name="ccoach-first-name" placeholder="Prénom" />
            <input onChange={(e) => setCoach1LastName(e.target.value)} className="edit_beach_input edit_beach_short_width" value={coach1LastName} id="coach-last-name" name="coach-last-name" placeholder="Nom" />
          </div>
          <div className="">
            <button onClick={() => updateCoach1()} className="button_shape green_button">Valider</button>
            <button onClick={() => setModifyCoach1(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Coach 1:</p>
            {selectedSection.coachs[0].firstName !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.coachs[0].firstName}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
            {selectedSection.coachs[0].lastName !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.coachs[0].lastName}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyCoach1(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {coach1UpdateErrorsMessage}

        {/* COACH 1 QUALIFICATION */}
        {modifyCoach1Qualification === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="coach2Qualification" className="black_text edit_beach_items_label_frame">Diplôme coach 1:</label>
            <input onChange={(e) => setCoach1Qualification(e.target.value)} className="edit_beach_input edit_beach_medium_width" value={coach1Qualification} id="coach1-qualification" name="coach1-qualification" placeholder="Diplômé d'état FFVB" />
          </div>
          <div className="">
            <button onClick={() => updateQualificationCoach1()} className="button_shape green_button">Valider</button>
            <button onClick={() => setModifyCoach1Qualification(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Diplôme coach 1:</p>
            {selectedSection.coachs[0].qualification !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.coachs[0].qualification}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyCoach1Qualification(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {coach1QualificationUpdateErrorsMessage}

        {/* COACH 1 PHOTO */}
        {modifyCoach1Picture === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="coach 1 picture" className="black_text edit_beach_items_label_frame">Photo coach 1:</label>
            {coach1PicturePreview === "" || coach1PicturePreview === null ? <img className="edit_beach_coach_picture_shape" alt=""/> : <img src={coach1PicturePreview} className="edit_beach_coach_picture_shape" alt="" />}
            <div className="coach_picture_uplaod">
              <input onChange={onCoach1PictureChange} type="file" id="coach picture updload" name="coach picture updload" />
              {/* {coach1PictureUploadButton} */}
              <div style={{ width: "150px" }}>
                {/* {coach1PictureUploadMessage} */}
              </div>
            </div>
          </div>
          <div className="">
            {coach1PictureSelected !== "" ? <button onClick={() => updatePictureCoach1()} className="button_shape green_button">Valider</button> : <button className="button_shape lightgrey_button">Valider</button>}
            <button onClick={() => setModifyCoach1Picture(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Photo coach 1:</p>
            {selectedSection.coachs[0].pictureUrl !== "" ? <img className="edit_beach_coach_picture_shape" src={selectedSection.coachs[0].pictureUrl} alt=""/> : <p className="edit_beach_text_data_200">Aucune photo</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyCoach1Picture(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {coach1PictureUpdateErrorsMessage}

        {/* COACH 2 PRÉNOM ET NOM */}
        {modifyCoach2 === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="coach1Data" className="black_text edit_beach_items_label_frame">Coach 2:</label>
            <input onChange={(e) => setCoach2FirstName(e.target.value)} className="edit_beach_input edit_beach_short_width" style={{ marginRight: "20px" }} value={coach2FirstName} id="coach-first-name" name="ccoach-first-name" placeholder="Prénom" />
            <input onChange={(e) => setCoach2LastName(e.target.value)} className="edit_beach_input edit_beach_short_width" value={coach2LastName} id="coach-last-name" name="coach-last-name" placeholder="Nom" />
          </div>
          <div className="">
            <button onClick={() => updateCoach2()} className="button_shape green_button">Valider</button>
            <button onClick={() => setModifyCoach2(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Coach 2:</p>
            {selectedSection.coachs[1].firstName !== "" || selectedSection.coachs[1].firstName !== undefined || selectedSection.coachs[1].firstName !== null ? <p className="edit_beach_text_data_500">{selectedSection.coachs[1].firstName}</p> : <p className="edit_beach_text_data_200">Non renseigné</p>}
            {selectedSection.coachs[1].lastName !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.coachs[1].lastName}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyCoach2(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {coach2UpdateErrorsMessage}
        {/* COACH 2 QUALIFICATION */}
        {modifyCoach2Qualification === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="coach2Qualification" className="black_text edit_beach_items_label_frame">Diplôme coach 2:</label>
            <input onChange={(e) => setCoach2Qualification(e.target.value)} className="edit_beach_input edit_beach_medium_width" value={coach2Qualification} id="coach1-qualification" name="coach1-qualification" placeholder="Diplômé d'état FFVB" />
          </div>
          <div className="">
            <button onClick={() => updateQualificationCoach2()} className="button_shape green_button">Valider</button>
            <button onClick={() => setModifyCoach2Qualification(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Diplôme coach 2:</p>
            {selectedSection.coachs[1].qualification !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.coachs[1].qualification}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyCoach2Qualification(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {coach2QualificationUpdateErrorsMessage}
        {/* COACH 2 PHOTO */}
        {modifyCoach2Picture === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="coach 2 picture" className="eblack_text dit_beach_items_label_frame">Photo coach 2:</label>
            {coach2PicturePreview === "" || coach2PicturePreview === null ? <img className="edit_beach_coach_picture_shape" alt=""/> : <img src={coach2PicturePreview} className="edit_beach_coach_picture_shape" alt="" />}
            <div className="coach_picture_uplaod">
              <input onChange={onCoach2PictureChange} type="file" id="coach picture updload" name="coach picture updload" />
              {/* {coach1PictureUploadButton} */}
              <div style={{ width: "150px" }}>
                {/* {coach1PictureUploadMessage} */}
              </div>
            </div>
          </div>
          <div className="">
            {coach2PictureSelected !== "" ? <button onClick={() => updatePictureCoach2()} className="button_shape green_button">Valider</button> : <button className="button_shape lightgrey_button">Valider</button>}
            <button onClick={() => setModifyCoach2Picture(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Photo coach 2:</p>
            {selectedSection.coachs[1].pictureUrl !== "" ? <img className="edit_beach_coach_picture_shape" src={selectedSection.coachs[1].pictureUrl} alt=""/> : <p className="edit_beach_text_data_200">Aucune photo</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyCoach2Picture(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {coach2PictureUpdateErrorsMessage}

        {/* LIEU D'ENTRAINEMENT */}
        {modifyPlace === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="training place" className="black_text edit_beach_items_label_frame" >Lieu d'entrainement:</label>
            <input onChange={(e) => setPlace(e.target.value)} value={place} id="training place" name="training place" className="edit_beach_input edit_beach_medium_width" placeholder="Plage de Socoa" />
          </div>
          <div className="">
            {place !== "" ? <button onClick={() => updatePlace()} className="button_shape green_button">Valider</button> : <button className="button_shape lightgrey_button">Valider</button>}
            <button onClick={() => setModifyPlace(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Lieu d'entrainement:</p>
            {selectedSection.training.place !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.training.place}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyPlace(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {placeUpdateErrorsMessage}

        {/* PÉRIODE D'ENTRAINEMENT 1*/}
        {modifyPeriod1 === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="training period 1" className="black_text edit_beach_items_label_frame">Période d'entrainement 1:</label>
            <input onChange={(e) => setPeriod1(e.target.value)} value={period1} id="training period 1" name="training period 1" className="edit_beach_input edit_beach_medium_width" placeholder="Du 1er Avril au 31 Juillet 2024" />
          </div>
          <div className="">
            <button onClick={() => updatePeriod1()} className="button_shape green_button">Valider</button>
            <button onClick={() => setModifyPeriod1(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Période d'entrainement 1:</p>
            {selectedSection.training.period1 !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.training.period1}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyPeriod1(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {period1UpdateErrorsMessage}

        {/* PÉRIODE D'ENTRAINEMENT 2*/}
        {modifyPeriod2 === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="training period 1" className="black_text edit_beach_items_label_frame">Période d'entrainement 2:</label>
            <input onChange={(e) => setPeriod2(e.target.value)} value={period2} id="training period 1" name="training period 1" className="edit_beach_input edit_beach_medium_width" placeholder="Du 12 Août au 31 Août 2024" />
          </div>
          <div className="">
            <button onClick={() => updatePeriod2()} className="button_shape green_button">Valider</button>
            <button onClick={() => setModifyPeriod2(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Période d'entrainement 2:</p>
            {selectedSection.training.period2 !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.training.period2}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyPeriod2(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {period2UpdateErrorsMessage}

        {/* JOUR D'ENTRAINEMENT 1*/}
        {modifyDay1 === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="training day 1" className="black_text edit_beach_items_label_frame">Jour d'entrainement 1:</label>
            <input onChange={(e) => setDay1(e.target.value)} value={day1} id="training day 1" name="training day 1" className="edit_beach_input edit_beach_medium_width" placeholder="Jeudi: de 18h30 à 20h00" />
          </div>
          <div className="">
            <button onClick={() => updateDay1()} className="button_shape green_button">Valider</button>
            <button onClick={() => setModifyDay1(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Jour d'entrainement 1:</p>
            {selectedSection.training.day1 !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.training.day1}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyDay1(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {day1UpdateErrorsMessage}

        {/* JOUR D'ENTRAINEMENT 2*/}
        {modifyDay2 === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="training day 2" className="black_text edit_beach_items_label_frame">Jour d'entrainement 2:</label>
            <input onChange={(e) => setDay2(e.target.value)} value={day2} id="training day 2" name="training day 2" className="edit_beach_input edit_beach_medium_width" placeholder="Samedi: de 10h00 à 12h00" />
          </div>
          <div className="">
            <button onClick={() => updateDay2()} className="button_shape green_button">Valider</button>
            <button onClick={() => setModifyDay2(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Jour d'entrainement 2:</p>
            {selectedSection.training.day2 !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.training.day2}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyDay2(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {day2UpdateErrorsMessage}

        {/* CONTACT POUR INSCRIPTION */}
        {modifySubscription === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="beach contact e-mail" className="black_text edit_beach_items_label_frame">Contact pour inscription:</label>
            <input onChange={(e) => setSubscription(e.target.value)} value={subscription} id="beach contact e-mail" name="beach contact e-mail" className="edit_beach_input edit_beach_medium_width" placeholder="vblcbeach@gmail.com" />
          </div>
          <div className="">
            <button onClick={() => updateSubscription()} className="button_shape green_button">Valider</button>
            <button onClick={() => setModifySubscription(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Contact pour inscription:</p>
            {selectedSection.subscription.subscription !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.subscription.subscription}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
          </div>
          <div className="">
            <button onClick={() => setModifySubscription(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {subscriptionUpdateErrorsMessage}

        {/* COTISATION */}
        {modifyFees === true ? <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <label htmlFor="fees" className="black_text edit_beach_items_label_frame">Cotisation / Adhésion:</label>
            <input onChange={(e) => setFees(e.target.value)} value={fees} id="fees" name="fees" className="edit_beach_input edit_beach_medium_width" placeholder="V.B.L.C: 20€ / Extérieur: 50€" />
          </div>
          <div className="">
            <button onClick={() => updateFees()} className="button_shape green_button">Valider</button>
            <button onClick={() => setModifyFees(false)} className="button_shape red_button" >Annuler</button>
          </div>
        </div> : <div className="edit_beach_items_to_modify">
          <div className="edit_beach_items_form_group">
            <p className="black_text edit_beach_items_label_frame" >Cotisation / Adhésion:</p>
            {selectedSection.subscription.fees !== "" ? <p className="black_text edit_beach_text_data_500">{selectedSection.subscription.fees}</p> : <p className="black_text edit_beach_text_data_200">Non renseigné</p>}
          </div>
          <div className="">
            <button onClick={() => setModifyFees(true)} className="button_shape red_button" >Modifier</button>
          </div>
        </div>}
        {feesUpdateErrorsMessage}
      </div>
    </div>
  };


  return (
    <div className="bo_edit_beach_big_frame">
      <p className="red_title">Modifier les informations des sections V.B.L.C Beach-Volley & Summer Beach-Volley</p>
      <div className="edit_beach_sections">
        <p className="black_text">Sélectionner la section:</p>
        <div className="edit_beach_card_big_frame">
          {selectBeachSectionCards}
        </div>
      </div>
      {selectedSectionToModify}
      {coach1UpdateSuccessMessage}
      {coach1QualificationUpdateSuccessMessage}
      {coach1PictureUpdateSuccessMessage}
      {coach2UpdateSuccessMessage}
      {coach2QualificationUpdateSuccessMessage}
      {coach2PictureUpdateSuccessMessage}
      {placeUpdateSuccesMessage}
      {period1UpdateSuccessMessage}
      {period2UpdateSuccessMessage}
      {day1UpdateSuccessMessage}
      {day2UpdateSuccessMessage}
      {subscriptionUpdateSuccessMessage}
      {feesUpdateSuccessMessage}
    </div>
  )
};

export default EditVblcBeachSection;
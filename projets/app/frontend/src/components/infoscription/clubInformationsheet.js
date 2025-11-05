import { useState, useRef } from "react";
import "../../styles/infoscription/clubInformationSheet.css"
import { useReactToPrint } from "react-to-print"


function ClubInformationSheet() {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Information Sheet",
    // onAfterPrint: () => alert('Print success!')
  })

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bornOn, setBornOn] = useState("");
  const [bornIn, setBornIn] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [childFirstName, setChildFirstName] = useState("");
  const [childLastName, setChildLastName] = useState("");
  const [childBornOn, setChildBornOn] = useState("");
  const [childBornIn, setChildBornIn] = useState("");
  const [childAddress, setChildAddress] = useState("");
  const [childZip, setChildZip] = useState("");
  const [childCity, setChildCity] = useState("");
  const [childPhone, setChildPhone] = useState("");
  const [childMobile, setChildMobile] = useState("");
  const [childEmail, setChildEmail] = useState("");

  const [parent1FirstName, setParent1FirstName] = useState("");
  const [parent1LastName, setParent1LastName] = useState("");
  const [parent1Address, setParent1Address] = useState("");
  const [parent1Zip, setParent1Zip] = useState("");
  const [parent1City, setParent1City] = useState("");
  const [parent1Mobile, setParent1Mobile] = useState("");
  const [parent1Email, setParent1Email] = useState("");

  const [parent2FirstName, setParent2FirstName] = useState("");
  const [parent2LastName, setParent2LastName] = useState("");
  const [parent2Address, setParent2Address] = useState("");
  const [parent2Zip, setParent2Zip] = useState("");
  const [parent2City, setParent2City] = useState("");
  const [parent2Mobile, setParent2Mobile] = useState("");
  const [parent2Email, setParent2Email] = useState("");

  const [parent3FirstName, setParent3FirstName] = useState("");
  const [parent3LastName, setParent3LastName] = useState("");
  const [parent3Address, setParent3Address] = useState("");
  const [parent3Zip, setParent3Zip] = useState("");
  const [parent3City, setParent3City] = useState("");
  const [parent3Mobile, setParent3Mobile] = useState("");
  const [parent3Email, setParent3Email] = useState("");

  const [personToWarnFirstName, setPersonToWarnFirstName] = useState("");
  const [personToWarnLastName, setPersonToWarnLastName] = useState("");
  const [personToWarnRelationship, setPersonToWarnRelationship] = useState("");
  const [personToWarnMobile, setPersonToWarnMobile] = useState("");

  const [doneIn, setDoneIn] = useState("");
  const [date, setDate] = useState("");


  return (
    <div className="main">
      <div ref={componentRef} className="club_info_sheet_frame">
        <p className="red_title">FICHE DE RENSEIGNEMENT ET D'AUTORISATIONS</p>
        <p className="part_title center_text">A completer par l'adhérent majeur ou par le représentant légal pour les mineurs</p>
        <p className="grey_text center_text">Vous pouvez completer la fiche directement on line puis l'imprimer ou l'imprimer puis la compléter à la main.</p>
        <div className="club_info_sheet_part">
          <p className="part_title center_text">COORDONNÉES PERSONNELLES DE L'ADHÉRENT MAJEUR OU DU REPRÉSENTANT LÉGAL POUR L'INSCRIPTION D'UN MINEUR</p>
          <div className="club_info_sheet_double_inputs_frame">
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Prénom:</p>
              <input className="input_css double_inputs" onChange={(e) => setFirstName(e.target.value.toUpperCase())} value={firstName} type="text" id="" name="" />
            </div>
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Nom:</p>
              <input className="input_css double_inputs" onChange={(e) => setLastName(e.target.value.toUpperCase())} value={lastName} type="text" id="" name="" />
            </div>
          </div>
          <div className="club_info_sheet_double_inputs_frame">
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Date de naissance:</p>
              <input className="input_css double_inputs" onChange={(e) => setBornOn(e.target.value)} value={bornOn} type="text" id="" name="" />
            </div>
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Lieu de naissance:</p>
              <input className="input_css double_inputs" onChange={(e) => setBornIn(e.target.value.toUpperCase())} value={bornIn} type="text" id="" name="" />
            </div>
          </div>
          <div className="club_info_sheet_single_inputs_frame">
            <div className="club_info_sheet_single_inputs">
              <p className="club_info_sheet_item_label_for_single_inputs">Adresse:</p>
              <input className="input_css single_inputs" onChange={(e) => setAddress(e.target.value.toUpperCase())} value={address} type="text" id="" name="" />
            </div>
          </div>
          <div className="club_info_sheet_double_inputs_frame">
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Code postal:</p>
              <input className="input_css double_inputs" onChange={(e) => setZip(e.target.value.toUpperCase())} value={zip} type="text" id="" name="" />
            </div>
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Ville:</p>
              <input className="input_css double_inputs" onChange={(e) => setCity(e.target.value.toUpperCase())} value={city} type="text" id="" name="" />
            </div>
          </div>
          <div className="club_info_sheet_double_inputs_frame">
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Tél. fixe:</p>
              <input className="input_css double_inputs" onChange={(e) => setPhone(e.target.value.toUpperCase())} value={phone} type="text" id="" name="" />
            </div>
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Mobile:</p>
              <input className="input_css double_inputs" onChange={(e) => setMobile(e.target.value.toUpperCase())} value={mobile} type="text" id="" name="" />
            </div>
          </div>
          <div className="club_info_sheet_single_inputs_frame">
            <div className="club_info_sheet_single_inputs">
              <p className="club_info_sheet_item_label_for_single_inputs">Adresse mail:</p>
              <input className="input_css single_inputs" onChange={(e) => setEmail(e.target.value.toUpperCase())} value={email} type="text" id="" name="" />
            </div>
          </div>
        </div>
        <div className="club_info_sheet_part">
          <p className="part_title center_text">COORDONNÉES PERSONNELLES DU MINEUR</p>
          <div className="club_info_sheet_double_inputs_frame">
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Prénom:</p>
              <input className="input_css double_inputs" onChange={(e) => setChildFirstName(e.target.value.toUpperCase())} value={childFirstName} type="text" id="" name="" />
            </div>
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Nom:</p>
              <input className="input_css double_inputs" onChange={(e) => setChildLastName(e.target.value.toUpperCase())} value={childLastName} type="text" id="" name="" />
            </div>
          </div>
          <div className="club_info_sheet_double_inputs_frame">
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Date de naissance:</p>
              <input className="input_css double_inputs" onChange={(e) => setChildBornOn(e.target.value.toUpperCase())} value={childBornOn} type="text" id="" name="" />
            </div>
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Lieu de naissance:</p>
              <input className="input_css double_inputs" onChange={(e) => setChildBornIn(e.target.value.toUpperCase())} value={childBornIn} type="text" id="" name="" />
            </div>
          </div>
          <div className="club_info_sheet_single_inputs_frame">
            <div className="club_info_sheet_single_inputs">
              <p className="club_info_sheet_item_label_for_single_inputs">Adresse:</p>
              <input className="input_css single_inputs" onChange={(e) => setChildAddress(e.target.value.toUpperCase())} value={childAddress} type="text" id="" name="" />
            </div>
          </div>
          <div className="club_info_sheet_double_inputs_frame">
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Code postal:</p>
              <input className="input_css double_inputs" onChange={(e) => setChildZip(e.target.value.toUpperCase())} value={childZip} type="text" id="" name="" />
            </div>
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Ville:</p>
              <input className="input_css double_inputs" onChange={(e) => setChildCity(e.target.value.toUpperCase())} value={childCity} type="text" id="" name="" />
            </div>
          </div>
          <div className="club_info_sheet_double_inputs_frame">
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Tél. fixe:</p>
              <input className="input_css double_inputs" onChange={(e) => setChildPhone(e.target.value.toUpperCase())} value={childPhone} type="text" id="" name="" />
            </div>
            <div className="club_info_sheet_double_inputs">
              <p className="club_info_sheet_item_label_for_double_inputs">Mobile:</p>
              <input className="input_css double_inputs" onChange={(e) => setChildMobile(e.target.value.toUpperCase())} value={childMobile} type="text" id="" name="" />
            </div>
          </div>
          <div className="club_info_sheet_single_inputs_frame">
            <div className="club_info_sheet_single_inputs">
              <p className="club_info_sheet_item_label_for_single_inputs">Adresse mail:</p>
              <input className="input_css single_inputs" onChange={(e) => setChildEmail(e.target.value.toUpperCase())} value={childEmail} type="text" id="" name="" />
            </div>
          </div>
        </div>
        <div className="club_info_sheet_part">
          <p className="part_title center_text">SOUTIEN APPORTÉ AU CLUB V.B.L.C</p>
          <div className="club_info_sheet_support_frame">
            <p>Je souhaite apporter mon soutien au club:</p>
            <div className="club_info_sheet_support_check_box_frame">
              <input className="check_box" type="checkbox" id="" name="" />
              <p>Je suis intéressé(e) par une formation : arbitre, marque, entraîneur</p>
            </div>
            <div className="club_info_sheet_support_check_box_frame">
              <input className="check_box" type="checkbox" id="" name="" />
              <p>Je propose mon aide lors des événements annuels du club : tournoi de rentrée et de carnaval, fête du thon, tournoi des fêtes de la Saint Jean</p>
            </div>
            <div className="club_info_sheet_support_check_box_frame">
              <input className="check_box" type="checkbox" id="" name="" />
              <p>Je propose mon aide auprès de la section jeune et compétition de manière ponctuelle ou régulière (aide à l'entraînement, accompagnement lors des déplacements, organisation des plateaux jeunes)</p>
            </div>
            <div className="club_info_sheet_support_check_box_frame">
              <input className="check_box" type="checkbox" id="" name="" />
              <p>Je peux mettre le club en relation avec un ou plusieurs sponsors/partenaires</p>
            </div>
            <div className="club_info_sheet_support_check_box_frame">
              <input width="30" className="check_box" type="checkbox" id="" name="" />
              <p>Je souhaite faire un don au club (déductible des impôts au titre de l’intérêt général)</p>
            </div>
          </div>
        </div>
        <div className="club_info_sheet_part">
          <p className="part_title center_text">DROIT À L’IMAGE – AUTORISATION DE PUBLICATION</p>
          <div className="club_info_sheet_support_frame">
            <div className="image_autorisation_input_frame">
              <p className="space_right" >Je soussigné(e)</p>
              <input className="input_css autorisation_input" value={firstName} defaultValue={firstName} id="" name="" type="text" />
              <input className="input_css autorisation_input" value={lastName} defaultValue={lastName} id="" name="" type="text" />
              <p>déclare:</p>
            </div>
            <div className="radio_check_box_big_frame">
              <label className="autorization_check_box_label_frame">
                <input className="checkbox_input" type="radio" name="autorization_radio_check_box" />
                <p className="check_box_label">autoriser</p>
              </label>
              <label className="autorization_check_box_label_frame">
                <input className="checkbox_input" type="radio" name="autorization_radio_check_box" />
                <p className="check_box_label">ne pas autoriser</p>
              </label>
            </div>
            <p className="">- les photographies et prises de vues individuelles ou de groupe de moi-même et de mon enfant*:</p>
            <div className="image_autorisation_input_frame">
              <input className="input_css autorisation_input" value={childFirstName} defaultValue={childFirstName} id="" name="" type="text" />
              <input className="input_css autorisation_input" value={childLastName} defaultValue={childLastName} id="" name="" type="text" />
            </div>
            <p className="">- céder à titre gratuit tous les droits sur mon image ou celle de mon enfant et à renoncer à toute rémunération à ce titre.le V.B.L.C. à utiliser et diffuser ces images ou prises de vue sur tout support à l'exception de toute diffusion commerciale, et à ce titre gratuit, définitif, irrévocable pour un an à la date de signature de ce présent document et renouvelable par tacite reconduction.</p>
            <p style={{ marginBlock: "20px" }}>* L’autorisation du parent ou tuteur légal est obligatoire pour tout mineur.</p>
          </div>
        </div>
        <div className="club_info_sheet_part">
          <p className="part_title center_text">PARTIE RÉSERVÉE AUX REPRÉSENTANTS LÉGAUX D'UN MINEUR</p>
          <div className="club_info_sheet_support_frame">
            {/* PARENT 1 OU TUTEUR LÉGAL */}
            <div className="parent_support_frame">
              <div className="parent_support_radio_check_box_frame">
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support1_radio_check_box" />
                  <p className="check_box_label">Père</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support1_radio_check_box" />
                  <p className="check_box_label">Mère</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support1_radio_check_box" />
                  <p className="check_box_label">Tuteur légal</p>
                </label>
              </div>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Prénom:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent1FirstName(e.target.value.toUpperCase())} value={parent1FirstName} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Nom:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent1LastName(e.target.value.toUpperCase())} value={parent1LastName} type="text" id="" name="" />
                </div>
              </div>
              <div className="club_info_sheet_single_inputs_frame">
                <div className="club_info_sheet_single_inputs">
                  <p className="club_info_sheet_item_label_for_single_inputs">Adresse:</p>
                  <input className="input_css single_inputs" onChange={(e) => setParent1Address(e.target.value.toUpperCase())} value={parent1Address} type="text" id="" name="" />
                </div>
              </div>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Code postal:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent1Zip(e.target.value.toUpperCase())} value={parent1Zip} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Ville:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent1City(e.target.value.toUpperCase())} value={parent1City} type="text" id="" name="" />
                </div>
              </div>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Adresse mail:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent1Email(e.target.value.toUpperCase())} value={parent1Email} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Mobile:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent1Mobile(e.target.value.toUpperCase())} value={parent1Mobile} type="text" id="" name="" />
                </div>
              </div>
              <p>En cas de besoin, je peux véhiculer les enfants afin d’aider le club pour les déplacements en matchs:</p>
              <div className="parent_support_radio_check_box_frame">
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="shift1_radio_check_box" />
                  <p className="check_box_label">Oui</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="shift1_radio_check_box" />
                  <p className="check_box_label">Non</p>
                </label>
              </div>
            </div>
            {/* PARENT 2 OU TUTEUR LÉGAL */}
            <div className="parent_support_frame">
              <div className="parent_support_radio_check_box_frame">
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support2_radio_check_box" />
                  <p className="check_box_label">Père</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support2_radio_check_box" />
                  <p className="check_box_label">Mère</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support2_radio_check_box" />
                  <p className="check_box_label">Tuteur légal</p>
                </label>
              </div>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Prénom:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent2FirstName(e.target.value.toUpperCase())} value={parent2FirstName} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Nom:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent2LastName(e.target.value.toUpperCase())} value={parent2LastName} type="text" id="" name="" />
                </div>
              </div>
              <div className="club_info_sheet_single_inputs_frame">
                <div className="club_info_sheet_single_inputs">
                  <p className="club_info_sheet_item_label_for_single_inputs">Adresse:</p>
                  <input className="input_css single_inputs" onChange={(e) => setParent2Address(e.target.value.toUpperCase())} value={parent2Address} type="text" id="" name="" />
                </div>
              </div>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Code postal:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent2Zip(e.target.value.toUpperCase())} value={parent2Zip} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Ville:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent2City(e.target.value.toUpperCase())} value={parent2City} type="text" id="" name="" />
                </div>
              </div>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Adresse mail:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent2Email(e.target.value.toUpperCase())} value={parent2Email} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Mobile:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent2Mobile(e.target.value.toUpperCase())} value={parent2Mobile} type="text" id="" name="" />
                </div>
              </div>
              <p>En cas de besoin, je peux véhiculer les enfants afin d’aider le club pour les déplacements en matchs:</p>
              <div className="parent_support_radio_check_box_frame">
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="shift2_radio_check_box" />
                  <p className="check_box_label">Oui</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="shift2_radio_check_box" />
                  <p className="check_box_label">Non</p>
                </label>
              </div>
            </div>
            {/* PARENT 3 OU TUTEUR LÉGAL */}
            <div className="parent_support_frame">
              <div className="parent_support_radio_check_box_frame">
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support3_radio_check_box" />
                  <p className="check_box_label">Père</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support3_radio_check_box" />
                  <p className="check_box_label">Mère</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support3_radio_check_box" />
                  <p className="check_box_label">Tuteur légal</p>
                </label>
              </div>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Prénom:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent3FirstName(e.target.value.toUpperCase())} value={parent3FirstName} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Nom:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent3LastName(e.target.value.toUpperCase())} value={parent3LastName} type="text" id="" name="" />
                </div>
              </div>
              <div className="club_info_sheet_single_inputs_frame">
                <div className="club_info_sheet_single_inputs">
                  <p className="club_info_sheet_item_label_for_single_inputs">Adresse:</p>
                  <input className="input_css single_inputs" onChange={(e) => setParent3Address(e.target.value.toUpperCase())} value={parent3Address} type="text" id="" name="" />
                </div>
              </div>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Code postal:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent3Zip(e.target.value.toUpperCase())} value={parent3Zip} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Ville:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent3City(e.target.value.toUpperCase())} value={parent3City} type="text" id="" name="" />
                </div>
              </div>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Adresse mail:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent3Email(e.target.value.toUpperCase())} value={parent3Email} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Mobile:</p>
                  <input className="input_css double_inputs" onChange={(e) => setParent3Mobile(e.target.value.toUpperCase())} value={parent3Mobile} type="text" id="" name="" />
                </div>
              </div>
              <p>En cas de besoin, je peux véhiculer les enfants afin d’aider le club pour les déplacements en matchs:</p>
              <div className="parent_support_radio_check_box_frame">
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="shift3_radio_check_box" />
                  <p className="check_box_label">Oui</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="autorisation_checkbox_input" type="radio" name="shift3_radio_check_box" />
                  <p className="check_box_label">Non</p>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="club_info_sheet_part" style={{ marginTop: "40px" }}>
          <p className="part_title center_text">AUTORISATIONS PARENTALES</p>
          <div className="club_info_sheet_support_frame">
            <div className="club_info_sheet_autorisation_input_frame">
              <p className="space_right" >Je soussigné(e)</p>
              <input className="input_css autorisation_input" defaultValue={firstName} id="" name="" type="text" />
              <input className="input_css autorisation_input" defaultValue={lastName} id="" name="" type="text" />
            </div>
            <div className="club_info_sheet_autorisation_input_frame">
              <div className="parent_support_radio_check_box_frame">
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support_radio_check_box" />
                  <p className="check_box_label">Père</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support_radio_check_box" />
                  <p className="check_box_label">Mère</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="support_radio_check_box" />
                  <p className="check_box_label">Tuteur légal</p>
                </label>

              </div>
              <p> de l'enfant: </p>
            </div>
            <div className="club_info_sheet_autorisation_input_frame">
              <input className="input_css autorisation_input" defaultValue={childFirstName} id="" name="" type="text" />
              <input className="input_css autorisation_input" defaultValue={childLastName} id="" name="" type="text" />
              <p>autorise:</p>
            </div>
            <div className="parent_autorisation_input_frame">
              <p>1. Le club VBLC à laisser notre enfant partir seul(e) du gymnase après son entrainement.</p>
              <div className="parent_support_radio_check_box_frame">
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="autorisation1_radio_check_box" />
                  <p className="check_box_label">Oui</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="autorisation1_radio_check_box" />
                  <p className="check_box_label">Non</p>
                </label>
              </div>
              <p>ATTENTION : Il peut arriver que la personne chargée de l’encadrement de la séance de votre enfant soit absente ou en retard. Il est possible qu’il n’ait pas eu le temps de vous en avertir et que le club ne puisse pas s’organiser pour assurer l’accueil des enfants. Pour éviter les soucis liés à cette absence, il est fortement recommandé d’accompagner votre enfant jusque dans la salle et de ne le laisser qu’après vous être assuré de la présence de l’encadrant.</p>
            </div>
            <div className="parent_autorisation_input_frame">
              <p>2. Les entraîneurs du club VBLC ou des parents bénévoles à accompagner notre enfant sur les lieux des compétitions en voiture personnelle ou minibus de location.</p>
              <div className="parent_support_radio_check_box_frame">
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="autorisation2_radio_check_box" />
                  <p className="check_box_label">Oui</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="autorisation2_radio_check_box" />
                  <p className="check_box_label">Non</p>
                </label>
              </div>
            </div>
            <div className="parent_autorisation_input_frame">
              <p>3. Le responsable de l’équipe VBLC de mon enfant à prendre toute décision relative à une intervention chirurgicale, après m’avoir contacté(e).</p>
              <div className="parent_support_radio_check_box_frame">
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="autorisation3_radio_check_box" />
                  <p className="check_box_label">Oui</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="autorisation3_radio_check_box" />
                  <p className="check_box_label">Non</p>
                </label>
              </div>
            </div>
            <div className="parent_autorisation_input_frame">
              <p>4.  Mon enfant à sortir de l’établissement hospitalier qui lui a donné les soins, accompagné(e) et sous la responsabilité du responsable de l’équipe VBLC</p>
              <div className="parent_support_radio_check_box_frame">
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="autorisation4_radio_check_box" />
                  <p className="check_box_label">Oui</p>
                </label>
                <label className="autorization_check_box_label_frame">
                  <input className="checkbox_input" type="radio" name="autorisation4_radio_check_box" />
                  <p className="check_box_label">Non</p>
                </label>
              </div>
            </div>
            <div className="parent_autorisation_input_frame">
              <p>Autre personne à prévenir en cas d’accident :</p>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Prénom:</p>
                  <input className="input_css double_inputs" onChange={(e) => setPersonToWarnFirstName(e.target.value.toUpperCase())} value={personToWarnFirstName} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Nom:</p>
                  <input className="input_css double_inputs" onChange={(e) => setPersonToWarnLastName(e.target.value.toUpperCase())} value={personToWarnLastName} type="text" id="" name="" />
                </div>
              </div>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Lien de parenté:</p>
                  <input className="input_css double_inputs" onChange={(e) => setPersonToWarnRelationship(e.target.value.toUpperCase())} value={personToWarnRelationship} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">Mobile:</p>
                  <input className="input_css double_inputs" onChange={(e) => setPersonToWarnMobile(e.target.value.toUpperCase())} value={personToWarnMobile} type="text" id="" name="" />
                </div>
              </div>
            </div>
            <div className="parent_autorisation_input_frame" style={{ marginTop: "50px" }}>
              <div className="club_info_sheet_double_inputs_frame">
                <div className="club_info_sheet_double_inputs" style={{ paddingInline: "0px" }}>
                  <p className="club_info_sheet_item_label_for_double_inputs">Fait à:</p>
                  <input className="input_css double_inputs" onChange={(e) => setDoneIn(e.target.value.toUpperCase())} value={doneIn} type="text" id="" name="" />
                </div>
                <div className="club_info_sheet_double_inputs">
                  <p className="club_info_sheet_item_label_for_double_inputs">le</p>
                  <input className="input_css double_inputs" onChange={(e) => setDate(e.target.value.toUpperCase())} value={date} type="text" id="" name="" />
                </div>
              </div>
              <p>Signature précédée de la mention "Lu et approuvé"</p>
              <div className="signature_frame" />
            </div>

          </div>
        </div>
      </div>
      <div className="print_button_frame">
        <button className="print_button" onClick={handlePrint}>Imprimer</button>
      </div>

    </div>
  )
};

export default ClubInformationSheet;
import { useState } from "react";
import "../../styles/administrators/administrator.css";
import { Button, FormGroup, Label, Input } from "reactstrap";




function Administrator() {


  const [contriFirstName, setContriFirstName] = useState("");
  const [contriLastName, setContriLastName] = useState("");
  const [contriEmail, setContriEmail] = useState("");
  const [contriPassword, setContriPassword] = useState("")
  const [listSuccessContriCreation, setListSuccessContriCreation] = useState([]);
  const [listErrorContriCreation, setListErrorContriCreation] = useState([]);

  const [adminFirstName, setAdminFirstName] = useState("")
  const [adminLastName, setAdminLastName] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [listSuccessAdminCreation, setListSuccessAdminCreation] = useState([]);
  const [listErrorAdminCreation, setListErrorAdminCreation] = useState([]);


  //FUNCTION DE CREATION D'UN NOUVEAU PROFIL CONTRIBUTEUR = ENVOI DE DONNÉES À LA BASE DE DONNÉES
  const handleSubmitContriCreation = async () => {
    //Ci dessous indiquer la route correspondante qui se trouve dans le dossier: routes/contributorRoute/administratorCreation
    const contriDataToCreate = await fetch('/contributorRoute/createContributor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `contriFirstNameFromFront=${contriFirstName}&contriLastNameFromFront=${contriLastName}&contriEmailFromFront=${contriEmail}&contriPasswordFromFront=${contriPassword}`
    });

    const body = await contriDataToCreate.json();

    if (body.result === true) {
      setContriFirstName("");
      setContriLastName("");
      setContriEmail("");
      setContriPassword("");
      // setListErrorContriCreation([])
      setListSuccessContriCreation(body.success)
    } else {
    
      setListErrorContriCreation(body.error)
    }
  };

  var tabSuccessContriCreation = listSuccessContriCreation.map((success, i) => {
    return (<p style={{ color: "green" }}>{success}</p>)
  })

  var tabErrorsContriCreation = listErrorContriCreation.map((error, i) => {
    return (<p style={{ color: "red" }}>{error}</p>)
  })

  //FONCTION DE CREATION D'UN NOUVEAU PROFIL ADMINISTRATEUR = ENVOI DE DONNÉES A LA DATA BASE
  const handleSubmitAdminCreation = async () => {

    //Ci dessous indiquer la route correspondante qui se trouve dans le dossier: routes/administratorRoute/administratorCreation
    const adminDataToCreate = await fetch('/administratorRoute/createAdministrator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `adminFirstNameFromFront=${adminFirstName}&adminLastNameFromFront=${adminLastName}&adminEmailFromFront=${adminEmail}&adminPasswordFromFront=${adminPassword}`
    })

    const body = await adminDataToCreate.json();

    if (body.result === true) {
      setAdminFirstName("");
      setAdminLastName("");
      setAdminEmail("");
      setAdminPassword("")
      setListSuccessAdminCreation(body.success)
    } else {
      setListErrorAdminCreation(body.error)
    }
  };

  var tabSuccessAdminCreation = listSuccessAdminCreation.map((success, i) => {
    return (<p style={{ color: "green" }}>{success}</p>)
  })

  var tabErrorsAdminCreation = listErrorAdminCreation.map((error, i) => {
    return (<p style={{ color: "red" }}>{error}</p>)
  })

  return (
    <div className="main">
      <div className="admin_body">
        <p className="red_title">CRÉATION DE PROFIL</p>
        <div className="admin_bloc">
          <div className="admin_frame" >
            <p className="black_text admin_title">Créer un profil CONTRIBUTEUR</p>
            <FormGroup className="creation_input_group">
              <Label className="black_text">Prénom: </Label>
              <Input onChange={(e) => setContriFirstName(e.target.value)} className="creation_input" autoComplete="off" type="text" name="contributorFirstName" placeholder="Prénom" value={contriFirstName} />
            </FormGroup>
            <FormGroup className="creation_input_group">
              <Label className="black_text">Nom: </Label>
              <Input onChange={(e) => setContriLastName(e.target.value)} className="creation_input" autoComplete="off" type="text" name="contributorLastName" placeholder="Nom" value={contriLastName} />
            </FormGroup>
            <FormGroup className="creation_input_group">
              <Label className="black_text">E-mail: </Label>
              <Input onChange={(e) => setContriEmail(e.target.value)} className="creation_input" autoComplete="off" type="email" name="contributorEmail" placeholder="E-mail" value={contriEmail} />
            </FormGroup>
            <FormGroup className="creation_input_group">
              <Label className="black_text">Password: </Label>
              <Input onChange={(e) => setContriPassword(e.target.value)} className="creation_input" autoComplete="off" type="password" name="contributorPassword" placeholder="Mot de passe" value={contriPassword} />
            </FormGroup>
            <Button onClick={() => handleSubmitContriCreation()} className="creation_button" type="submit">Valider</Button>
            {tabSuccessContriCreation}
            {tabErrorsContriCreation}
          </div>


          <div className="admin_frame">
            <p className="black_text admin_title">Créer un profil ADMINISTRATEUR</p>
            <FormGroup className="creation_input_group">
              <Label className="black_text">Prénom: </Label>
              <Input className="creation_input" autoComplete="off" type="name" name="administratorFirstName" placeholder="Prénom" value={adminFirstName} onChange={(e) => setAdminFirstName(e.target.value)} />
            </FormGroup>
            <FormGroup className="creation_input_group">
              <Label className="black_text">Nom: </Label>
              <Input className="creation_input" autoComplete="off" type="name" name="administratorLastName" placeholder="Nom" value={adminLastName} onChange={(e) => setAdminLastName(e.target.value)} />
            </FormGroup>
            <FormGroup className="creation_input_group">
              <Label className="black_text">E-mail: </Label>
              <Input className="creation_input" autoComplete="off" type="email" name="administratorEmail" placeholder="E-mail" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
            </FormGroup>
            <FormGroup className="creation_input_group">
              <Label className="black_text">Password: </Label>
              <Input className="creation_input" autoComplete="off" type="password" name="administratorPassword" placeholder="Mot de passe" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
            </FormGroup>
            <Button className="creation_button" type="submit" onClick={() => handleSubmitAdminCreation()}>Valider</Button>
            {tabSuccessAdminCreation}
            {tabErrorsAdminCreation}
          </div>
        </div>
      </div>

    </div>
  )
};

export default Administrator;
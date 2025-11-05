import { useState } from "react";
import "../../styles/administrators/signIn.css";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Link, Navigate } from "react-router-dom"



function SignInAdministrator() {

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [administratorExists, setAdministratorExists] = useState(false);
  const [listAdminSignInError, setListAdminSignInError] = useState([]);

  const handleSubmitSignInAdmin = async () => {

    const adminDataForSignIn = await fetch('/administratorRoute/administratorsignin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `adminEmailFromFront=${adminEmail}&adminPasswordFromFront=${adminPassword}`,
    })

    const body = await adminDataForSignIn.json();

    if (body.result === true) {
      setAdminEmail("");
      setAdminPassword("");
      setListAdminSignInError([]);
      setAdministratorExists(true);
      // onSubmitToken(body.token);
    } else {
      setListAdminSignInError(body.error)
    }
  };

  if (administratorExists === true) {
    return <Navigate to='/administrator' />
  }
  var tabAdminSignInError = listAdminSignInError.map((error, i) => {
    return (<p style={{ color: "red" }}>{error}</p>)
  })


  return (
    <div className="main">
      <div className="signIn_body">
        <p className="red_title">CONNEXION ADMINISTRATEUR</p>
        <div className="signIn_bloc">
          <div className="signIn_frame">
            <p className="black_text signIn_title">Saisissez votre adresse e-mail et votre mot de passe</p>
            <FormGroup className="signIn_input_group">
              <Label className="black_text">E-mail: </Label>
              <Input onChange={(e) => setAdminEmail(e.target.value)} className="signIn_input" autoComplete="off" type="email" name="email" placeholder="Votre e-mail" value={adminEmail} />
            </FormGroup>
            <FormGroup className="signIn_input_group">
              <Label className="black_text">Password: </Label>
              <Input onChange={(e) => setAdminPassword(e.target.value)} className="signIn_input" autoComplete="off" type="password" name="password" placeholder="Votre mot de passe" value={adminPassword} />
            </FormGroup>
            <Button onClick={() => handleSubmitSignInAdmin()} className="signIn_button">Valider</Button>
            {tabAdminSignInError}
          </div>
        </div>
        <Button className="button_administrator">
          <Link to="/signInContributor" >Je suis contributeur</Link>
        </Button>
      </div>
    </div>
  )
};


export default SignInAdministrator;

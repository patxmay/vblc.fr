import { useState } from "react";
import "../../styles/administrators/signIn.css";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Link, Navigate } from "react-router-dom";

import { useDispatch } from "react-redux";

export const CONTRI_TOKEN_ONCE_LOGGED = "CONTRI_TOKEN_ONCE_LOGGED";

function SignInContributor() {

  const [contriEmail, setContriEmail] = useState("");
  const [contriPassword, setContriPassword] = useState("");
  const [contributorExists, setContributorExists] = useState(false);
  const [listErrorContriSignIn, setListErrorContriSignIn] = useState([]);

  const dispatch = useDispatch();
  

  const handleClickContriSignIn = async () => {

    const contriDataForSignIn = await fetch('/contributorRoute/contributorsignin', {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: `contriEmailFromFront=${contriEmail}&contriPasswordFromFront=${contriPassword}`
    })

    const body = await contriDataForSignIn.json();

    if (body.result === true) {
      setContriEmail("");
      setContriPassword("");
      setListErrorContriSignIn([]);
      setContributorExists(true);
      // dispatch({type: CONTRI_TOKEN_ONCE_LOGGED, payload: body.token})
    } else {
      setListErrorContriSignIn(body.error)
    };
  };

  if (contributorExists === true) {
    return <Navigate to='/backofficemainpage' />
  };

  var tabContriSignInError = listErrorContriSignIn.map((error, i) => {
    return (<p style={{ color: "red" }}>{error}</p>)
  });

  return (
    <div className="main">
      <div className="signIn_body">
        <p className="red_title">CONNEXION CONTRIBUTEUR</p>
        <div className="signIn_bloc">
          <div className="signIn_frame" >
            <p className="black_text signIn_title">Saisissez votre adresse e-mail et votre mot de passe</p>
            <FormGroup className="signIn_input_group">
              <Label className="black_text">E-mail: </Label>
              <Input onChange={(e) => setContriEmail(e.target.value)} className="signIn_input" type="email" name="email" value={contriEmail} placeholder="Votre e-mail" />
            </FormGroup>
            <FormGroup className="signIn_input_group">
              <Label className="black_text">Password: </Label>
              <Input onChange={(e) => setContriPassword(e.target.value)} className="signIn_input" type="password" name="password" value={contriPassword} placeholder="Votre mot de passe" />
            </FormGroup>
            <Button onClick={() => handleClickContriSignIn()} className="signIn_button">Valider</Button>
            {tabContriSignInError}
          </div>
        </div>
        <Button className="button_administrator">
          <Link to="/signInAdministrator" >Je suis administrateur</Link>
        </Button>
      </div>
    </div>

  )
};

export default SignInContributor;


import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

import Nav from './components/navbar/nav';
import Home from './components/home/home';
import Club from './components/club/club';
import Infoscription from './components/infoscription/infoscription';
import Registration from './components/infoscription/registration';
import RegistrationHelp from "./components/infoscription/registrationHelp"
import ClubInformationSheet from './components/infoscription/clubInformationsheet';
import Teams from './components/teams/teams';
import TeamDetails from './components/teams/teamDetails';
import Beach from './components/beach/beach'

import Events from './components/events/events';
import EventsDetails from './components/events/eventsDetails'
import EventRegistrationForm from './components/events/eventRegistrationForm';
// import EventSelectedDetails from './components/events/eventSelectedDetails'

import Footer from './components/footer/footer';
import Partners from './components/partners/partners';
import Administrator from './components/administrator/administrator';
import SignInContributor from "./components/administrator/signInContributor";
import SignInAdministrator from "./components/administrator/signInAdministrator";
import BackOfficeMainPage from './components/backOffice/backOfficeMainPage';
import Contact from './components/contact/contact';


function App() {

  const contributorToken = useSelector((state) => state.tokenReducer)
  console.log("XXXXXXX CONTRIBUTOR TOKEN XXXXXXX", contributorToken)

  return (
    <Router>
      <Nav />
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<Club />} path="/club" exact />
        <Route element={<Infoscription />} path="/infoscription" exact />
        <Route element={<Registration/>} path="/registration" exact />
        <Route element={<RegistrationHelp/>} path="/registrationHelp" exact />
        <Route element={<ClubInformationSheet/>} path="/clubInformationSheet" exact />
        <Route element={<Teams />} path="/teams" exact />
        <Route element={<TeamDetails />} path="/teamDetails" exact />
        <Route element={<Beach />} path="/beach" exact />

        <Route element={<Events />} path="/events" exact />
        <Route element={<EventsDetails />} path="/eventsDetails" exact />
        <Route element={<EventRegistrationForm />} path='/eventRegistrationForm' exact />

        <Route element={<Partners />} path="/partners" exact />
        <Route element={<SignInContributor />} path="/signInContributor" exact />
        <Route element={<SignInAdministrator />} path="/signInAdministrator" exact />
        <Route element={<Administrator />} path="/administrator" exact />
        <Route element={<BackOfficeMainPage />} path="/backofficemainpage" exact />
        <Route element={<Contact />} path="/contact" exact />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

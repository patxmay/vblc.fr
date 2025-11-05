import { useState } from "react";
import "../../styles/backOffice/backOfficeMainPage.css"

import CreateEvents from "./createEvents";
import EditeEvents from "./editEvents";
import DeleteEvents from "./deleteEvents";
import CreateTeams from "./createTeams";
import CreateMatch from "./createMatch";
import MatchUpdate from "./matchUpdate"
import EventParticipantsList from "./eventParticipantsList";
import CreateVblcBeachSection from "./createVblcBeachSection";
import EditVblcBeachSection from "./editVblcBeachSection";
import UploadBeachPictures from "./uploadBeachPictures";
import CreateFlashNews from "./createFlashNews";





function BackOfficeMainPage() {

  const [showCreateEvents, setShowCreateEvents] = useState(true);
  const [showEditEvents, setShowEditEvents] = useState(false);
  const [showCreateTeams, setShowCreateTeams] = useState(false);
  const [showCreateMatch, setShowCreateMatch] = useState(false);
  const [showMatchUpdate, setShowMatchUpdate] = useState(false);
  const [showEventParticipantsList, setShowEventParticipantsList] = useState(false);
  const [showCreateVblcBeachSection, setShowCreateVblcBeachSection] = useState(false);
  const [showEditVblcBeachSection, setShowEditVblcBeachSection] = useState(false);
  const [showUploadBeachPictures, setShowUploadBeachPictures] = useState(false);
  const [showDeleteEvents, setShowDeleteEvents] = useState(false);
  const [showCreateFlashNews, setShowCreateFlashNews] = useState(false);





  const handleClickShowCreateEvents = () => {
    setShowCreateEvents(true);
    setShowEditEvents(false);
    setShowDeleteEvents(false);
    setShowEventParticipantsList(false);
    setShowCreateTeams(false);
    setShowCreateMatch(false);
    setShowMatchUpdate(false);
    setShowCreateVblcBeachSection(false);
    setShowEditVblcBeachSection(false);
    setShowUploadBeachPictures(false);
    setShowCreateFlashNews(false)

  };


  const handleClickShowEditEvents = () => {
    setShowCreateEvents(false);
    setShowEditEvents(true);
    setShowDeleteEvents(false);
    setShowEventParticipantsList(false);
    setShowCreateTeams(false);
    setShowCreateMatch(false);
    setShowMatchUpdate(false);
    setShowCreateVblcBeachSection(false);
    setShowEditVblcBeachSection(false);
    setShowUploadBeachPictures(false);
    setShowCreateFlashNews(false)

  };

  const handleClickShowDeleteEvents = () => {
    setShowCreateEvents(false);
    setShowEditEvents(false);
    setShowDeleteEvents(true);
    setShowEventParticipantsList(false);
    setShowCreateTeams(false);
    setShowCreateMatch(false);
    setShowMatchUpdate(false);
    setShowCreateVblcBeachSection(false);
    setShowEditVblcBeachSection(false);
    setShowUploadBeachPictures(false);
    setShowCreateFlashNews(false)

  };


  const handleClickShowEventParticipantsList = () => {
    setShowCreateEvents(false);
    setShowEditEvents(false);
    setShowDeleteEvents(false);
    setShowEventParticipantsList(true);
    setShowCreateTeams(false);
    setShowCreateMatch(false);
    setShowMatchUpdate(false);
    setShowCreateVblcBeachSection(false);
    setShowEditVblcBeachSection(false);
    setShowUploadBeachPictures(false);
    setShowCreateFlashNews(false)

  };

  const handleClickShowCreateTeams = () => {
    setShowCreateEvents(false);
    setShowEditEvents(false);
    setShowDeleteEvents(false);
    setShowEventParticipantsList(false);
    setShowCreateTeams(true);
    setShowCreateMatch(false);
    setShowMatchUpdate(false);
    setShowCreateVblcBeachSection(false);
    setShowEditVblcBeachSection(false);
    setShowUploadBeachPictures(false);
    setShowCreateFlashNews(false)

  };

  const handleClickShowCreateMatch = () => {
    setShowCreateEvents(false);
    setShowEditEvents(false);
    setShowDeleteEvents(false);
    setShowEventParticipantsList(false);
    setShowCreateTeams(false);
    setShowCreateMatch(true);
    setShowMatchUpdate(false);
    setShowCreateVblcBeachSection(false);
    setShowEditVblcBeachSection(false);
    setShowUploadBeachPictures(false);
    setShowCreateFlashNews(false)

  };

  const handleClickShowCreateMatchAccompanists = () => {
    setShowCreateEvents(false);
    setShowEditEvents(false);
    setShowDeleteEvents(false);
    setShowEventParticipantsList(false);
    setShowCreateTeams(false);
    setShowCreateMatch(false);
    setShowMatchUpdate(true);
    setShowCreateVblcBeachSection(false);
    setShowEditVblcBeachSection(false);
    setShowUploadBeachPictures(false);
    setShowCreateFlashNews(false)

  };

  const handleClickShowCreateVblcBeachSection = () => {
    setShowCreateEvents(false);
    setShowEditEvents(false);
    setShowDeleteEvents(false);
    setShowEventParticipantsList(false);
    setShowCreateTeams(false);
    setShowCreateMatch(false);
    setShowMatchUpdate(false);
    setShowCreateVblcBeachSection(true);
    setShowEditVblcBeachSection(false);
    setShowUploadBeachPictures(false);
    setShowCreateFlashNews(false)

  };

  const handleClickShowEditVblcBeachSection = () => {
    setShowCreateEvents(false);
    setShowEditEvents(false);
    setShowDeleteEvents(false);
    setShowEventParticipantsList(false);
    setShowCreateTeams(false);
    setShowCreateMatch(false);
    setShowMatchUpdate(false);
    setShowCreateVblcBeachSection(false);
    setShowEditVblcBeachSection(true);
    setShowUploadBeachPictures(false);
    setShowCreateFlashNews(false)

  };

  const handleClickShowUploadBeachPictures = () => {
    setShowCreateEvents(false);
    setShowEditEvents(false);
    setShowDeleteEvents(false);
    setShowEventParticipantsList(false);
    setShowCreateTeams(false);
    setShowCreateMatch(false);
    setShowMatchUpdate(false);
    setShowCreateVblcBeachSection(false);
    setShowEditVblcBeachSection(false);
    setShowUploadBeachPictures(true);
    setShowCreateFlashNews(false)

  };

  const handleClickShowCreateFlashNews = () => {
    setShowCreateEvents(false);
    setShowEditEvents(false);
    setShowDeleteEvents(false);
    setShowEventParticipantsList(false);
    setShowCreateTeams(false);
    setShowCreateMatch(false);
    setShowMatchUpdate(false);
    setShowCreateVblcBeachSection(false);
    setShowEditVblcBeachSection(false);
    setShowUploadBeachPictures(false);
    setShowCreateFlashNews(true)

  };



  let displayPage = <div />
  if (showCreateEvents === true) {
    displayPage = <CreateEvents />
  } else if (showEditEvents === true) {
    displayPage = <EditeEvents />
  } else if (showDeleteEvents === true) {
    displayPage = <DeleteEvents />
  } else if (showEventParticipantsList === true) {
    displayPage = <EventParticipantsList />
  } else if (showCreateTeams === true) {
    displayPage = <CreateTeams />
  } else if (showCreateMatch === true) {
    displayPage = <CreateMatch />
  } else if (showMatchUpdate === true) {
    displayPage = <MatchUpdate />
  } else if (showCreateVblcBeachSection === true) {
    displayPage = <CreateVblcBeachSection />
  } else if (showEditVblcBeachSection === true) {
    displayPage = <EditVblcBeachSection />
  } else if (showUploadBeachPictures === true) {
    displayPage = <UploadBeachPictures />
  } else if (showCreateFlashNews === true) {
    displayPage = <CreateFlashNews />
  }

  return (
    <div className="main" >
      <div className="bo_big_frame">
        <div className="bo_menu_frame">
          <ul className="menu_ul">
            <h4>Événements</h4>
            <li className={`bo_menu_title ${showCreateEvents === true ? "bo_menu_title_selected" : "bo_menu_title"}`} onClick={() => handleClickShowCreateEvents()}>Créer un événement</li>
            <li className={`bo_menu_title ${showEditEvents === true ? "bo_menu_title_selected" : "bo_menu_title"}`} onClick={() => handleClickShowEditEvents()}>Modifier un événement</li>
            <li className={`bo_menu_title ${showDeleteEvents === true ? "bo_menu_title_selected" : "bo_menu_title"}`} onClick={() => handleClickShowDeleteEvents()}>Supprimer un événement</li>
            <li className={`bo_menu_title ${showEventParticipantsList === true ? "bo_menu_title_selected" : "bo_menu_title"}`} onClick={() => handleClickShowEventParticipantsList()}>Liste des participants</li>
          </ul>
          <ul className="menu_ul">
            <h4>Équipes</h4>
            <li className={`bo_menu_title ${showCreateTeams === true ? "bo_menu_title_selected" : "bo_menu_title"}`} onClick={() => handleClickShowCreateTeams()}>Créer une équipe</li>
            <li className={`bo_menu_title ${showCreateMatch === true ? "bo_menu_title_selected" : "bo_menu_title"}`} onClick={() => handleClickShowCreateMatch()}>Saisir les matchs d'une équipe</li>
            <li className={`bo_menu_title ${showMatchUpdate === true ? "bo_menu_title_selected" : "bo_menu_title"}`} onClick={() => handleClickShowCreateMatchAccompanists()}>Saisir les accompagnateurs VBLC & le score</li>
          </ul>
          <ul className="menu_ul">
            <h4>Beach-Volley</h4>
            <li className={`bo_menu_title ${showCreateVblcBeachSection === true ? "bo_menu_title_selected" : "bo_menu_title"}`} onClick={() => handleClickShowCreateVblcBeachSection()}>Saisir les informations</li>
            <li className={`bo_menu_title ${showEditVblcBeachSection === true ? "bo_menu_title_selected" : "bo_menu_title"}`} onClick={() => handleClickShowEditVblcBeachSection()}>Modifier les informations</li>
            <li className={`bo_menu_title ${showUploadBeachPictures === true ? "bo_menu_title_selected" : "bo_menu_title"}`} onClick={() => handleClickShowUploadBeachPictures()}>Upload & suppression Beach photos</li>
          </ul>
          <ul className="menu_ul">
            <h4>Flash News</h4>
            <li className={`bo_menu_title ${showCreateFlashNews === true ? "bo_menu_title_selected" : "bo_menu_title"}`} onClick={() => handleClickShowCreateFlashNews()}>Créer une Flash News</li>
          </ul>
        </div>
        <div className="bo_content_frame" style={{ minHeight: "700px" }}>
          {displayPage}
        </div>
      </div>
    </div>

  )
};

export default BackOfficeMainPage;

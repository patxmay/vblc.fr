import { useState } from "react";
import "../../styles/backOffice/createFlashNews.css";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from 'date-fns/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';


function CreateFlashNews() {

  const [displayStartDate, setDisplayStartDate] = useState("");
  const [displayEndDate, setDisplayEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");

  const [listFlashNewsError, setListFlashNewsError] = useState([]);
  const [listFlashNewsSuccess, setListFlashNewsSuccess] = useState([]);

  const validateFlashNewsCreation = async () => {
    const flashNewsToCreate = await fetch('/flashNewsRoute/createFlashNews', {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `displayStartDateFromFront=${displayStartDate}&displayEndDateFromFront=${displayEndDate}&titleFromFront=${title}&bodyTextFromFront=${bodyText}`
    });

    const body = await flashNewsToCreate.json()

    if (body.result === true) {
      setDisplayStartDate("");
      setDisplayEndDate("");
      setTitle("");
      setBodyText("")

      setListFlashNewsError([])
      setListFlashNewsSuccess(body.success)
    } else {
      setListFlashNewsError(body.error)
      setListFlashNewsSuccess([])
    }
  };
  console.log("*** SUCCESS LMESSAGE ***", listFlashNewsSuccess)

  const flashNewsSuccessMessage = listFlashNewsSuccess.map((success, i) => {
    return (<p style={{ color: "green" }}>{success}</p>)
  });

  const flashNewsErrorMessage = listFlashNewsError.map((error, i) => {
    return (<p style={{ color: "red" }}>{error}</p>)
  });

  //DATE DE DÉBUT D'AFFICHAGE
  const inputFlashNewsStartDate = <div className="create_flash_news_form_group" >
    <p className="black_text create_flash_news_item_title_frame_width">Début d'affichage:</p>
    <DatePicker className="create_flash_news_input create_flash_news_large_input" id="input_flash_news_start_date" name="input_flash_news_start_date"
      // showIcon
      selected={displayStartDate}
      selectsStart
      onChange={(date) => setDisplayStartDate(date)}
      locale="fr"
      showTimeSelect
      timeFormat="p"
      timeIntervals={30}
      timeCaption="Heure"
      dateFormat="Pp"
      // dateFormat="d MMMM yyyy à hh:mm"
      showYearDropdown
      scrollableMonthYearDropdown
      placeholderText="Selectionnez une date et une heure"
    />
  </div >

  //DATE DE FIN D'AFFICHAGE
  const inputFlashNewsEndDate = <div className="create_flash_news_form_group">
    <p className="black_text create_flash_news_item_title_frame_width">Fin d'affichage:</p>
    <DatePicker className="create_flash_news_input create_flash_news_large_input" id="input_flash_news_end_date" name="input_flash_news_end_date"
      // showIcon
      selected={displayEndDate}
      onChange={(date) => setDisplayEndDate(date)}
      locale="fr"
      showTimeSelect
      timeFormat="p"
      timeIntervals={30}
      timeCaption="Heure"
      dateFormat="Pp"
      // dateFormat="d MMMM yyyy à hh:mm"
      showYearDropdown
      scrollableMonthYearDropdown
      placeholderText="Selectionnez une date et une heure"
    />
  </div>

  const inputFlashNewsTitle = <div className="create_flash_news_form_group">
    <p className="black_text create_flash_news_item_title_frame_width">Titre :</p>
    <input onChange={(e) => setTitle(e.target.value)} value={title} className="create_flash_news_input create_flash_news_extra_large_input" id="input_flash_news_title" name="input_flash_news_title" type="text" placeholder="Gymnase Chantaco fermé le Mercredi" />
  </div>

  const inputFlashNewsBodyText = <div className="create_flash_news_form_group">
    <p className="black_text create_flash_news_item_title_frame_width">Texte d'explication</p>
    <textarea onChange={(e) => setBodyText(e.target.value)} value={bodyText} className="create_flash_news_input create_flash_news_description" id="input_flash_news_body_text" name="input_flash_news_body_text" type="textarea" placeholder="Pour cause de vacances, le gymnase Chantaco sera fermé le mercredi 13 Mars. Il n'y aura donc pas d'entrainement." />
  </div>

  const flashNewsValidationButton = <button onClick={() => validateFlashNewsCreation()} className="flash_news_button active_validation_button">Valider</button>

  return (
    <div className="bo_flash_news_big_frame">
      <p className="red_title">Créer une Flash News</p>
      <div className="flash_news_creation_frame">
        {inputFlashNewsStartDate}
        {inputFlashNewsEndDate}
        {inputFlashNewsTitle}
        {inputFlashNewsBodyText}
      </div>
      {flashNewsValidationButton}
      {flashNewsSuccessMessage}
      {flashNewsErrorMessage}
    </div>
  )
};

export default CreateFlashNews;
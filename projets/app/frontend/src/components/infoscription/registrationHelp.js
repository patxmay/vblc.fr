import { useState } from "react";
import "../../styles/infoscription/registrationHelp.css";


function RegistrationHelp() {

  //POUR LE CAROUSEL
  const [activeIndex, setActiveIndex] = useState(0);

  const registrationHelpInfoArray = [
    {
      "title": 'Connectez-vous / FFVB',
      "imageUrl": ".././images/registrationHelp/createAnAccountOrConnect.png",
      "text1": 'Pas de compte FFVB? Cliquez sur "CRÉER" pour créer votre compte',
      "text2": "Pour inscrire un mineur, il faut que le représentant légal ou le parent crée un compte et y ajoute un compte enfant."

    },
    {
      "title": "Créez votre compte...",
      "imageUrl": ".././images/registrationHelp/personalDataForm.png",
      "text1": "Pour ceux qui n'ont pas encore de compte FFVB, remplissez le formulaire pour créer votre compte",
      "text2": "Pour ceux qui possèdent déjà un compte, vos données sont automatiquement récupérées une fois vous vous êtes connecté avec vos identifiants."
    },
    {
      "title": "Vous inscrire...",
      "imageUrl": ".././images/registrationHelp/clickOnIconRegistration.png",
      "text1": "Cliquez sur l'icône Inscription.",
      "text2": "Vous pouvez également consulter votre profil."
    },
    {
      "title": "Le formulaire d'inscription",
      "imageUrl": ".././images/registrationHelp/registrationForm.png",
      "text1": "Remplissez le formulaire d'inscription",
      "text2": ""
    },
    {
      "title": "Votre souhait...",
      "imageUrl": ".././images/registrationHelp/competitonFormatSelection.png",
      "text1": "Sélectionnez << Pratique hors compétition (extention VPT) >> pour ceux qui s'entrainent le mercredi soir à Chantaco en championnat BLVB (en général les séniors de plus de 18 ans).",
      "text2": "Sélectionnez << Jouer en compétition >> pour ceux qui s'entrainent le mardi soir ou le samedi matin, (en général tous les jeunes de 12 à 18 ans)."
    },
    {
      "title": "Votre discipline...",
      "imageUrl": ".././images/registrationHelp/gameFormatSelection.png",
      "text1": 'Sélectionnez "En salle"',
      "text2": ""
    },
    {
      "title": 'Identifiez votre club...',
      "imageUrl": ".././images/registrationHelp/clubSelection.png",
      "text1": 'Sélectionnez le "64-Pyrénées-Atlantiques"',
      "text2": 'Sélectionnez le club "VOLLEY-BALL LUZIEN CIBOURIEN"'
    },
    {
      "title": "Certificat médical",
      "imageUrl": ".././images/registrationHelp/healthCertificat.png",
      "text1": "Si vous êtes un ancien adhérent et que votre certificat médical date de moins de 3 ans, vous n'avez pas besoin d'en fournir un nouveau.",
      "text2": 'Pour certains joueurs qui jouaient en régional 2 la saison dernière, il faudra demander à votre médecin un "simple surclassement".'
    },
    {
      "title": "Souscription d'une assurance",
      "imageUrl": ".././images/registrationHelp/Insurance.png",
      "text1": "Sélectionnez Decide de souscrire au contrat collectif << Accident Corporel >> et choisis l'Option de base inscluse dans le licence (valorisée à 0,58€ TTC)",
      "text2": ""
    },
    {
      "title": "Questions légales et RGPD...",
      "imageUrl": ".././images/registrationHelp/legalAndRGPD.png",
      "text1": "Attestez et autorisez selon votre cas et votre souhait",
      "text2": ""
    },
    {
      "title": "Votre créneau ou équipe...",
      "imageUrl": ".././images/registrationHelp/teamSelection.png",
      "text1": "Pour les jeunes de moins de 18 ans, sélectionnez le créneau correspondant à votre année de naissance.",
      "text2": "Pour le loisir, sélectionnez << Senior Loisir B.L.V.B >>"
    },
    {
      "title": "Les droits à l'image...",
      "imageUrl": ".././images/registrationHelp/imageRight.png",
      "text1": "Cochez l'une des 2 options",
      "text2": ""
    },
    {
      "title": "Anti-dopage et accident...",
      "imageUrl": ".././images/registrationHelp/control.png",
      "text1": "Validez les autorisations",
      "text2": ""
    },
    {
      "title": "Informations sur le club...",
      "imageUrl": ".././images/registrationHelp/informationClub.png",
      "text1": 'Cliquez sur "Valider"',
      "text2": ""
    },
  ];

  //ACTUALISATION DE L'INDEX DU CAROUSEL LORSQUE QUE L'INDEX EST EGAL OU INFERIEURE A 0 OU LORQUE L'INDEX EST SUPÉRIEURE À LA LONGUEUR DES EVENEMENTS
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= registrationHelpInfoArray.length) {
      // newIndex = futureEvents.length - 1;
      newIndex = 0
    }
    setActiveIndex(newIndex);
  };

  return (
    <div className="main">
      <div className="registration_help_carousel_big_frame">
        <div className="registration_help_carousel_inner_frame" style={{ transform: `translate(-${activeIndex * 100}%)` }}>
          {registrationHelpInfoArray.map((e, index) => {
            return (
              <div key={index} className="registration_help_carousel_items_frame">
                <div className="registration_help_carousel_item_frame">
                  <div className="registration_help_carousel_title_frame">
                    <p className="registration_help_carousel_title">{e.title.toLocaleUpperCase()}</p>
                  </div>
                  <div className="registration_help_carousel_image_frame">
                    <img src={e.imageUrl} alt="" className="registration_help_carousel_image" />
                  </div>
                  <div className="registration_help_carousel_text_frame">
                    <p className="registration_help_carousel_text">{e.text1}</p>
                    <p className="registration_help_carousel_text">{e.text2}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="registration_help_carousel_indicators_frame">
        {registrationHelpInfoArray.map((item, index) => {
          return (
            <div key={index}>
              <button onClick={() => updateIndex(index)} className={`registration_help_indicator_buttons ${index === activeIndex ? "registration_help_indicator_symbol_active" : "registration_help_indicator_symbol"}`} />
            </div>
          )
        })}
      </div>
      <div className="registration_help_carousel_buttons_frame">
        <button className="registration_help_carousel_views_buttons registration_help_carousel_previews_button" onClick={() => updateIndex(activeIndex - 1)}>Précédent</button>
        <button className="registration_help_carousel_views_buttons registration_help_carousel_next_button" onClick={() => updateIndex(activeIndex + 1)} >Suivant</button>
      </div>
    </div>
  )

};

export default RegistrationHelp;
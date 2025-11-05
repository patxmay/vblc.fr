import "../../styles/partners/partners.css"
import { useNavigate } from "react-router-dom";


function Partners() {

  const navigate = useNavigate()

  const privatePartnerData = [
    {
      "partner": "Carmen",
      "logoUrl": ".././images/partner/logoPartnerCarmen.png",
      "width": "120%",
      "webLink": "https://www.carmen-immobilier.com"
    },
    {
      "partner": "Frigeral",
      "logoUrl": ".././images/partner/logoPartnerFrigeral.png",
      "width": "70%",
      "webLink": "https://frigeral.relaisdor.fr"
    },
    {
      "partner": "Fest",
      "logoUrl": ".././images/partner/logoPartnerFest.png",
      "width": "80%",
      "webLink": "https://fest-graphisme.fr"
    },
    {
      "partner": "Digues Vauban",
      "logoUrl": ".././images/partner/logoPartnerDiguesVauban.png",
      "width": "80%",
      "webLink": "https://www.lesdiguesvauban.com/fr"
    },
    {
      "partner": "Cremerie Laminak",
      "logoUrl": ".././images/partner/logoPartnerCremerieLaminak.jpg",
      "width": "70%",
      "webLink": "https://www.facebook.com/laminakcremerie/"
    },
    {
      "partner": "Ocean Adventure",
      "logoUrl": ".././images/partner/logoPartnerOceanAdventure.png",
      "width": "80%",
      "webLink": "https://oceanadventure.surf"
    },
  ];

  let privatePartnerDisplay = privatePartnerData.map((e, index) => {
    return (
      <div key={index} className="logo_frame">
        <a className="logo_link" href={e.webLink} target="_blank" rel="noreferrer" >
          <img className="logo" src={e.logoUrl} alt="" width={e.width} sizes="cover" />
        </a>
      </div>
    )
  });

  const publicPartnerData = [
    {
      "partner": "Saint Jean de Luz",
      "logoUrl": ".././images/partner/logoPartnerSaintJeanDeLuz.png",
      "width": "80%",
      "webLink": "https://www.saintjeandeluz.fr/fr/"
    },
    {
      "partner": "Ciboure",
      "logoUrl": ".././images/partner/logoPartnerCiboure.png",
      "width": "70%",
      "webLink": "https://mairie-ciboure.fr"
    },
    {
      "partner": "Communauté d'agglomération",
      "logoUrl": ".././images/partner/LogoPartnerAggloBasque.png",
      "width": "70%",
      "webLink": "https://www.communaute-paysbasque.fr"
    },
    {
      "partner": "Département Pyrénées Alantiques",
      "logoUrl": ".././images/partner/logoPartnerDepartementPyreneesAtlantiques.png",
      "width": "70%",
      "webLink": "https://www.le64.fr"
    },
    {
      "partner": "Région Nouvelle Aquitaine",
      "logoUrl": ".././images/partner/logoPartnerRegionNouvelleAquitaine.png",
      "width": "70%",
      "webLink": "https://www.nouvelle-aquitaine.fr"
    }
  ];

  let publicPartnerDisplay = publicPartnerData.map((e, index) => {
    return (
      <div key={index} className="logo_frame">
        <a className="logo_link" href={e.webLink} target="_blank" rel="noreferrer">
          <img className="logo" src={e.logoUrl} alt="" width={e.width} sizes="cover" />
        </a>
      </div>
    )
  });

  const sportPartnerData = [
    {
      "partner": "FFV",
      "logoUrl": ".././images/partner/logoPartnerFFVB.png",
      "width": "60%",
      "webLink": "http://www.ffvb.org"
    },
    {
      "partner": "LNV",
      "logoUrl": ".././images/partner/logoPartnerVNL.svg.png",
      "width": "40%",
      "webLink": "https://www.lnv.fr/accueil"
    },
    {
      "partner": "FFV LNA",
      "logoUrl": ".././images/partner/logoPartnerLNAVolley.png",
      "width": "90%",
      "webLink": "https://www.lnavolley.org"
    }
  ];

  let sportPartnerDisplay = sportPartnerData.map((e, index) => {
    return (
      <div key={index} className="logo_frame">
        <a className="logo_link" href={e.webLink} target="_blank" rel="noreferrer" >
          <img className="logo" src={e.logoUrl} alt="" width={e.width} sizes="cover" />
        </a>
      </div>
    )
  });

  const goToContactPage = () => {
    navigate('/contact')
  }

  return (
    <div style={{ backgroundColor: "transparent", alignItems: "center", paddingTop: 120, paddingInline: 10}}>
      <div className="partners_blocs">
        <p className="red_title">Devenez partenaire du club V.B.L.C</p>
        <p className="black_text">Avec ses 140 adhérents sportifs et l'organisation de ses 4 tournois par an dont le tournoi de beach des Fêtes de Saint-Jean-de-Luz, le club V.B.L.C fait partie des clubs de volley-ball les plus dynamiques du Pays Basque. Être partenaire du club V.B.L.C ou sponsor de l'un de ses évènements est l'assurance de donner encore plus de visibilité à votre marque ou votre établissement. Vous souhaitez devenir partenaire ou sponsor du club V.B.L.C?</p>
        <button onClick={() => goToContactPage()} className="partners_button">
          <p className="partners_contact">Contactez-nous</p>
        </button>
      </div>
      <div className="partners_blocs">
        <h4 className="red_title">Nos partenaires privés</h4>
        <div className="row_logo_frame">
          {privatePartnerDisplay}
        </div>
      </div>
      <div className="partners_blocs">
        <h4 className="red_title">Nos partenaires sportifs et administratifs</h4>
        <div className="row_logo_frame">
          {publicPartnerDisplay}
        </div>
      </div>
      <div className="partners_blocs">
        <h4 className="red_title">Nos partenaires sportifs</h4>
        <div className="row_logo_frame">
          {sportPartnerDisplay}
        </div>
      </div>
    </div>
  )
};

export default Partners;
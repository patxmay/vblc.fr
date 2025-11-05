import "../../styles/infoscription/registration.css";
import { FaCreditCard, FaFilePen, FaVolleyball, FaPlay, FaTriangleExclamation } from "react-icons/fa6"

import { getNumericYear } from "../../utils/date";
import { useNavigate } from "react-router-dom";


function Registration() {

  const navigate = useNavigate()

  const navigateToClubInformationSheet = () => {
    navigate('/clubInformationSheet')
  }

  const registrationProcess = <div className="registration_process_big_frame">
    <p className="red_title">Pour vous inscrire ou renouveler votre licence, rien de plus simple...</p>
    <div className="process_big_frame">
      <div className="process_step_frame">
        <div className="process_icon_frame">
          <FaVolleyball style={{ color: "red", width: 60, height: 60 }} />
        </div>
        <div className="process_text_frame">
          <p className="black_text">1. Créez un compte ou connectez-vous à votre compte {<a href='https://login.ffvolley.org/' className="process_href_button" target="_blank" rel='noopener noreferrer'>F.F.V.B</a>} et suivez les étapes</p>
          {/* <a className="process_ffbv_info" onClick={() => goToRegistrationHelp()}>Besoin d'aide?</a> */}
          <a className="process_ffbv_info" href="/registrationHelp" >Besoin d'aide?</a>
        </div>
      </div>
      <div className="process_arrow_frame">
        <FaPlay className="process_arrow" />
      </div>
      <div className="process_step_frame">
        <div className="process_icon_frame">
          <FaFilePen style={{ color: "red", width: 60, height: 60 }} />
        </div>
        <div className="process_text_frame">
          <p className="black_text">2. Complétez la {<p onClick={() => navigateToClubInformationSheet()} className="vblc_form">Fiche du club V.B.L.C</p>}</p>
        </div>
      </div>
      <div className="process_arrow_frame">
        <FaPlay className="process_arrow" />
      </div>
      <div className="process_step_frame">
        <div className="process_icon_frame">
          <FaCreditCard style={{ color: "red", width: 60, height: 60 }} />
        </div>
        <div className="process_text_frame">
          <p className="black_text">3. Payez votre licence pour valider votre inscription pour la saison à venir</p>
        </div>
      </div>
    </div>
  </div >;

  const date = new Date();
  
  const licencesPricesDatas = [
    {
      "category": "Licence VPT Senior (B.L.V.B)",
      "birthYear": `${getNumericYear(date) - 22} et avant`,
      "vblcPart": "80",
      "ffvbPart": "30",
      "total": "110",
    },
    {
      "category": "Compétition Senior",
      "birthYear": `${getNumericYear(date) - 21} et avant`,
      "vblcPart": "80",
      "ffvbPart": "100",
      "total": "180",
    },
    {
      "category": "Compétition M21",
      "birthYear": `${getNumericYear(date) - 20}, ${getNumericYear(date) - 19}, ${getNumericYear(date) - 18},`,
      "vblcPart": "80",
      "ffvbPart": "100",
      "total": "180",
    },
    {
      "category": "Compétition M18",
      "birthYear": `${getNumericYear(date) - 17}, ${getNumericYear(date) - 16}, ${getNumericYear(date) - 15},`,
      "vblcPart": "80",
      "ffvbPart": "100",
      "total": "180",
    },
    {
      "category": "Compétition M15",
      "birthYear": `${getNumericYear(date) - 14}, ${getNumericYear(date) - 13}`,
      "vblcPart": "80",
      "ffvbPart": "70",
      "total": "150",
    },
    {
      "category": "Compétition M13/M11",
      "birthYear": `${getNumericYear(date) - 12}, ${getNumericYear(date) - 11}, ${getNumericYear(date) - 10}, ${getNumericYear(date) - 9}`,
      "vblcPart": "80",
      "ffvbPart": "70",
      "total": "150",
    },
  ]


  const licencePrices = <div className="licences_big_frame">
    <p className="red_title">Cotisation et licences</p>
    <div className="licences_title_row">
      <div className="licences_title" style={{ width: "20%", border: "solid", borderColor: "#FFFFFF", borderTopLeftRadius: "10px" }}>
        <p className="licences_title_label">Licence</p>
      </div>
      <div className="licences_title" style={{ width: "20%", border: "solid", borderColor: "#FFFFFF" }}>
        <p className="licences_title_label">Année de naissance du joueur</p>
      </div>
      <div className="licences_title" style={{ width: "20%", border: "solid", borderColor: "#FFFFFF" }}>
        <p className="licences_title_label">Part V.B.L.C</p>
      </div>
      <div className="licences_title" style={{ width: "20%", border: "solid", borderColor: "#FFFFFF" }}>
        <p className="licences_title_label">Part FFVB, LNAVB, CDVB64</p>
      </div>
      <div className="licences_title" style={{ width: "20%", border: "solid", borderColor: "#FFFFFF", borderTopRightRadius: 10 }}>
        <p className="licences_title_label">Total</p>
      </div>
    </div>
    {licencesPricesDatas.map((e, index) => {
      return (
        <div key={index} className="licences_title_row">
          <div className="licences_items" style={{ width: "20%", border: "solid", borderColor: "#FFFFFF", borderBottomLeftRadius: "10px" }}>
            <p className="licences_title_label">{e.category} </p>
          </div>
          <div className="licences_items" style={{ width: "20%", border: "solid", borderColor: "#FFFFFF" }}>
            <p className="licences_title_label">{e.birthYear}</p>
          </div>
          <div className="licences_items" style={{ width: "20%", border: "solid", borderColor: "#FFFFFF" }}>
            <p className="licences_title_label">{e.vblcPart}€</p>
          </div>
          <div className="licences_items" style={{ width: "20%", border: "solid", borderColor: "#FFFFFF" }}>
            <p className="licences_title_label">{e.ffvbPart}€</p>
          </div>
          <div className="licences_items" style={{ width: "20%", border: "solid", borderColor: "#FFFFFF", borderBottomRightRadius: "10px" }}>
            <p className="licences_title_label" style={{fontWeight: "bold"}}>{e.total}€</p>
          </div>
        </div>
      )
    })}
  </div>


  const paymentInfo = <div className="paymentInfo_big_frame">
    <p className="red_title">Règlement de la licence</p>
    <div className="payment_mode">
      {/* <p className="black_text">Mode de paiement:</p> */}
      <div className="payment_item">
        <p className="payment_mode_title">- Par virement:</p>
        <p className="black_text">Pour payer la cotisation, vous pouvez effectuer un virement:</p>
        <p className="black_text">IBAN: FR76 1090 7007 2123 0211 4852 090</p>
        <p className="black_text">Lors du virement, indiquez svp votre nom et prénom dans le libellé du virement ou celui de votre enfant.</p>   
      </div>
      <div className="payment_item">
        <p className="payment_mode_title">- Avec les coupons sport ANCV:</p>
        <p className="black_text">Vous pouvez compléter le reste à payer avec un autre mode de paiement si besoin.</p>
      </div>
      <div className="payment_item">
        <p className="payment_mode_title">- Avec le "Pass'Sport":</p>
        <p className="black_text">Envoyez votre code de Pass'Sport à l'adresse: {<a href="mailto:vblc.president@free.fr">vblc.president@free.fr</a>} et complétez le reste à payer avec un autre mode de paiement si besoin. {<a className="black_text" href='https://pass.sports.gouv.fr/'  target="_blank" rel='noopener noreferrer'>En savoir plus sur le Pass'Sport</a>}</p>
      </div>
      <div className="payment_item">
        <p className="payment_mode_title">- Avec l'application Lydia:</p>
      </div>
      <div className="payment_item">
        <p className="payment_mode_title">{<FaTriangleExclamation style={{ color: "red", width: 20, height: 20 }} />} Pour des raisons d'assurance, l'accès aux entrainements et à la compétition au sein des équipes V.B.L.C ne sera autorisé que si les dossiers d'inscription sont complets et la cotisation réglée.</p>
      </div>
    </div>
  </div>

  return (
    <div className="main">
      <div>
        {registrationProcess}
        <div className="licenceAndPayment_frame">
          {licencePrices}
          {paymentInfo}
        </div>
      </div>
    </div>
  )
};

export default Registration;
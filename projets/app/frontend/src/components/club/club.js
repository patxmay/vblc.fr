import "../../styles/club/club.css";
import { FaEnvelope, FaMobileButton } from "react-icons/fa6";

function Club() {

  const officeMembers = [
    {
      "picture": "",
      "position": "Président",
      "memberName": "Francis Milhau",
      "email": "vblc.president@free.fr",
      "mobile": +33679249150
    },
    {
      "picture": "",
      "position": "Vice-Président",
      "memberName": "Charles Granger-Veyron",
      "email": "charles.granger-veyron@hotmail.fr",
      "mobile": +33679761367
    },
    {
      "picture": "",
      "position": "Secrétaire",
      "memberName": "Francis Munos",
      "email": "francismounos@sfr.fr",
      "mobile": +33613412783
    },
    {
      "picture": "",
      "position": "Vice-Secrétaire",
      "memberName": "Sébastien Beaufort",
      "email": "sebastienbeaufort64@gmail.com",
      "mobile": +33782748875
    },
    {
      "picture": "",
      "position": "Trésorière",
      "memberName": "Sophie Casanova-Beaufort",
      "email": "sophie-casanova@orange.fr",
      "mobile": +33675721799
    },

  ];

  let memberCard = officeMembers.map((e, index) => {
    return (
      <div key={index} className="single_member_bloc">
        <div className="single_member_picture">

        </div>
        <div className="single_member_info">
          <p className="black_text">{e.position}</p>
          <p className="black_text_thicker">{e.memberName}</p>
          <div className="member_contact_frame">
            <a href={`mailto:${e.email}`}>
              <FaEnvelope size={25} className="member_contact_icon" />
            </a>
            <a href={`tel:${e.mobile}`}>
              <FaMobileButton size={25} className="member_contact_icon" />
            </a>
          </div>
        </div>
      </div>
    )
  });

  const values = [
    {
      "title": "ÉGALITÉ",
      "explanation": "Sur les terrains du V.B.L.C, tous les joueurs sont égaux quelles que soient leurs qualités."
    },
    {
      "title": "PLAISIR DU JEU",
      "explanation": "Gagner ou perdre un match, le plus important est de prendre du plaisir au jeu."
    },
    {
      "title": "ESPRIT D'ÉQUIPE",
      "explanation": "Chaque joueur apporte ses propres qualités et ses performances pour que l'équipe avance."
    },
    {
      "title": "PARTAGE",
      "explanation": "Chaque joueur est encouragé à conseiller et à partager ses techniques."
    }
  ];

  let valuesThumbnail = values.map((e, index) => {
    return (
      <div key={index} className="value_thumbnails">
        <h3 className="red_title_thicker">{e.title}</h3>
        <p className="black_text">{e.explanation}</p>
      </div>
    )
  });

  const figuresContent = [
    {
      "number": "140",
      "content": "ADHÉRENTS"
    },
    {
      "number": "4",
      "content": "ÉQUIPES PROXY"
    },
    // {
    //   "number": "2",
    //   "content": "ÉQUIPES REGIONALES"
    // },
    {
      "number": "5",
      "content": "ÉQUIPES CORPO"
    },
    {
      "number": "4",
      "content": "TOURNOIS / AN"
    },
  ];

  let figuresContentDisplay = figuresContent.map((e, index) => {
    return (
      <div key={index} className="figures_round">
        <h1 className="number">{e.number}</h1>
        <p className="content">{e.content}</p>
      </div>
    )
  });

  
  return (
    <div className="main">
      <div className="club_picture_frame">
        <img className="picture" src="/images/photoGroupe2017VBLC169.jpg" alt="" />
      </div>
      <div className="info_bloc">
        <div className="info_left_bloc">
          <div className="club_bloc">
            <p className="red_title">Le club V.B.L.C</p>
            <p className="black_text">
              Le club V.B.L.C, Volley-Ball Luzien Cibourien, est le club de Volley-Ball et Beach-Volley de Saint-Jean-de-Luz et de Ciboure. Créé il y a plus de 30 an, le club est devenu, au fil des années, l'un des clubs de Volley-Ball et de Beach-Volley les plus dynamiques de la côte. Ce dynamisme est reflété à la fois par la relance de l'école de Volley-Ball depuis 2016 afin de promouvoir le Volley-Ball chez les jeunes sur la côté basque grâce à l'encouragement du Comité Départemental de Volley-Ball et à l'encadrement d'Éric BROUETTE (Diplômé d'Etat FFVB), par l'engagement de sa centaine d'adhérents dans différents championnats Proxy et Région et dans le championnat corporatif B.L.V.B, Basco-Lande Volley-Ball, qui regroupe les clubs Bayonne Volley-Ball, ASPTT Bayonne Côte Basque Volley-Ball, Anglet Olympique Volley-Ball, Volley-Ball Capbreton, Tosse Volley Club, Ondres Volley-Ball ainsi que par l'organisation de différents tournois annuels, ouverts à tous, dont le fameux tounoi de Beach-Volley 3x3 annuel à l'occasion des fêtes de Saint Jean de Luz qui rassemble chaque année près de 30 équipes...
            </p>
            <p className="black_text">
              Jeunes et moins jeunes, confirmés ou débutants? Si vous avez envie de vous engager dans un championnat ou tout simplement de vous initier au Volley-Ball ou au Beach-Volley, venez nous rejoindre!
            </p>
          </div>
          <div className="values_bloc">
            <p className="red_title">Les valeurs du club V.B.L.C</p>
            <p className="black_text ">
              Le club V.B.L.C partage pleinement les valeurs du Volley-Ball mises en avant par le FFVB que sont le RESPECT, l’INTÉGRITÉ, la SOLIDARITÉ et la LOYAUTÉ auxquelles s’ajoutent les valeurs propres au club, qui au fil de l’histoire ont fait du club ce qu’il est aujourd’hui:
            </p>
            <div className="value_thumbnails_bloc">
              {valuesThumbnail}
            </div>
          </div>
          <div className="figures_bloc">
            <p className="red_title">Quelques chiffres du club</p>
            <div className="figures_thumbnails_bloc">
              {figuresContentDisplay}
            </div>
          </div>
        </div>
        <div className="info_right_bloc">
          <div className="member_bloc">
            <p className="red_title">Le bureau</p>
            {memberCard}
          </div>
          <div className="member_bloc">
            <p className="red_title">Siège social</p>
            <p className="black_text address">9 Avenue Bordaberry</p>
            <p className="black_text address">64500 Saint Jean de Luz</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Club;
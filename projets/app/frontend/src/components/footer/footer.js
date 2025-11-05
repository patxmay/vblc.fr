import "../../styles/footer/footer.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FaInstagram, FaSquareFacebook, FaRegCopyright } from "react-icons/fa6";




function Footer() {

  const navigate = useNavigate();

  const goToBO = () => {
    navigate("/signInContributor")
  };

  const goToContact = () => {
    navigate("/contact")
  }

  return (
    <div className="footer_frame">
      <div className="footer_content_frame">
        <div className="footer_content_items_frame">
          <div className="copyright_vblc">
            <FaRegCopyright style={{ color: "white", width: 10, height: 10, marginRight: 5 }} />
            <p style={{ color: "white", fontSize: 20, fontWeight: 800 }}>V.B.L.C</p>
          </div>
          <p className="footer_regular_text">Club de Volley-Ball et de Beach-Volley</p>
          <p className="footer_regular_text">Saint Jean de Luz & Ciboure</p>
        </div>
        <div className="footer_content_items_frame">
          <p onClick={() => goToBO()} className="footer_regular_text clickable_text">Connexion</p>
          <a className="link" href={"https://www.leetchi.com/fr/c/developpement-du-centre-de-formation-de-volley-ball"} target="_blank" rel="noreferrer" >
            <p className="footer_regular_text">Cagnotte</p>
          </a>
          <a className="link" href={"http://www.vblc.fr/dolivblc/htdocs/"} target="_blank" rel="noreferrer" >
            <p className="footer_regular_text">ERP</p>
          </a>
          <p onClick={() => goToContact()} className="footer_regular_text clickable_text">Contact</p>
        </div>
        <div className="footer_social_media_frame">
          <a className="" href={"https://www.instagram.com/vblc_volleyball/?hl=fr"} target="_blank" rel="noreferrer" >
            <FaInstagram style={{ color: "white", width: 40, height: 40, backgroundColor: "transparent" }} />
          </a>
          <a className="" href={"https://www.facebook.com/vblc64/"} target="_blank" rel="noreferrer" >
            <FaSquareFacebook style={{ color: "white", width: 40, height: 40, backgroundColor: "transparent" }} />
          </a>
        </div>
        <div >
          <a className="link" style={{textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center"}}  href={"https://byjmn.fr"} target="_blank" rel="noreferrer">
            <p style={{ color: "white", fontSize: 16, fontWeight: 800, paddingRight: "10px" }}>Site créé par</p>
            <img className="jmnfavicon" src=".././images/jmnfavicon.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  )
};

export default Footer
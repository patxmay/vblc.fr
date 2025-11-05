import { useState } from 'react'; // ES6 js
// import "./nav.css"
import "../../styles/navbar/nav.css"
import { Link } from 'react-router-dom';



function Nav() {


  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks)
  };

  const handleHideLinks = () => {
    setShowLinks(false)
  };

  return (
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>

      <Link to="/" className='navbar_logo'>
        <img className="logo" width={100} src='.././images/logo_vblc.png' alt='' />
      </Link>

      <div className='name_menu'>
        <div className='name_bloc'>
          <p className='name_acronym'>V.B.L.C</p>
          <p className='name'>VOLLEY BALL LUZIEN CIBOURIEN</p>
        </div>
        <ul className='navbar_links'>
          <li className='navbar_item slideInDown-1'>
            <Link to="/club" className='navbar_link' onClick={handleHideLinks}>Le Club </Link>
          </li>
          <li className='navbar_item slideInDown-2'>
            <Link to="/infoscription" className='navbar_link' onClick={handleHideLinks}>Informations</Link>
          </li>
          <li className='navbar_item slideInDown-3'>
            <Link to="/teams" className='navbar_link' onClick={handleHideLinks}>Équipes</Link>
          </li>
          <li className='navbar_item slideInDown-4'>
            <a href='https://www.blvb.fr/blvb/' className='navbar_link' target="_blank" rel='noopener noreferrer'>BLVB</a>
          </li>
          <li className='navbar_item slideInDown-5'>
            <Link to="/beach" className='navbar_link' onClick={handleHideLinks}>Beach</Link>
          </li>
          <li className='navbar_item slideInDown-6'>
            <Link to="/events" className='navbar_link' onClick={handleHideLinks}>Évènements</Link>
          </li>
          <li className='navbar_item slideInDown-7'>
            <Link to="/partners" className='navbar_link' onClick={handleHideLinks}>Partenaires</Link>
          </li>
          <li className='navbar_item slideInDown-8'>
            <Link to="/contact" className='navbar_link' onClick={handleHideLinks}>Contact</Link>
          </li>
        </ul>
      </div>
      <button className='navbar_burger' onClick={handleShowLinks}>
        <span className='burger_bar'></span>
      </button>
    </nav>

  );
}

export default Nav;
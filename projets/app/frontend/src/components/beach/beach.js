import { useState, useEffect } from "react";
import "../../styles/beach/beach.css"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";



function Beach() {

  const [vblcBeachData, setVblcBeachData] = useState([]);

  const [beachActiveIndex, setBeachActiveIndex] = useState(0)
  const [summerBeachActiveIndex, setSummerBeachActiveIndex] = useState(0)

  useEffect(() => {
    const findVblcBeachSectionData = async () => {
      const data = await fetch('https://api.vblc.fr/beachRoute/loadBeachSectionData')
      const body = await data.json();
      setVblcBeachData(body)
    }
    findVblcBeachSectionData();
  }, [])

  useEffect(() => {
    localStorage.setItem("vblcBeachData", JSON.stringify(vblcBeachData))
  }, [vblcBeachData]);

  // FONCTION QUI ACTIONNE LE CAROUSEL BEACH VOLLEY
  const updateBeachIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0
    } else if (newIndex >= vblcBeachData[0].pictures.length) {
      newIndex = 0
    }
    setBeachActiveIndex(newIndex);
  };

  // FONCTION QUI ACTIONNE LE CAROUSEL SUMMER BEACH VOLLEY
  const updateSummerBeachIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0
    } else if (newIndex >= vblcBeachData[1].pictures.length) {
      newIndex = 0
    }
    setSummerBeachActiveIndex(newIndex);
  };



  const sectionsBis = vblcBeachData.map((e, index) => {
    return (
      <div className="key_frame" key={index}>
        <p className="red_title">{e.title}</p>
        {e.title === "Section V.B.L.C Beach-Volley" ? <div className="carousel_picture_buttons_frame">
          <div className="carousel_picture_frame" style={{ transform: `translate(-${beachActiveIndex * 100}%)` }}>
            {e.pictures !== undefined || e.pictures !== "" ? e.pictures.map((e, index) => {
              return (
                <div key={index} className="carousel_picture_item_frame">
                  <div className="carousel_picture_item">
                    <img src={e.pictureUrl} alt="" className="carousel_picture" />
                  </div>
                </div>
              )
            }) : <div />}
          </div>
          <div className="beach_carousel_picture_buttons_frame">
            <div onClick={() => updateBeachIndex(beachActiveIndex - 1)} className="beach_carousel_left_button_bis" >
              <FaAngleLeft style={{ color: "red", width: 20, height: 20 }} />
            </div>
            <div className="beach_point_indicators">
              {e.pictures.map((e, index) => {
                return (
                  <div key={index}>
                    <button onClick={() => updateBeachIndex(index)} className={`beach_point_indicator_buttons ${index === beachActiveIndex ? "beach_point_indicator_symbol_active" : "beach_point_indicator_symbol_unactive"}`} />
                  </div>
                )
              })}
            </div>
            <div onClick={() => updateBeachIndex(beachActiveIndex + 1)} className="beach_carousel_right_button_bis">
              <FaAngleRight style={{ color: "red", width: 20, height: 20 }} />
            </div>
          </div>
        </div> : e.title === "Section Initiation au Beach-Volley" ? <div className="carousel_picture_buttons_frame">
          <div className="carousel_picture_frame" style={{ transform: `translate(-${summerBeachActiveIndex * 100}%)` }}>
            {e.pictures !== undefined || e.pictures !== "" ? e.pictures.map((e, index) => {
              return (
                <div key={index} className="carousel_picture_item_frame">
                  <div className="carousel_picture_item">
                    <img src={e.pictureUrl} alt="" className="carousel_picture" />
                  </div>
                </div>
              )
            }) : <div />}
          </div>
          <div className="beach_carousel_picture_buttons_frame">
            <div onClick={() => updateSummerBeachIndex(summerBeachActiveIndex - 1)} className="beach_carousel_left_button_bis" >
              <FaAngleLeft style={{ color: "red", width: 20, height: 20 }} />
            </div>
            <div className="beach_point_indicators">
              {e.pictures.map((e, index) => {
                return (
                  <div key={index}>
                    <button onClick={() => updateSummerBeachIndex(index)} className={`beach_point_indicator_buttons ${index === summerBeachActiveIndex ? "beach_point_indicator_symbol_active" : "beach_point_indicator_symbol_unactive"}`} />
                  </div>
                )
              })}
            </div>
            <div onClick={() => updateSummerBeachIndex(summerBeachActiveIndex + 1)} className="beach_carousel_right_button_bis">
              <FaAngleRight style={{ color: "red", width: 20, height: 20 }} />
            </div>
          </div>
        </div> : <div />}
        <div className="section_details">
          <div className="section_details_items">
            <p className="section_details_title">Coachs</p>
            <div className="beach_coach">
              {e.coachs[1].firstName !== "" && e.coachs[1].lastName !== "" && e.coachs[1].pictureUrl !== "" ? e.coachs.map((e, index) => {
                return (
                  <div key={index} className="beach_coach_item_2">
                    <div className="beach_coach_pict">
                      <img className="coach_pict" src={e.pictureUrl} width={70} height={70} alt="" />
                    </div>
                    <div className="beach_coach_data">
                      <p className="black_text">{e.firstName}</p>
                      <p className="black_text">{e.lastName.toLocaleUpperCase()}</p>
                      <p className="black_text">{e.qualification}</p>
                    </div>
                  </div>
                )
              }) : <div className="beach_coach_item_1">
                <div className="beach_coach_pict">
                  <img className="coach_pict" src={e.coachs[0].pictureUrl} width={70} height={70} alt="" />
                </div>
                <div className="beach_coach_data">
                  <p className="black_text">{e.coachs[0].firstName}</p>
                  <p className="black_text">{e.coachs[0].lastName.toLocaleUpperCase()}</p>
                  <p className="black_text">{e.coachs[0].qualification}</p>
                </div>
              </div>}
            </div>
          </div>
          <div className="section_details_items">
            <p className="section_details_title">Lieu & Horaires</p>
            <p className="black_text">{e.training.place}</p>
            <p className="black_text">{e.training.period1}</p>
            {e.training.period2 !== "" ? <p className="black_text">{e.training.period2}</p> : <p />}
            <p className="black_text">{e.training.day1}</p>
            {e.training.day2 !== "" ? <p className="black_text">{e.training.day2}</p> : <p />}
          </div>
          <div className="section_details_items">
            <p className="section_details_title">Inscription & Cotisation</p>
            <p className="black_text">Inscription: {e.subscription.subscription}</p>
            <p className="black_text">Cotisation: {e.subscription.fees}</p>
          </div>
        </div>
      </div>
    )
  });

  return (
    <div className="main">
      {sectionsBis}
      {/* LE LOGO ORANGE DE VBLC BEACH en POSITION ABSOLUTE*/}
      <div className="logo_placement">
        <img className="beach_logo" src='.././images/logo_vblc_beach.png' alt="" />
      </div>
    </div>
  )
};

export default Beach;
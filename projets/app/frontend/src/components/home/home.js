import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import "../../styles/home/home.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFullWrittenDate, getHoursAndMinutes } from "../../utils/date"


export const EVENT_SELECTED_FROM_HOME = "EVENT_SELECTED_FROM_HOME";


function Home() {

	const [allEvents, setAllEvents] = useState([]);
	const [commingFlashNews, setCommingFlashNews] = useState([])
	const [openFlashNewsModal, setOpenFlashNewsModal] = useState(false)

	//POUR LE CAROUSEL
	const [activeIndex, setActiveIndex] = useState(0);
	//POUR LA NAVIGATION
	const navigate = useNavigate();
	//POUR DISPATCHER LES REDUCERS
	const dispatch = useDispatch();

	//LES FLASH NEWS

	//Récupérer les flash news de la base de données
	useEffect(() => {
		const getCommingFlashNews = async () => {
			const data = await fetch('/flashNewsRoute/loadFlashNews')
			const body = await data.json()
			if (body.length !== 0) {
				setCommingFlashNews(body);
				setOpenFlashNewsModal(true)
			}
		}
		getCommingFlashNews();
	}, []);


	//Afficher les flash news en modal

	const displayFlashNews = openFlashNewsModal === true ? <div className="flash_news_modal_big_frame">
		<div className="flash_news_modal_white_frame">
			<p className="red_title">FLASH NEWS</p>
			{commingFlashNews.map((e, index) => {
				return (
					<div className="flash_news_frame" key={index}>
						<p className="flash_news_title" >{e.title}</p>
						<p className="flash_news_body_text" >{e.bodyText}</p>
					</div>
				)
			})}
			<button onClick={() => setOpenFlashNewsModal(false)} className="flash_news_modal_close_button" >Fermer</button>
		</div>
	</div> : <div />;





	//RÉCUPERER TOUS LES EVENEMENTS DE LA BASE DE DONNÉES
	useEffect(() => {
		const findEvents = async () => {
			const data = await fetch('/eventRoute/loadAllEvents')
			const body = await data.json()
			setAllEvents(body)
		}
		findEvents();
	}, []);


	//ENREGISTRER LES EVENEMENTS DANS LE LOCAL POUR POURVOIR LES RETROUVER AFFICHER SUR LES AUTRES PAGES EN UTILISANT LOCALSTORAGE.GETITEM
	useEffect(() => {
		localStorage.setItem("allEvents", JSON.stringify(allEvents))
	}, [allEvents]);

	//FILTRER TOUS LES ÉVÉNEMENTS QUI NE SONT PAS ENCORE TERMINÉES (FILTRER PAR LA DATE DE LA FIN DE L'ÉVÉNEMENT)
	let futureEvents = allEvents.filter((item) => {
		let today = new Date()
		let eventsEndDate = new Date(item.endDate);
		if (eventsEndDate > today) {
			return (item)
		}
		return false
	});

	//ACTUALISATION DE L'INDEX DU CAROUSEL LORSQUE QUE L'INDEX EST EGAL OU INFERIEURE A 0 OU LORQUE L'INDEX EST SUPÉRIEURE À LA LONGUEUR DES EVENEMENTS
	const updateIndex = (newIndex) => {
		if (newIndex < 0) {
			newIndex = 0;
		} else if (newIndex >= futureEvents.length) {
			// newIndex = futureEvents.length - 1;
			newIndex = 0
		}
		setActiveIndex(newIndex);
	};

	const onHandleDisplayEvent = (e) => {
		dispatch({ type: EVENT_SELECTED_FROM_HOME, payload: e.category })
		navigate('/eventsDetails')
	};



	const newsCarousel = <div className="carousel">
		<div className="inner" style={{ transform: `translate(-${activeIndex * 100}%)` }}>
			{futureEvents.map((e, index) => {

				const buttonType = e.eventType === "Événement avec inscription préalable" || e.eventType === "Tournoi avec inscription préalable" ? <button onClick={() => onHandleDisplayEvent(e)} className="info_button">En savoir plus et inscription</button> : <button onClick={() => onHandleDisplayEvent(e)} className="info_button">En savoir plus...</button>

				return (<div key={index} className="carousel_item">
					<div className="carousel_img_frame">
						<img src={e.poster} alt="" className="responsive_img" />
					</div>
					<div className="carousel_info_frame">
						<p className="news_title">{e.title}</p>
						<div className="news_description_div">
							<p className="black_text center">{e.shortDescription}</p>
							<p className="black_text news_date">{getFullWrittenDate(e.startDate)} à {getHoursAndMinutes(e.startDate)}</p>
							<p className="black_text news_place">{e.place}</p>
						</div>
						{buttonType}
					</div>
				</div>)
			})}
		</div>
		{/* PETITS POINTS INDICATEURS DE L'INDEX */}
		<div className="indicatorss">
			{futureEvents.map((item, index) => {
				return (
					<div key={index}>
						<button onClick={() => updateIndex(index)} className={`indicator-buttons ${index === activeIndex ? "indicator-symbol-active" : "indicator-symbol"}`} />
					</div>
				)
			})}
		</div>
	</div >;

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
			<div key={index} className="partners_frame">
				<a className="logo_link" href={e.webLink} target="_blank" rel="noreferrer" >
					<img className="logo" src={e.logoUrl} alt="" width={e.width} sizes="cover" />
				</a>
			</div>
		)
	});

	return (
		<div className="main">
			<div className="home_frame">
				<div className="home_news_frame" >
					{newsCarousel}
				</div>
				<div className="home_partner_frame">
					{privatePartnerDisplay}
				</div>
			</div>
			<div onClick={() => updateIndex(activeIndex - 1)} className="carousel_button carousel_left_button" >
				<FaAngleLeft style={{ color: "red", width: 20, height: 20 }} />
			</div>
			<div onClick={() => updateIndex(activeIndex + 1)} className="carousel_button carousel_right_button">
				<FaAngleRight style={{ color: "red", width: 20, height: 20 }} />
			</div>
			{displayFlashNews}
		</div>
	)
};

export default Home;
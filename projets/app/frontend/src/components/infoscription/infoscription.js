import { useState } from "react"
import "../../styles/infoscription/infoscription.css"
import { useNavigate } from "react-router-dom";


function Infoscription() {

	const navigate = useNavigate()

	const [proxySelected, setProxySelected] = useState(true);
	const [regionaleSelected, setRegionaleSelected] = useState(false);
	const [blvbSelected, setBlvbSelected] = useState(false);

	const trainning_place = [
		{
			"name": "Gymnase Chantaco",
			"picture": "/images/gymnase_chantaco.jpeg",
			"map": "",
			"address": "3 rue Rodolphe Cailloux",
			"zip": "64500",
			"city": "Saint-Jean-de-Luz"
		},
		{
			"name": "Gymnase Urdazuri",
			"picture": "/images/gymnase_urdazuri.jpeg",
			"map": "",
			"address": "1 Av. du Prof. Gregorio Marañon",
			"zip": "64500",
			"city": "Saint-Jean-de-Luz"
		}
	];

	let trainning_place_display = trainning_place.map((e, index) => {
		return (
			<div key={index} className="trainning_place">
				<h4 className="place_name">{e.name}</h4>
				<div className="picture_frame">
					<img className="place_picture" src={e.picture} alt="" />
				</div>
				<div className="trainning_address_frame">
					<p className="trainning_address">{e.address}</p>
				</div>
				<div className="zip_city">
					<p className="trainning_address">{e.zip}</p>
					<p className="trainning_address">{e.city}</p>
				</div>
			</div>
		)
	});

	const selectProxy = () => {
		setProxySelected(true);
		setRegionaleSelected(false);
		setBlvbSelected(false);

	};

	const selectRegionale = () => {
		setProxySelected(false);
		setRegionaleSelected(true);
		setBlvbSelected(false);

	};

	const selectBlvb = () => {
		setProxySelected(false);
		setRegionaleSelected(false);
		setBlvbSelected(true);

	}



	const proxyTeams = <div className="trainning_array">
		<div className="days">
			<div className="day">
				<h5>Équipe(s)</h5>
			</div>
			<div className="day">
				<h5>Mardi</h5>
			</div>
			<div className="day">
				<h5>Vendredi</h5>
			</div>
			<div className="day">
				<h5>Samedi</h5>
			</div>
		</div>
		<div className="days">
			<div className="day">
			</div>
			<div className="trainers">
				<p className="trainning_hours_places">Entraineur(s):</p>
				<p className="trainning_hours_places">E. Brouette</p>
				<p className="trainning_hours_places">F. Milhau</p>
			</div>
			<div className="trainers">
				<p className="trainning_hours_places">Entraineur(s):</p>
				<p className="trainning_hours_places">M. Etcheberrigaray</p>

			</div>
			<div className="trainers">
				<p className="trainning_hours_places">Entraineur(s):</p>
				<p className="trainning_hours_places">E. Brouette</p>
				<p className="trainning_hours_places">M. Martin</p>
			</div>
		</div>
		<div className="teams">
			<div className="teams_item">
				<h5>M11</h5>
				<h5>M13</h5>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places"></p>
				<p className="trainning_hours_places"></p>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places"></p>
				<p className="trainning_hours_places"></p>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places">9h00 - 10h30</p>
				<p className="trainning_hours_places">CHANTACO</p>
			</div>
		</div>
		<div className="teams">
			<div className="teams_item">
				<h5>M15</h5>
				<h5>M18</h5>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places">17h30 - 19h45</p>
				<p className="trainning_hours_places">URDAZURI</p>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places">20h00 - 22h00</p>
				<p className="trainning_hours_places">URDAZURI</p>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places">10h00 - 12h00</p>
				<p className="trainning_hours_places">CHANTACO</p>
			</div>
		</div>
		{/* <div className="teams">
			<div className="teams_item">
				<h5>M18/M21 F&M</h5>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places">17h30 - 19h45</p>
				<p className="trainning_hours_places">URDAZURI</p>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places">9h45 - 12h00</p>
				<p className="trainning_hours_places">CHANTACO</p>
			</div>
		</div> */}
	</div>;

	const regionalTeams = <div className="trainning_array">
		<div className="days">
			<div className="day">
			<h5>Équipe(s)</h5>
			</div>
			<div className="day">
				<h5>Mardi</h5>
			</div>
			<div className="day">
				<h5>Vendredi</h5>
			</div>
		</div>
		<div className="days">
			<div className="day">
			</div>
			<div className="trainers">
				<p className="trainning_hours_places">Entraineur(s):</p>
				<p className="trainning_hours_places">E. Brouette</p>
			</div>
			<div className="trainers">
				<p className="trainning_hours_places">Entraineur(s):</p>
				<p className="trainning_hours_places">F. Milhau</p>
				<p className="trainning_hours_places">F. Mounos</p>
				<p className="trainning_hours_places">Mikel</p>
				<p className="trainning_hours_places">M. Conan ...</p>
			</div>
		</div>
		<div className="teams">
			<div className="teams_item">
				<h5>R2F</h5>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places">17h30 - 19h45</p>
				<p className="trainning_hours_places">URDAZURI</p>
			</div>

			<div className="teams_item">
				<p className="trainning_hours_places">20h00 - 22h00</p>
				<p className="trainning_hours_places">URDAZURI</p>
			</div>
		</div>
		<div className="teams">
			<div className="teams_item">
				<h5>R2M</h5>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places">17h30 - 19h45</p>
				<p className="trainning_hours_places">URDAZURI</p>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places">20h00 - 22h00</p>
				<p className="trainning_hours_places">URDAZURI</p>
			</div>
		</div>
	</div>;

	const blvbTeams = <div className="trainning_array">
		<div className="days">
			<div className="day">
			<h5>Équipe(s)</h5>
			</div>
			<div className="day">
				<h5>Mardi</h5>
			</div>
			<div className="day">
				<h5>Mercredi</h5>
			</div>
		</div>
		<div className="days">
			<div className="day">
			</div>
			<div className="trainers">
				<p className="trainning_hours_places">Entrainement libre</p>
			</div>
			<div className="trainers">
			<p className="trainning_hours_places">Entrainement libre</p>
			</div>
		</div>
		<div className="teams">
			<div className="teams_item">
				<h5>Equipes loisir</h5>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places">20h00 - 22h00</p>
				<p className="trainning_hours_places">URDAZURI</p>
			</div>
			<div className="teams_item">
				<p className="trainning_hours_places">19h30 - 23h00</p>
				<p className="trainning_hours_places">CHANTACO</p>
			</div>
		</div>
	</div>;

	let trainningDates = "";
	if (proxySelected === true) {
		trainningDates = proxyTeams
	} else if (blvbSelected === true) {
		trainningDates = blvbTeams
	}

	const navigateToRegistration = () => {
		navigate('/registration')
	}

	return (
		<div className="main">
			<div className="subscription_frame">
				<p className="subscription_new">NOUVEAU!</p>
				<p className="subscription_text">Les inscriptions se font désormais on-line!</p>
				<button onClick={() => navigateToRegistration()} className="subscription_button">Informations et inscription</button>
			</div>
			<div className="trainning_blocs">
				<div className="trainning_places">
					<p className="red_title">Centres d'entraînement</p>
					<div className="trainning_places_frame">
						{trainning_place_display}
					</div>
				</div>
				<div className="trainning_dates">
					<h4 className="red_title">Horaires et lieux d'entraînement de la saison</h4>
					<div className="selector_and_array">
						<button className={`selector ${proxySelected === true ? "selector_selected" : "selector"}`} onClick={selectProxy}>
							<h4 className={`categoryName ${proxySelected === true ? "categoryNameSelected" : "categoryName"}`}>ÉQUIPES PROXY</h4>
						</button>
						{/* <button className={`selector ${regionaleSelected === true ? "selector_selected" : "selector"}`} onClick={selectRegionale}>
							<h4 className={`categoryName ${regionaleSelected === true ? "categoryNameSelected" : "categoryName"}`}>ÉQUIPES RÉGIONALES</h4>
						</button> */}
						<button className={`selector ${blvbSelected === true ? "selector_selected" : "selector"}`} onClick={selectBlvb}>
							<h4 className={`categoryName ${blvbSelected === true ? "categoryNameSelected" : "categoryName"}`}>EQUIPES B.L.V.B</h4>
						</button>
					</div>
					{trainningDates}
				</div>
			</div>
		</div>

	)
};

export default Infoscription;
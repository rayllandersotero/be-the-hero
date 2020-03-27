import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile() {
	const [ incidents, setIncidents ] = useState([]);

	const history = useHistory();

	const ngoId = localStorage.getItem('ngoId');
	const ngoName = localStorage.getItem('ngoName');

	useEffect(
		() => {
			api
				.get('profile', {
					headers: {
						Authorization: ngoId
					}
				})
				.then((response) => {
					setIncidents(response.data);
				});
		},
		[ ngoId ]
	);

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ngoId
				}
			});

			setIncidents(incidents.filter((incident) => incident.id !== id));
		} catch (error) {
			console.log(error);
			alert('Delete fail, pleace try again');
		}
	}

	function handleLogout() {
		localStorage.clear();

		history.push('/');
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logo} alt="Be The Hero" />
				<span>Welcome, {ngoName}</span>

				<Link className="button" to="/incidents/new">
					Register new case
				</Link>

				<button onClick={handleLogout} type="button">
					<FiPower size={18} color="#e02041" />
				</button>
			</header>

			<h1>Registed cases</h1>

			<ul>
				{incidents.map((incident) => (
					<li key={incident.id}>
						<strong>CASE:</strong>
						<p>{incident.title}</p>

						<strong>DESCRIPTION:</strong>
						<p>{incident.description}</p>

						<strong>VALUE:</strong>
						<p>{Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(incident.value)}</p>

						<button type="button">
							<FiTrash2 onClick={() => handleDeleteIncident(incident.id)} size={20} color="#a8a8b3" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ value, setValue ] = useState('');

	const history = useHistory();

	const ngoId = localStorage.getItem('ngoId');

	async function handleNewIncident(event) {
		event.preventDefault();

		const data = {
			title,
			description,
			value
		};

		try {
			await api.post('incidents', data, {
				headers: {
					Authorization: ngoId
				}
			});

			history.push('/profile');
		} catch (error) {
			console.log(error);
			alert('Register case fail, please try again');
		}
	}

	return (
		<div className="new-incitent-container">
			<div className="content">
				<section>
					<img src={logo} alt="Be The Hero" />

					<h1>Register new case</h1>

					<p>Detail the case to find a hero's help</p>

					<Link className="back-link" to="/profile">
						<FiArrowLeft size={16} color="#E02041" />
						Back
					</Link>
				</section>

				<form onSubmit={handleNewIncident}>
					<input
						type="text"
						placeholder="Case's title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<textarea
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					<input
						type="text"
						placeholder="Value in dollar"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>

					<button type="submit" className="button">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

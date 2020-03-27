import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default function Logon() {
	const [ id, setId ] = useState('');

	const history = useHistory();

	async function handleLogon(event) {
		event.preventDefault();

		try {
			const response = await api.post('session', { id });

			localStorage.setItem('ngoId', id);
			localStorage.setItem('ngoName', response.data.name);

			history.push('/profile');
		} catch (error) {
			console.log(error);
			alert('Login failed, please try again');
		}
	}

	return (
		<div className="logon-container">
			<section className="form">
				<img src={logo} alt="Be The Hero" />

				<form onSubmit={handleLogon}>
					<h1>Login</h1>

					<input type="text" placeholder="Your ID" value={id} onChange={(e) => setId(e.target.value)} />

					<button className="button" type="submit">
						Enter
					</button>

					<Link className="back-link" to="/register">
						<FiLogIn size={16} color="#E02041" />
						Don't have access?
					</Link>
				</form>
			</section>

			<img src={heroesImg} alt="Heroes" />
		</div>
	);
}

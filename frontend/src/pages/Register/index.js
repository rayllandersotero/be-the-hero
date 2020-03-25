import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register() {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ whatsapp, setWhatsapp ] = useState('');
	const [ city, setCity ] = useState('');
	const [ uf, setUf ] = useState('');

	const history = useHistory();

	async function handleRegister(event) {
		event.preventDefault();

		const data = {
			name,
			email,
			whatsapp,
			city,
			uf
		};

		try {
			const response = await api.post('ongs', data);

			alert(`Your access is ${response.data.id}`);

			history.push('/');
		} catch (error) {
			console.log(error);
			alert('Register fail, pleace try again');
		}
	}

	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logo} alt="Be The Hero" />

					<h1>Register</h1>

					<p>Make your registration, enter the platform and help people to find the cases of your NGO</p>

					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#E02041" />
						Back
					</Link>
				</section>

				<form onSubmit={handleRegister}>
					<input
						type="text"
						placeholder="NOG's name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					<input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />

					<input
						type="text"
						placeholder="WhatsApp"
						value={whatsapp}
						onChange={(e) => setWhatsapp(e.target.value)}
					/>

					<div className="input-group">
						<input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />

						<input type="text" placeholder="UF" value={uf} onChange={(e) => setUf(e.target.value)} />
					</div>

					<button type="submit" className="button">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

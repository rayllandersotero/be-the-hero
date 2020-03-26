import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

export default function Incidents() {
	const [ incidents, setIncidents ] = useState([]);
	const [ total, setTotal ] = useState(0);
	const [ page, setPage ] = useState(1);
	const [ loading, setLoading ] = useState(false);

	const navigation = useNavigation();

	function navigateToDetail(incident) {
		navigation.navigate('Details', { incident });
	}

	async function loadIncidents() {
		if (loading) {
			return;
		}

		if (total > 0 && incidents.length === total) {
			return;
		}

		setLoading(true);

		const response = await api.get('incidents', {
			params: { page }
		});

		setIncidents([ ...incidents, ...response.data ]);
		setTotal(response.headers['x-total-count']);
		setPage(page + 1);

		setLoading(false);
	}

	useEffect(() => {
		loadIncidents();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<Text style={styles.headerText}>
					Total of <Text style={styles.headerTextBold}>{total} cases</Text>.
				</Text>
			</View>

			<Text style={styles.title}>Welcome!</Text>
			<Text style={styles.description}>Choose a case bellow and save the day</Text>

			<FlatList
				style={styles.incidentList}
				showsVerticalScrollIndicator={false}
				data={incidents}
				onEndReached={loadIncidents}
				onEndReachedThreshold={0.2}
				keyExtractor={(incident) => String(incident.id)}
				renderItem={({ item: incident }) => (
					<View style={styles.incident}>
						<Text style={styles.incidentProperty}>NGO:</Text>
						<Text style={styles.incidentValue}>
							{incident.name} of {incident.city}/{incident.uf}
						</Text>

						<Text style={styles.incidentProperty}>Case:</Text>
						<Text style={styles.incidentValue}>{incident.title}</Text>

						<Text style={styles.incidentProperty}>Value:</Text>
						<Text style={styles.incidentValue}>
							{Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(incident.value)}
						</Text>

						<TouchableOpacity style={styles.detailButton} onPress={() => navigateToDetail(incident)}>
							<Text style={styles.detailButtonText}>See details</Text>
							<Feather name="arrow-right" size={16} color="#E02041" />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}

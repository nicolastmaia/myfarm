import React, { createContext, useState, useEffect } from 'react';
import { Banco } from '../instancias/conexao';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

const TalhaoContext = createContext({ talhoes: [] });

export const TalhaoProvider = ({ children }) => {
	const [talhoes, setTalhoes] = useState([]);

	useEffect(() => {
		async function getTalhaoByType() {
			try {
				const docs = await Banco.getByType('talhao');
				setTalhoes(docs);
			} catch (error) {
				Alert.alert(error.message);
				await AsyncStorage.getItem(talhoes);
			}
		}

		getTalhaoByType();
	});

	return (
		<TalhaoContext.Provider value={{ talhoes }}>
			{children}
		</TalhaoContext.Provider>
	);
};

export default TalhaoContext;

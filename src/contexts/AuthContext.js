import React, { useEffect, createContext, useState } from 'react';
import { Banco } from '../instancias/conexao';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

const AuthContext = createContext({
	isSignedIn: null,
	user: null,
	deslogar: null,
	logar: null,
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const logar = async function(username = '', password = '') {
		username = username.toLowerCase();
		try {
			await Banco.remoto.logIn(username, password);
			const serializedUser = JSON.stringify({
				username: username,
				password: password,
			});
			await AsyncStorage.setItem('user', serializedUser);
			Banco.syncDB(username);
			setUser({
				username,
				password,
			});
			return;
		} catch (err) {
			Alert.alert(err.message);
		}
	};

	async function deslogar() {
		try {
			await Banco.remoto.logOut();
			await AsyncStorage.clear();
			setUser(null);
		} catch (error) {
			console.log(error.message);
			Alert.alert('Não foi possível deslogar.');
		}
	}

	return (
		<AuthContext.Provider
			value={{ isSignedIn: !!user, user, deslogar, logar }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

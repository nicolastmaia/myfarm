import React, { createContext, useState } from 'react';
import { Banco } from '../instancias/conexao';
import AsyncStorage from '@react-native-community/async-storage';
import { ToastAndroid } from 'react-native';

const AuthContext = createContext({
	isSignedIn: null,
	user: null,
	deslogar: null,
	logar: null,
	cadastrar: null,
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [unsubscribe, setUnsubscribe] = useState(null);

	const logar = async function(username = '', password = '') {
		username = username.toLowerCase();
		try {
			await Banco.remoto.logIn(username, password);
			const serializedUser = JSON.stringify({
				username: username,
				password: password,
			});
			const change = Banco.syncDB(username);
			await AsyncStorage.setItem('user', serializedUser);
			setUnsubscribe(change);
			setUser({
				username,
				password,
			});
			Banco.createIndex(['n_parcela', 'type']); //TODO mover para um lugar mais apropriado
			Banco.createIndex(['quantidade', 'type']); //TODO mover para um lugar mais apropriado
			Banco.createIndex(['produto', 'type']); //TODO mover para um lugar mais apropriado
			return;
		} catch (err) {
			ToastAndroid.show(err.message);
		}
	};

	const cadastrar = async function(username, password, otherData) {
		username = username.toLowerCase();
		try {
			await Banco.remoto.signUp(username, password, {
				metadata: { otherData },
			});
			await logar(username, password);
		} catch (error) {
			alert(error.message);
		}
	};

	const deslogar = async function() {
		try {
			await Banco.remoto.logOut();
			await AsyncStorage.clear();
			unsubscribe.cancel();
			setUnsubscribe(null);
			setUser(null);
		} catch (error) {
			console.log(error.message);
			ToastAndroid.show('Não foi possível deslogar.');
		}
	};

	return <AuthContext.Provider value={{ isSignedIn: !!user, user, deslogar, logar, cadastrar }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

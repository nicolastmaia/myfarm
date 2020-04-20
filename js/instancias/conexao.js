import PouchDB from '../constantes/pouchdbPlugins.js';
import { AsyncStorage } from 'react-native';

const ipHome = '192.168.0.109';
const ipAway = '192.168.43.54';

const LOCALHOST = `http://${ipHome}:5984`;

//objeto banco (local e remoto)
export const Banco = {
	local: new PouchDB('myfarmlocal'),
	remoto: new PouchDB(LOCALHOST),

	//sincroniza com banco especifico do usuario
	syncDB: function(username = '') {
		this.remoto = new PouchDB(
			`${LOCALHOST}/userdb-${Buffer.from(username).toString('hex')}`
		);
		return PouchDB.sync(this.local, this.remoto, {
			live: true,
			retry: true,
		});
	},

	//verifica se o usuario já está logado ou nao
	checkLogin: async function() {
		const logado = await AsyncStorage.getItem('logado');
		const senhaLogado = await AsyncStorage.getItem('senhaLogado');

		return await this.logIn(logado, senhaLogado);
	},

	//loga o usuario
	logIn: async function(username = '', password = '') {
		username = username.toLowerCase();
		try {
			const loggedIn = await this.remoto.logIn(username, password);
			await AsyncStorage.setItem('logado', username);
			await AsyncStorage.setItem('senhaLogado', password);
			this.syncDB(username);
			return loggedIn;
		} catch (error) {
			throw error;
		}
	},

	//cadastra novo usuario
	signUp: function(username, password, otherData) {
		username = username.toLowerCase();
		return this.remoto
			.signUp(username, password, {
				metadata: { otherData },
			})
			.then(() => {
				return this.logIn(username, password);
			});
	},

	createIndex: async function(fields) {
		try {
			var result = await this.remoto.createIndex({
				index: {
					fields,
				},
			});
			console.log(result);
		} catch (err) {
			console.log(err);
		}
	},

	getByType: async function(docType) {
		try {
			var response = await this.remoto.find({
				selector: { type: docType },
				sort: ['n_parcela'],
			});
			return response.docs;
		} catch (err) {
			console.log(err);
		}
	},

	update: function(tmp) {},

	store: async function(docType, tmp) {
		var dado = Object.assign(
			{
				_id: new Date().toISOString(),
				type: docType,
			},
			tmp
		);
		return await this.local.put(dado).then(() => {
			return dado;
		});
	},
};

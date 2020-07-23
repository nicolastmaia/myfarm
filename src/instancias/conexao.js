import PouchDB from '../constantes/pouchdbPlugins.js';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

const ipHome = '192.168.0.109';
const ipAway = '192.168.43.54';

const LOCALHOST = `http://${ipHome}:5984`;

//objeto banco (local e remoto)
export const Banco = {
	local: new PouchDB('myfarmlocal'),
	remoto: new PouchDB(`${LOCALHOST}`),

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

	//loga o usuario

	//TODO: transformar em async/await
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
					fields: [...fields],
				},
			});
			console.log(result);
		} catch (err) {
			console.log(err.message);
		}
	},

	getByType: async function(docType) {
		try {
			var response = await this.remoto.find({
				selector: { type: docType },
			});
			return response.docs;
		} catch (err) {
			Alert.alert(err.message);
		}
	},

	update: async function(docId, tmp) {
		try {
			const doc = await this.local.get(docId);
			let dados = { ...doc, ...tmp };
			const response = await this.local.put(dados);
			return response;
		} catch (err) {
			throw err;
		}
	},

	delete: async function(doc) {
		try {
			var response = await this.local.remove(doc);
			return response;
		} catch (err) {
			throw err;
		}
	},

	store: async function(docType, tmp) {
		var dado = {
			_id: new Date().toISOString(),
			type: docType,
			...tmp,
		};
		try {
			await this.local.put(dado);
			return dado;
		} catch (err) {
			throw err;
		}
	},
};

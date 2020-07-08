import PouchDB from 'pouchdb-react-native';
import PouchDBAuthentication from 'pouchdb-authentication';
import HttpPouch from 'pouchdb-adapter-http';
import PouchDBFind from 'pouchdb-find';

PouchDB.debug.enable('*');
export default PouchDB.plugin(PouchDBAuthentication)
	.plugin(HttpPouch)
	.plugin(PouchDBFind);

import PouchDB from "pouchdb-react-native";
import PouchDBAuthentication from "pouchdb-authentication";
PouchDB.debug.enable("*");
export default PouchDB.plugin(PouchDBAuthentication);

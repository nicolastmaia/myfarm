import PouchDB from "../constantes/pouchdbPlugins.js";
import { AsyncStorage } from "react-native";

const ipHome = "192.168.0.109";
const ipAway = "192.168.43.54";

const LOCALHOST = `http://${ipHome}:5984`;

//objeto banco (local e remoto)
export const Banco = {
  local: new PouchDB("myfarmlocal"),
  remoto: new PouchDB(LOCALHOST),

  //sincroniza com banco especifico do usuario
  syncDB: function(username) {
    this.remoto = new PouchDB(
      `${LOCALHOST}/userdb-${Buffer.from(username).toString("hex")}`
    );
    return PouchDB.sync(this.local, this.remoto, {
      live: true,
      retry: true
    });
  },

  //verifica se o usuario já está logado ou nao
  checkLogin: async function() {
    const logado = await AsyncStorage.getItem("logado");
    const senhaLogado = await AsyncStorage.getItem("senhaLogado");

    return this.logIn(logado, senhaLogado);
  },

  //loga o usuario
  logIn: function(username, password) {
    username = username.toLowerCase();
    return this.remoto.logIn(username, password).then(() => {
      AsyncStorage.setItem("logado", username);
      AsyncStorage.setItem("senhaLogado", password);
      this.syncDB(username);
    });
  },

  //cadastra novo usuario
  signUp: function(username, password, otherData) {
    username = username.toLowerCase();
    return this.remoto
      .signUp(username, password, { metadata: { otherData } })
      .then(() => {
        return this.logIn(username, password);
      });
  },

  store: function(docTitle, tmp) {
    var dado = {
      _id: docTitle,
      itens: []
    };
    return this.remoto
      .get(docTitle)
      .then(response => {
        dado._rev = response._rev;
        dado.itens = [...response.itens, tmp];
        return this.remoto.put(dado);
      })
      .then(() => {
        return dado;
      })
      .catch(err => {
        if (err.name === "not_found") {
          dado.itens = [...dado.itens, tmp];
          return this.remoto.put(dado).then(() => {
            return dado;
          });
        }
      });
  }
};

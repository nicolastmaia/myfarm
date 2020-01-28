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
    PouchDB.sync(this.local, this.remoto, {
      live: true,
      retry: true
    });
  },

  //verifica se o usuario já está logado ou nao
  checkLogin: async function(navigation) {
    const logado = await AsyncStorage.getItem("logado");
    const senhaLogado = await AsyncStorage.getItem("senhaLogado");

    return new Promise((resolve, reject) => {
      this.logIn(logado, senhaLogado)
        .then(response => {
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  },

  //loga o usuario
  logIn: function(username, password) {
    username = username.toLowerCase();
    return new Promise((resolve, reject) => {
      this.remoto
        .logIn(username, password)
        .then(response => {
          AsyncStorage.setItem("logado", username);
          AsyncStorage.setItem("senhaLogado", password);

          this.syncDB(username);
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },

  //cadastra novo usuario
  signUp: function(username, password, otherData) {
    username = username.toLowerCase();
    return new Promise((resolve, reject) => {
      this.remoto
        .signUp(username, password, { metadata: { otherData } })
        .then(() => {
          return this.logIn(username, password);
        })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  },

  store: function(docTitle, tmp) {
    return new Promise((resolve, reject) => {
      var dado = {
        _id: docTitle,
        itens: []
      };
      this.remoto
        .get(docTitle)
        .then(response => {
          dado._rev = response._rev;
          dado.itens = [...response.itens, tmp];
          return this.remoto.put(dado);
        })
        .then(() => {
          resolve(dado);
        })
        .catch(err => {
          if (err.name === "not_found") {
            dado.itens = [...dado.itens, tmp];
            this.remoto.put(dado);
            resolve(dado);
          }
          reject(dado);
        });
    });
  }
};

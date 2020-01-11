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
    this.syncDB(logado != null ? logado : "");
    navigation.navigate(logado != null ? "Logado" : "Deslogado");
  },

  //loga o usuario
  logIn: function(username, password) {
    username = username.toLowerCase();
    return new Promise((resolve, reject) => {
      this.remoto
        .logIn(username, password)
        .then(response => {
          AsyncStorage.setItem("logado", username);
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
        .then(response => {
          AsyncStorage.setItem("logado", username);
          this.syncDB(username);
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },

  pegaDados: function(doc) {
    //doc pode ser qualquer um dos documentos dentro de um banco especifico de usuario
    let dado = {};

    return new Promise((resolve, reject) => {
      this.remoto
        .get(doc)
        .then(response => {
          resolve(response);
        })
        .catch(() => {
          dado = {
            _id: doc,
            itens: []
          };
          reject(dado);
        });
    });
  },

  registraDados: function(doc) {
    this.local
      .put(doc)
      .then()
      .catch(() => {
        return;
      });
  }
};

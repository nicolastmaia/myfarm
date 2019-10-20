import PouchDB from "../constantes/pouchdbPlugins.js";
import { Toast } from "native-base";
import { AsyncStorage } from "react-native";

const ipHome = "192.168.0.109";
const ipAway = "10.13.0.29";

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

  //loga o usuario
  checkLogin: function(username, password) {
    username = username.toLowerCase();
    return new Promise((resolve, reject) => {
      this.remoto
        .logIn(username, password)
        .then(response => {
          AsyncStorage.setItem("logado", "1");
          this.syncDB(username);
          resolve(response);
        })
        .catch(err => reject(err));
    });
  },

  //cadastra novo usuario
  cadastroUser: function(username, password, otherData) {
    username = username.toLowerCase();
    return new Promise((resolve, reject) => {
      this.remoto
        .signUp(username, password, { metadata: { otherData } })
        .then(response => {
          AsyncStorage.setItem("logado", "1");
          this.syncDB(username);
          resolve(response);
        })
        .catch(err => reject(err));
    });
  }
};

/* 
function registraHistorico(categoria, conteudo) {
  var historico = {};
  bancoLocal.get("historico", function(erro, doc) {
    if (erro) {
      historico = {
        _id: "historico",
        perdas: [],
        aplicacoes: [],
        colheitas: []
      };
    } else {
      historico = doc;
    }

    historico[categoria].push(conteudo);

    bancoLocal.put(historico, function(erro, doc) {
      if (erro) return;
    });
  });
} */

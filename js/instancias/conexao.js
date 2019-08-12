import PouchDB from "../constantes/pouchdbPlugins.js";
import { Toast } from "native-base";
import { AsyncStorage } from "react-native";
export const Banco = {
  local: new PouchDB("myfarmlocal"),
  remoto: new PouchDB("http://10.56.216.67:5984"),

  syncDB: function(currentUser) {
    this.remoto = new PouchDB(
      `http://192.168.0.109:5984/userdb-${Buffer.from(
        currentUser.username
      ).toString(
        "hex"
      )}` /* ,
      {
        skipSetup: true,
        ajax: {
          headers: {
            "X-Auth-CouchDB-UserName": `${currentUser.id}`,
            "X-Auth-CouchDB-Roles": "users",
            "X-Auth-CouchDB-Token": currentUser.couchdb_token,
            "Content-Type": "application/json; charset=utf-8"
          }
        }
      } */
    );
    PouchDB.sync(this.local, this.remoto, {
      live: true,
      retry: true
    });
  },

  checkLogin: function(currentUser) {
    return new Promise((resolve, reject) => {
      this.remoto
        .logIn(currentUser.username, currentUser.password)
        .then(response => {
          console.log("logou (conexao.js): ", response);
          AsyncStorage.setItem("logado", "1");
          this.syncDB(currentUser);
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

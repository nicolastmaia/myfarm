import PouchDB from '../constantes/pouchdbPlugins.js';
import { COUCH_USER, COUCH_PASS, COUCH_REMOTE_IP } from '../couchConfig.json';

const couch_address = `http://${COUCH_USER}:${COUCH_PASS}@${COUCH_REMOTE_IP}:5984`;

//objeto banco (local e remoto)
export const Banco = {
  local: new PouchDB('myfarmlocal'),
  remoto: new PouchDB(`${couch_address}`),

  //sincroniza com banco especifico do usuario
  syncDB: function (username = '') {
    this.local = new PouchDB(username);
    this.remoto = new PouchDB(
      `${couch_address}/userdb-${Buffer.from(username).toString('hex')}`
    );
    return PouchDB.sync(this.local, this.remoto, {
      live: true,
      retry: true,
    });
  },

  createIndexForDocType: async function (fields) {
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

  getByType: async function (docType) {
    try {
      var response = await this.remoto.find({
        selector: { type: docType },
      });
      return response.docs;
    } catch {
      const response = await this.local.allDocs({ include_docs: true });
      const docsByType = response.rows.filter((doc) => {
        return doc.type == docType;
      });
      return docsByType;
    }
  },

  update: async function (doc) {
    try {
      const response = await this.local.put(doc);
      return response;
    } catch (err) {
      console.log(err.message);
    }
  },

  delete: async function (doc) {
    try {
      var response = await this.local.remove(doc);
      return response;
    } catch (err) {
      console.log(err.message);
    }
  },

  store: async function (docType, tmp) {
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

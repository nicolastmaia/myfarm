import React, { createContext, useState } from 'react';
import { Banco } from '../instancias/conexao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import {
  signInWithCognito,
  signUpWithCognito,
  confirmEmailWithCognito,
} from '../instancias/awsCognito';

const AuthContext = createContext({
  isSignedIn: null,
  user: null,
  signOut: null,
  signIn: null,
  signUp: null,
  confirmEmail: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [unsubscribe, setUnsubscribe] = useState(null);

  const signIn = async function (username = '', password = '') {
    username = username.toLowerCase();
    try {
      const tmpUser = await signInWithCognito(username, password);
      await Banco.remoto.logIn(username, password);
      const serializedUser = JSON.stringify({
        username: username,
        password: password,
      });
      const change = Banco.syncDB(username);
      await AsyncStorage.setItem('user', serializedUser);
      setUnsubscribe(change);
      setUser(tmpUser);
      await Banco.createIndexForDocType(['_id', 'type']);
      return;
    } catch (error) {
      console.log(error);
      alert(
        'Houve um erro ao efetuar o login. Tente novamente ou contacte nosso suporte.'
      );
    }
  };

  const confirmEmail = async (username, code) => {
    try {
      return await confirmEmailWithCognito(username, code);
    } catch (error) {
      console.log(error);
      alert(
        'Houve um erro ao confirmar seu e-mail. Tente novamente ou contacte nosso suporte.'
      );
    }
  };

  const signUp = async function (username, password, otherData) {
    username = username.toLowerCase();
    await signUpWithCognito(username, password, otherData);
    await Banco.remoto.signUp(username, password, {
      metadata: { otherData },
    });
  };

  const signOut = async function () {
    try {
      await Banco.remoto.logOut();
      await AsyncStorage.clear();
      unsubscribe.cancel();
      setUnsubscribe(null);
      setUser(null);
    } catch (error) {
      console.log(error.message);
      alert(
        'Não foi possível deslogar. Tente novamente ou contacte nosso suporte'
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: !!user,
        user,
        signOut,
        signIn,
        signUp,
        confirmEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

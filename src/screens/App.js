import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

// import Notificacoes from "./instancias/notificacoes";
import Routes from '../componentes/navigators';
import { AuthProvider } from '../contexts/AuthContext';
// const analytics = require("./instancias/analytics");

export default function App(props) {
  return (
    <NavigationContainer>
      <Root>
        <StatusBar
          translucent
          backgroundColor='transparent'
          barStyle='light-content'
        />
        {/* <Notificacoes /> */}
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Root>
    </NavigationContainer>
  );
}

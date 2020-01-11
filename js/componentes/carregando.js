import React from "react";
import { View } from "native-base";
import { ActivityIndicator, AsyncStorage } from "react-native";
import { Banco } from "../instancias/conexao.js";
export default class Carregando extends React.Component {
  constructor(props) {
    super(props);
    Banco.checkLogin(this.props.navigation);
  }

  verificaLogin = async () => {
    const logado = await AsyncStorage.getItem("logado");
    console.log("logado aqui!!!" + logado);
    Banco.syncDB(logado != null ? logado : "");
    this.props.navigation.navigate(logado != null ? "Logado" : "Deslogado");
  };

  render() {
    return (
      <View style={{ justifyContent: "center", textAlign: "center" }}>
        <ActivityIndicator size="large" color="#0f0" />
      </View>
    );
  }
}

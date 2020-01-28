import React from "react";
import { View } from "native-base";
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";
import { Banco } from "../instancias/conexao.js";
export default class Carregando extends React.Component {
  componentDidMount() {
    Banco.checkLogin(this.props.navigation)
      .then(() => {
        this.props.navigation.navigate("Logado");
      })
      .catch(() => {
        this.props.navigation.navigate("Deslogado");
      });
  }

  /* verificaLogin = async () => {
    const logado = await AsyncStorage.getItem("logado");
    console.log("logado aqui!!!" + logado);
    Banco.syncDB(logado != null ? logado : "");
    this.props.navigation.navigate(logado != null ? "Logado" : "Deslogado");
  }; */

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ImageBackground
          source={require("../../assets/splash.png")}
          style={styles.imageContainer}
        />
        <ActivityIndicator
          size="large"
          color="#fff"
          style={styles.activityIndicator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  activityIndicator: {
    position: "absolute",
    elevation: 2,
    bottom: 215
  }
});

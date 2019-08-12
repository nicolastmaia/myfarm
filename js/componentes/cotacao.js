import React from "react";
import { View, Text, Container } from "native-base";
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import Ionicon from "react-native-vector-icons/Ionicons";

export default class Cotacao extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Ionicon name="logo-usd" color={tintColor} style={{ fontSize: 30 }} />
    )
  };
  render() {
    const navigate = this.props.navegacao;

    cot = (
      <WebView
        source={{
          uri:
            "https://selos.agrolink.com.br/selos/carregaselo?servico=cotacoes&uf=9840&p=2109&l=&esp=&cor=rgb(30,106,30)&w=300&h=200"
        }}
      />
    );

    return (
      <Container>
        <ImageBackground
          source={require("../assets/myfarm_bg_grass.jpg")}
          blurRadius={10}
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height - 50,
            flexDirection: "column"
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              marginTop: 35,
              marginLeft: 15
            }}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Ionicon style={{ color: "white", fontSize: 45 }} name="md-menu" />
          </TouchableOpacity>
          {/* {cot} */}
        </ImageBackground>
      </Container>
    );
  }
}

import React from "react";
import { Platform, Alert, StatusBar, FlatList } from "react-native";
import {
  ListItem,
  View,
  Icon,
  Button,
  Text,
  Content,
  Container
} from "native-base";

// const analytics = require("./instancias/analytics");
import { Banco } from "./instancias/conexao.js";
import CustomHeader from "./componentes/customHeader";

//==========| Fim dos Imports |==========//

export default class Talhao extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: false, itens: [] };
    this.atualizaPagina();
  }

  /* componentWillMount() {
		analytics.trackScreenView("Cadastro de Talhão");
	} */

  atualizaPagina = () => {
    Banco.remoto.get("talhoes").then(response => {
      this.setState({ itens: response.itens });
    });
  };

  // atualizaPagina = () => {
  //   let tmp = {};
  //   Banco.local
  //     .get("talhoes")
  //     .then(doc => {
  //       tmp = doc;
  //       this.setState({ talhoes: tmp["talhoes"] });
  //     })
  //     .catch(erro => {
  //       tmp = {
  //         _id: "talhoes",
  //         talhoes: []
  //       };
  //       this.setState({ talhoes: tmp["talhoes"] });
  //     });
  // };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container
        style={{
          paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
        }}
      >
        <CustomHeader titulo="Cadastro de Talhão" />

        <Content style={{ backgroundColor: "#fff" }}>
          <FlatList
            data={this.state.itens}
            renderItem={({ item }) => (
              <ListItem
                style={{ marginLeft: 0 }}
                onPress={() => {
                  navigate(
                    "CadTalhao",
                    Object.assign(item, { anterior: this })
                  );
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon
                      name="md-information-circle-outline"
                      style={{ color: "#4a915d" }}
                      onPress={() => {
                        Alert.alert(JSON.stringify(item));
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      marginLeft: 20
                    }}
                  >
                    {item.n_parcela}
                  </Text>
                  <View
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 15,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon name="md-trash" style={{ color: "#C62828" }} />
                  </View>
                </View>
              </ListItem>
            )}
            extraData={this.state.flag}
          />
        </Content>

        <Button
          rounded
          style={{
            position: "absolute",
            bottom: 15,
            right: 15,
            backgroundColor: "green"
          }}
          onPress={() => navigate("CadTalhao", { anterior: this })}
        >
          <Icon name="md-add" />
        </Button>
      </Container>
    );
  }
}

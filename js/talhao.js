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
  }

  /* componentWillMount() {
		analytics.trackScreenView("Cadastro de Talhão");
	} */

  componentDidMount() {
    Banco.remoto.get("talhoes").then(response => {
      this.setState({ itens: response.itens });
    });

    Banco.remoto
      .createIndex({
        index: { fields: ["n_parcela"] }
      })
      .then(() => {
        return Banco.remoto.find({
          selector: {
            n_parcela: { $eq: "90" }
          }
        });
      })
      .then(doc => console.log(doc))
      .catch(() => console.log("Nao achei, sorry"));
  }

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
            keyExtractor={item => item._id}
            data={this.state.itens}
            renderItem={({ item }) => (
              <ListItem
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
                      name="md-information-circle"
                      style={{ color: "#4c7a34" }}
                      /* onPress={() => {
                        Alert.alert(JSON.stringify(item)); <- TODO: FIX
                      }} */
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
            backgroundColor: "#4c7a34"
          }}
          onPress={() => navigate("CadTalhao", { anterior: this })}
        >
          <Icon name="md-add" />
        </Button>
      </Container>
    );
  }
}

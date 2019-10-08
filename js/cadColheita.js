import React from "react";
import {
  Platform,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  Keyboard,
  Slider,
  FlatList,
  ListView
} from "react-native";
import {
  Item,
  Card,
  List,
  ListItem,
  View,
  Input,
  Icon,
  Button,
  Text,
  Toast,
  Header,
  Left,
  Right,
  Body,
  Content,
  Container
} from "native-base";
import { NavigationActions } from "react-navigation";

// const analytics = require("./instancias/analytics");
const { registraHistorico } = require("./instancias/conexao.js");

import { Texto, Formulario } from "./componentes/customizado";

var form1 = [
  { nome: "data", placeholder: "Data da colheita", tipo: "data" },
  { nome: "quantidade", placeholder: "Quantidade", tipo: "numeric" },
  { nome: "peso", placeholder: "Peso (kg)", tipo: "numeric" },
  { nome: "producao", placeholder: "Produção (kg/ha)", tipo: "numeric" },
  { nome: "observacoes", placeholder: "Observações" }
];

export default class CadColheita extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    // let data = new Date();
    // this._formulario1.setValor("data",data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear());
  };

  render() {
    return (
      <Container
        style={{
          paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
        }}
      >
        <Header
          androidStatusBarColor="green"
          style={{ backgroundColor: "green" }}
        >
          <Left>
            <Icon
              style={{
                color: Platform.OS === "ios" ? "black" : "white"
              }}
              name="arrow-back"
              onPress={() =>
                this.props.navigation.dispatch(NavigationActions.back())
              }
            />
          </Left>
          <Body>
            <Text
              style={{
                color: Platform.OS === "ios" ? "black" : "white",
                width: 200
              }}
            >
              Cadastro de colheitas
            </Text>
          </Body>
          <Right />
        </Header>

        <Content style={{ backgroundColor: "#eee", padding: 15 }}>
          <Text style={{ fontSize: 18, marginLeft: 5 }}>COLHEITA</Text>
          <Text
            style={{
              fontSize: 14,
              color: "#444",
              marginBottom: 8,
              marginLeft: 5
            }}
          >
            Registro da produção diária.
          </Text>

          <Card style={{ borderRadius: 5, padding: 10 }}>
            <Formulario
              tamanho={40}
              campos={form1}
              cor="#000"
              corP="#555"
              ref={tmp => (this._formulario1 = tmp)}
            />
          </Card>

          <Button
            block
            style={{
              marginTop: 15,
              marginBottom: 25,
              backgroundColor: "green"
            }}
            onPress={() => {
              var tmp = this._formulario1.getValores();
              console.warn(tmp);

              let data = new Date();
              registraHistorico("colheitas", {
                time:
                  data.getDate() +
                  "/" +
                  (data.getMonth() + 1) +
                  "/" +
                  data.getYear(),
                title: tmp.quantidade + " tomates coletados",
                description: tmp.producao
              });

              this.props.navigation.dispatch(NavigationActions.back());
            }}
          >
            <Text>Cadastrar</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

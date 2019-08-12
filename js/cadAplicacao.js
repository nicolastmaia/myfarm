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
  Container,
  Form
} from "native-base";
import { NavigationActions } from "react-navigation";

// const analytics = require("./instancias/analytics");
const { registraHistorico } = require("./instancias/conexao.js");

import { Texto, Formulario } from "./componentes/customizado";

var form1 = [
  { nome: "praga", placeholder: "Praga/doença (nome científico)" },
  { nome: "data_aplicacao", placeholder: "Data de aplicação", tipo: "data" },
  { nome: "produto", placeholder: "Produto" },
  {
    nome: "quantidade",
    placeholder: "Quantidade (ml ou g)",
    tipo: "numeric"
  },
  { nome: "preco", placeholder: "Preço estimado (R$)", tipo: "numeric" },
  { nome: "coadjuvante", placeholder: "Produto (Coadjuvante)" },
  {
    nome: "c_quantidade",
    placeholder: "Quantidade (ml ou g) (Coadjuvante)",
    tipo: "numeric"
  },
  {
    nome: "volume",
    placeholder: "Volume de calda (litros)",
    tipo: "numeric"
  },
  { nome: "area_tratada", placeholder: "Área tratada (ha)", tipo: "numeric" },
  { nome: "justificativa", placeholder: "Justificativa" }
];

export default class CadAplicacao extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container
        style={{
          paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
        }}
      >
        <Header>
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
              Cadastro de Aplicações
            </Text>
          </Body>
          <Right />
        </Header>

        <Content style={{ backgroundColor: "#eee", padding: 15 }}>
          <Text style={{ fontSize: 18, marginLeft: 5 }}>APLICAÇÕES</Text>
          <Text
            style={{
              fontSize: 14,
              color: "#444",
              marginBottom: 8,
              marginLeft: 5
            }}
          >
            Registro da aplicação de acaricidas, inseticidas e nematicidas.
          </Text>

          <Card style={{ borderRadius: 5, padding: 10 }}>
            <Form>
              <Formulario
                tamanho={40}
                campos={form1}
                cor="#000"
                corP="#555"
                ref={tmp => (this._formulario1 = tmp)}
              />
            </Form>
          </Card>

          <Button
            block
            style={{ marginTop: 15, marginBottom: 25 }}
            onPress={() => {
              if (!this._formulario1.verificaRequisitos()) return;

              var tmp = this._formulario1.getValores();

              console.warn(tmp);

              let data = new Date();
              registraHistorico("aplicacoes", {
                time:
                  data.getDate() +
                  "/" +
                  (data.getMonth() + 1) +
                  "/" +
                  data.getYear(),
                title: "Aplicação de " + tmp.produto,
                description: tmp.quantidade + " ml"
              });
              //MUDAR /\ DEPOIS PORRA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TODO

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

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
import MapView, { MAP_TYPES, Polygon } from "react-native-maps";

// const analytics = require("./instancias/analytics");
import { Banco } from "./instancias/conexao.js";

import { Texto, Formulario } from "./componentes/customizado";

var form1 = [
  { nome: "n_parcela", placeholder: "Parcela nº", tipo: "numeric" },
  { nome: "cultivares", placeholder: "Cultivares" },
  { nome: "n_plantas", placeholder: "Nº de plantas", tipo: "numeric" },
  { nome: "data_plantio", placeholder: "Data de plantio" },
  { nome: "rendimento", placeholder: "Rendimento (kg/ha)", tipo: "numeric" }
];

var form2 = [
  { nome: "area", placeholder: "Área (ha)", tipo: "numeric" },
  { nome: "densidade", placeholder: "Densidade atual (ha)", tipo: "numeric" },
  {
    nome: "espaco",
    placeholder: "Espaço (m) entre fileiras",
    tipo: "numeric"
  },
  { nome: "irrigacao", placeholder: "Irrigação" },
  { nome: "topografia", placeholder: "Topografia" }
];

var talhoes = {};
Banco.local.get("talhoes", function(erro, doc) {
  if (erro) {
    talhoes = {
      _id: "talhoes",
      talhoes: []
    };
  } else {
    talhoes = doc;
  }
});

let id = 0;

export default class CadTalhao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordenadas_propriedade: null,
      editando: null,
      btnMapa: "md-create",
      mapaAtivo: true
    };
  }

  mapaSelecionado(e) {
    const { editando } = this.state;
    console.warn("T");
    if (!editando) {
      this.setState({
        editando: {
          id: id++,
          coordenadas: [e.nativeEvent.coordinate]
        }
      });
    } else {
      this.setState({
        editando: {
          ...editando,
          id: id++,
          coordenadas: [...editando.coordenadas, e.nativeEvent.coordinate]
        }
      });
    }
    // if(editando) console.warn(editando.coordenadas);
  }

  UNSAFE_componentWillMount = () => {
    for (var i = 0; i < form1.length; i++) {
      form1[i]["valor"] = this.props.navigation.getParam(form1[i]["nome"]);
    }
    for (var i = 0; i < form2.length; i++) {
      form2[i]["valor"] = this.props.navigation.getParam(form2[i]["nome"]);
    }
    Banco.local.get("dados").then(doc => {
      this.setState({ coordenadas_propriedade: doc.coordenadas });
    });
  };

  render() {
    var confMapa = {};
    confMapa.scrollEnabled = this.state.mapaAtivo;
    if (!this.state.mapaAtivo) confMapa.onPress = e => this.mapaSelecionado(e);
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
              Cadastro de Talhão
            </Text>
          </Body>
          <Right />
        </Header>

        <Content style={{ backgroundColor: "#eee", padding: 15 }}>
          <Text style={{ fontSize: 18, marginLeft: 5 }}>INFORMAÇÕES</Text>
          <Text
            style={{
              fontSize: 14,
              color: "#444",
              marginBottom: 8,
              marginLeft: 5
            }}
          >
            Informações sobre o talhão
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

          <Text style={{ fontSize: 18, marginLeft: 5, marginTop: 20 }}>
            PLANTAÇÃO
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#444",
              marginBottom: 8,
              marginLeft: 5
            }}
          >
            Informações sobre a plantação
          </Text>

          <Card style={{ borderRadius: 5, padding: 10 }}>
            <Formulario
              tamanho={40}
              campos={form2}
              cor="#000"
              corP="#555"
              ref={tmp => (this._formulario2 = tmp)}
            />
          </Card>

          <Text style={{ fontSize: 18, marginLeft: 5, marginTop: 20 }}>
            MAPA
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#444",
              marginBottom: 8,
              marginLeft: 5
            }}
          >
            Informe a posição do talhão no mapa
          </Text>

          <Card style={{ borderRadius: 5 }}>
            <MapView
              ref={ref => {
                this._mapa = ref;
              }}
              followsUserLocation={true}
              followsUserLocation={true}
              style={{ height: 300 }}
              {...confMapa}
            >
              {this.state.coordenadas_propriedade && (
                <Polygon
                  coordinates={this.state.coordenadas_propriedade}
                  strokeColor="#000"
                  fillColor="rgba(255,0,0,0.5)"
                  strokeWidth={1}
                  tappable={false}
                />
              )}
              {this.state.editando && (
                <Polygon
                  coordinates={this.state.editando.coordenadas}
                  strokeColor="#000"
                  fillColor="rgba(255,0,0,0.5)"
                  strokeWidth={1}
                />
              )}
            </MapView>
            <Button
              success
              style={{ position: "absolute", top: 5, right: 5 }}
              onPress={() => {
                var tmp = "";
                if (this.state.mapaAtivo) tmp = "md-checkmark";
                else tmp = "md-create";
                this.setState({
                  mapaAtivo: !this.state.mapaAtivo,
                  btnMapa: tmp
                });
              }}
            >
              <Icon name={this.state.btnMapa} />
            </Button>
          </Card>

          <Button
            block
            style={{ marginTop: 15, marginBottom: 25 }}
            onPress={() => {
              var tmp = Object.assign(
                this._formulario1.getValores(),
                this._formulario2.getValores()
              );
              console.warn(tmp);

              talhoes["talhoes"].push(tmp);
              Banco.local.put(talhoes, function(erro, doc) {
                if (erro) return;
              });

              this.props.navigation.state.params.anterior.setState({
                talhoes: talhoes["talhoes"]
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

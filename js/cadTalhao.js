import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  Card,
  Icon,
  Button,
  Text,
  Content,
  Container,
  Toast
} from "native-base";

import { NavigationActions } from "react-navigation";
import MapView, { Polygon } from "react-native-maps";

// const analytics = require("./instancias/analytics");
import { showDefaultToast } from "./componentes/utils/showToast";
import { Banco } from "./instancias/conexao.js";
import CustomHeader from "./componentes/customHeader";

import { Formulario } from "./componentes/customizado";

let id = 0;

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

// var talhoes = {};
// Banco.local.get("talhoes", function(erro, doc) {
//   if (erro) {
//     talhoes = {
//       _id: "talhoes",
//       talhoes: []
//     };
//   } else {
//     talhoes = doc;
//   }
// });

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

  componentDidMount = () => {
    const { getParam } = this.props.navigation;
    for (var i = 0; i < form1.length; i++) {
      form1[i]["valor"] = getParam(form1[i]["nome"]);
    }
    for (var i = 0; i < form2.length; i++) {
      form2[i]["valor"] = getParam(form2[i]["nome"]);
    }
    Banco.local.get("dados").then(doc => {
      this.setState({ coordenadas_propriedade: doc.coordenadas });
    });
  };

  render() {
    const { getParam, goBack } = this.props.navigation;
    var confMapa = {};
    confMapa.scrollEnabled = this.state.mapaAtivo;

    if (!this.state.mapaAtivo) confMapa.onPress = e => this.mapaSelecionado(e);
    return (
      <Container
        style={{
          paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
        }}
      >
        {/* Header */}
        <CustomHeader titulo="Cadastro de Talhão" />

        {/* Body */}
        <Content style={{ backgroundColor: "#eee", padding: 15 }}>
          {/* Informações */}
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
              tamanho={45}
              campos={form1}
              cor="#000"
              corP="#555"
              ref={tmp => (this._formulario1 = tmp)}
            />
          </Card>

          {/* Plantação */}
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
              tamanho={45}
              campos={form2}
              cor="#000"
              corP="#555"
              ref={tmp => (this._formulario2 = tmp)}
            />
          </Card>

          {/* Mapa */}
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

          {/* Submit Button */}
          <Button
            block
            style={{
              marginTop: 15,
              marginBottom: 25,
              backgroundColor: "green"
            }}
            onPress={() => {
              var tmp = Object.assign(
                this._formulario1.getValores(),
                this._formulario2.getValores()
              );

              Banco.store("talhoes", tmp)
                .then(response => {
                  getParam("anterior").setState({
                    itens: response.itens
                  });
                })
                .catch(err => showDefaultToast(err));
              /* 
              Banco.pegaDados("talhoes")
                .then(response => {
                  response.itens.push(tmp);
                  Banco.registraDados(response);
                  this.props.navigation.state.params.anterior.setState({
                    itens: response.itens
                  });
                })
                .catch(err => {
                  err.itens.push(tmp);
                  Banco.registraDados(err);
                  this.props.navigation.state.params.anterior.setState({
                    itens: err.itens
                  });
                }); */

              // Banco.local.put(talhoes, function(erro, doc) {
              //   if (erro) return;
              // });

              goBack();
            }}
          >
            <Text>Cadastrar</Text>
          </Button>
        </Content>
        {/* Fim do Body */}
      </Container>
    );
  }
}

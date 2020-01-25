import React from "react";
import {
  Platform,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Keyboard,
  Alert,
  AsyncStorage,
  FlatList,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import {
  Card,
  View,
  Button,
  Text,
  Toast,
  Fab,
  Icon,
  Badge,
  Container
} from "native-base";
import Lightbox from "react-native-lightbox";
import Ionicon from "react-native-vector-icons/Ionicons";

import { Banco } from "../instancias/conexao.js";

var contador = 0;

var galeria = {};

export default class Galeria extends React.Component {
  constructor(props) {
    super(props);

    let tmp = [
      {
        id: "1",
        local:
          "http://portal.ufrrj.br/wp-content/uploads/2015/08/Foto-12-Veiculos-novos-para-UFRRJ-1150x300_c.jpg"
      },
      {
        id: "3",
        local:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3fd4VEsbvlV9zID-0KJBialiic49l41ojh7_QtEiFsYYIVyB6"
      },
      {
        id: "4",
        local:
          "http://3.bp.blogspot.com/_qS8YczRuwno/TQPpYLklT3I/AAAAAAAAABc/_qTttWOuShU/s1600/Arquitetura_UFRRJ.jpg"
      },
      {
        id: "5",
        local:
          "https://3.kekantoimg.com/_KCltK0xNROak71P6zCLwYeHGO4=/520x205/s3.amazonaws.com/kekanto_pics/pics/63/648063.jpg"
      },
      {
        id: "6",
        local:
          "http://r1.ufrrj.br/petsi/sudestepetrj2014/wp-content/uploads/2012/08/60872_113846268781206_333392715_n-e1389547390547.jpg"
      },
      {
        id: "7",
        local:
          "https://i0.wp.com/www.seropedicaonline.com/wp-content/uploads/2015/03/P4.jpg"
      }
    ];

    this.state = {
      fabAtivo: false,
      apagar: false,
      fotos: tmp
    };
  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Ionicon name="md-photos" color={tintColor} style={{ fontSize: 30 }} />
    )
  };

  UNSAFE_componentWillMount = () => {
    Banco.local
      .get("galeria")
      .then(doc => {
        galeria = doc;
        this.setState({ fotos: galeria.fotos });
        // console.warn(doc);
      })
      .catch(erro => {
        // console.warn(erro);
        galeria = {
          _id: "galeria"
        };
      });
  };

  renderizaFotos = () => {
    var tmp = (Dimensions.get("window").width - 40) / 3;
    return this.state.fotos.map(foto => (
      <Lightbox
        style={{ margin: 5, backgroundColor: "#aaa" }}
        key={++contador}
        renderContent={() => {
          return (
            <View style={{ flex: 1 }}>
              <StatusBar
                translucent
                backgroundColor="#000"
                barStyle="light-content"
              />
              <Image
                style={{ flex: 1 }}
                resizeMode="contain"
                source={{ uri: foto.local.toString() }}
              />
            </View>
          );
        }}
      >
        <View>
          {this.state.apagar == true && (
            <Button
              danger
              style={{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                right: 2,
                top: 2,
                height: 40,
                width: 46,
                padding: 2,
                zIndex: 999
              }}
              onPress={() => {
                Alert.alert(
                  "Confirmar exclusão",
                  "Deseja realmente apagar esta foto?",
                  [
                    {
                      text: "Não",
                      onPress: () => {},
                      style: "cancel"
                    },
                    {
                      text: "Sim",
                      onPress: async () => {
                        var tmp = this.state.fotos;
                        for (var i = 0; i < tmp.length; i++) {
                          if (tmp[i] == foto) tmp.splice(i, 1);
                        }
                        this.setState({ fotos: tmp });
                        galeria.fotos = tmp;
                        Banco.local.put(galeria, function(erro, doc) {
                          if (erro) return;
                          galeria._rev = doc._rev;
                        });
                      }
                    }
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Ionicon
                name="md-trash"
                style={{
                  color: "#FFFFFF",
                  fontSize: 20
                }}
              />
            </Button>
          )}
          <Image
            style={{ height: tmp * 0.7, width: tmp }}
            source={{ uri: foto.local.toString() }}
          />
        </View>
      </Lightbox>
    ));
  };

  render() {
    const navigate = this.props.navegacao;
    return (
      <Container>
        <ImageBackground
          source={require("../../assets/myfarm_bg_grass.jpg")}
          blurRadius={10}
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height - 50,
            flexDirection: "column"
          }}
        >
          {/* drawer */}
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

          {/* view com o resto da pagina */}
          <View
            style={{
              flex: 1,
              marginTop: 100,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            {/* lista de fotos */}
            <ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
              >
                {this.renderizaFotos()}
              </View>
            </ScrollView>
          </View>
          {/* botao de ações flutuante */}
          <Fab
            active={this.state.active}
            direction="up"
            style={{ backgroundColor: "#000" }}
            onPress={() =>
              this.setState({
                active: !this.state.active
              })
            }
          >
            <Icon name="md-camera" />

            <Button
              style={{ backgroundColor: "#E53935" }}
              onPress={() =>
                this.setState({
                  apagar: !this.state.apagar
                })
              }
            >
              <Icon
                name="md-trash"
                style={{ color: "#FFFFFF", fontSize: 20 }}
              />
            </Button>
            <Button
              style={{ backgroundColor: "green" }}
              onPress={() => this.props.navigation.navigate("Camera")}
            >
              <Icon
                name="md-aperture"
                style={{ color: "#FFFFFF", fontSize: 20 }}
              />
            </Button>
          </Fab>
        </ImageBackground>
      </Container>
    );
  }
}

import React from "react";
import { Text, View, Button, Icon, Toast } from "native-base";
import { StyleSheet, AsyncStorage } from "react-native";
import Share from "react-native-share";
import { bancoRemoto, PouchDB, Banco } from "../instancias/conexao.js";

export default class Sanduiche extends React.Component {
  constructor(props) {
    super(props);
  }

  desloga = async () => {
    await AsyncStorage.clear();
    Banco.remoto.logOut();
    this.props.navigation.navigate("Deslogado");
  };

  render() {
    const compartilhamento = {
      title: "MyFarm",
      message: "aaaaaaaaaaa",
      url: "http://google.com",
      subject: "sssssssssss" //  for email
    };

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.InnerView1,
            {
              flex: 3,
              alignItems: "center"
            }
          ]}
        >
          <Icon name="person" style={{ fontSize: 100 }} />
        </View>

        <View style={styles.InnerView1}>
          <Button full transparent style={styles.botoes1}>
            <Text style={styles.textoBotao}>Alterar Dados</Text>
          </Button>
          <Button full transparent style={[styles.botoes1, styles.botaoMeio]}>
            <Text style={styles.textoBotao}>Cadastrar Propriedade</Text>
          </Button>
          <Button full transparent style={styles.botoes1}>
            <Text style={styles.textoBotao}>Alterar Dados de Propriedade</Text>
          </Button>
        </View>
        <View style={styles.InnerView2}>
          <Button
            style={{}}
            full
            transparent
            onPress={() => Share.open(compartilhamento)}
          >
            <Icon name="share" style={{ color: "black" }} />
            <Text style={[styles.textoBotao, { marginLeft: -20 }]}>
              Compartilhar
            </Text>
          </Button>
          <Button
            style={{ marginTop: 10 }}
            full
            transparent
            onPress={() => this.props.navigation.navigate("Sobre")}
          >
            <Icon name="information-circle" style={{ color: "black" }} />
            <Text style={[styles.textoBotao, { marginLeft: -20 }]}>Sobre</Text>
          </Button>
          <Button
            style={{ position: "absolute", bottom: 0, left: 45 }}
            full
            transparent
            onPress={() => this.desloga()}
          >
            <Icon name="power" style={{ color: "red" }} />
            <Text
              style={[styles.textoBotao, { marginLeft: -20, color: "red" }]}
            >
              Desconectar
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 30,
    paddingBottom: 40
  },
  InnerView1: {
    flex: 5,
    flexDirection: "column",
    borderStyle: "solid",
    borderBottomWidth: 2,
    width: 250,
    justifyContent: "space-between"
  },
  InnerView2: {
    flex: 5,
    flexDirection: "column",
    borderStyle: "solid",
    width: 250,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20
  },
  botoes1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  botaoMeio: {
    borderStyle: "solid",
    borderColor: "black",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  textoBotao: {
    textAlign: "center",
    color: "black"
  }
});

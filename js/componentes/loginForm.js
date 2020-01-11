import React from "react";
import {
  View,
  Text,
  Button,
  Form,
  InputGroup,
  Icon,
  Input,
  Toast
} from "native-base";
import { StyleSheet } from "react-native";

import { Banco } from "../instancias/conexao.js";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  render() {
    return (
      <View>
        <Form>
          <InputGroup rounded style={styles.input}>
            <Icon name="md-person" style={{ color: "#ffffff" }} />
            <Input
              style={{ color: "#ffffff" }}
              onChangeText={user => this.setState({ username: user })}
              keyboardType="email-address"
              placeholder="Usuário"
              placeholderTextColor="#808080"
              returnKeyType="next"
            />
          </InputGroup>
          <InputGroup rounded style={styles.input}>
            <Icon name="key" style={{ color: "#ffffff" }} />
            <Input
              style={{ color: "#ffffff" }}
              onChangeText={pass =>
                this.setState({
                  password: pass
                })
              }
              placeholder="Senha"
              placeholderTextColor="#808080"
              secureTextEntry={true}
              returnKeyType="go"
            />
          </InputGroup>
        </Form>
        <Button
          block
          style={{
            borderRadius: 20,
            backgroundColor: "#004238"
          }}
          onPress={() => {
            Banco.logIn(this.state.username, this.state.password)
              .then(() => this.props.navigate("Logado"))
              .catch(err => {
                console.log(err);
                Toast.show({
                  text: err.name,
                  textStyle: { color: "#fff" },
                  buttonText: "Ok",
                  position: "bottom",
                  buttonStyle: { backgroundColor: "#303030" }
                });
              });
          }}
        >
          <Text>Entrar</Text>
        </Button>
      </View>
    );
  }
}

//estilos do componente
const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(0,0,0,.5)",
    borderColor: "transparent",
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginBottom: 20
  }
});

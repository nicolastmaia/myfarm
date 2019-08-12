import React from "react";
import { View, Text, Button, Form } from "native-base";
import Texto from "./texto.js";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Form>
          <Texto
            placeholder="Usuário"
            icone="md-person"
            keyboardType="email-address"
            returnKeyType="next"
          />
          <Texto
            placeholder="Senha"
            icone="key"
            secureTextEntry={true}
            returnKeyType="go"
          />
        </Form>
        <Button
          block
          style={{
            borderRadius: 20,
            backgroundColor: "#004238"
          }}
          onPress={() => {
            Banco.checkLogin(currentUser)
              .then(() => navigate("Logado"))
              .catch(err =>
                console.log("nao foi possivel logar (principal.js): ", err)
              );
          }}
        >
          <Text>Entrar</Text>
        </Button>
      </View>
    );
  }
}

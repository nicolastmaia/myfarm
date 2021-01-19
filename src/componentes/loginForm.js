import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Button,
  Form,
  InputGroup,
  Icon,
  Input,
  Toast,
  Item,
  Label,
} from 'native-base';
import { StyleSheet, Alert } from 'react-native';

import { showDefaultToast } from '../utils/showToast';

import AuthContext from '../contexts/AuthContext';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { logar } = useContext(AuthContext);

  async function handleSignIn() {
    await logar(username, password);
  }
  return (
    <View>
      <Item style={styles.input}>
        <Icon name='md-person' style={{ color: '#ffffff' }} />
        <Input
          style={{ color: '#ffffff' }}
          onChangeText={(user) => setUsername(user)}
          placeholder='Usuário'
          placeholderTextColor='#919191'
          returnKeyType='next'
        />
      </Item>
      <Item style={styles.input}>
        <Icon name='key' style={{ color: '#ffffff' }} />
        <Input
          style={{ color: '#ffffff' }}
          onChangeText={(pass) => setPassword(pass)}
          placeholder='Senha'
          placeholderTextColor='#919191'
          secureTextEntry={true}
          returnKeyType='go'
        />
      </Item>
      <Button
        block
        style={{
          borderRadius: 5,
          backgroundColor: '#004238',
        }}
        onPress={handleSignIn}
      >
        <Text>Entrar</Text>
      </Button>
    </View>
  );
}

//estilos do componente
const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(0,0,0,.5)',
    borderColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default LoginForm;

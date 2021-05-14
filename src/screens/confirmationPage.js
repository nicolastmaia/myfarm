import { useNavigation } from '@react-navigation/core';
import { Button, Icon, Text, View } from 'native-base';
import React, { useContext, useState } from 'react';
import { ImageBackground } from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { CustomForm } from '../componentes/Form/CustomForm';
import AuthContext from '../contexts/AuthContext';

const campos = [
  {
    nome: 'username',
    placeholder: 'Usuário a confirmar',
    icone: 'person',
  },
  {
    nome: 'code',
    placeholder: 'Código de verificação',
    icone: 'medical',
  },
];

const confirmationPage = ({ route }) => {
  const [formulario, setFormulario] = useState({});
  const { confirmEmail, resendConfirmCode } = useContext(AuthContext);
  const { navigate } = useNavigation();

  const handleConfirm = async () => {
    const { username, code } = formulario.getValores();

    await confirmEmail(username, code);
    navigate('LoginPage');
  };

  const handleResend = async () => {
    const { username } = formulario.getValores();
    await resendConfirmCode(username);
  };

  return (
    <ImageBackground
      blurRadius={8}
      source={require('../assets/myfarm_bg_grass.jpg')}
      style={{ flex: 1, width: null, padding: 20, paddingTop: 20 }}
    >
      {/* titulo da pagina */}
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            color: '#fff',
            backgroundColor: 'transparent',
            fontSize: 32,
            marginTop: 10,
            marginBottom: 35,
            textShadowColor: '#050',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 5,
          }}
        >
          Confirmação de E-mail
        </Text>
      </View>

      {/* inserção de dados */}
      <View style={{ flex: 1 }}>
        <View>
          <CustomForm
            style={{ paddingHorizontal: 0 }}
            tamanho={60}
            campos={campos}
            cor='#fff'
            corP='#fff'
            ref={(tmp) => {
              setFormulario(tmp);
            }}
          />
        </View>
      </View>

      {/* botões */}
      <HideWithKeyboard>
        <View style={{ flexDirection: 'row' }}>
          {/* botão de voltar*/}
          <Button
            block
            danger
            style={{ borderRadius: 5, margin: 15 }}
            onPress={() => {
              navigate('LoginPage');
            }}
          >
            <Icon name='arrow-back' />
          </Button>

          {/* botão de reenvio de codigo*/}
          <Button
            block
            style={{
              borderRadius: 5,
              margin: 15,
              flex: 1,
              backgroundColor: '#004238',
            }}
            onPress={handleResend}
          >
            <Text style={{ textAlign: 'center', flex: 1 }}>
              Reenviar Código
            </Text>
          </Button>

          {/* botao de prosseguir */}
          <Button
            block
            style={{
              borderRadius: 5,
              margin: 15,
              flex: 1,
              backgroundColor: '#004238',
            }}
            onPress={handleConfirm}
          >
            <Text style={{ textAlign: 'center', flex: 1 }}>
              Confirmar E-mail
            </Text>
          </Button>
        </View>
      </HideWithKeyboard>
    </ImageBackground>
  );
};

export default confirmationPage;

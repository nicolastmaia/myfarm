import React, { useContext, useRef, useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  Keyboard,
  Dimensions,
} from 'react-native';
import {
  Input,
  Item,
  Button,
  Text,
  Icon,
  View,
  Picker,
  Card,
} from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';

//meus imports
//const analytics = require("./instancias/analytics")
import { Formulario } from '../componentes/customizado';
import AuthContext from '../contexts/AuthContext';
import CustomMap from '../componentes/CustomMap';

let mapCardHeight = 0.5 * Dimensions.get('window').height;

//campos do formulario
var formularios = [
  [
    {
      nome: 'nomeProprietario',
      placeholder: 'Nome do proprietário',
      icone: 'person',
    },
    {
      nome: 'telefone',
      placeholder: 'Telefone',
      icone: 'ios-call',
      tipo: 'numeric',
    },
    { nome: 'email', placeholder: 'Email', icone: 'mail' },
    { nome: 'usuario', placeholder: 'Nome de Usuário', icone: 'person' },
    { nome: 'senha', placeholder: 'Senha', icone: 'key', senha: true },
  ],
  [
    { nome: 'municipio', placeholder: 'Município', icone: 'map' },
    {
      nome: 'bairro',
      placeholder: 'Bairro',
      icone: 'md-locate',
      tipo: 'numeric',
    },
    { nome: 'logradouro', placeholder: 'Logradouro', icone: 'md-compass' },
    {
      nome: 'complemento',
      placeholder: 'Complemento',
      icone: 'ios-information-circle',
    },
  ],
];

//campos especiais do formulario
function Texto(props) {
  return (
    <Item style={{ marginBottom: 12 }}>
      <Icon active name={props.icone} style={{ color: '#ffffff' }} />
      <Input
        style={{ height: 60, color: '#ffffff' }}
        placeholder={props.placeholder}
        placeholderTextColor='#ffffff'
        returnKeyType={'next'}
        {...props}
      >
        {props.texto}
      </Input>
    </Item>
  );
}

//pagina de cadastro
export default function CadUsuario(props) {
  const mapRef = useRef(null);
  const { cadastrar } = useContext(AuthContext);

  const [cep, setCep] = useState('');
  const [posicao, setPosicao] = useState(0);
  const [endereco, setEndereco] = useState({ uf: 'AC' });
  const [nomePropriedade, setNomePropriedade] = useState('');
  const [formulario, setFormulario] = useState({});
  const [formulario1, setFormulario1] = useState({});
  const [formulario2, setFormulario2] = useState({});

  const { goBack } = props.navigation;

  const handleSave = () => {
    if (posicao == 2) {
      const { usuario, senha } = formulario;
      delete formulario.usuario;
      delete formulario.senha;

      const coordenadas = mapRef.current.getValores();
      const propriedades = createPropertyArea(coordenadas);
      const otherData = { ...formulario, propriedades };

      cadastrar(usuario, senha, otherData);
    }

    if (posicao == 1) {
      const location = { ...formulario2.getValores(), cep, uf: endereco.uf };
      setPosicao((prevState) => ++prevState);
      setFormulario((prevState) => ({ ...prevState, ...location }));
    }

    if (posicao == 0) {
      const personalData = formulario1.getValores();
      setPosicao((prevState) => ++prevState);
      setFormulario((prevState) => ({ ...prevState, ...personalData }));
    }
  };

  const createPropertyArea = (coordenadas) => {
    const propriedade1 = { nomePropriedade, coordenadas };
    let propriedades = [];
    propriedades.push(propriedade1);

    return propriedades;
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
          Cadastro
        </Text>
      </View>

      {/* stepIndicator */}
      <HideWithKeyboard>
        <StepIndicator
          currentPosition={posicao}
          stepCount={3}
          customStyles={customStyles}
          labels={labels}
        />
      </HideWithKeyboard>

      {/* inserção de dados */}
      <View style={{ flex: 1 }}>
        {/* inserção de dados pessoais */}
        <ScrollView style={posicao == 0 ? {} : { height: 0, opacity: 0 }}>
          <Formulario
            style={{ paddingHorizontal: 0 }}
            tamanho={60}
            campos={formularios[0]}
            cor='#fff'
            corP='#fff'
            ref={(tmp) => {
              setFormulario1(tmp);
            }}
          />
        </ScrollView>

        {/* inserção de dados da propriedade */}
        <ScrollView style={posicao == 1 ? {} : { height: 0, opacity: 0 }}>
          <Texto
            placeholder='CEP'
            icone='ios-pin'
            keyboardType='numeric'
            maxLength={8}
            value={cep}
            onChangeText={(txt) => {
              setCep(txt);
              if (txt.length < 8) return;
              fetch('https://viacep.com.br/ws/' + txt + '/json/')
                .then((res) => {
                  return res.json();
                })
                .then((res) => {
                  setEndereco({
                    uf: res.uf,
                    municipio: res.localidade,
                    bairro: res.bairro,
                    logradouro: res.logradouro,
                  });
                  Keyboard.dismiss();
                });
            }}
          />

          <Item style={{ marginBottom: 10 }}>
            <Icon active name='md-globe' style={{ color: '#ffffff' }} />
            <Picker
              mode='dropdown'
              placeholder='Estado'
              placeholderTextColor='#ffffff'
              selectedValue={endereco.uf}
              style={{ color: '#fff' }}
              onValueChange={(tmp) => {
                setEndereco({ uf: tmp });
              }}
            >
              <Item label='Acre' value='AC' />
              <Item label='Alagoas' value='AL' />
              <Item label='Amapá' value='AP' />
              <Item label='Amazonas' value='AM' />
              <Item label='Bahia' value='BA' />
              <Item label='Ceará' value='CE' />
              <Item label='Distrito Federal' value='DF' />
              <Item label='Espírito Santo' value='ES' />
              <Item label='Goiás' value='GO' />
              <Item label='Maranhão' value='MA' />
              <Item label='Mato Grosso' value='MT' />
              <Item label='Mato Grosso do Sul' value='MS' />
              <Item label='Minas Gerais' value='MG' />
              <Item label='Pará' value='PA' />
              <Item label='Paraíba' value='PB' />
              <Item label='Paraná' value='PR' />
              <Item label='Pernambuco' value='PE' />
              <Item label='Piauí' value='PI' />
              <Item label='Rio de Janeiro' value='RJ' />
              <Item label='Rio Grande do Norte' value='RN' />
              <Item label='Rio Grande do Sul' value='RS' />
              <Item label='Rondônia' value='RO' />
              <Item label='Roraima' value='RR' />
              <Item label='Santa Catarina' value='SC' />
              <Item label='São Paulo' value='SP' />
              <Item label='Sergipe' value='SE' />
              <Item label='Tocantins' value='TO' />
            </Picker>
          </Item>

          <Formulario
            style={{ paddingHorizontal: 0 }}
            tamanho={60}
            campos={formularios[1]}
            cor='#fff'
            corP='#fff'
            ref={(tmp) => {
              setFormulario2(tmp);
            }}
          />
        </ScrollView>

        {/* seleção de coordenadas da propriedade no mapa */}
        <ScrollView style={posicao == 2 ? {} : { height: 0, opacity: 0 }}>
          <Texto
            placeholder='Nome da propriedade'
            icone='home'
            onChangeText={(txt) => {
              setNomePropriedade(txt);
            }}
          />
          <Card>
            <CustomMap style={styles.map} markers={[]} ref={mapRef} />
          </Card>
        </ScrollView>
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
              if (posicao == 0) goBack();
              else setPosicao((prevState) => --prevState);
            }}
          >
            <Icon name='arrow-back' />
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
            onPress={handleSave}
          >
            <Text style={{ textAlign: 'center', flex: 1 }}>Prosseguir</Text>
          </Button>
        </View>
      </HideWithKeyboard>
    </ImageBackground>
  );
}

const labels = ['', ''];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#353',
  separatorUnFinishedColor: '#353',
  stepIndicatorFinishedColor: '#131',
  stepIndicatorUnFinishedColor: '#353',
  stepIndicatorCurrentColor: '#cfc',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#fff',
  labelColor: '#ffffff',
  labelSize: 12,
  currentStepLabelColor: '#333',
};

const styles = StyleSheet.create({
  mapCard: { borderRadius: 5, height: mapCardHeight },
  map: {
    height: mapCardHeight,
  },
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  mapaFocado: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

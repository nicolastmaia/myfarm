import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { View, Text, Container } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { imagemClima } from '../componentes/previsaoTempo';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo: { icone: null, descricao: '', temperatura: null },
    };
  }
  componentDidMount() {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Seropedica,br&appid=fbcb1d716b39d13ab10b83ec65f5c773&lang=pt'
    )
      .then((res) => res.json())
      .then((resJson) => {
        let tmp = resJson.weather[0].description;
        this.setState({
          tempo: {
            descricao: tmp[0].toUpperCase() + tmp.slice(1),
            temperatura: (resJson.main.temp - 273).toFixed(0) + 'º',
            icone: imagemClima(resJson.weather[0].icon, 80, 80),
            cidade: resJson.name,
          },
        });
      })
      .catch((erro) => Alert.alert(erro.message));
  }

  render() {
    const { navigate, openDrawer } = this.props.navigation;
    var tmp = null;

    //config do icone de previsao do tempo
    if (this.state.tempo.descricao == '') {
      tmp = (
        <Text style={{ color: '#FFFFFF', fontSize: 40 }}>Carregando...</Text>
      );
    } else {
      tmp = (
        <>
          <View
            style={[
              {
                borderRightWidth: 1,
              },
              styles.weatherSubContainer,
            ]}
          >
            <View>{this.state.tempo.icone}</View>
            <Text
              style={{
                color: '#fff',
                fontSize: 30,
                textAlign: 'center',
              }}
            >
              {this.state.tempo.cidade}
            </Text>
          </View>

          <View
            style={[
              {
                borderLeftWidth: 1,
              },
              styles.weatherSubContainer,
            ]}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 60,
                textAlign: 'center',
              }}
            >
              {this.state.tempo.temperatura}
            </Text>

            <Text
              style={{
                color: '#fff',
                fontSize: 25,
                textAlign: 'center',
              }}
            >
              {this.state.tempo.descricao}
            </Text>
          </View>
        </>
      );
    }

    return (
      <Container>
        <ImageBackground
          source={require('../assets/myfarm_bg_grass.jpg')}
          blurRadius={10}
          style={styles.backgroundImage}
        >
          {/* botao menu sanduiche */}
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => openDrawer()}
            >
              <Icon style={styles.menuIcon} name='menu' />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 5 }}>
            {/* previsao do tempo */}
            <View style={styles.weatherContainer}>{tmp}</View>

            {/* botoes principais */}
            <View style={styles.buttonsContainer}>
              {/* primeira linha */}
              <View style={{ flexDirection: 'row' }}>
                {/* CadAplicacao */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.buttons}
                  onPress={() => navigate('Aplicacao')}
                >
                  <Icon name='flask-plus-outline' style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Aplicações</Text>
                </TouchableOpacity>

                {/* Perdas */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.buttons}
                  onPress={() => navigate('Perdas')}
                >
                  <Icon name='numeric-negative-1' style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Perdas</Text>
                </TouchableOpacity>
              </View>

              {/* segunda linha */}
              <View style={{ flexDirection: 'row' }}>
                {/* Talhao */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.buttons}
                  onPress={() => navigate('Talhao')}
                >
                  <Icon name='grid-large' style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Talhão</Text>
                </TouchableOpacity>

                {/* CadColheita */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.buttons}
                  onPress={() => navigate('Colheita')}
                >
                  <Icon name='basket-outline' style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Colheita</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

//estilos da pagina
const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50,
    flexDirection: 'column',
  },
  menuIcon: { color: 'white', fontSize: 45 },
  menuButton: {
    position: 'absolute',
    marginTop: 35,
    marginLeft: 15,
  },
  weatherContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 95,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  weatherSubContainer: {
    borderStyle: 'solid',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttonsContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttons: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: 180,
    margin: 10,
    borderRadius: 10,
  },
  buttonIcon: {
    fontSize: 70,
    color: '#000000',
  },
  buttonText: {
    color: '#000000',
  },
});

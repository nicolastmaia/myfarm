import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { View, Button, Fab, Icon, Container } from 'native-base';
import Lightbox from 'react-native-lightbox';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { S3Image } from 'aws-amplify-react-native';

import { Banco } from '../instancias/conexao.js';
import ImgContext from '../contexts/ImgContext.js';
import { S3Album } from 'aws-amplify-react-native/dist/Storage';

var contador = 0;

export default function Galeria({ navigation }) {
  const [fabAtivo, setFabAtivo] = useState(false);
  const [apagar, setApagar] = useState(false);
  const { images, fetchImages } = useContext(ImgContext);

  const { navigate, openDrawer } = navigation;

  useEffect(() => {
    fetchImages();
  }, []);

  const navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Ionicon name='md-photos' color={tintColor} style={{ fontSize: 30 }} />
    ),
  };

  const renderizaFotos = () => {
    var tmp = (Dimensions.get('window').width - 70) / 3;
    return (
      images &&
      images.map((image) => (
        <Lightbox
          style={{ margin: 5, backgroundColor: '#aaa' }}
          key={image.key}
          renderContent={() => {
            return (
              <View style={{ flex: 1 }}>
                <StatusBar
                  translucent
                  backgroundColor='#000'
                  barStyle='light-content'
                />
                <S3Image
                  level='private'
                  imgKey={image.key}
                  style={{ flex: 1 }}
                />
              </View>
            );
          }}
        >
          <View>
            {apagar == true && (
              <Button
                danger
                style={{
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  right: 2,
                  top: 2,
                  height: 40,
                  width: 46,
                  padding: 2,
                  zIndex: 999,
                }}
                onPress={() => {
                  Alert.alert(
                    'Confirmar exclusão',
                    'Deseja realmente apagar esta foto?',
                    [
                      {
                        text: 'Não',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {
                        text: 'Sim',
                        onPress: async () => {},
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Ionicon
                  name='md-trash'
                  style={{
                    color: '#FFFFFF',
                    fontSize: 20,
                  }}
                />
              </Button>
            )}
            <S3Image
              level='private'
              imgKey={image.key}
              style={{ width: tmp, height: tmp * 0.7 }}
            />
          </View>
        </Lightbox>
      ))
    );
  };

  return (
    <Container>
      <ImageBackground
        source={require('../assets/myfarm_bg_grass.jpg')}
        blurRadius={10}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height - 50,
          flexDirection: 'column',
        }}
      >
        {/* drawer */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            marginTop: 35,
            marginLeft: 15,
          }}
          onPress={() => openDrawer()}
        >
          <Ionicon style={{ color: 'white', fontSize: 45 }} name='md-menu' />
        </TouchableOpacity>

        {/* view com o resto da pagina */}
        <View
          style={{
            flex: 1,
            marginTop: 100,
            marginHorizontal: 20,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          {/* lista de fotos */}
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {renderizaFotos()}
            </View>
          </ScrollView>
        </View>

        {/* botao de ações flutuante */}
        <View style={{ flex: 1 }}>
          <Fab
            active={fabAtivo}
            direction='left'
            position='bottomRight'
            style={{ backgroundColor: '#629c44' }}
            onPress={() => setFabAtivo((prevState) => !prevState)}
          >
            <Icon name='md-camera' />

            <Button
              style={{ backgroundColor: '#44869c' }}
              onPress={() => navigate('Camera')}
            >
              <Icon name='md-aperture' />
            </Button>

            <Button
              style={{ backgroundColor: '#CD6B69' }}
              onPress={() => setApagar((prevState) => !prevState)}
            >
              <Icon name='md-trash' />
            </Button>
          </Fab>
        </View>
      </ImageBackground>
    </Container>
  );
}

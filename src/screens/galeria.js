import { S3Image } from 'aws-amplify-react-native';
import { Button, Container, Fab, Icon, View } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Lightbox from 'react-native-lightbox';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ImgContext from '../contexts/ImgContext.js';

export default function Galeria({ navigation }) {
  const [fabButton, setFabButton] = useState(false);
  const [removalButtons, setRemovalButtons] = useState(false);
  const { images, removeImage } = useContext(ImgContext);

  const { navigate, openDrawer } = navigation;

  const navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Ionicon name='md-photos' color={tintColor} style={{ fontSize: 30 }} />
    ),
  };

  const handleImageRemovalConfirm = (imageKey) => {
    removeImage(imageKey);
  };

  const handleRemovalButtonPress = () => {
    setRemovalButtons((prevState) => !prevState);
  };

  const handleCameraButtonPress = () => {
    setRemovalButtons(false);
    setFabButton(false);
    navigate('Camera');
  };

  const handleFabButtonPress = () => {
    setFabButton((prevState) => !prevState);
  };

  useEffect(() => {
    if (images.length === 0) {
      setRemovalButtons(false);
    }
  }, [images]);

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
            {removalButtons === true && (
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
                      },
                      {
                        text: 'Sim',
                        onPress: () => handleImageRemovalConfirm(image.key),
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
            active={fabButton}
            direction='left'
            position='bottomRight'
            style={{ backgroundColor: '#629c44' }}
            onPress={handleFabButtonPress}
          >
            <Icon name='md-camera' />

            <Button
              style={{ backgroundColor: '#44869c' }}
              onPress={handleCameraButtonPress}
            >
              <Icon name='md-aperture' />
            </Button>

            <Button
              style={{ backgroundColor: '#CD6B69' }}
              onPress={handleRemovalButtonPress}
            >
              <Icon name='md-trash' />
            </Button>
          </Fab>
        </View>
      </ImageBackground>
    </Container>
  );
}

import React, { useContext, useRef } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { View, Icon } from 'native-base';
import { RNCamera } from 'react-native-camera';
import ImgContext from '../contexts/ImgContext';

export default function Camera({ navigation }) {
  const { goBack } = navigation;
  const cameraRef = useRef(null);
  const { uploadImage } = useContext(ImgContext);

  const handleSavePicture = async (data) => {
    await uploadImage(data);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const picOptions = { quality: 0.6 };
      const picData = await cameraRef.current.takePictureAsync(picOptions);
      const picture = await fetch(picData.uri);
      const blobPicture = await picture.blob();

      Alert.alert(
        'Confirmar envio',
        'Deseja registrar esta foto?',
        [
          { text: 'Não', onPress: () => {}, style: 'cancel' },
          {
            text: 'Sim',
            onPress: () => {
              handleSavePicture(blobPicture);
              goBack();
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Icon
        style={{
          color: '#fff',
          position: 'absolute',
          top: 35,
          left: 15,
          fontSize: 30,
          zIndex: 99,
        }}
        name='arrow-back'
        onPress={() => goBack()}
      />
      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        permissionDialogTitle={'Permissão para usar câmera'}
        permissionDialogMessage={
          'Precisamos da sua permissão para utilizar sua câmera.'
        }
      />
      <View
        style={{
          position: 'absolute',
          bottom: 15,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <TouchableOpacity style={{ height: 60 }} onPress={takePicture}>
          <Icon name='md-aperture' style={{ color: '#fff', fontSize: 60 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

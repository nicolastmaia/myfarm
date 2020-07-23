import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { View, Icon } from 'native-base';
import { RNCamera } from 'react-native-camera';

export default class Camera extends React.Component {
	constructor(props) {
		super(props);
	}

	// takePicture = async function() {
	//     var tmp = Alert.alert(
	//         'Confirmar envio',
	//         'Deseja registrar esta foto?',
	//         [
	//           {text: 'Não', onPress: () => {}, style: 'cancel'},
	//           {text: 'Sim', onPress: async () => {
	//               if (this.camera) {
	//                   const options = { quality: 0.5, base64: true };
	//                   const data = await this.camera.takePictureAsync(options)
	//                   console.warn(data.uri);
	//               }
	//           }}
	//         ],
	//         { cancelable: false }
	//     );
	// }

	tiraFoto = async function() {
		var data;
		if (this.camera) {
			const options = { quality: 0.6, base64: true };
			data = await this.camera.takePictureAsync(options);
			var tmp = Alert.alert(
				'Confirmar envio',
				'Deseja registrar esta foto?',
				[
					{ text: 'Não', onPress: () => {}, style: 'cancel' },
					{
						text: 'Sim',
						onPress: async () => {
							console.warn(data.uri);
						},
					},
				],
				{ cancelable: false }
			);
		}
	};

	render() {
		const { goBack } = this.props.navigation;
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
					name="arrow-back"
					onPress={() => goBack()}
				/>
				<RNCamera
					ref={(ref) => {
						this.camera = ref;
					}}
					style={{ flex: 1 }}
					type={RNCamera.Constants.Type.back}
					flashMode={RNCamera.Constants.FlashMode.on}
					permissionDialogTitle={'Permission to use camera'}
					permissionDialogMessage={
						'We need your permission to use your camera phone'
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
					<TouchableOpacity
						style={{ height: 60 }}
						onPress={this.tiraFoto.bind(this)}
					>
						<Icon
							name="md-aperture"
							style={{ color: '#fff', fontSize: 60 }}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

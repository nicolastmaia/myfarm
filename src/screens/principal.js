import React from 'react';
import {
	Dimensions,
	StyleSheet,
	ImageBackground,
	Image,
	KeyboardAvoidingView,
	Keyboard,
} from 'react-native';
import { View, Icon, Text } from 'native-base';
import LoginForm from '../componentes/loginForm.js';
import { AuthProvider } from '../contexts/AuthContext.js';

// const analytics = require("./instancias/analytics");

export default class Principal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { teclado: false };
	}

	//========| Listeners do teclado |=======//
	componentDidMount() {
		// analytics.trackScreenView("Login");
		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this._keyboardDidShow
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this._keyboardDidHide
		);
	}
	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}
	_keyboardDidShow = () => {
		this.setState({ teclado: true });
	};
	_keyboardDidHide = () => {
		this.setState({ teclado: false });
	};
	//=======================================//

	render() {
		const { navigate } = this.props.navigation;

		let logoMyFarm = null;
		let logoRural = null;
		let logoPet = null;

		//configs das logos
		if (!this.state.teclado) {
			logoMyFarm = (
				<Image
					source={require('../assets/myfarm_icon_transp_white.png')}
					style={styles.logoMyFarm}
				/>
			);
			logoRural = (
				<Image
					source={require('../assets/rural_icon_transp_white.png')}
					style={[{ marginLeft: 50, height: 70 }, styles.logosMenores]}
				/>
			);
			logoPet = (
				<Image
					source={require('../assets/petsi_icon_transp_white.png')}
					style={[{ marginRight: 50, height: 75 }, styles.logosMenores]}
				/>
			);
		}

		return (
			<ImageBackground
				source={require('../assets/myfarm_bg_grass.jpg')}
				style={styles.imageContainer}
			>
				<Icon
					active
					name="ios-information-circle"
					style={styles.infoIcon}
					onPress={() => navigate('Sobre')}
				/>
				<KeyboardAvoidingView
					behavior="padding"
					keyboardVerticalOffset={0}
					style={{ flex: 1 }}
				>
					{/* insercao das logos */}
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
						}}
					>
						<View
							style={{
								flex: 2,
								justifyContent: 'flex-end',
								marginBottom: 40,
								alignItems: 'center',
							}}
						>
							{logoMyFarm}
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
							}}
						>
							{logoRural}
							{logoPet}
						</View>
					</View>

					{/* form de login */}
					<View style={{ paddingHorizontal: 30 }}>
						<LoginForm />
					</View>

					{/* botoes com opcoes de cadastrar e de recuperar senha */}
					<View
						style={{
							flexDirection: 'row',
							width: null,
							backgroundColor: 'transparent',
						}}
					>
						<Text
							style={styles.texto}
							onPress={() => {
								navigate('CadUsuario');
							}}
						>
							Cadastrar
						</Text>
						<Text
							style={[{ textAlign: 'right', flex: 1 }, styles.texto]}
							onPress={() => {
								fdc();
							}}
						>
							Esqueci a senha
						</Text>
					</View>
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}
}

//estilos da pagina
const styles = StyleSheet.create({
	imageContainer: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	logoMyFarm: {
		alignSelf: 'center',
		position: 'absolute',
		width: 260,
		height: 96,
	},
	logosMenores: {
		flex: 1,
		resizeMode: 'contain',
	},
	infoIcon: {
		color: '#fff',
		fontSize: 26,
		position: 'absolute',
		zIndex: 999,
		right: 15,
		top: 35,
	},
	texto: {
		color: '#fff',
		padding: 20,
		textShadowColor: '#000',
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 7,
	},
});

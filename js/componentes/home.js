import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	ImageBackground,
} from 'react-native';
import { View, Text, Button, Container } from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { imagemClima } from './previsaoTempo';

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
						temperatura: (resJson.main.temp - 273).toFixed(0) + ' º',
						icone: imagemClima(resJson.weather[0].icon, 60, 60),
						cidade: resJson.name,
					},
				});
			})
			.catch((erro) => Alert.alert(erro.message));
	}
	//configs enviadas ao navegadores.js
	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => (
			<Ionicon name="md-home" color={tintColor} style={{ fontSize: 30 }} />
		),
	};

	render() {
		const { navigate, openDrawer } = this.props.navigation;
		var tmp = null;

		//config do icone de previsao do tempo
		if (this.state.tempo.descricao == '') {
			tmp = (
				<Text style={{ color: '#FFFFFF', fontSize: 20 }}>
					Carregando...
				</Text>
			);
		} else {
			tmp = (
				<>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View>{this.state.tempo.icone}</View>
						<Text
							style={{
								color: '#fff',
							}}
						>
							{this.state.tempo.cidade}
						</Text>
					</View>

					<View
						style={{
							borderStyle: 'solid',
							borderLeftWidth: 2,
							alignItems: 'center',
							justifyContent: 'center',
							paddingLeft: 15,
							paddingBottom: 5,
							paddingTop: 15,
							marginLeft: 15,
						}}
					>
						<Text
							style={{
								color: '#fff',
								fontSize: 40,
							}}
						>
							{this.state.tempo.temperatura}
						</Text>

						<Text
							style={{
								color: '#fff',
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
					source={require('../../assets/myfarm_bg_grass.jpg')}
					blurRadius={10}
					style={{
						width: Dimensions.get('window').width,
						height: Dimensions.get('window').height - 50,
						flexDirection: 'column',
					}}
				>
					{/* botao menu sanduiche */}
					<TouchableOpacity
						style={{
							position: 'absolute',
							marginTop: 35,
							marginLeft: 15,
						}}
						onPress={() => openDrawer()}
					>
						<Ionicon
							style={{ color: 'white', fontSize: 45 }}
							name="md-menu"
						/>
					</TouchableOpacity>

					<View style={{ marginTop: 35 }}>
						{/* previsao do tempo */}
						<View
							style={{
								marginTop: 50,
								flexDirection: 'row',
								height: 95,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{tmp}
						</View>

						{/* botoes principais */}
						<View
							style={{
								marginTop: 30,
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
							}}
						>
							{/* primeira linha */}
							<View style={{ flexDirection: 'row' }}>
								{/* CadAplicacao */}
								<TouchableOpacity
									activeOpacity={0.7}
									style={styles.botoes}
									onPress={() => navigate('Aplicacao')}
								>
									<Ionicon
										name="md-trending-up"
										style={styles.icone}
									/>
									<Text style={styles.texto}>Aplicações</Text>
								</TouchableOpacity>

								{/* Perdas */}
								<TouchableOpacity
									activeOpacity={0.7}
									style={styles.botoes}
									onPress={() => navigate('Perdas')}
								>
									<Ionicon
										name="md-trending-down"
										style={styles.icone}
									/>
									<Text style={styles.texto}>Perdas</Text>
								</TouchableOpacity>
							</View>

							{/* segunda linha */}
							<View style={{ flexDirection: 'row' }}>
								{/* Talhao */}
								<TouchableOpacity
									activeOpacity={0.7}
									style={styles.botoes}
									onPress={() => navigate('Talhao')}
								>
									<Ionicon name="md-grid" style={styles.icone} />
									<Text style={styles.texto}>Talhão</Text>
								</TouchableOpacity>

								{/* CadColheita */}
								<TouchableOpacity
									activeOpacity={0.7}
									style={styles.botoes}
									onPress={() => navigate('Colheita')}
								>
									<Ionicon name="md-basket" style={styles.icone} />
									<Text style={styles.texto}>Colheita</Text>
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
	botoes: {
		backgroundColor: '#FFFFFF',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: 150,
		width: 150,
		margin: 10,
		borderRadius: 10,
	},
	icone: {
		fontSize: 70,
		color: '#000000',
	},
	texto: {
		color: '#000000',
	},
});

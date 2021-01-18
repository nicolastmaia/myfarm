import React from 'react';
import {
	StyleSheet,
	ImageBackground,
	ScrollView,
	Dimensions,
} from 'react-native';

import { Item, Button, Text, Icon, View } from 'native-base';

import MapView, { Polygon } from 'react-native-maps';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';

// const analytics = require("./instancias/analytics");
import { Banco } from '../instancias/conexao.js';
import { Formulario, mostraToast } from '../componentes/customizado';

class Texto extends React.Component {
	render() {
		return (
			<Item style={{ marginBottom: 12 }}>
				<Icon active name={this.props.icone} style={{ color: '#fff' }} />
				<Input
					style={{ height: 60, color: '#fff' }}
					placeholder={this.props.placeholder}
					placeholderTextColor="#fff"
					returnKeyType={'next'}
					{...this.props}
				>
					{this.props.texto}
				</Input>
			</Item>
		);
	}
}

let id = 0;

export default class cadPropriedadeNova extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			btnMapa: 'md-create',
			cep: '',
			posicao: 0,
			endereco: { uf: 'AC' },
			mapaAtivo: true,
			editando: null,
			formulario: {},
		};
	}

	/* componentWillMount() {
		analytics.trackScreenView("Cadastro Nova Propriedade");
	} */

	mapaSelecionado(e) {
		const { editando } = this.state;

		if (!editando) {
			this.setState({
				editando: {
					id: id++,
					coordenadas: [e.nativeEvent.coordinate],
				},
			});
		} else {
			this.setState({
				editando: {
					...editando,
					id: id++,
					coordenadas: [...editando.coordenadas, e.nativeEvent.coordinate],
				},
			});
		}
		// if(editando) console.warn(editando.coordenadas);
	}

	render = () => {
		const { goBack } = this.props.navigation;

		var confMapa = {};
		confMapa.scrollEnabled = this.state.mapaAtivo;
		if (!this.state.mapaAtivo)
			confMapa.onPress = (e) => this.mapaSelecionado(e);

		return (
			<ImageBackground
				blurRadius={8}
				source={require('../assets/myfarm_bg_grass.jpg')}
				style={{ flex: 1, width: null, padding: 20, paddingTop: 20 }}
			>
				<View style={{ alignItems: 'center' }}>
					<Text
						style={{
							color: '#fff',
							backgroundColor: 'transparent',
							fontSize: 32,
							marginTop: 10,
							marginBottom: 25,
							textShadowColor: '#050',
							textShadowOffset: { width: 0, height: 1 },
							textShadowRadius: 5,
						}}
					>
						Nova Propriedade
					</Text>
				</View>

				<View style={{ flex: 1, marginBottom: 10 }}>
					<ScrollView>
						<Texto
							placeholder="Nome da propriedade"
							icone="home"
							onChangeText={(txt) => {
								this.setState({
									formulario: { nome_propriedade: txt },
								});
							}}
						/>
						<View>
							<MapView
								ref="mapa"
								showsUserLocation={true}
								followsUserLocation={true}
								style={{
									height: Dimensions.get('window').height - 275,
								}}
								{...confMapa}
							>
								{this.state.editando && (
									<Polygon
										key={this.state.editando.id}
										coordinates={this.state.editando.coordenadas}
										strokeColor="#000"
										fillColor="rgba(255,0,0,0.5)"
										strokeWidth={1}
									/>
								)}
							</MapView>
							<Button
								success
								style={{
									position: 'absolute',
									top: 5,
									right: 5,
								}}
								onPress={() => {
									var tmp = '';
									if (this.state.mapaAtivo) tmp = 'md-checkmark';
									else tmp = 'md-create';
									this.setState({
										mapaAtivo: !this.state.mapaAtivo,
										btnMapa: tmp,
									});
								}}
							>
								<Icon name={this.state.btnMapa} />
							</Button>
						</View>
					</ScrollView>
				</View>

				<HideWithKeyboard>
					<View style={{ flexDirection: 'row' }}>
						<Button
							rounded
							danger
							style={{ margin: 15 }}
							onPress={() => goBack()}
						>
							<Icon name="arrow-back" />
						</Button>
						<Button
							rounded
							style={{
								margin: 15,
								flex: 1,
								backgroundColor: '#004238',
							}}
							onPress={() => {
								Banco.local.get('dados').then((doc) => {
									console.warn(doc);

									doc['propriedades'][
										doc['propriedades'].length
									] = Object.assign(this.state.formulario, {
										coordenadas: this.state.editando.coordenadas,
									});

									Banco.local.put(doc, function(erro, doc) {
										if (erro) console.warn(erro);
									});
								});
							}}
						>
							<Text style={{ textAlign: 'center', flex: 1 }}>
								Cadastrar
							</Text>
						</Button>
					</View>
				</HideWithKeyboard>
			</ImageBackground>
		);
	};
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

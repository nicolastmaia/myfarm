import React from "react";
import {
	AsyncStorage,
	Alert,
	Platform,
	StyleSheet,
	ImageBackground,
	ScrollView,
	KeyboardAvoidingView,
	Dimensions,
	Keyboard
} from "react-native";

import {
	Root,
	Toast,
	Form,
	Card,
	Content,
	Input,
	Item,
	Button,
	Text,
	Icon,
	View,
	Picker
} from "native-base";

import { NavigationActions } from "react-navigation";
import MapView, { MAP_TYPES, Polygon } from "react-native-maps";
import StepIndicator from "react-native-step-indicator";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";

// const analytics = require("./instancias/analytics");
import {Banco} from "./instancias/conexao.js";
import { Formulario, mostraToast } from "./componentes/customizado";

class Texto extends React.Component {
	render() {
		return (
			<Item style={{ marginBottom: 12 }}>
				<Icon
					active
					name={this.props.icone}
					style={{ color: "#ffffff" }}
				/>
				<Input
					style={{ height: 60, color: "#ffffff" }}
					placeholder={this.props.placeholder}
					placeholderTextColor="#ffffff"
					returnKeyType={"next"}
					{...this.props}>
					{this.props.texto}
				</Input>
			</Item>
		);
	}
}

let id = 0;

var formularios = [
	[
		{
			nome: "nome_proprietario",
			placeholder: "Nome do proprietário",
			icone: "person"
		},
		{
			nome: "telefone",
			placeholder: "Telefone",
			icone: "ios-call",
			tipo: "numeric"
		},
		{ nome: "email", placeholder: "Email", icone: "mail" },
		{ nome: "senha", placeholder: "Senha", icone: "key", senha: true }
	],
	[
		{ nome: "municipio", placeholder: "Município", icone: "map" },
		{
			nome: "bairro",
			placeholder: "Bairro",
			icone: "md-locate",
			tipo: "numeric"
		},
		{ nome: "logradouro", placeholder: "Logradouro", icone: "md-compass" },
		{
			nome: "complemento",
			placeholder: "Complemento",
			icone: "ios-information-circle"
		}
	]
];

class cadastro extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			btnMapa: "md-create",
			cep: "",
			posicao: 0,
			endereco: { uf: "AC" },
			mapaAtivo: true,
			editando: null,
			formulario: {}
		};
	}

	UNSAFE_componentWillMount() {
		// analytics.trackScreenView("Cadastro");
		if (this.props.navigation.getParam("logado")) {
			Banco.local.get("dados").then(doc => {
				console.warn(doc);
				for (var i = 0; i < formularios[0].length; i++) {
					formularios[0][i]["valor"] = doc[formularios[0][i]["nome"]];
				}
				for (var i = 0; i < formularios[1].length; i++) {
					formularios[1][i]["valor"] = doc[formularios[1][i]["nome"]];
				}
				this.setState({ cep: doc["cep"], endereco: { uf: doc["uf"] } });
			});
		}
	}

	mapaSelecionado(e) {
		const { editando } = this.state;

		if (!editando) {
			this.setState({
				editando: {
					id: id++,
					coordenadas: [e.nativeEvent.coordinate]
				}
			});
		} else {
			this.setState({
				editando: {
					...editando,
					id: id++,
					coordenadas: [
						...editando.coordenadas,
						e.nativeEvent.coordinate
					]
				}
			});
		}
		// if(editando) console.warn(editando.coordenadas);
	}

	render = () => {
		const { navigate } = this.props.navigation;

		var confMapa = {};
		confMapa.scrollEnabled = this.state.mapaAtivo;
		if (!this.state.mapaAtivo)
			confMapa.onPress = e => this.mapaSelecionado(e);

		return (
			<ImageBackground
				blurRadius={8}
				source={require("./assets/myfarm_bg_grass.jpg")}
				style={{ flex: 1, width: null, padding: 20, paddingTop: 20 }}>
				<View style={{ alignItems: "center" }}>
					<Text
						style={{
							color: "#fff",
							backgroundColor: "transparent",
							fontSize: 32,
							marginTop: 10,
							marginBottom: 35,
							textShadowColor: "#050",
							textShadowOffset: { width: 0, height: 1 },
							textShadowRadius: 5
						}}>
						Cadastro
					</Text>
				</View>

				<HideWithKeyboard>
					<StepIndicator
						currentPosition={this.state.posicao}
						stepCount={3}
						customStyles={customStyles}
						labels={labels}
					/>
				</HideWithKeyboard>

				<View style={{ flex: 1 }}>
					<ScrollView
						style={
							this.state.posicao == 0
								? {}
								: { height: 0, opacity: 0 }
						}>
						<Formulario
							style={{ paddingHorizontal: 0 }}
							tamanho={60}
							campos={formularios[0]}
							cor="#fff"
							corP="#fff"
							ref={tmp => {
								this._formulario1 = tmp;
							}}
						/>
					</ScrollView>

					<ScrollView
						style={
							this.state.posicao == 1
								? {}
								: { height: 0, opacity: 0 }
						}>
						<Texto
							placeholder="CEP"
							icone="ios-pin"
							keyboardType="numeric"
							maxLength={8}
							value={this.state.cep}
							onChangeText={txt => {
								this.setState({ cep: txt });
								if (txt.length < 8) return;
								fetch(
									"https://viacep.com.br/ws/" + txt + "/json/"
								)
									.then(res => {
										return res.json();
									})
									.then(res => {
										this.setState({
											endereco: {
												uf: res.uf,
												municipio: res.localidade,
												bairro: res.bairro,
												logradouro: res.logradouro
											}
										});
										this._formulario2.setValor(
											"municipio",
											res.localidade
										);
										this._formulario2.setValor(
											"bairro",
											res.bairro
										);
										this._formulario2.setValor(
											"logradouro",
											res.logradouro
										);
										Keyboard.dismiss();
									});
							}}
						/>

						<Item style={{ marginBottom: 10 }}>
							<Icon
								active
								name="md-globe"
								style={{ color: "#ffffff" }}
							/>
							<Picker
								mode="dropdown"
								placeholder="Estado"
								placeholderTextColor="#ffffff"
								selectedValue={this.state.endereco.uf}
								style={{ color: "#fff" }}
								onValueChange={tmp => {
									this.setState({ endereco: { uf: tmp } });
								}}>
								<Item label="Acre" value="AC" />
								<Item label="Alagoas" value="AL" />
								<Item label="Amapá" value="AP" />
								<Item label="Amazonas" value="AM" />
								<Item label="Bahia" value="BA" />
								<Item label="Ceará" value="CE" />
								<Item label="Distrito Federal" value="DF" />
								<Item label="Espírito Santo" value="ES" />
								<Item label="Goiás" value="GO" />
								<Item label="Maranhão" value="MA" />
								<Item label="Mato Grosso" value="MT" />
								<Item label="Mato Grosso do Sul" value="MS" />
								<Item label="Minas Gerais" value="MG" />
								<Item label="Pará" value="PA" />
								<Item label="Paraíba" value="PB" />
								<Item label="Paraná" value="PR" />
								<Item label="Pernambuco" value="PE" />
								<Item label="Piauí" value="PI" />
								<Item label="Rio de Janeiro" value="RJ" />
								<Item label="Rio Grande do Norte" value="RN" />
								<Item label="Rio Grande do Sul" value="RS" />
								<Item label="Rondônia" value="RO" />
								<Item label="Roraima" value="RR" />
								<Item label="Santa Catarina" value="SC" />
								<Item label="São Paulo" value="SP" />
								<Item label="Sergipe" value="SE" />
								<Item label="Tocantins" value="TO" />
							</Picker>
						</Item>

						<Formulario
							style={{ paddingHorizontal: 0 }}
							tamanho={60}
							campos={formularios[1]}
							cor="#fff"
							corP="#fff"
							ref={tmp => {
								this._formulario2 = tmp;
							}}
						/>
					</ScrollView>

					<ScrollView
						style={
							this.state.posicao == 2
								? {}
								: { height: 0, opacity: 0 }
						}>
						<Texto
							placeholder="Nome da propriedade"
							icone="home"
							onChangeText={txt => {
								this.setState({
									formulario: Object.assign(
										this.state.formulario,
										{ nome_propriedade: txt }
									)
								});
							}}
						/>
						<View>
							<MapView
								ref="mapa"
								showsUserLocation={true}
								followsUserLocation={true}
								style={{ height: 320 }}
								{...confMapa}>
								{this.state.editando && (
									<Polygon
										key={this.state.editando.id}
										coordinates={
											this.state.editando.coordenadas
										}
										strokeColor="#000"
										fillColor="rgba(255,0,0,0.5)"
										strokeWidth={1}
									/>
								)}
							</MapView>
							<Button
								success
								style={{
									position: "absolute",
									top: 5,
									right: 5
								}}
								onPress={() => {
									var tmp = "";
									if (this.state.mapaAtivo)
										tmp = "md-checkmark";
									else tmp = "md-create";
									this.setState({
										mapaAtivo: !this.state.mapaAtivo,
										btnMapa: tmp
									});
								}}>
								<Icon name={this.state.btnMapa} />
							</Button>
						</View>
					</ScrollView>
				</View>

				<HideWithKeyboard>
					<View style={{ flexDirection: "row" }}>
						<Button
							rounded
							danger
							style={{ margin: 15 }}
							onPress={() => {
								if (this.state.posicao == 0)
									this.props.navigation.dispatch(
										NavigationActions.back()
									);
								else
									this.setState({
										posicao: --this.state.posicao
									});
							}}>
							<Icon name="arrow-back" />
						</Button>

						<Button
							rounded
							style={{
								margin: 15,
								flex: 1,
								backgroundColor: "#004238"
							}}
							onPress={() => {
								if (this.state.posicao == 2) {
									if (!this.state.editando) {
										mostraToast(
											"Defina a posição da propriedade no mapa"
										);
										return;
									}

									// console.warn(Object.assign(this.state.formulario,this.state.editando.coordenadas))

									Banco.local.put(
										Object.assign(
											{ _id: "dados" },
											this.state.formulario,
											{
												coordenadas: this.state.editando
													.coordenadas
											}
										),
										function(erro, doc) {
											if (erro) console.warn(erro);
										}
									);

									AsyncStorage.setItem("logado", 1);
									navigate("Perfil");
								}
								if (this.state.posicao == 1) {
									var tmp = new Object();
									tmp[0] = this._formulario2.getValores();
									this.setState({
										formulario: Object.assign(
											this.state.formulario,
											{
												cep: this.state.cep,
												uf: this.state.endereco.uf
											},
											{ propriedades: tmp }
										),
										posicao: ++this.state.posicao
									});
								}
								if (this.state.posicao == 0) {
									this.setState({
										formulario: Object.assign(
											this.state.formulario,
											this._formulario1.getValores()
										),
										posicao: ++this.state.posicao
									});
								}
							}}>
							<Text style={{ textAlign: "center", flex: 1 }}>
								Prosseguir
							</Text>
						</Button>
					</View>
				</HideWithKeyboard>
			</ImageBackground>
		);
	};
}

const labels = ["", ""];
const customStyles = {
	stepIndicatorSize: 30,
	currentStepIndicatorSize: 40,
	separatorStrokeWidth: 4,
	currentStepStrokeWidth: 5,
	separatorFinishedColor: "#353",
	separatorUnFinishedColor: "#353",
	stepIndicatorFinishedColor: "#131",
	stepIndicatorUnFinishedColor: "#353",
	stepIndicatorCurrentColor: "#cfc",
	stepIndicatorLabelFontSize: 15,
	currentStepIndicatorLabelFontSize: 15,
	stepIndicatorLabelCurrentColor: "#000000",
	stepIndicatorLabelFinishedColor: "#ffffff",
	stepIndicatorLabelUnFinishedColor: "#fff",
	labelColor: "#ffffff",
	labelSize: 12,
	currentStepLabelColor: "#333"
};

const styles = StyleSheet.create({
	imageContainer: {
		flex: 1,
		width: null,
		height: null
	},
	mapaFocado: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0
	}
});

export default cadastro;

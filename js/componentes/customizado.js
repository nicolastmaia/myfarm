import React from "react";
import {
	Platform,
	StatusBar,
	Dimensions,
	Image,
	ScrollView,
	Keyboard,
	Slider,
	FlatList,
	ListView
} from "react-native";
import {
	Item,
	View,
	Input,
	Icon,
	Button,
	Text,
	DatePicker,
	Toast
} from "native-base";

export function mostraToast(texto) {
	Toast.show({
		text: texto,
		position: "bottom",
		buttonText: "Ok"
	});
}

//TODO IMPLEMENTAR CHECAGEM DE MINCHARACTERS
export class Texto extends React.Component {
	render() {
		if (this.props.tipo != "data") {
			return (
				<Item
					style={{
						marginBottom: 12,
						flex: 1,
						minHeight: this.props.tamanho
					}}>
					<Icon
						active
						name={this.props.icone}
						style={{ color: this.props.cor }}
					/>
					<Input
						style={{
							height: this.props.tamanho,
							color: this.props.cor
						}}
						keyboardType={this.props.tipo}
						placeholder={this.props.placeholder}
						placeholderTextColor={this.props.corP}
						returnKeyType={"next"}
						secureTextEntry={this.props.senha}
						{...this.props}>
						{this.props.texto}
					</Input>
				</Item>
			);
		} else {
			return (
				<Item
					style={{
						marginBottom: 12,
						flex: 1,
						minHeight: this.props.tamanho
					}}>
					<DatePicker
						defaultDate={new Date()}
						maximumDate={new Date()}
						locale={"pt"}
						modalTransparent={false}
						animationType={"fade"}
						androidMode={"default"}
						placeHolderText={this.props.placeholder}
						textStyle={{ color: "#000" }}
						placeHolderTextStyle={{ color: this.props.corP }}
					/>
				</Item>
			);
		}
	}
}

export class Formulario extends React.Component {
	constructor(props) {
		super(props);

		let tmp = {};
		for (var i = 0; i < props.campos.length; i++) {
			tmp[props.campos[i].nome] = "";
		}

		tmp.campos = props.campos;
		this.state = tmp;
	}

	getValores = () => {
		var tmp = {};
		for (var i in this.state) {
			if (i != "campos") tmp[i] = this.state[i];
		}
		return tmp;
	};

	setValor = (chave, valor) => {
		this.setState({ [chave]: valor });
	};

	verificaRequisitos = () => {
		var erro = 0;
		for (var i in this.state.campos) {
			if (
				this.state.campos[i]["obrigatorio"] &&
				this.state[this.state.campos[i]["nome"]] == ""
			) {
				erro++;
				console.warn("Preencha todos os campos obrigatórios");
			}
		}
		return erro == 0;
	};

	render() {
		return this.state.campos.map(campo => (
			<Texto
				icone={campo.icone}
				tamanho={this.props.tamanho}
				placeholder={campo.placeholder}
				cor={this.props.cor}
				corP={this.props.corP}
				value={this.state[campo.nome]}
				tipo={campo.tipo}
				senha={campo.senha}
				texto={campo.valor}
				onChangeText={txt => this.setState({ [campo.nome]: txt })}
				onDateChange={txt => this.setState({ [campo.nome]: txt })}
			/>
		));
	}
}

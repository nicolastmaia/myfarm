import React from "react";
import { View } from "native-base";
import { ActivityIndicator, AsyncStorage } from "react-native";

export default class Carregando extends React.Component {
	constructor(props) {
		super(props);
		this.verificaLogin();
	}

	verificaLogin = async () => {
		const logado = await AsyncStorage.getItem("logado");
		this.props.navigation.navigate(logado == 1 ? "Logado" : "Deslogado");
	};

	render() {
		return (
			<View style={{ justifyContent: "center", textAlign: "center" }}>
				<ActivityIndicator size="large" color="#0f0" />
			</View>
		);
	}
}

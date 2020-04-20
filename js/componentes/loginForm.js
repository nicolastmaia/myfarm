import React from 'react';
import {
	View,
	Text,
	Button,
	Form,
	InputGroup,
	Icon,
	Input,
	Toast,
	Item,
	Label,
} from 'native-base';
import { StyleSheet, Alert } from 'react-native';

import { showDefaultToast } from './utils/showToast';

import { Banco } from '../instancias/conexao.js';
import { withNavigation } from 'react-navigation';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '' };
	}
	render() {
		const { navigate } = this.props.navigation;

		return (
			<View>
				<Item style={styles.input}>
					<Icon name="md-person" style={{ color: '#ffffff' }} />
					<Input
						style={{ color: '#ffffff' }}
						onChangeText={(user) => this.setState({ username: user })}
						placeholder="Usuário"
						placeholderTextColor="#919191"
						returnKeyType="next"
					/>
				</Item>
				<Item style={styles.input}>
					<Icon name="key" style={{ color: '#ffffff' }} />
					<Input
						style={{ color: '#ffffff' }}
						onChangeText={(pass) =>
							this.setState({
								password: pass,
							})
						}
						placeholder="Senha"
						placeholderTextColor="#919191"
						secureTextEntry={true}
						returnKeyType="go"
					/>
				</Item>
				<Button
					block
					style={{
						borderRadius: 5,
						backgroundColor: '#004238',
					}}
					onPress={async () => {
						await Banco.logIn(this.state.username, this.state.password)
							.then(() => navigate('Logado'))
							.catch((err) => {
								Alert.alert(err.toString());
							});
					}}
				>
					<Text>Entrar</Text>
				</Button>
			</View>
		);
	}
}

//estilos do componente
const styles = StyleSheet.create({
	input: {
		backgroundColor: 'rgba(0,0,0,.5)',
		borderColor: 'transparent',
		paddingHorizontal: 15,
		paddingVertical: 4,
		marginBottom: 20,
		borderRadius: 5,
	},
});

//withNavigation(comp) permite que um componente use as propriedades de navegação do pai sem necessariamente receber o this.props.navigation do pai
export default withNavigation(LoginForm);

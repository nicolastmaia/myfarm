import React from 'react';
import { Platform, Alert, StatusBar } from 'react-native';
import {
	ListItem,
	View,
	Icon,
	Button,
	Text,
	Container,
	List,
} from 'native-base';

// const analytics = require("./instancias/analytics");
import { Banco } from './instancias/conexao.js';
import CustomHeader from './componentes/customHeader';

//==========| Fim dos Imports |==========//

export default class Talhao extends React.Component {
	constructor(props) {
		super(props);
		this.state = { flag: false, itens: [] };
	}

	async componentDidMount() {
		const docs = await Banco.getByType('talhao');
		this.setState({ itens: docs });
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<Container
				style={{
					paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
				}}
			>
				<CustomHeader titulo="Cadastro de Talhão" />

				<List
					dataArray={this.state.itens}
					keyExtractor={(item) => item._id}
					renderRow={(item) => (
						<ListItem
							button
							onPress={() => {
								const novoItem = {
									...item,
									anterior: this,
									update: true,
								};
								navigate('CadTalhao', novoItem);
							}}
						>
							<View style={{ flexDirection: 'row' }}>
								<View
									style={{
										paddingVertical: 8,
										paddingHorizontal: 20,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Icon
										name="md-information-circle"
										style={{ color: '#4c7a34' }}
										onPress={() => {
											Alert.alert(JSON.stringify(item)); //TODO: formatar este alerta
										}}
									/>
								</View>
								<Text
									style={{
										flex: 1,
										paddingVertical: 8,
										marginLeft: 20,
									}}
								>
									{item.n_parcela}
								</Text>
								<View
									style={{
										paddingVertical: 8,
										paddingHorizontal: 15,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Icon
										name="md-trash"
										style={{ color: '#C62828' }}
										onPress={() => {
											Banco.delete(item);
										}}
									/>
								</View>
							</View>
						</ListItem>
					)}
					extraData={this.state.flag}
				/>

				<Button
					rounded
					style={{
						position: 'absolute',
						bottom: 15,
						right: 15,
						backgroundColor: '#4c7a34',
					}}
					onPress={() =>
						navigate('CadTalhao', {
							anterior: this,
							update: false,
						})
					}
				>
					<Icon name="md-add" />
				</Button>
			</Container>
		);
	}
}

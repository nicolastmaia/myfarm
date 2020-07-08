import React from 'react';
import { Platform, Alert, StatusBar, FlatList } from 'react-native';
import {
	ListItem,
	View,
	Icon,
	Button,
	Text,
	Content,
	Container,
} from 'native-base';

// const analytics = require("./instancias/analytics");
import { Banco } from '../instancias/conexao.js';
import CustomHeader from '../componentes/customHeader';

//==========| Fim dos Imports |==========//

export default class Aplicacao extends React.Component {
	constructor(props) {
		super(props);
		this.state = { flag: false, itens: [] };
	}

	/* componentWillMount() {
		analytics.trackScreenView("Cadastro de Aplicação");
	} */

	componentDidMount() {
		Banco.remoto.get('aplicacoes').then((response) => {
			this.setState({ itens: response.itens });
		});
	}

	// atualizaPagina = () => {
	//   let tmp = {};
	//   Banco.local
	//     .get("aplicações")
	//     .then(doc => {
	//       tmp = doc;
	//       this.setState({ aplicações: tmp["aplicações"] });
	//     })
	//     .catch(erro => {
	//       tmp = {
	//         _id: "aplicações",
	//         aplicações: []
	//       };
	//       this.setState({ aplicações: tmp["aplicações"] });
	//     });
	// };

	render() {
		const { navigate } = this.props.navigation;
		return (
			<Container
				style={{
					paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
				}}
			>
				<CustomHeader titulo="Cadastro de Aplicações" />

				<Content style={{ backgroundColor: '#fff' }}>
					<FlatList
						keyExtractor={(item) => item._id}
						data={this.state.itens}
						renderItem={({ item }) => (
							<ListItem
								style={{ marginLeft: 0 }}
								onPress={() => {
									navigate(
										'CadAplicacao',
										Object.assign(item, { anterior: this })
									);
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
												Alert.alert(JSON.stringify(item));
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
										{item.praga}
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
										/>
									</View>
								</View>
							</ListItem>
						)}
						extraData={this.state.flag}
					/>
				</Content>

				<Button
					rounded
					style={{
						position: 'absolute',
						bottom: 15,
						right: 15,
						backgroundColor: '#4c7a34',
					}}
					onPress={() => navigate('CadAplicacao', { anterior: this })}
				>
					<Icon name="md-add" />
				</Button>
			</Container>
		);
	}
}

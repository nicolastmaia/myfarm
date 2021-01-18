import React from 'react';
import { Text, View, Button, Icon, Toast } from 'native-base';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Share from 'react-native-share';
import { bancoRemoto, PouchDB, Banco } from '../instancias/conexao.js';
import { useNavigation } from '@react-navigation/native';

function Sanduiche() {
	const navigation = useNavigation();
	desloga = async () => {
		try {
			await Banco.remoto.logOut();
			await AsyncStorage.clear();
		} catch (error) {
			console.log(error.message);
		}
	};

	const compartilhamento = {
		title: 'MyFarm',
		message: 'aaaaaaaaaaa',
		url: 'http://google.com',
		subject: 'sssssssssss', //  for email
	};

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.InnerView1,
					{
						flex: 3,
						alignItems: 'center',
					},
				]}
			>
				<Icon name="person" style={{ fontSize: 100 }} />
			</View>

			<View style={styles.InnerView1}>
				<Button full transparent style={styles.botoes1}>
					<Text style={styles.textoBotao}>Alterar Dados</Text>
				</Button>
				<Button full transparent style={[styles.botoes1, styles.botaoMeio]}>
					<Text style={styles.textoBotao}>Cadastrar Propriedade</Text>
				</Button>
				<Button full transparent style={styles.botoes1}>
					<Text style={styles.textoBotao}>
						Alterar Dados de Propriedade
					</Text>
				</Button>
			</View>
			<View style={styles.InnerView2}>
				<Button
					style={{}}
					full
					transparent
					onPress={() => Share.open(compartilhamento)}
				>
					<Icon name="share" style={{ color: 'black' }} />
					<Text style={[styles.textoBotao, { marginLeft: -20 }]}>
						Compartilhar
					</Text>
				</Button>
				<Button
					style={{ marginTop: 10 }}
					full
					transparent
					onPress={() => navigation.navigate('Sobre')}
				>
					<Icon name="information-circle" style={{ color: 'black' }} />
					<Text style={[styles.textoBotao, { marginLeft: -20 }]}>
						Sobre
					</Text>
				</Button>
				<Button
					style={{ position: 'absolute', bottom: 0, left: 45 }}
					full
					transparent
					onPress={() => this.desloga()}
				>
					<Icon name="power" style={{ color: 'red' }} />
					<Text
						style={[styles.textoBotao, { marginLeft: -20, color: 'red' }]}
					>
						Desconectar
					</Text>
				</Button>
			</View>
		</View>
	);
}

//estilos da pagina
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		marginTop: 30,
		paddingBottom: 40,
	},
	InnerView1: {
		flex: 5,
		flexDirection: 'column',
		borderStyle: 'solid',
		borderBottomWidth: 2,
		width: 250,
		justifyContent: 'space-between',
	},
	InnerView2: {
		flex: 5,
		flexDirection: 'column',
		borderStyle: 'solid',
		width: 250,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: 20,
	},
	botoes1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	botaoMeio: {
		borderStyle: 'solid',
		borderColor: 'black',
		borderTopWidth: 1,
		borderBottomWidth: 1,
	},
	textoBotao: {
		textAlign: 'center',
		color: 'black',
	},
});

export default Sanduiche;

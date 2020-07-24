import React from 'react';
import {
	Platform,
	StatusBar,
	Dimensions,
	Image,
	ScrollView,
	Keyboard,
	Slider,
	FlatList,
	ListView,
} from 'react-native';
import {
	Item,
	Card,
	List,
	ListItem,
	View,
	Input,
	Icon,
	Button,
	Text,
	Toast,
	Header,
	Left,
	Right,
	Body,
	Content,
	Container,
	Form,
} from 'native-base';

// const analytics = require("./instancias/analytics");
import CustomHeader from '../componentes/customHeader';
import { Texto, Formulario } from '../componentes/customizado';
import { Banco } from '../instancias/conexao.js';

var form1 = [
	{ nome: 'praga', placeholder: 'Praga/doença (nome científico)' },
	{ nome: 'data_aplicacao', placeholder: 'Data de aplicação', tipo: 'data' },
	{ nome: 'produto', placeholder: 'Produto' },
	{
		nome: 'quantidade',
		placeholder: 'Quantidade (ml ou g)',
		tipo: 'numeric',
	},
	{ nome: 'preco', placeholder: 'Preço estimado (R$)', tipo: 'numeric' },
	{ nome: 'coadjuvante', placeholder: 'Produto (Coadjuvante)' },
	{
		nome: 'c_quantidade',
		placeholder: 'Quantidade (ml ou g) (Coadjuvante)',
		tipo: 'numeric',
	},
	{
		nome: 'volume',
		placeholder: 'Volume de calda (litros)',
		tipo: 'numeric',
	},
	{ nome: 'area_tratada', placeholder: 'Área tratada (ha)', tipo: 'numeric' },
	{ nome: 'justificativa', placeholder: 'Justificativa' },
];

export default class CadAplicacao extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { getParam, goBack } = this.props.navigation;
		return (
			<Container>
				{/* <CustomHeader titulo="Aplicações de Produtos" /> */}

				<Content style={{ backgroundColor: '#eee', padding: 15 }}>
					<Text style={{ fontSize: 18, marginLeft: 5 }}>APLICAÇÕES</Text>
					<Text
						style={{
							fontSize: 14,
							color: '#444',
							marginBottom: 8,
							marginLeft: 5,
						}}
					>
						Registro da aplicação de acaricidas, inseticidas e
						nematicidas.
					</Text>

					<Card style={{ borderRadius: 5, padding: 10 }}>
						<Form>
							<Formulario
								tamanho={45}
								campos={form1}
								cor="#000"
								corP="#555"
								ref={(tmp) => (this._formulario1 = tmp)}
							/>
						</Form>
					</Card>

					<Button
						block
						style={{
							marginTop: 15,
							marginBottom: 25,
							backgroundColor: '#4c7a34',
						}}
						onPress={() => {
							if (!this._formulario1.verificaRequisitos()) return;

							var tmp = this._formulario1.getValores();

							console.warn(tmp);

							Banco.store('aplicacao', tmp)
								.then((response) => {
									getParam('anterior').setState({
										itens: response.itens,
									});
								})
								.catch((err) => showDefaultToast(err));

							/* let data = new Date();
              registraHistorico("aplicacoes", {
                time:
                  data.getDate() +
                  "/" +
                  (data.getMonth() + 1) +
                  "/" +
                  data.getYear(),
                title: "Aplicação de " + tmp.produto,
                description: tmp.quantidade + " ml"
              }); */
							//MUDAR /\ DEPOIS! TODO

							goBack();
						}}
					>
						<Text>Cadastrar</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}

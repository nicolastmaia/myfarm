import React, { useEffect, useState } from 'react';
import { Card, Button, Text, Content, Container } from 'native-base';

// const analytics = require("./instancias/analytics");
import { Banco } from '../instancias/conexao.js';

import { Formulario } from '../componentes/customizado';

var form1 = [
	{ nome: 'data', placeholder: 'Data da colheita', tipo: 'data' },
	{ nome: 'quantidade', placeholder: 'Quantidade', tipo: 'numeric' },
	{ nome: 'peso', placeholder: 'Peso (kg)', tipo: 'numeric' },
	{ nome: 'producao', placeholder: 'Produção (kg/ha)', tipo: 'numeric' },
	{ nome: 'observacoes', placeholder: 'Observações' },
];

export default function CadColheita(props) {
	const [itens, setItens] = useState([]);
	const [formulario1, setFormulario1] = useState({});
	const { navigation } = props;
	const { params } = props.route;
	const { goBack } = navigation;

	useEffect(() => {
		// let data = new Date();
		// this._formulario1.setValor("data",data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear());
	});

	return (
		<Container>
			{/* <CustomHeader titulo="Cadastro de Colheitas" /> */}

			<Content style={{ backgroundColor: '#eee', padding: 15 }}>
				<Text style={{ fontSize: 18, marginLeft: 5 }}>COLHEITA</Text>
				<Text
					style={{
						fontSize: 14,
						color: '#444',
						marginBottom: 8,
						marginLeft: 5,
					}}
				>
					Registro da produção diária.
				</Text>

				<Card style={{ borderRadius: 5, padding: 10 }}>
					<Formulario tamanho={45} campos={form1} cor='#000' corP='#555' ref={(tmp) => setFormulario1(tmp)} />
				</Card>

				<Button
					block
					style={{
						marginTop: 15,
						marginBottom: 25,
						backgroundColor: '#4c7a34',
					}}
					onPress={() => {
						var tmp = formulario1.getValores();

						Banco.store('colheita', tmp)
							.then((response) => {
								params.anterior.setItens(response.itens);
							})
							.catch((err) => showDefaultToast(err));

						// let data = new Date();
						// Banco.registraHistorico("colheitas", {
						//   time:
						//     data.getDate() +
						//     "/" +
						//     (data.getMonth() + 1) +
						//     "/" +
						//     data.getYear(),
						//   title: tmp.quantidade + " tomates coletados",
						//   description: tmp.producao
						// });

						goBack();
					}}
				>
					<Text>Cadastrar</Text>
				</Button>
			</Content>
		</Container>
	);
}

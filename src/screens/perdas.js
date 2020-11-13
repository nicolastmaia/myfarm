import React, { useState } from 'react';
import { Slider, FlatList } from 'react-native';
import { List, ListItem, View, Icon, Button, Text, Content, Container } from 'native-base';
import ModalSelector from 'react-native-modal-selector';

// const analytics = require("./instancias/analytics");
import { Banco } from '../instancias/conexao.js';
import { secao, data } from '../constantes/perdas';

//==========| Fim dos Imports |==========//

var perdas = {};
Banco.local.get('perdas', function(erro, doc) {
	if (erro) {
		perdas = {
			_id: 'perdas',
		};
	} else perdas = doc;
});

const Item = (props) => {
	return (
		<ListItem {...props}>
			<Text style={{ flex: 1 }}>{props.texto}</Text>
			{props.children}
		</ListItem>
	);
};

const Registro = (props) => {
	return (
		<ListItem
			style={{
				marginLeft: 0,
				paddingRight: 0,
				paddingTop: 0,
				paddingBottom: 0,
			}}
		>
			<View style={{ flexDirection: 'row' }}>
				<View
					style={{
						paddingVertical: 10,
						paddingHorizontal: 15,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Icon name='md-information-circle' style={{ color: '#4c7a34' }} />
				</View>

				<View style={{ flex: 1, paddingVertical: 10, marginLeft: 20 }}>
					<Text style={{ flex: 1 }}>{props.nome}</Text>
					<View style={{ flexDirection: 'row', marginTop: 5 }}>
						<Text style={{ fontSize: 10 }}>{props.valor * 10}%</Text>
						<Slider
							style={{ width: 200 }}
							maximumValue={10}
							minimumValue={1}
							step={1}
							value={props.valor}
							onValueChange={(v) => {
								for (var tmp in perdas) {
									if (tmp == '_id' || tmp == '_rev') continue;
									for (var i = 0; i < perdas[tmp].length; i++) {
										if (perdas[tmp][i].nome == props.nome) {
											perdas[tmp][i].valor = v;
											props.handler();
										}
									}
								}
							}}
							onSlidingComplete={(v) => {
								Banco.local.put(perdas, function(erro, doc) {
									if (erro) return;
									perdas._rev = doc._rev;
								});
							}}
						/>
					</View>
				</View>

				<View
					style={{
						paddingVertical: 10,
						paddingHorizontal: 15,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Icon
						name='md-trash'
						style={{ color: '#C62828' }}
						onPress={() => {
							for (var tmp in perdas) {
								if (tmp == '_id' || tmp == '_rev') continue;
								for (var i = 0; i < perdas[tmp].length; i++) {
									if (perdas[tmp][i].id == props.id) {
										perdas[tmp].splice(i, 1);
										Banco.local.put(perdas, function(erro, doc) {
											if (erro) return;
											perdas._rev = doc._rev;
										});
										props.handler();
									}
								}
							}
						}}
					/>
				</View>
			</View>
		</ListItem>
	);
};

function Lista(props) {
	if (props.dados == undefined || props.dados.length == 0) return <Item texto='0 registros' />;
	return (
		<FlatList
			data={props.dados}
			renderItem={({ item }) => <Registro nome={item.nome} valor={item.valor} id={item.id} handler={props.atualiza} />}
			keyExtractor={(item) => item.id.toString()}
			extraData={props.flag}
		/>
	);
}

export default function Perdas(props) {
	const [flag, setFlag] = useState(false);

	const atualiza = (e) => {
		setFlag((prevState) => !prevState);
	};

	const insere = (val) => {
		if (perdas[secao[val.tipo]] == undefined) perdas[secao[val.tipo]] = [];
		for (var i = 0; i < perdas[secao[val.tipo]].length; i++) {
			if (perdas[secao[val.tipo]][i].id == val.key) {
				console.warn('JA EXISTE');
				return;
			}
		}
		if (perdas[secao[val.tipo]] == null || typeof perdas[secao[val.tipo]] == 'undefined') perdas[secao[val.tipo]] = [];
		perdas[secao[val.tipo]].push({
			id: val.key,
			nome: val.label,
			valor: 1,
			tipo: val.tipo,
		});
		setFlag((prevState) => !prevState);
		Banco.local.put(perdas, function(erro, doc) {
			if (erro) return;
			perdas._rev = doc._rev;
		});
	};

	return (
		<Container>
			{/* <CustomHeader titulo="Perdas" /> */}

			<Content style={{ backgroundColor: '#fff' }}>
				<List>
					<Item texto='Anomalias fisiológicas' itemDivider />
					<Lista dados={perdas.anomalias} atualiza={atualiza} flag={flag} />

					<Item texto='Doenças fúngicas' itemDivider />
					<Lista dados={perdas.fungicas} atualiza={atualiza} flag={flag} />

					<Item texto='Bacterioses' itemDivider />
					<Lista dados={perdas.bacterioses} atualiza={atualiza} flag={flag} />

					<Item texto='Viroses' itemDivider />
					<Lista dados={perdas.viroses} atualiza={atualiza} flag={flag} />

					<Item texto='Pragas' itemDivider />
					<Lista dados={perdas.pragas} atualiza={atualiza} flag={flag} />

					<Item texto='Climáticas' itemDivider />
					<Lista dados={perdas.climaticas} atualiza={atualiza} flag={flag} />
				</List>
			</Content>

			<Button
				rounded
				style={{
					position: 'absolute',
					bottom: 15,
					right: 15,
					backgroundColor: 'green',
				}}
			>
				<ModalSelector data={data} animationType='fade' onChange={(option) => insere(option)}>
					<Icon name='md-add' />
				</ModalSelector>
			</Button>
		</Container>
	);
}

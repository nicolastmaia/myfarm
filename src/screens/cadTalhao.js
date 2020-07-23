import React, { useState, useEffect, useContext } from 'react';
import { Platform, StatusBar } from 'react-native';
import {
	Card,
	Icon,
	Button,
	Text,
	Content,
	Container,
	Toast,
} from 'native-base';

import MapView, { Polygon } from 'react-native-maps';

// const analytics = require("./instancias/analytics");
import { showDefaultToast } from '../utils/showToast';
import { Banco } from '../instancias/conexao.js';
import CustomHeader from '../componentes/customHeader';

import { Formulario } from '../componentes/customizado';
import TalhaoContext from '../contexts/talhaoContext';

let id = 0;

var form1 = [
	{ nome: 'n_parcela', placeholder: 'Parcela nº', tipo: 'numeric' },
	{ nome: 'cultivares', placeholder: 'Cultivares' },
	{ nome: 'n_plantas', placeholder: 'Nº de plantas', tipo: 'numeric' },
	{ nome: 'data_plantio', placeholder: 'Data de plantio' },
	{ nome: 'rendimento', placeholder: 'Rendimento (kg/ha)', tipo: 'numeric' },
];

var form2 = [
	{ nome: 'area', placeholder: 'Área (ha)', tipo: 'numeric' },
	{ nome: 'densidade', placeholder: 'Densidade atual (ha)', tipo: 'numeric' },
	{
		nome: 'espaco',
		placeholder: 'Espaço (m) entre fileiras',
		tipo: 'numeric',
	},
	{ nome: 'irrigacao', placeholder: 'Irrigação' },
	{ nome: 'topografia', placeholder: 'Topografia' },
];

export default function CadTalhao(props) {
	const [coordenadas_propriedade, setCoordenadas] = useState(null);
	const [editando, setEditando] = useState(null);
	const [btnMapa, setBtnMapa] = useState('md-create');
	const [mapaAtivo, setMapaAtivo] = useState(true);
	const [formulario1, setFormulario1] = useState({});
	const [formulario2, setFormulario2] = useState({});
	const { route, navigation } = props;
	const { goBack } = navigation;
	const { talhoes } = useContext(TalhaoContext);
	var confMapa = {};

	useEffect(() => {
		fillFormValues();
		confMapa.scrollEnabled = mapaAtivo;
		if (!mapaAtivo) confMapa.onPress = (e) => mapaSelecionado(e);
	});

	function mapaSelecionado(e) {
		console.warn('T');
		if (!editando) {
			setEditando({ id: id++, coordenadas: [e.nativeEvent.coordinate] });
		} else {
			setEditando({
				...editando,
				id: id++,
				coordenadas: [...editando.coordenadas, e.nativeEvent.coordinate],
			});
		}
		// if(editando) console.warn(editando.coordenadas);
	}

	const fillFormValues = (talhao = '') => {
		if (route.params.update) {
			talhao = getTalhaoDataFromContext();
		}
		for (var i = 0; i < form1.length; i++) {
			form1[i]['valor'] = talhao[form1[i]['nome']];
		}

		for (var i = 0; i < form2.length; i++) {
			form2[i]['valor'] = talhao[form2[i]['nome']];
		}
	};

	const getTalhaoDataFromContext = () => {
		const talhao = talhoes.filter((talhao) => {
			return talhao._id == route.params._id;
		});
		return talhao[0];
	};

	const handleSave = () => {
		var tmp = {
			...formulario1.getValores(),
			...formulario2.getValores(),
		};

		if (route.params.update) {
			saveUpdatedData(tmp);
		} else {
			saveNewData(tmp);
		}

		goBack();
	};

	const saveNewData = async (tmp) => {
		await Banco.store('talhao', tmp);
	};

	//TOFIX: Por conta da condição de delete dessa função, ao editar um talhão, não é possível simplesmente apagar um campo de um talhão já salvo na memória.
	const saveUpdatedData = async (tmp) => {
		for (var i in tmp) {
			if (tmp[i] == '') {
				delete tmp[i];
			}
		}
		const dado = {
			...getTalhaoDataFromContext(),
			...tmp,
		};
		await Banco.update(dado._id, dado);
	};

	return (
		<Container
			style={{
				paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
			}}
		>
			{/* Header */}
			{route.params.update ? (
				<CustomHeader titulo="Edição de Talhão" />
			) : (
				<CustomHeader titulo="Cadastro de Talhão" />
			)}
			{/* Body */}
			<Content style={{ backgroundColor: '#eee', padding: 15 }}>
				{/* Informações */}
				<Text style={{ fontSize: 18, marginLeft: 5 }}>INFORMAÇÕES</Text>
				<Text
					style={{
						fontSize: 14,
						color: '#444',
						marginBottom: 8,
						marginLeft: 5,
					}}
				>
					Informações sobre o talhão
				</Text>
				<Card style={{ borderRadius: 5, padding: 10 }}>
					<Formulario
						keyExtractor={(item) => {
							item.key;
						}}
						tamanho={45}
						campos={form1}
						cor="#000"
						corP="#555"
						ref={(tmp) => setFormulario1(tmp)}
					/>
				</Card>

				{/* Plantação */}
				<Text style={{ fontSize: 18, marginLeft: 5, marginTop: 20 }}>
					PLANTAÇÃO
				</Text>
				<Text
					style={{
						fontSize: 14,
						color: '#444',
						marginBottom: 8,
						marginLeft: 5,
					}}
				>
					Informações sobre a plantação
				</Text>
				<Card style={{ borderRadius: 5, padding: 10 }}>
					<Formulario
						keyExtractor={(item) => {
							item.key;
						}}
						tamanho={45}
						campos={form2}
						cor="#000"
						corP="#555"
						ref={(tmp) => setFormulario2(tmp)}
					/>
				</Card>

				{/* Mapa */}
				<Text style={{ fontSize: 18, marginLeft: 5, marginTop: 20 }}>
					MAPA
				</Text>
				<Text
					style={{
						fontSize: 14,
						color: '#444',
						marginBottom: 8,
						marginLeft: 5,
					}}
				>
					Informe a posição do talhão no mapa
				</Text>
				<Card style={{ borderRadius: 5 }}>
					<MapView
						followsUserLocation={true}
						style={{ height: 300 }}
						{...confMapa}
					>
						{coordenadas_propriedade && (
							<Polygon
								coordinates={coordenadas_propriedade}
								strokeColor="#000"
								fillColor="rgba(255,0,0,0.5)"
								strokeWidth={1}
								tappable={false}
							/>
						)}
						{editando && (
							<Polygon
								coordinates={editando.coordenadas}
								strokeColor="#000"
								fillColor="rgba(255,0,0,0.5)"
								strokeWidth={1}
							/>
						)}
					</MapView>
					<Button
						success
						style={{ position: 'absolute', top: 5, right: 5 }}
						onPress={() => {
							var tmp = '';
							if (mapaAtivo) tmp = 'md-checkmark';
							else tmp = 'md-create';
							setMapaAtivo(!mapaAtivo);
							setBtnMapa(tmp);
						}}
					>
						<Icon name={btnMapa} />
					</Button>
				</Card>

				{/* Submit Button */}
				<Button
					block
					style={{
						marginTop: 15,
						marginBottom: 25,
						backgroundColor: '#4c7a34',
					}}
					onPress={handleSave}
				>
					{route.params.update ? (
						<Text>Atualizar</Text>
					) : (
						<Text>Cadastrar</Text>
					)}
				</Button>
			</Content>
			{/* Fim do Body */}
		</Container>
	);
}

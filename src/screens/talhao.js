import React, { useState, useEffect, useContext } from 'react';
import { ListItem, View, Icon, Button, Text, Container, List } from 'native-base';

// const analytics = require("./instancias/analytics");
import { Banco } from '../instancias/conexao.js';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../componentes/customModal.js';

//==========| Fim dos Imports |==========//

export default function Talhao(props) {
	const [flag, setFlag] = useState(false);
	const [modalVIsible, setModalVisible] = useState(false);
	const [activeItem, setActiveItem] = useState({});
	const { navigate } = useNavigation();
	const [talhoes, setTalhoes] = useState([]);

	const toggleModal = () => {
		setModalVisible(!modalVIsible);
	};
	const fetchTalhoesFromDatabase = async () => {
		tmpTalhoes = await Banco.getByType('talhao');
		setTalhoes(tmpTalhoes);
	};

	useEffect(() => {
		try {
			fetchTalhoesFromDatabase();
		} catch (error) {
			console.log(error.message);
		}

		let changes = Banco.local
			.changes({
				live: true,
				include_docs: true,
				filter: function(doc) {
					return doc.type === 'talhao';
				},
			})
			.on('change', (info) => {
				setTalhoes((prevState) => {
					let newState = prevState.filter((current) => {
						return current._id != info.doc._id;
					});
					newState = [...newState, info.doc];
					return newState;
				});
			})
			.on('complete', () => console.log('unsubscribed from database changes'))
			.on('error', () => console.log('deu erro aqui'));

		return () => {
			changes.cancel();
		};
	}, []);

	return (
		<Container>
			<CustomModal isVisible={modalVIsible} activeItem={activeItem} toggleModal={toggleModal} />
			<List
				dataArray={talhoes}
				keyExtractor={(item) => item._id}
				renderRow={(item) => (
					<ListItem
						button
						onPress={() => {
							const novoItem = {
								itemId: item._id,
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
									name='md-information-circle'
									style={{ color: '#4c7a34' }}
									onPress={() => {
										setActiveItem(item);
										setModalVisible(true);
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
									name='md-trash'
									style={{ color: '#C62828' }}
									onPress={async () => {
										const deletedTalhao = await Banco.delete(item);
										const newTalhoes = talhoes.filter((talhao) => {
											return talhao._id != deletedTalhao.id;
										});
										setTalhoes(newTalhoes);
									}}
								/>
							</View>
						</View>
					</ListItem>
				)}
				extraData={flag}
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
						update: false,
					})
				}
			>
				<Icon name='md-add' />
			</Button>
		</Container>
	);
}

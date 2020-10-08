import React, { useEffect, useState } from 'react';
import { Container, Content, Button, Icon, ListItem, View, Text, List } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import CustomModal from '../componentes/customModal.js';
import { Banco } from '../instancias/conexao.js';

export default function Colheita() {
	const [flag, setFlag] = useState(false);
	const [modalVIsible, setModalVisible] = useState(false);
	const [colheitas, setColheitas] = useState([]);
	const [activeItem, setActiveItem] = useState({});
	const { navigate } = useNavigation();

	const toggleModal = () => {
		setModalVisible(!modalVIsible);
	};

	const fetchColheitasFromDatabase = async () => {
		tmpColheitas = await Banco.getByType('colheita');
		setColheitas(tmpColheitas);
	};

	useEffect(() => {
		try {
			fetchColheitasFromDatabase();
		} catch (error) {
			console.log(error.message);
		}

		let changes = Banco.local
			.changes({
				live: true,
				include_docs: true,
				filter: function(doc) {
					return doc.type === 'colheita';
				},
			})
			.on('change', (info) => {
				setColheitas((prevState) => {
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
			<Content>
				<List
					dataArray={colheitas}
					keyExtractor={(item) => item._id}
					renderRow={({ item }) => (
						<ListItem
							style={{ marginLeft: 0 }}
							onPress={() => {
								const novoItem = {
									itemId: item._id,
									update: true,
								};
								navigate('CadColheitas', novoItem);
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
									{item.quantidade}
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
											const deletedColheita = await Banco.delete(item);
											const newColheitas = colheitas.filter((colheita) => {
												return colheita._id != deletedColheita.id;
											});
											setColheitas(newColheitas);
										}}
									/>
								</View>
							</View>
						</ListItem>
					)}
					extraData={flag}
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
				onPress={() =>
					navigate('CadColheita', {
						update: false,
					})
				}
			>
				<Icon name='md-add' />
			</Button>
		</Container>
	);
}

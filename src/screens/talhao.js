import React, { useState, useEffect, useContext } from 'react';
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
import { Banco } from '../instancias/conexao.js';
import CustomHeader from '../componentes/customHeader';
import { useNavigation } from '@react-navigation/native';
import TalhaoContext from '../contexts/talhaoContext';
import CustomModal from '../componentes/customModal.js';

//==========| Fim dos Imports |==========//

export default function Talhao(props) {
	const [flag, setFlag] = useState(false);
	const [modalVIsible, setModalVisible] = useState(false);
	const [activeItem, setActiveItem] = useState({});
	const { navigate } = useNavigation();
	const { talhoes } = useContext(TalhaoContext);

	const toggleModal = () => {
		setModalVisible(!modalVIsible);
	};

	return (
		<Container
			style={{
				paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
			}}
		>
			<CustomHeader titulo="Cadastro de Talhão" />

			<CustomModal
				isVisible={modalVIsible}
				activeItem={activeItem}
				toggleModal={toggleModal}
			/>
			<List
				dataArray={talhoes}
				keyExtractor={(item) => item._id}
				renderRow={(item) => (
					<ListItem
						button
						onPress={() => {
							const novoItem = {
								...item,
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
				<Icon name="md-add" />
			</Button>
		</Container>
	);
}

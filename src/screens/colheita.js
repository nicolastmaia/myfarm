import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { Container, Content, Button, Icon, ListItem, View, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Banco } from '../instancias/conexao.js';

export default function Colheita() {
	const [flag, setFlag] = useState(false);
	const [itens, setItens] = useState([]);
	const { navigate } = useNavigation();

	useEffect(() => {
		Banco.remoto.get('colheitas').then((response) => {
			setItens(response.itens);
		});
	});

	return (
		<Container>
			{/* <CustomHeader titulo="Cadastro de Colheita" /> */}

			<Content>
				<FlatList
					keyExtractor={(item) => item._id}
					data={itens}
					renderItem={({ item }) => (
						<ListItem
							style={{ marginLeft: 0 }}
							onPress={() => {
								navigate('CadColheitas');
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
									<Icon name='md-trash' style={{ color: '#C62828' }} />
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
				onPress={() => navigate('CadColheita')}
			>
				<Icon name='md-add' />
			</Button>
		</Container>
	);
}

import React from 'react';
import { Icon, Button, Header, Left, Right, Text, Body } from 'native-base';
import { useNavigation } from '@react-navigation/native';

function CustomHeader({ titulo }) {
	const { goBack } = useNavigation();
	return (
		<Header
			androidStatusBarColor="#4c7a34"
			style={{ backgroundColor: '#4c7a34' }}
		>
			<Left>
				<Button large transparent>
					<Icon
						style={{
							color: Platform.OS === 'ios' ? 'black' : 'white',
							fontSize: 40,
						}}
						name="arrow-back"
						onPress={() => {
							goBack();
						}}
					/>
				</Button>
			</Left>
			<Body>
				<Text
					style={{
						color: Platform.OS === 'ios' ? 'black' : 'white',
						width: 200,
						fontSize: 20,
					}}
				>
					{titulo}
				</Text>
			</Body>
			<Right />
		</Header>
	);
}

//withNavigation(comp) permite que um componente use as propriedades de navegação do pai sem necessariamente receber o this.props.navigation do pai
export default CustomHeader;

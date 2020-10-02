import React, { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { View, Text, Button } from 'native-base';

export default function CustomModal({ isVisible, activeItem, toggleModal }) {
	const renderedItem = Object.keys(activeItem).map((key) => {
		return (
			<Text>
				{key}: {activeItem[key]}
			</Text>
		);
	});

	return (
		<Modal animationType="slide" transparent={true} visible={isVisible}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					{renderedItem}
					<Button style={{ ...styles.openButton }} onPress={toggleModal}>
						<Text>Fechar</Text>
					</Button>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 460,
		marginTop: 22,
	},
	openButton: {
		backgroundColor: '#4c7a34',
		padding: 10,
		elevation: 2,
		marginTop: 20,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});

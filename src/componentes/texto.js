import React from 'react';
import { StyleSheet } from 'react-native';
import { InputGroup, Icon, Input } from 'native-base';

export default class Texto extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const icone = this.props.icone;
		const placeholder = this.props.placeholder;

		return (
			<InputGroup rounded style={styles.input}>
				<Icon name={icone} style={{ color: '#ffffff' }} />
				<Input
					style={{ color: '#ffffff' }}
					placeholder={placeholder}
					placeholderTextColor="#ffffff"
					onChangeText={(text) => this.setState({ text })}
				/>
			</InputGroup>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: 'rgba(0,0,0,.5)',
		borderColor: 'transparent',
		paddingHorizontal: 15,
		paddingVertical: 4,
		marginBottom: 20,
	},
});

import React from 'react';
import { StatusBar } from 'react-native';
import { Root } from 'native-base';

// import Notificacoes from "./instancias/notificacoes";
import Navegador from '../componentes/navigators';
// const analytics = require("./instancias/analytics");

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	/* componentWillMount() {
    analytics.setClient("35009a79-1a05-49d7-b876-2b884d0f825b");
  } */

	render() {
		return (
			<Root>
				<StatusBar
					translucent
					backgroundColor="transparent"
					barStyle="light-content"
				/>
				{/* <Notificacoes /> */}
				<Navegador />
			</Root>
		);
	}
}

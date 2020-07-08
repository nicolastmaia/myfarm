import { Dimensions } from 'react-native';
import {
	createDrawerNavigator,
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer,
} from 'react-navigation';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

//=========| COMPONENTES |=========//
import Carregando from '../screens/carregando';
import Sanduiche from './sanduiche';
//===========================//

//=========| TELAS |=========//
import Principal from '../screens/principal';
import Sobre from '../screens/sobre';
import CadUsuario from '../screens/cadUsuario';
import cadPropriedadeNova from '../screens/cadPropriedadeNova';
import Talhao from '../screens/talhao';
import CadTalhao from '../screens/cadTalhao';
import CadAplicacao from '../screens/cadAplicacao';
import CadColheita from '../screens/cadColheita';
import Colheita from '../screens/colheita';
import Aplicacao from '../screens/aplicacao';
import Camera from '../screens/camera.js';
import Perdas from '../screens/perdas';
import Galeria from '../screens/galeria';
import Home from '../screens/home';
import Cotacao from '../screens/cotacao';
//===========================//

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH * 0.83,
};

const Tab = createAppContainer(
	createMaterialBottomTabNavigator(
		{
			Galeria,
			Início: Home,
			Cotação: Cotacao,
		},
		{
			initialRouteName: 'Início',
			backBehavior: 'initialRoute',
			shifting: true,
			activeColor: '#ffffff',
			barStyle: {
				backgroundColor: '#4c7a34',
			},
		}
	)
);

const Stack = createAppContainer(
	createStackNavigator(
		{
			PageInicial: Tab,
			Camera,
			Aplicacao,
			Perdas,
			Talhao,
			Colheita,
			Sobre,
			CadAplicacao,
			CadTalhao,
			CadColheita,
			CadUsuario,
			CadPropriedadeNova: cadPropriedadeNova,
		},
		{ headerMode: 'none' }
	)
);

const Deslogado = createAppContainer(
	createStackNavigator(
		{
			Inicio: Principal,
			Sobre,
			CadUsuario,
		},
		{ headerMode: 'none' }
	)
);

const Logado = createAppContainer(
	createDrawerNavigator(
		{
			'Página Incial': Stack,
		},
		{
			DrawerConfig,
			contentComponent: Sanduiche,
			headerMode: 'none',
		}
	)
);

const Navegador = createAppContainer(
	createSwitchNavigator(
		{
			Carregando,
			Deslogado,
			Logado,
		},
		{ initialRouteName: 'Carregando', headerMode: 'none' }
	)
);

export default Navegador;

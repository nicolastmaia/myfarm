import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Banco } from '../instancias/conexao';
//=========| COMPONENTES |=========//
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
import CustomDrawerContent from './CustomDrawerContent';
import { TalhaoProvider } from '../contexts/talhaoContext';
import AuthContext from '../contexts/AuthContext';
//===========================//

const LogadoDrawer = createDrawerNavigator();
const LogadoTab = createBottomTabNavigator();
const LogadoStack = createStackNavigator();
const DeslogadoStack = createStackNavigator();

export default function Routes() {
	const { isSignedIn } = useContext(AuthContext);
	return isSignedIn ? <LogadoDrawerNavigator /> : <DeslogadoStackNavigator />;
}

function LogadoDrawerNavigator() {
	return (
		<LogadoDrawer.Navigator
			initialRouteName="Home"
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<LogadoDrawer.Screen name="Home" component={LogadoStackNavigator} />
		</LogadoDrawer.Navigator>
	);
}

function LogadoTabNavigator() {
	return (
		<LogadoTab.Navigator>
			<LogadoTab.Screen name="Galeria" component={Galeria} />
			<LogadoTab.Screen name="Início" component={Home} />
			<LogadoTab.Screen name="Cotação" component={Cotacao} />
		</LogadoTab.Navigator>
	);
}

function LogadoStackNavigator() {
	return (
		<TalhaoProvider>
			<LogadoStack.Navigator>
				<LogadoStack.Screen
					name="PageInicial"
					component={LogadoTabNavigator}
				/>
				<LogadoStack.Screen name="Camera" component={Camera} />
				<LogadoStack.Screen name="Aplicacao" component={Aplicacao} />
				<LogadoStack.Screen name="Perdas" component={Perdas} />
				<LogadoStack.Screen name="Colheita" component={Colheita} />
				<LogadoStack.Screen name="Sobre" component={Sobre} />
				<LogadoStack.Screen name="CadAplicacao" component={CadAplicacao} />
				<LogadoStack.Screen name="Talhao" component={Talhao} />
				<LogadoStack.Screen name="CadTalhao" component={CadTalhao} />
				<LogadoStack.Screen name="CadColheita" component={CadColheita} />
				<LogadoStack.Screen name="CadUsuario" component={CadUsuario} />
				<LogadoStack.Screen
					name="CadPropriedadeNova"
					component={cadPropriedadeNova}
				/>
			</LogadoStack.Navigator>
		</TalhaoProvider>
	);
}

function DeslogadoStackNavigator() {
	return (
		<DeslogadoStack.Navigator>
			<DeslogadoStack.Screen name="Inicio" component={Principal} />
			<DeslogadoStack.Screen name="Sobre" component={Sobre} />
			<DeslogadoStack.Screen name="CadUsuario" component={CadUsuario} />
		</DeslogadoStack.Navigator>
	);
}

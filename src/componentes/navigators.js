import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
const LogadoTab = createMaterialBottomTabNavigator();
const LogadoStack = createStackNavigator();
const DeslogadoStack = createStackNavigator();

export default function Routes() {
	const { isSignedIn } = useContext(AuthContext);
	return isSignedIn ? <LogadoDrawerNavigator /> : <DeslogadoStackNavigator />;
}

function LogadoDrawerNavigator() {
	return (
		<LogadoDrawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<LogadoDrawer.Screen
				name="LoggedInStack"
				component={LogadoStackNavigator}
			/>
		</LogadoDrawer.Navigator>
	);
}

function LogadoTabNavigator() {
	return (
		<LogadoTab.Navigator
			initialRouteName="Main"
			activeColor="#ffffff"
			inactiveColor="#000000"
			shifting={true}
			backBehavior="initialRoute"
			labeled={false}
			barStyle={{
				backgroundColor: '#4c7a34',
			}}
		>
			<LogadoTab.Screen
				name="Galeria"
				component={Galeria}
				options={{
					title: 'Galeria',
					tabBarIcon: ({ color }) => (
						<Icon
							name="image-multiple"
							color={color}
							size={30}
							style={{ margin: -3 }}
						/>
					),
				}}
			/>
			<LogadoTab.Screen
				name="Main"
				component={Home}
				options={{
					title: 'Páginal Principal',
					tabBarIcon: ({ color }) => (
						<Icon
							name="barn"
							color={color}
							size={30}
							style={{ margin: -3 }}
						/>
					),
				}}
			/>
			<LogadoTab.Screen
				name="Cotacao"
				component={Cotacao}
				options={{
					title: 'Cotação',
					tabBarIcon: ({ color }) => (
						<Icon
							name="currency-usd"
							color={color}
							size={30}
							style={{ margin: -3 }}
						/>
					),
				}}
			/>
		</LogadoTab.Navigator>
	);
}

function LogadoStackNavigator() {
	return (
		<TalhaoProvider>
			<LogadoStack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: '#4c7a34',
						height: 90,
					},
					headerTintColor: '#ffffff',
					headerPressColorAndroid: '#ffffff',
				}}
			>
				<LogadoStack.Screen
					name="LoggedIn"
					component={LogadoTabNavigator}
					options={{ headerShown: false }}
				/>
				<LogadoStack.Screen
					name="Camera"
					component={Camera}
					options={{ headerShown: false }}
				/>
				<LogadoStack.Screen
					name="Aplicacao"
					component={Aplicacao}
					options={{ headerTitle: 'Aplicações' }}
				/>
				<LogadoStack.Screen
					name="Perdas"
					component={Perdas}
					options={{ headerTitle: 'Perdas' }}
				/>
				<LogadoStack.Screen
					name="Colheita"
					component={Colheita}
					options={{ headerTitle: 'Colheitas' }}
				/>
				<LogadoStack.Screen
					name="About"
					component={Sobre}
					options={{ headerTitle: 'Sobre' }}
				/>
				<LogadoStack.Screen
					name="CadAplicacao"
					component={CadAplicacao}
					options={{ headerTitle: 'Cadastro de Aplicações' }}
				/>
				<LogadoStack.Screen
					name="Talhao"
					component={Talhao}
					options={{ headerTitle: 'Talhoes' }}
				/>
				<LogadoStack.Screen
					name="CadTalhao"
					component={CadTalhao}
					options={{ headerTitle: 'Cadastro de Talhôes' }}
				/>
				<LogadoStack.Screen
					name="CadColheita"
					component={CadColheita}
					options={{ headerTitle: 'Cadastro de Colheitas' }}
				/>
				<LogadoStack.Screen
					name="CadUsuario"
					component={CadUsuario}
					options={{ headerTitle: 'Cadastro de Usuários' }}
				/>
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
			<DeslogadoStack.Screen
				name="LoginPage"
				component={Principal}
				options={{ headerShown: false }}
			/>
			<DeslogadoStack.Screen name="About" component={Sobre} />
			<DeslogadoStack.Screen name="SignUpPage" component={CadUsuario} />
		</DeslogadoStack.Navigator>
	);
}

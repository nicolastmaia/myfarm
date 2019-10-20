import React from "react";
import { Dimensions } from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

//=========| COMPONENTES |=========//
import Carregando from "./carregando";
import Sanduiche from "./sanduiche";
//===========================//

//=========| TELAS |=========//
import Principal from "../principal";
import Sobre from "../sobre";
import CadUsuario from "../cadUsuario";
import cadPropriedadeNova from "../cadPropriedadeNova";
import Talhao from "../talhao";
import CadTalhao from "../cadTalhao";
import CadAplicacao from "../cadAplicacao";
import CadColheita from "../cadColheita";
import Camera from "./camera.js";
import Perdas from "../perdas";
import Galeria from "./galeria";
import Home from "./home";
import Cotacao from "./cotacao";
//===========================//

const WIDTH = Dimensions.get("window").width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83
};

const Tab = createAppContainer(
  createBottomTabNavigator(
    {
      Galeria,
      Início: Home,
      Cotação: Cotacao
    },
    {
      initialRouteName: "Início",
      tabBarOptions: {
        activeTintColor: "#ffffff",
        activeBackgroundColor: "#4c7a34",
        inactiveTintColor: "black",
        inactiveBackgroundColor: "#629c44",
        style: { height: 50 }
      },
      headerMode: "none"
    }
  )
);

const Stack = createAppContainer(
  createStackNavigator(
    {
      PageInicial: Tab,
      Camera: Camera,
      Perdas: Perdas,
      Talhao: Talhao,
      Sobre: Sobre,
      CadTalhao: CadTalhao,
      CadAplicacao: CadAplicacao,
      CadColheita: CadColheita,
      CadUsuario: CadUsuario,
      CadPropriedadeNova: cadPropriedadeNova
    },
    { headerMode: "none" }
  )
);

const Deslogado = createAppContainer(
  createStackNavigator(
    {
      Inicio: Principal,
      Sobre: Sobre,
      CadUsuario: CadUsuario
    },
    { headerMode: "none" }
  )
);

const Logado = createAppContainer(
  createDrawerNavigator(
    {
      "Página Incial": Stack
    },
    {
      DrawerConfig,
      contentComponent: Sanduiche,
      headerMode: "none"
    }
  )
);

const Navegador = createAppContainer(
  createSwitchNavigator(
    {
      Carregando: Carregando,
      Deslogado: Deslogado,
      Logado: Logado
    },
    { initialRouteName: "Carregando", headerMode: "none" }
  )
);

export default Navegador;

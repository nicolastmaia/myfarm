import { Dimensions } from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

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
import Colheita from "../colheita";
import Aplicacao from "../aplicacao";
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
  createMaterialBottomTabNavigator(
    {
      Galeria,
      Início: Home,
      Cotação: Cotacao
    },
    {
      initialRouteName: "Início",
      backBehavior: "initialRoute",
      shifting: true,
      activeColor: "#ffffff",
      barStyle: {
        backgroundColor: "#4c7a34"
      }
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
      CadPropriedadeNova: cadPropriedadeNova
    },
    { headerMode: "none" }
  )
);

const Deslogado = createAppContainer(
  createStackNavigator(
    {
      Inicio: Principal,
      Sobre,
      CadUsuario
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
      Carregando,
      Deslogado,
      Logado
    },
    { initialRouteName: "Carregando", headerMode: "none" }
  )
);

export default Navegador;

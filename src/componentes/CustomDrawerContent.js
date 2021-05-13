import React, { useContext } from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Banco } from '../instancias/conexao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import AuthContext from '../contexts/AuthContext';

export default function CustomDrawerContent(props) {
  const { deslogar } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label='Sair' onPress={deslogar} />
    </DrawerContentScrollView>
  );
}

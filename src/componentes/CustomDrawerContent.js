import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function CustomDrawerContent(props) {
  const { signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label='Sair' onPress={signOut} />
    </DrawerContentScrollView>
  );
}

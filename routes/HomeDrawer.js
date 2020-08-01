import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import LoginStack from './LoginStack';
import auth from '@react-native-firebase/auth';
import {Button, View, Text} from 'react-native';
import Home from '../screens/Home';
import DrawerScreen from './DrawerScreen';

const Drawer = createDrawerNavigator();

const HomeDrawer = ({loggedUser}) => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerScreen}
      drawerStyle={{backgroundColor: '#2F4F4F', padding: 4}}
      screenOptions={{gestureEnabled: false}}>
      {/* {logged ? (
        <Drawer.Screen name="HomeStack" component={HomeStack}  />
      ) : (
        <Drawer.Screen name="LoginStack" component={LoginStack} />
      )} */}
      <Drawer.Screen name="LoginStack" component={LoginStack} />
      <Drawer.Screen name="HomeStack" component={HomeStack} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;

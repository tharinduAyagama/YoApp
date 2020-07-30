import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import LoginStack from './LoginStack';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="LoginStack" component={LoginStack} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;

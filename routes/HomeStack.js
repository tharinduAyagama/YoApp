import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Chat from '../screens/Chat';
import Home from '../screens/Home';
import AddFriend from '../screens/AddFriend';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddFriend" component={AddFriend} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default HomeStack;

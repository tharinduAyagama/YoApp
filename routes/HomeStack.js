import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from '../screens/Chat';
import Home from '../screens/Home';
import AddFriend from '../screens/AddFriend';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddFriend"
        component={AddFriend}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

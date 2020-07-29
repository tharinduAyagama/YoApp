import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Register from '../screens/Register';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;

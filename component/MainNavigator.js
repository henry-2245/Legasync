// MainNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from '../component/TabNavigator';
import Home from '../screens/Home';
import LoginSignup from '../screens/LoginSignup';
const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen name="LoginSignup" component={LoginSignup} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Home" component={Home} />
      {/* Add other screens if needed */}
    </Stack.Navigator>
  );
};

export default MainNavigator;

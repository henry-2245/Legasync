import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator from './StackNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <StackNavigator/>
      
    </NavigationContainer>
  );
}


// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import WisdomDetail from '../screens/WisdomDetail';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerShown: false, // Remove the top bar for Home
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: false,
        }}
      >
        {({ navigation, route }) => (
          <Profile isYourOwnProfile={true} /* other props if needed */ />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

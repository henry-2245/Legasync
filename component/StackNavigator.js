// StackNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSignup from '../screens/LoginSignup';
import TabNavigator from './TabNavigator';
import WisdomDetail from '../screens/WisdomDetail';
import Profile from '../screens/Profile';
import FollowerPopup from './FollowerPopup';
import FollowingPopup from './FollowingPopup';
import EditProfile from '../screens/EditProfile';
import NewAddWisdom from '../screens/NewAddWisdom';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LoginSignup" component={LoginSignup} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="WisdomDetail" component={WisdomDetail} />
      <Stack.Screen name= "EditProfile" component={EditProfile}/>
      <Stack.Screen name="OtherProfile" component={Profile} />
      <Stack.Screen name="FollowingPopup" component={FollowingPopup} />
      <Stack.Screen name="FollowerPopup" component={FollowerPopup} />
      <Stack.Screen name="NewAddWisdom" component={NewAddWisdom} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

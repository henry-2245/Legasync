import React from "react"
import { View, Text } from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from "./screens/Home";
import LoginSignup from "./screens/LoginSignup";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false, headerTitle: null}}>
            <Stack.Group>
               <Stack.Screen name= "LoginSignup" component={LoginSignup}/>
                <Stack.Screen name= "Home" component={Home}/>
                <Stack.Screen name= "Profile" component={Profile}/>
                
            </Stack.Group>
        </Stack.Navigator>
    );
};
export default StackNavigator;
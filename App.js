import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StackNavigator from "./component/StackNavigator";
import MainNavigator from "./component/MainNavigator";
import LoginSignup from "./screens/LoginSignup";
import TabNavigator from "./component/TabNavigator";
import { CopilotProvider } from "react-native-copilot";

const Stack = createStackNavigator();

export default function App() {
  return (
    <CopilotProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </CopilotProvider>
  );
}

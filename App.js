import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import MainTab from "./navigations/MainTab";

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/> */}
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Detail" component={Detail} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>

  );
}

AppRegistry.registerComponent(appName, () => App);
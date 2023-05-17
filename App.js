import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { Provider as PaperProvider } from 'react-native-paper';
import ViewNote from './src/screens/ViewNote';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ViewNote" component={ViewNote} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({})
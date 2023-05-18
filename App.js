import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { Provider as PaperProvider } from 'react-native-paper';
import ViewNote from './src/screens/ViewNote';
import AddNote from './src/screens/AddNote';

const Stack = createNativeStackNavigator();

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home">
            {(props) => <Home {...props} refresh={refresh} setRefresh={setRefresh} />}
          </Stack.Screen>
          <Stack.Screen name="ViewNote" component={ViewNote} />
          <Stack.Screen name="AddNote">
            {(props) => <AddNote {...props} setRefresh={setRefresh} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import { Provider as PaperProvider } from 'react-native-paper';
import ViewNote from './src/screens/ViewNote';
import AddNote from './src/screens/AddNote';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './src/components/Loader';

const Stack = createNativeStackNavigator();

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [initialRoute, setInitialRoute] = useState('');

  useEffect(() => {
    authUser();
  }, [])

  const authUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('nUdata');
      if (userData) {
        const userDataObject = JSON.parse(userData);
        if (userDataObject.isLogged) {
          setInitialRoute('Home');
        } else {
          setInitialRoute('SignIn');
        }
      } else {
        setInitialRoute('SignUp');
      }
    } catch (error) {
      setInitialRoute('SignUp');
    }
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        {
          initialRoute == '' ? <Loader visible={true} loaderTitle={'Initializing....'} /> :
            <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="Home">
                {(props) => <Home {...props} refresh={refresh} setRefresh={setRefresh} />}
              </Stack.Screen>
              <Stack.Screen name="ViewNote">
                {(props) => <ViewNote {...props} setRefresh={setRefresh} />}
              </Stack.Screen>
              <Stack.Screen name="AddNote">
                {(props) => <AddNote {...props} setRefresh={setRefresh} />}
              </Stack.Screen>
            </Stack.Navigator>
        }
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({})
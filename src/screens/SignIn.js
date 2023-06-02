import { Alert, BackHandler, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputText from '../components/userSignComponents/InputText';
import Loader from '../components/Loader';
import Button from '../components/userSignComponents/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const SignIn = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => backHandler.remove();
    }, [])
  );

  const handleInputs = (text, input) => {
    setInputs((previousInput) => ({
      ...previousInput,
      [input]: text
    }))
  }

  const handleErrorMessage = (errorMessage, input) => {
    setErrors((previousValue) => ({
      ...previousValue,
      [input]: errorMessage
    }));
  }

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.email) {
      handleErrorMessage('Please enter the email', 'email');
      valid = false;
    }

    if (!inputs.password) {
      handleErrorMessage('Please enter the password', 'password');
      valid = false;
    }

    if (valid) {
      userSignIn();
    }
  }

  const userSignIn = async () => {   
    setLoading(true);
    await axios.post('api/v1/user/login',
      {
        emailAddress: inputs.email,
        password: inputs.password
      }
    )
      .then(async (response) => {
        setLoading(false);
        setInputs({
          email: '',
          password: ''
        });
        
        try {
          await AsyncStorage.setItem('nUdata', JSON.stringify(
            {
              'userId': response.data.data.userId,
              'firstName': response.data.data.firstName,
              'isLogged': true
            }
          ));
          navigation.navigate('Home', response.data.data);
        } catch (error) {
          console.log(error);
          Alert.alert('Error', 'Something went wrong');
        }
      })
      .catch((error) => {        
        setLoading(false);
        Alert.alert('Invalid credentials');
      });
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#bfd0db', flex: 1 }}>
      <Loader visible={loading} loaderTitle={'Loging....'} />
      <ScrollView contentContainerStyle={{ paddingTop: 100, paddingHorizontal: 20 }}>
        <Text style={styles.headerText}>Note App</Text>
        <Text style={styles.subText}>Sign In to the App</Text>
        <View style={{ marginVertical: 20 }}>
          <InputText
            iconName={'email-outline'}
            label={'Email'}
            placeholder={'Enter email address'}
            keyboardType={'email-address'}
            value={inputs.email}
            onChangeText={(text) => handleInputs(text, 'email')}
            error={errors.email}
            onFocus={() => handleErrorMessage(null, 'email')}
          />
          <InputText
            iconName={'lock-outline'}
            label={'Password'}
            placeholder={'Enter your password'}
            password
            value={inputs.password}
            onChangeText={(text) => handleInputs(text, 'password')}
            error={errors.password}
            onFocus={() => handleErrorMessage(null, 'password')}
          />
          <Button title={'SIGN IN'} onPress={validate} style={styles.btn} />
          <Text
            style={styles.noAccountText}
            onPress={() => navigation.navigate('SignUp')}
          >
            I don't have an account? Sign Up
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold'
  },
  subText: {
    color: 'gray',
    fontSize: 18,
    marginVertical: 10
  },
  noAccountText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20
  },
  btn: {
    borderRadius: 10,
  }
})

export default SignIn

import { Alert, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Loader from '../components/Loader';
import InputText from '../components/userSignComponents/InputText';
import Button from '../components/userSignComponents/Button';
import axios from 'axios';

const SignUp = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

    if (!inputs.firstName) {
      handleErrorMessage('First name is required', 'firstName');
      valid = false;
    } else if (!inputs.firstName.match(/^[A-Za-z]+$/)) {
      handleErrorMessage('Invalid input', 'firstName');
      valid = false;
    }

    if (!inputs.lastName) {
      handleErrorMessage('First name is required', 'lastName');
      valid = false;
    } else if (!inputs.lastName.match(/^[A-Za-z]+$/)) {
      handleErrorMessage('Invalid input', 'lastName');
      valid = false;
    }

    if (!inputs.email) {
      handleErrorMessage('Email is required', 'email');
      valid = false;
    } else if (!inputs.email.match(/^[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      handleErrorMessage('Please enter a valid email', 'email');
      valid = false;
    }

    if (!inputs.password) {
      handleErrorMessage('Please enter the password', 'password');
      valid = false;
    } else if (inputs.password.length < 8) {
      handleErrorMessage('Minimum password length is 8', 'password');
      valid = false;
    } else if (!inputs.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#&()])(?!.*\s).{8,}$/)) {
      handleErrorMessage('Password must be contained upper/lower cases, numbers, special characters', 'password');
      valid = false;
    }

    if (!inputs.confirmPassword) {
      handleErrorMessage('Re-type password', 'confirmPassword');
      valid = false;
    } else if (!inputs.confirmPassword.match(inputs.password)) {
      handleErrorMessage('Password is not matched', 'confirmPassword');
      valid = false;
    }

    if (valid) {
      saveUser();
    }
  }

  const saveUser = async () => {
    axios.post('api/v1/user/save', {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      emailAddress: inputs.email,
      password: inputs.confirmPassword,
    })
      .then(() => {
        setInputs({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
        navigation.navigate('SignIn');
      })
      .catch(error => {
        if (error.response.data.statusCode === 409) {
          Alert.prompt('This email is already in use');
        } else {
          Alert.alert('Internal error');
        }
      });
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Loader visible={loading} loaderTitle={'Saving...'} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.headerText}>Note App</Text>
        <Text style={styles.subHeaderText}>Enter Your Details to Sign Up</Text>
        <View style={{ marginVertical: 20 }}>
          <InputText
            iconName={'account-outline'}
            label={'First Name'}
            placeholder={'Enter your first name'}
            keyboardType={'default'}
            value={inputs.firstName}
            onChangeText={(text) => handleInputs(text, 'firstName')}
            error={errors.firstName}
            onFocus={() => handleErrorMessage(null, 'firstName')}
          />
          <InputText
            iconName={'account-outline'}
            label={'Last Name'}
            placeholder={'Enter your last name'}
            keyboardType={'default'}
            value={inputs.lastName}
            onChangeText={(text) => handleInputs(text, 'lastName')}
            error={errors.lastName}
            onFocus={() => handleErrorMessage(null, 'lastName')}
          />
          <InputText
            iconName={'email-outline'}
            label={'Email'}
            placeholder={'Enter a valid email address'}
            keyboardType={'email-address'}
            value={inputs.email}
            onChangeText={(text) => handleInputs(text, 'email')}
            error={errors.email}
            onFocus={() => handleErrorMessage(null, 'email')}
          />
          <InputText
            iconName={'lock-outline'}
            label={'Password'}
            placeholder={'Enter a password'}
            password
            value={inputs.password}
            onChangeText={(text) => handleInputs(text, 'password')}
            error={errors.password}
            onFocus={() => handleErrorMessage(null, 'password')}
          />
          <InputText
            iconName={'pencil-lock-outline'}
            label={'Confirm Password'}
            placeholder={'Re-type the password'}
            secureTextEntry={true}
            keyboardType={'default'}
            value={inputs.confirmPassword}
            onChangeText={(text) => handleInputs(text, 'confirmPassword')}
            error={errors.confirmPassword}
            onFocus={() => handleErrorMessage(null, 'confirmPassword')}
          />
          <Button style={styles.btn} title={'SIGN UP'} onPress={validate} />
          <Text
            style={styles.haveAccountText}
            onPress={() => {
              setInputs({
                fullName: '',
                email: '',
                phoneNumber: '',
                password: '',
              });
              navigation.navigate('SignIn');
            }}
          >
            Already have an account? Sign In
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  scrollViewContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: 'darkblue',
    fontSize: 18,
    marginVertical: 10
  },
  haveAccountText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20
  },
  btn: {
    borderRadius: 15
  }
})
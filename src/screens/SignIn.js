import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const SignIn = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <Text>SignIn</Text>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
    
})
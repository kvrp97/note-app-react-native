import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SignUp = () => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.signUpText}>Sign Up</Text>
        <Text style={styles.subSignUpText}>Enter Your Details to Sign Up</Text>
        <View style={{ marginVertical:20 }}>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  safeAreaContainer:{
    flex: 1,
    backgroundColor: 'white'
  },
  scrollViewContainer:{
    paddingTop:50,
    paddingHorizontal:20,
  },
  signUpText:{
    color:'black',
    fontSize:40,
    fontWeight: 'bold',
  },
  subSignUpText:{
    color:'gray',
    fontSize:18,
    marginVertical:10
  }
})
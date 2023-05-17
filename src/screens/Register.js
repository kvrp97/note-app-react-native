import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Register = () => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.regText}>Register</Text>
        <Text style={styles.subRegText}>Enter Your Details to Register</Text>
        <View style={{ marginVertical:20 }}>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  safeAreaContainer:{
    flex: 1,
    backgroundColor: 'white'
  },
  scrollViewContainer:{
    paddingTop:50,
    paddingHorizontal:20,
  },
  regText:{
    color:'black',
    fontSize:40,
    fontWeight: 'bold',
  },
  subRegText:{
    color:'gray',
    fontSize:18,
    marginVertical:10
  }
})
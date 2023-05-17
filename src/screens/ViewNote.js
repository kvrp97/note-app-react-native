import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const ViewNote = (props) => {
  const {navigation, route} = props;

  console.log(route.params);
  return (
    <View>
      <Text>Hellooooo</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}
const styles = StyleSheet.create({

})

export default ViewNote

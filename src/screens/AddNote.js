import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';

const AddNote = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.noteInputContainer}>
          <Text style={styles.addNoteText}>Add Note</Text>
          <TextInput
            style={[styles.textInput, { fontWeight: '400' }]}
            onChangeText={(text) => setTitle(text)}
            value={title}
            placeholder="Title"
            keyboardType="default"
            multiline
          />
          <TextInput
            style={[styles.textInput, { fontWeight: '300' }]}
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="Description"
            keyboardType="default"
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.imgInputButton}>
          <Icon name='image-multiple' size={40} />
        </TouchableOpacity>
        <View style={styles.imgPreview}>
          <Avatar.Image style={styles.image} size={60} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
          <Avatar.Image style={styles.image} size={60} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
          <Avatar.Image style={styles.image} size={60} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
          <Avatar.Image style={styles.image} size={60} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
          <Avatar.Image style={styles.image} size={60} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  addNoteText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20
  },
  noteInputContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    width: '90%',
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16
  },
  imgInputButton: {
    marginLeft: 35,
    marginVertical: 20,
  },
  imgPreview: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: 2
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 15
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  }
})

export default AddNote
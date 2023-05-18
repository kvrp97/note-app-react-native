import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

const AddNote = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);


  const handleSelectImages = async () => {

    const options = {
      mediaType: 'photo',
      selectionLimit: 5,
      includeBase64: false,
    }

    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel) {
        console.log('Cancelled');
      } else if (result.errorCode) {
        console.log(result.errorCode);
      } else if (result.errorMessage) {
        console.log(result.errorMessage);
      } else if (result.assets) {
        // console.log(result.assets);
        if (result.assets.length > 5) {
          return Alert.alert('Maximum selection limit is 5');
        } else {
          setSelectedImages(result.assets);
        }
        setSelectedImages(result.assets);
      } else {
        console.log('No assets');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = () => {
    console.log("saved");
  }

  const handleCancel = () => {
    setSelectedImages([]);
    setTitle('');
    setDescription('');
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
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
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.btnText} >Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.btnText} >Save</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.imgInputButton} onPress={handleSelectImages}>
          <Icon name='image-multiple' size={40} />
        </TouchableOpacity>
        <View style={styles.imgPreview}>
          {selectedImages &&
            selectedImages?.map(({ uri }, index) => {
              return <Avatar.Image style={styles.image} size={60} source={{ uri: uri }} key={index} />
            })
          }
        </View>
        {selectedImages.length > 0 ?
          <TouchableOpacity style={[styles.button, { width: 130, alignSelf: 'center' }]} onPress={()=> setSelectedImages([])}>
            <Text style={[styles.btnText, { alignSelf: 'center' }]} >Clear Images</Text>
          </TouchableOpacity>
          : <></>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    height: '100%', 
    backgroundColor: 'lightgray' 
  },
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
    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 15,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: 'lightgray'
  },
  btnText: {
    fontSize: 13,
    fontWeight: '400',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  }
})

export default AddNote
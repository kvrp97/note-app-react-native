import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const ViewNote = (props) => {
  const { navigation, route } = props;
  const { noteId, title, description, dateTime, noteImages } = route.params;

  const [noteTitle, setNoteTitle] = useState(title);
  const [noteDescription, setNoteDescription] = useState(description);
  const [previousImages, setPreviousImages] = useState(noteImages);
  const [selectedImages, setSelectedImages] = useState([]);
  const [ImagesToRemove, setImagesToRemove] = useState([]);
  const [loading, setLoading] = useState(false);

  const titleCharacterLimit = 100;
  const descriptionCharacterLimit = 450;
  const imagesCount = 5;

  useEffect(() => {
    setNoteTitle(noteTitle);
    setNoteDescription(noteDescription);
  }, [noteTitle, noteDescription])

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
        if ((result.assets.length + noteImages.length) > imagesCount) {
          return Alert.alert('Maximum selection limit is 5');
        } else {
          setSelectedImages((pre) => pre.concat(result.assets));
        }
      } else {
        console.log('No assets');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemovePreviousImage = (image, index) => {
    let newPreviousImages = [...previousImages];
    newPreviousImages.splice(index, 1);
    setPreviousImages(newPreviousImages);
    setImagesToRemove([...ImagesToRemove, image]);
  }

  const handleRemoveSelectedImage = (index) => {
    let newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Loader visible={loading} loaderTitle={'Saving.....'} />
      <ScrollView>
        <View style={styles.topBtnContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name={'home'} size={40} />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>NOTE</Text>
          <TouchableOpacity>
            <Icon name={'check-circle'} size={35} />
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textInputContainer}>
          <View style={styles.inputSubContainer}>
            <TextInput
              style={[styles.textInput, { fontSize: 17, fontWeight: '500' }]}
              onChangeText={(text) => {
                if (text.length <= titleCharacterLimit) {
                  setNoteTitle(text);
                }
              }}
              value={noteTitle}
              placeholder="Title"
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize='none'
              multiline
            />
            <Text style={styles.textCount}>{titleCharacterLimit - noteTitle.length} / {titleCharacterLimit}</Text>
          </View>
          <View style={styles.inputSubContainer}>
            <TextInput
              style={[styles.textInput, { fontSize: 16, fontWeight: '400' }]}
              onChangeText={(text) => {
                if (text.length <= descriptionCharacterLimit) {
                  setNoteDescription(text);
                }
              }}
              value={noteDescription}
              placeholder="Description"
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize='none'
              multiline
            />
            <Text style={styles.textCount}>{descriptionCharacterLimit - noteDescription.length} / {descriptionCharacterLimit}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.imgInputButton} onPress={handleSelectImages}>
          <Icon name='image-multiple' size={40} />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {
            previousImages?.map((image, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.imageUnit}
                    onLongPress={() => {
                      return Alert.alert(
                        "Delete Image..!",
                        "Are you sure you want to remove this image ?",
                        [
                          // The "Yes" button
                          {
                            text: "Yes",
                            onPress: () => {
                              handleRemovePreviousImage(image, index);
                            },
                          },
                          // The "No" button
                          // Does nothing but dismiss the dialog when tapped
                          {
                            text: "No",
                          },
                        ]
                      );
                    }}

                  >
                    <Image
                      style={styles.imageItem}
                      source={{
                        uri: image.imagePath,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )
            })
          }
          {
            selectedImages?.map(({ uri }, index) => {
              return (
                <View key={index}>
                  {/* <Avatar.Image size={60} source={{ uri: uri }} key={index} /> */}
                  <TouchableOpacity
                    style={styles.imageUnit}
                    onLongPress={() => {
                      return Alert.alert(
                        "Delete Image..!",
                        "Are you sure you want to remove this image ?",
                        [
                          // The "Yes" button
                          {
                            text: "Yes",
                            onPress: () => {
                              handleRemoveSelectedImage(index);
                            },
                          },
                          // The "No" button
                          // Does nothing but dismiss the dialog when tapped
                          {
                            text: "No",
                          },
                        ]
                      );
                    }}
                  >
                    <Image
                      style={styles.imageItem}
                      source={{ uri: uri }}
                    />
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#e4f1f7',
  },
  screenTitle: {
    fontSize: 20,
    marginTop: 7,
    fontWeight: '600'
  },
  topBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 10,
  },
  textInputContainer: {
    flex: 1,
    padding: 15,
  },
  inputSubContainer: {
    flex: 1,
    marginVertical: 5
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 15,
  },
  textCount: {
    marginLeft: 15,
    fontSize: 12,
    fontWeight: '300'
  },
  imgInputButton: {
    marginLeft: 30,
    marginVertical: 2,
  },
  imageDeleteButton: {
    padding: 5
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 10,
    marginBottom: 50
  },
  imageItem: {
    width: 120,
    height: 120,
  },
  imageUnit: {
    alignItems: 'center',
  }
})

export default ViewNote

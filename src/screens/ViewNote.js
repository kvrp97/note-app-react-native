import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import ImageView from "react-native-image-viewing";

const ViewNote = (props) => {
  const { navigation, route, setRefresh } = props;
  const { noteId, title, description, dateTime, noteImages } = route.params;

  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [previousImages, setPreviousImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [imagesView, setImagesView] = useState([]);

  const [loading, setLoading] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const titleCharacterLimit = 100;
  const descriptionCharacterLimit = 450;
  const imagesCount = 5;

  useEffect(() => {
    setNoteTitle(title);
    setNoteDescription(description);
    setPreviousImages(noteImages);
  }, [])

  useEffect(() => {
    const imageSet1 = previousImages.map(({ imageName }) => {
      return { uri: axios.defaults.baseURL + 'api/v1/note/image/' + imageName }
    })
    setImagesView(imageSet1);

    const imageSet2 = selectedImages.map(({ uri }) => {
      return { uri: uri }
    })
    setImagesView((pre) => pre.concat(imageSet2));
  }, [previousImages, selectedImages])

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
        if ((result.assets.length + previousImages.length) > imagesCount) {
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
    setImagesToRemove([...imagesToRemove, image]);
  }

  const handleRemoveSelectedImage = (index) => {
    let newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  }

  const handleUpdate = async () => {    
    if ((noteTitle !== title || noteDescription !== description) && noteImages.length === previousImages.length && selectedImages.length === 0) {
      if (noteTitle.trim().length > 0 || noteDescription.trim().length > 0) {
        setLoading(true);
        updateNoteTitleAndDescription()
          .then((response) => {
            console.log(response.data);
            setRefresh(true);
            setLoading(false);
            navigation.navigate('Home');
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          })
      } else {
        Alert.alert('Please add a title or description');
      }
    } else if ((noteTitle !== title || noteDescription !== description) && noteImages.length !== previousImages.length && selectedImages.length === 0) {
      if (noteTitle.trim().length > 0 || noteDescription.trim().length > 0) {
        setLoading(true);
        Promise.all([updateNoteTitleAndDescription(), updateNoteByRemovingImage()])
          .then(response => {
            console.log('All requests completed:', response.data);
            setRefresh(true);
            setLoading(false);
            navigation.navigate('Home')
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          })
      } else {
        Alert.alert('Please add a title or description');
      }
    } else if ((noteTitle !== title || noteDescription !== description) && noteImages.length !== previousImages.length && selectedImages.length !== 0) {
      if (noteTitle.trim().length > 0 || noteDescription.trim().length > 0) {
        setLoading(true);
        Promise.all([updateNoteTitleAndDescription(), updateNoteByRemovingImage(), updateNoteByAddingImage()])
          .then(response => {
            console.log('All requests completed:', response.data);
            setRefresh(true);
            setLoading(false);
            navigation.navigate('Home')
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          })
      } else {
        Alert.alert('Please add a title or description');
      }
    } else if ((noteTitle !== title || noteDescription !== description) && noteImages.length === previousImages.length && selectedImages.length !== 0) {
      if (noteTitle.trim().length > 0 || noteDescription.trim().length > 0) {
        setLoading(true);
        Promise.all([updateNoteTitleAndDescription(), updateNoteByAddingImage()])
          .then(response => {
            console.log('All requests completed:', response.data);
            setRefresh(true);
            setLoading(false);
            navigation.navigate('Home')
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        Alert.alert('Please add a title or description');
      }

    } else if ((noteTitle === title && noteDescription === description) && noteImages.length !== previousImages.length && selectedImages.length === 0) {
      setLoading(true);
      updateNoteByRemovingImage()
        .then((response) => {
          console.log(response.data);
          setRefresh(true);
          setLoading(false);
          navigation.navigate('Home')
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });

    } else if ((noteTitle === title && noteDescription === description) && noteImages.length === previousImages.length && selectedImages.length !== 0) {
      setLoading(true);
      updateNoteByAddingImage()
        .then((response) => {
          console.log(response.data);
          setRefresh(true);
          setLoading(false);
          navigation.navigate('Home')
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if ((noteTitle === title && noteDescription === description) && noteImages.length !== previousImages.length && selectedImages.length !== 0) {
      setLoading(true);
      Promise.all([updateNoteByRemovingImage(), updateNoteByAddingImage()])
        .then(response => {
          console.log('All requests completed:', response.data);
          setRefresh(true);
          setLoading(false);
          navigation.navigate('Home')
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        })
    } else {
      return
    }
  }

  const updateNoteTitleAndDescription = () => {
    const date = new Date();
    const updatedDateTime = date.toLocaleString('en-US', {
      hour12: false,
    });

    const data = {
      noteId: noteId,
      title: noteTitle,
      description: noteDescription,
      dateTime: updatedDateTime,
    }
    return axios.put('api/v1/note/update-title-description', data);
  }

  const updateNoteByRemovingImage = () => {
    const date = new Date();
    const newNoteDateTime = date.toLocaleString('en-US', {
      hour12: false,
    });
    const data = {
      noteId: noteId,
      dateTime: newNoteDateTime,
      noteImageList: imagesToRemove
    }
    return axios.put('api/v1/note/update-by-removing-image', data);
  }

  const updateNoteByAddingImage = () => {
    const formData = new FormData();
    formData.append("noteId", noteId);

    const date = new Date();
    const newNoteDateTime = date.toLocaleString('en-US', {
      hour12: false,
    });
    formData.append("dateTime", newNoteDateTime);

    for (let i = 0; i < selectedImages.length; i++) {
      formData.append('images', {
        uri: selectedImages[i].uri,
        type: selectedImages[i].type,
        name: selectedImages[i].fileName
      })
    }

    return axios({
      method: "put",
      url: 'api/v1/note/update-by-adding-image',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Loader visible={loading} loaderTitle={'Saving.....'} />
      <ScrollView>
        <View style={styles.topBtnContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name={'home'} size={40} color='#4f4f4d' />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>NOTE</Text>
          <TouchableOpacity onPress={handleUpdate}>
            <Icon name={'check-circle'} size={35} color='#4f4f4d' />
            <Text style={{ color: '#4f4f4d' }}>Done</Text>
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
              placeholderTextColor="#4f4f4d"
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
              placeholderTextColor="#4f4f4d"
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize='none'
              multiline
            />
            <Text style={styles.textCount}>{descriptionCharacterLimit - noteDescription.length} / {descriptionCharacterLimit}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.imgInputButton} onPress={handleSelectImages}>
          <Icon name='image-multiple' size={40} color='#3d3d3b' />
        </TouchableOpacity>
        <ImageView
          images={imagesView}
          imageIndex={currentImageIndex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
        <View style={styles.imageContainer}>
          {
            previousImages?.map((image, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.imageUnit}
                    onPress={() => {
                      setCurrentImageIndex(index)
                      setIsVisible(true)
                    }}
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
                        uri: axios.defaults.baseURL + 'api/v1/note/image/' + image.imageName,
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
                    onPress={() => {
                      setCurrentImageIndex(index)
                      setIsVisible(true)
                    }}
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
    color: 'black',
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
    color: 'black',
    width: '100%',
    paddingHorizontal: 15,
  },
  textCount: {
    color: 'black',
    marginLeft: 15,
    fontSize: 12,
    fontWeight: '300'
  },
  imgInputButton: {
    padding: 5,
    marginLeft: 30,
    marginRight: 330,
    marginVertical: 15,
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
    width: 150,
    height: 150,
  },
  imageUnit: {
    alignItems: 'center',
  }
})

export default ViewNote

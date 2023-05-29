import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Searchbar } from 'react-native-paper';
import Loader from '../components/Loader';
import NoteList from '../components/noteAppComponents/NoteList';
import AddButton from '../components/noteAppComponents/AddButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ refresh, setRefresh, navigation }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    getUserData();
  }, [])

  const getUserData = async () => {
    try {
      const uData = await AsyncStorage.getItem('nUdata');
      if (uData) {
        const userData = JSON.parse(uData);
        // console.log(userData);
        setUserDetails(userData);
      }
    } catch (error) {
      console.log(error);
      navigation.goBack();
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Exit App?', 'Are you sure you want to exit?',
          [
            {
              text: 'Yes',
              onPress: () => BackHandler.exitApp(),
            },
            {
              text: 'No',
              style: 'cancel',
            }
          ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => backHandler.remove();
    }, [])
  );

  const handleExit = () => {
    return Alert.alert(
      "Sign Out!",
      "Are you sure?",
      [
        {
          text: "Yes",
          onPress: async () => {
            await AsyncStorage.setItem('nUdata', JSON.stringify({ ...userDetails, isLogged: false }));
            // await AsyncStorage.removeItem('nUdata');
            navigation.goBack();
          },
        },
        {
          text: "No",
        },
      ]
    );
  }

  return (
    <>
      {userDetails &&
        <SafeAreaView style={styles.mainContainer}>
          <Loader visible={loading} loaderTitle={'Loading...'} />
          <View style={styles.headerContainer}>
            <View style={styles.exitIconUserContainer}>
              <Text style={styles.userName}>Hi {userDetails.firstName}..</Text>
              <TouchableOpacity onPress={handleExit}>
                <Icon name="sign-out-alt" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>NOTE APP</Text>
            <Searchbar
              style={{ width: '70%' }}
              iconColor='white'
              placeholder="Search"
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
            />
          </View>
          <ScrollView style={styles.noteListContainer}>
            {
              userDetails.userId &&
              <NoteList userId={userDetails.userId} searchQuery={searchQuery} refresh={refresh} setRefresh={setRefresh} setLoading={setLoading} />
            }
          </ScrollView>
          <AddButton userId={userDetails.userId} />
        </SafeAreaView>
      }
    </>

  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    paddingBottom: 15
  },
  exitIconUserContainer: {
    position: 'absolute',
    top: 2,
    right: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userName: {
    fontSize: 11,
    color: 'black',
    fontWeight: 'bold',
  },
  noteListContainer: {
    display: 'flex',
    flex: 1,
    height: '100%',
    marginHorizontal: 5,
  }
})
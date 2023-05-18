import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Searchbar } from 'react-native-paper';
import AddButton from '../components/AddButton';
import NoteList from '../components/NoteList';
import Loader from '../components/Loader';

const Home = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Loader visible={loading} loaderTitle={'Loading Notes...'}/>
      <View style={styles.headerContainer}>
        <View style={styles.exitIconUserContainer}>
          <Text style={styles.userName}>Hi Ravindu....</Text>
          <TouchableOpacity>
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
        <NoteList loading={setLoading}/>
      </ScrollView>
      <AddButton />
    </SafeAreaView>
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
    padding: 5,
    marginBottom: 25
  }
})
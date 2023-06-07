import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NoteItem from './NoteItem';
import { Alert, BackHandler } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NoteList = (props) => {

    const navigation = useNavigation();

    const { userDetails, setLoading, refresh, setRefresh, searchQuery } = props;

    const [noteList, setNoteList] = useState([]);

    useEffect(() => {
        getAllNotes();
    }, [])

    useEffect(() => {
        getAllNotes();
    }, [refresh])

    useEffect(() => {
        if (searchQuery.length > 0) {
            searchNotes();
        } else {
            getAllNotes();
        }
    }, [searchQuery])

    const searchNotes = async () => {
        await axios.get('api/v1/note/search', {
            params: {
                userId: userId,
                searchKeyword: searchQuery,
            }
        })
            .then((response) => {
                setNoteList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getAllNotes = async () => {
        setLoading(true);
        await axios.get(`api/v1/note/get-all-notes/${userDetails.userId}`)
            .then(response => {
                setNoteList(response.data.data);
            })
            .catch(err => {
                setLoading(false);
                console.log(err.message);
                Alert.alert('Unable to load the notes!', 'Please try again later.',
                    [
                        {
                            text: "Sign Out?",
                            onPress: async () => {
                                try {
                                    const uData = await AsyncStorage.getItem('nUdata');
                                    const userData = JSON.parse(uData);
                                    await AsyncStorage.setItem('nUdata', JSON.stringify({ ...userData, 'isLogged': false }));
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'SignIn' }],
                                    });
                                } catch (error) {
                                    console.log(error);
                                }
                            },
                        },
                        {
                            text: 'Exit App?',
                            onPress: () => BackHandler.exitApp(),
                        },
                    ]
                );
            })
            .finally(() => {
                setRefresh(false);
                setLoading(false);
            });
    }

    return (
        <>
            {noteList &&
                noteList?.map((note, index) => {
                    return <NoteItem
                        key={index}
                        noteId={note.noteId}
                        title={note.title}
                        description={note.description}
                        dateTime={note.dateTime}
                        noteImages={note.noteImages}
                        setRefresh={setRefresh}
                    />
                })
            }
        </>
    )
}

export default NoteList
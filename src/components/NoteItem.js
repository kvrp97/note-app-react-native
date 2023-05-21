import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Loader from './Loader';

const NoteItem = (props) => {
    const navigation = useNavigation();
    const { noteId, title, description, dateTime, noteImages, setRefresh } = props;

    const [loading, setLoading] = useState(false);


    const handleDeleteNote = () => {
        setLoading(true);
        axios.delete(`api/v1/note/delete-note/${noteId}`)
            .then((response) => {
                console.log(response.data);
                setLoading(false);
                setRefresh(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleDeleteIconPress = () => {
        return Alert.alert(
            "Delete Note..!",
            "Are you sure ?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        handleDeleteNote();
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    }

    const handleLongPressOnNote = () => {
        return Alert.alert(
            "Choose what to do...",
            "Remove or view & edit ?",
            [
                {
                    text: "Delete",
                    onPress: () => {
                        handleDeleteNote();
                    },
                },
                {
                    text: "View & Edit",
                    onPress: () => {
                        navigation.navigate('ViewNote', {
                            noteId, title, description, dateTime, noteImages
                        })
                    },
                },
                {
                    text: "Cancel",
                },
            ]
        );
    }

    return (
        <>
            <Loader visible={loading} loaderTitle={'Deleting...'}/>
            <TouchableOpacity
                id={noteId}
                style={styles.noteContainer}
                onPress={() => navigation.navigate('ViewNote', {
                    noteId, title, description, dateTime, noteImages
                })}
                onLongPress={handleLongPressOnNote}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText} numberOfLines={3}>{description}</Text>
                </View>
                <View style={styles.imagesContainer}>
                    {
                        noteImages?.map(({ noteImageId, imagePath }) => {
                            return <Avatar.Image style={styles.image} size={35} source={{ uri: imagePath }} key={noteImageId} />
                        })
                    }
                </View>
                <View style={styles.noteFooter}>
                    <Text style={styles.dateTimeText}>{dateTime}</Text>
                    <TouchableOpacity onPress={handleDeleteIconPress}>
                        <Icon name="delete-circle" size={25} color='darkgray'/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create({
    noteContainer: {
        marginVertical: 2,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#faf8e8',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'lightgray',
        borderRadius: 10
    },
    imagesContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    image: {
        marginHorizontal: 2
    },
    titleText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
    },
    descriptionText: {
        color: 'black',
        fontSize: 12,
        textAlign: 'justify'
    },
    titleContainer: {
        marginVertical: 5
    },
    descriptionContainer: {
        marginVertical: 5
    },
    dateTimeText: {
        color: '#787877',
        marginTop: 5,
        fontSize: 11,
        fontWeight: '500'
    },
    noteFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    }
})

export default NoteItem

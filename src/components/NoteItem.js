import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const greeting = 'Hello'

const NoteItem = (props) => {
    const navigation = useNavigation();
    const { noteId, title, description, dateTime, noteImages } = props;

    const [imagesData, setImagesData] = useState([]);

    useEffect(() => {
        setImagesData(noteImages);
    }, [noteImages])

    return (
        <TouchableOpacity id={noteId} style={styles.noteContainer} onPress={() => navigation.navigate('ViewNote', {greeting})}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText} numberOfLines={3}>{description}</Text>
            </View>
            <View style={styles.imagesContainer}>
                {
                    imagesData?.map(({ noteImageId, imagePath }) => {
                        return <Avatar.Image style={styles.image} size={30} source={{ uri: imagePath }} key={noteImageId} />
                    })
                }
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    noteContainer: {
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'lightyellow',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'orange',
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
    }
})

export default NoteItem

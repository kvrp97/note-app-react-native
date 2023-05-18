import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AddButton = (props) => {
    
    const navigation = useNavigation();

    return (
        <View>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AddNote')}
                variant="primary"
            />
        </View>
    )
}
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 10,
    },
})

export default AddButton

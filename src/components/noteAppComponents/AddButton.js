import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AddButton = () => {

    const navigation = useNavigation();

    const handleGoToAddNote = ()=>{        
        navigation.navigate('AddNote');
    }

    return (
        <View>
            <FAB
                icon="plus"
                style={styles.fab}
                
                onPress={handleGoToAddNote}
                variant="primary"
            />
        </View>
    )
}
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 5,
        bottom: 35,
    },
})

export default AddButton

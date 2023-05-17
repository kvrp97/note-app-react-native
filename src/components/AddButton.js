import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper';

const AddButton = () => {
    return (
        <View>
            <FAB                
                icon="plus"
                style={styles.fab}
                onPress={() => console.log('Pressed')}
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

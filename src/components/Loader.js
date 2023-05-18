import { ActivityIndicator, StyleSheet, View, Text, useWindowDimensions } from 'react-native'
import React from 'react'

const Loader = ({ visible, loaderTitle }) => {
    const { height, width } = useWindowDimensions();
    return visible &&
        <View style={[styles.loaderContainer, { height, width }]}>
            <View style={styles.loader}>
                <ActivityIndicator size={'large'} color={'black'} />
                <Text style={styles.loaderText}>{loaderTitle}</Text>
            </View>
        </View>
}

export default Loader

const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        zIndex: 10,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0 , 0, 0.5)',
    },
    loader: {
        height: 70,
        backgroundColor: 'white',
        marginHorizontal: 50,
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    loaderText: {
        marginLeft: 25,
        color: 'black',
        fontSize: 16
    }
})
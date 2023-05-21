import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity
            style={[styles.buttonStyle, style]}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Text style={styles.buttonTitle}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 55,
        width: '100%',
        backgroundColor: 'darkblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default Button

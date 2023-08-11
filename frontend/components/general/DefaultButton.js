import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function DefaultButton(props) {
    const {
        title,
        onPress
    } = props;

    const [backgroundColor, setBackgroundColor] = useState('#F26619');

    return (
        <TouchableOpacity style={styles.buttonStyle} onPressOut={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginHorizontal: 50,
        marginVertical: 20,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F26619',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    }
});

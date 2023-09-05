import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Stats(props) {
    const {
        number,
        title
    } = props;

    return (
        <View style={styles.sectionStyle}>
            <Text style={styles.number}>{number}</Text>
            <Text style={styles.textStyle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionStyle: {
        marginHorizontal: 15,
        marginBottom: 10,
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#F26619',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    number: {
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    }
});

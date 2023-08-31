import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar } from '@react-native-material/core';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, ScrollView, SafeAreaView, Image, Text, ActivityIndicator, Pressable } from 'react-native';

const MAIN_TITLE = "Événements";
const SUBTITLE = "Voici les événements disponibles";

export default function Events(props) {
    const {setIsLoggedIn, user} = props;

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView automaticallyAdjustKeyboardInsets>
                <Text style={styles.mainTitle}>{MAIN_TITLE}</Text>
                <Text style={styles.subTitle}>{SUBTITLE}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainTitle: {
        margin: 20,
        color: '#F26619',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subTitle: {
        margin: 10,
        marginHorizontal: 60,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageStyle: {
        marginTop: 10,
        width: '60%',
        height: 120,
        alignSelf: 'center'
    },
    snackBar: {
        backgroundColor: 'red',
        marginHorizontal: 10
    },
    activityIndicator: {
        marginVertical: 30
    }
});

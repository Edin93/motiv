import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar } from '@react-native-material/core';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Setting(props) {
    const {icon, title} = props;

    return (
        <View style={styles.settings}>
            <Icon name={icon} size={25} color='#F26619' style={styles.icon}/>
            <TouchableOpacity style={styles.touchable}>
                <Text style={styles.settingTitle}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    settings: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    touchable: {
        flex: 1,
        paddingVertical: 15,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    },
    settingTitle: {
        fontSize: 16,
    },
    logout: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    },
    icon: {
        paddingVertical: 15,
        marginHorizontal: 10
    },
});

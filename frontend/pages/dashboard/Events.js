import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar } from '@react-native-material/core';
import Event from '../../components/general/Event';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, ScrollView, SafeAreaView, Image, Text, ActivityIndicator, Pressable, View, TextInput } from 'react-native';

const MAIN_TITLE = "Événements";

export default function Events(props) {
    const {user} = props;

    const [customBorderWidth, setBorderWidth] = useState(0);
    const [search, onChangeSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const customOnFocus = () => {
        setBorderWidth(2);
    };
    const customOnBlur = () => {setBorderWidth(0)};

    useEffect(() => {

    });

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.mainContainer}>
                <Text style={styles.mainTitle}>{MAIN_TITLE}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={[styles.sectionStyle, {borderWidth: customBorderWidth}]}>
                    <Text>
                        <Icon name='search' style={styles.iconStyle} size={20} color='#B6B6B6'/>
                    </Text>
                    <TextInput
                        onFocus={customOnFocus}
                        onBlur={customOnBlur}
                        style={styles.input}
                        onChangeText={onChangeSearch}
                        value={search}
                        placeholder="Titre de l'événement"
                        placeholderTextColor='#B6B6B6'
                        underlineColorAndroid='transparent'
                        maxLength={40}
                        />
                    </View>
                    <Icon name='filter' style={{marginRight: 30}} size={40} color='#f26619'/>
                </View>
                <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 35, marginTop: 20}}>Résultats:</Text>
                <ScrollView automaticallyAdjustKeyboardInsets showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <Event icon="basketball" iconColor="#f26619" activity="Basket" city="Laval" date="03/06/24"/>
                    <Event icon="basketball" iconColor="#f26619" activity="Basket" city="Orléans" date="07/09/23"/>
                    <Event icon="basketball" iconColor="#f26619" activity="Basket" city="Bordeaux" date="08/09/23"/>
                </ScrollView>
                <DefaultButton title='Créer un événement' onPress={() => {}}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginBottom: 70
    },
    mainTitle: {
        margin: 20,
        color: '#F26619',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
        paddingVertical: 20,
        paddingHorizontal: 10
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
    },
    sectionStyle: {
        flex: 1,
        marginHorizontal: 30,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#F26619',
        borderRadius: 20,
        paddingLeft: 15,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    input: {
        height: 45,
        flex: 1,
        fontSize: 16,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#F26619',
        padding: 10,
        borderRadius: 20,
    },
    iconStyle: {
        height: 25,
        width: 25,
    }
});

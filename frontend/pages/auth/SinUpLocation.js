import axios from 'axios';
import { State, City } from 'country-state-city';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, SafeAreaView, ScrollView, Image, Text, ActivityIndicator } from 'react-native';

const MAIN_TITLE = "Dernière étape !";
const SUBTITLE = "Dans quelle ville te trouves-tu ?";

const blackListedStates = ['CP', 'PF', 'TF', 'PM', 'BL', 'MF', 'WF']

export default function SignUpLocation({route, navigation}) {
    let stateData = State.getStatesOfCountry('FR').filter((item) => !/\d/.test(item.isoCode) &&
                                                                    !blackListedStates.includes(item.isoCode));

    const [state, setState] = useState(stateData[0]);
    const [city, setCity] = useState();
    const [cityData, setCityData] = useState();
    const [isFocus, setIsFocus] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCityData(City.getCitiesOfState('FR', state?.isoCode));
    }, [state]);

    useEffect(() => {
        cityData && setCity(cityData[0]);
    }, [cityData]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const newUser = {
                ...route.params.newUser,
                region: {...state},
                city: {...city}
            };
            const response = await axios.post('http://192.168.1.36:3000/api/users/register', newUser);
            navigation.navigate('Confirmation email', {success: true, message: 'Votre compte a été créé avec succès !', userId: response.data.user, email: newUser.email});
        } catch (e) {
            console.log('Sign up location page' + e);
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={[StyleSheet.container, {flex: 1}]}>
            <ScrollView automaticallyAdjustKeyboardInsets>
                <Image
                source={require('../../assets/enlarge_logomotiv.png')}
                style={styles.imageStyle}
                />
                <Text style={styles.mainTitle}>{MAIN_TITLE}</Text>
                <Text style={styles.subTitle}>{SUBTITLE}</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus, {backgroundColor: '#ffffff'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={stateData}
                    maxHeight={300}
                    labelField="name"
                    valueField="name"
                    placeholder={!isFocus ? 'Selectionner une région' : '...'}
                    searchPlaceholder="Chercher une région"
                    value={state}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setState(item);
                      setIsFocus(false);
                    }}
                />
                <Dropdown
                    automaticallyAdjustKeyboardInsets
                    style={[styles.dropdown, isFocus, {backgroundColor: '#ffffff'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={cityData}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="name"
                    placeholder={!isFocus ? 'Selectionner une ville' : '...'}
                    searchPlaceholder="Chercher une ville"
                    value={city}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setCity(item);
                      setIsFocus(false);
                    }}
                />
                {loading ? <ActivityIndicator color='#f26619' style={styles.activityIndicator}/> : <DefaultButton title='Terminer' onPress={handleSubmit}/>}
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
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageStyle: {
        marginTop: 10,
        width: '60%',
        height: 110,
        alignSelf: 'center'
    },
    dropdown: {
        marginVertical: 20,
        marginHorizontal: 50,
        padding: 10,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        fontSize: 16,
        borderRadius: 20,
    },
    activityIndicator: {
        marginVertical: 40
    }
});

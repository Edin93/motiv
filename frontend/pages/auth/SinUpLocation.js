import { State, City } from 'country-state-city';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, SafeAreaView, ScrollView, Image, Text } from 'react-native';

const blackListedStates = ['CP', 'PF', 'TF', 'PM', 'BL', 'MF', 'WF']

export default function SignUpLocation({navigation}) {
    let stateData = State.getStatesOfCountry('FR').filter((item) => !/\d/.test(item.isoCode) &&
                                                                    !blackListedStates.includes(item.isoCode));

    const [state, setState] = useState(stateData[0]);
    const [city, setCity] = useState();
    const [cityData, setCityData] = useState();
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        setCityData(City.getCitiesOfState('FR', state?.isoCode));
    }, [state]);

    useEffect(() => {
        cityData && setCity(cityData[0]);
    }, [cityData]);

    return (
        <SafeAreaView style={[StyleSheet.container, {flex: 1}]}>
            <ScrollView automaticallyAdjustKeyboardInsets>
                <Image
                source={require('../../assets/enlarge_logomotiv.png')}
                style={styles.imageStyle}
                />
                <Text style={styles.mainTitle}>Dernière étape !</Text>
                <Text style={styles.subTitle}>Dans quelle ville te trouves-tu ?</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#f26619' }, {backgroundColor: '#ffffff'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={stateData}
                    search
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
                    style={[styles.dropdown, isFocus && { borderColor: '#f26619' }, {backgroundColor: '#ffffff'}]}
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
                <DefaultButton title='Terminer'/>
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
});

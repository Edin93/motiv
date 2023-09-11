import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { State, City } from 'country-state-city';
import { Dropdown } from 'react-native-element-dropdown';
import DefaultInput from '../general/DefaultInput';
import Activity from '../general/Activity';
import { Snackbar } from '@react-native-material/core';
import { StyleSheet, ScrollView, Text, Pressable, View, Modal } from 'react-native';

const blackListedStates = ['CP', 'PF', 'TF', 'PM', 'BL', 'MF', 'WF'];

export default function CreateEventModal(props) {
    const {
        modalCreateVisible,
        setModalCreateVisible,
        user} = props;

    let stateData = State.getStatesOfCountry('FR').filter((item) => !/\d/.test(item.isoCode) &&
                                                                !blackListedStates.includes(item.isoCode));

    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitlle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [lastCancelation, setLastCancelation] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [maxPlaces, setMaxPlaces] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        setCityData(City.getCitiesOfState('FR', state?.isoCode));
    }, [state]);

    useEffect(() => {
        cityData && setCity(cityData[0]);
    }, [cityData]);

    const customOnFocus = () => {
        setSnackBarVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalCreateVisible}
            onRequestClose={() => {
              setModalCreateVisible(!modalCreateVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Créer un événement</Text>
                <DefaultInput 
                    customPlaceholder="Titre de l'événement"
                    isPassword={false}
                    icon="bookmark"
                    text={title}
                    onChangeText={setTitlle}
                    margin={20}
                    onFocus={customOnFocus}
                />
                <DefaultInput 
                    customPlaceholder="Description"
                    isPassword={false}
                    icon="align-justify"
                    text={description}
                    onChangeText={setDescription}
                    margin={20}
                    onFocus={customOnFocus}
                />
                <DefaultInput 
                    customPlaceholder="Date de début"
                    isPassword={false}
                    icon="calendar"
                    text={description}
                    onChangeText={setDescription}
                    margin={20}
                    onFocus={customOnFocus}
                    isNumeric={true}
                />
                <DefaultInput 
                    customPlaceholder="Date de fin"
                    isPassword={false}
                    icon="calendar"
                    text={description}
                    onChangeText={setDescription}
                    margin={20}
                    onFocus={customOnFocus}
                    isNumeric={true}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop:10, paddingHorizontal: 10}}>
                    <Dropdown
                    style={[styles.dropdown, isFocus, {backgroundColor: '#ffffff'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={stateData}
                    maxHeight={300}
                    labelField="name"
                    valueField="name"
                    placeholder={!isFocus ? 'Région' : '...'}
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
                        placeholder={!isFocus ? 'Ville' : '...'}
                        searchPlaceholder="Chercher une ville"
                        value={city}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setCity(item);
                          setIsFocus(false);
                        }}
                    />
                    </View>
                {snackBarVisible && <Snackbar message={errorMessage} style={styles.snackBar}/>}
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {setModalCreateVisible(!modalCreateVisible); setCity(null); setState(null)}}>
                    <Text style={{color: '#ffffff', fontSize: 16}}>Créer l'événement</Text>
                </Pressable>
                <Pressable
                    onPress={() => {setModalCreateVisible(!modalCreateVisible); setCity(null); setState(null)}}>
                    <Text style={{color: 'red', fontSize: 16, fontWeight: 'bold', marginTop: 10}}>Annuler</Text>
                </Pressable>
              </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
      },
      modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
          backgroundColor: '#f26619',
          borderRadius: 20,
          padding: 15,
          elevation: 5,
      },
      activities: {
        paddingTop: 30,
        paddingBottom: 10
    },
    snackBar: {
        backgroundColor: 'red',
        marginVertical: 10
        
    },
    activityIndicator: {
        marginVertical: 30
    },
    dropdown: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 10,
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

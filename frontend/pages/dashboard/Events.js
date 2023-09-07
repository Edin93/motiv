import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar } from '@react-native-material/core';
import Event from '../../components/general/Event';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import EventModal from '../../components/modals/EventModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, ScrollView, SafeAreaView, Image, Text, ActivityIndicator, TouchableOpacity, View, TextInput } from 'react-native';

const MAIN_TITLE = "Événements";

export default function Events(props) {
    const {loggedUser} = props;

    const [customBorderWidth, setBorderWidth] = useState(0);
    const [allEvents, setAllEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [search, onChangeSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const customOnFocus = () => {
        setBorderWidth(2);
    };
    const customOnBlur = () => {setBorderWidth(0)};

    useEffect(() => {
        const getEvents = async () => {
            setLoading(true);
            try {
                const response = await axios.post(`http://172.20.10.2:3000/api/events/search`, {title: search});
                setAllEvents(response.data.filteredEvents);
                setLoading(false);
            } catch (e) {
                console.log('Cannot get events: ' + e);
                setLoading(false);
            }
        }
        getEvents();
    }, [search]);

    const getEventDetails = async (eventId) => {
        try {
            const response = await axios.get(`http://172.20.10.2:3000/api/events/${eventId}`);
            setSelectedEvent(response.data);
            setModalVisible(!modalVisible);
        } catch (e) {
            console.log('Cannot get Event info: ' + e);
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            {!loading && <EventModal modalVisible={modalVisible} setModalVisible={setModalVisible} event={selectedEvent} loggedUser={loggedUser}/>}
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
                {loading ? <ActivityIndicator color='#f26619' style={{flex: 1}}/> :
                <ScrollView automaticallyAdjustKeyboardInsets showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    {allEvents.map((event) => <TouchableOpacity onPress={() => getEventDetails(event._id)} key={event._id}>
                                                <Event
                                                     activityIcon={event.activity.icon}
                                                     activityIconColor={event.activity.iconColor}
                                                     activity={event.activity.name}
                                                     city={event.city.name}
                                                     date={event.start}
                                                     title={event.title}
                                                     adminId={event.adminId}/>
                                              </TouchableOpacity>)}
                </ScrollView>}
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

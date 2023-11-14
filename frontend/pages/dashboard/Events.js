import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { State, City } from 'country-state-city';
import Event from '../../components/general/Event';
import DefaultButton from '../../components/general/DefaultButton';
import EventModal from '../../components/modals/EventModal';
import CreateEventModal from '../../components/modals/CreateEventModal';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, ScrollView, SafeAreaView, Text, ActivityIndicator, TouchableOpacity, View, TextInput } from 'react-native';

const MAIN_TITLE = "Événements";
const blackListedStates = ['CP', 'PF', 'TF', 'PM', 'BL', 'MF', 'WF'];

export default function Events(props) {
    const {loggedUser} = props;

    let stateData = State.getStatesOfCountry('FR').filter((item) => !/\d/.test(item.isoCode) &&
                                                                    !blackListedStates.includes(item.isoCode));

    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [cityData, setCityData] = useState();
    const [isFocus, setIsFocus] = useState(false);
    const [customBorderWidth, setBorderWidth] = useState(0);
    const [allEvents, setAllEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [search, onChangeSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [update, setUpdate] = useState(false);
    const [credits, setCredits] = useState(0);

    const customOnFocus = () => {
        setBorderWidth(2);
    };
    const customOnBlur = () => {setBorderWidth(0)};

    useEffect(() => {
        const getEvents = async () => {
            setLoading(true);
            try {
                const response = await axios.post(`http://192.168.1.19:3000/api/events/search`, {title: search, userId: loggedUser, city: city});
                setAllEvents(response.data.filteredEvents || []);
                const user = await axios.get(`http://192.168.1.19:3000/api/users/${loggedUser}`);
                setCredits(user.data.credits);
                setLoading(false);
            } catch (e) {
                console.log('Cannot get events: ' + e);
                setLoading(false);
            }
        }
        getEvents();
    }, [search, update, city]);

    useEffect(() => {
        setCityData(City.getCitiesOfState('FR', state?.isoCode));
    }, [state]);

    useEffect(() => {
        cityData && setCity(cityData[0]);
    }, [cityData]);

    const getEventDetails = async (eventId) => {
        try {
            const response = await axios.get(`http://192.168.1.19:3000/api/events/${eventId}`);
            setSelectedEvent(response.data);
            setModalVisible(!modalVisible);
        } catch (e) {
            console.log('Cannot get Event info: ' + e);
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            {!loading && <EventModal modalVisible={modalVisible} setModalVisible={setModalVisible} event={selectedEvent} loggedUser={loggedUser} update={update} setUpdate={setUpdate}/>}
            {!loading && <CreateEventModal modalCreateVisible={modalCreateVisible} setModalCreateVisible={setModalCreateVisible} user={loggedUser}/>}
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, paddingHorizontal: 10}}>
                <View style={styles.creditsSection}>
                    <Icon name='attach-money' size={25} color='gold' style={{paddingRight: 5}}/>
                    {loading ? <ActivityIndicator color='black'/> : <Text style={styles.credits}>{credits}</Text> }
                </View>
            </View>
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
                    <Icon name='filter-list-alt' style={{marginRight: 30}} size={50} color='#f26619' onPress={() => {setShowFilters(!showFilters)}}/>
                </View>
                {showFilters &&
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingHorizontal: 10}}>
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
                    <Icon name='refresh' style={{marginRight: 20}} size={40} color='#f26619' onPress={() => {setCity(null); setState(null)}}/>
                    </View>}
                <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 35, marginTop: 20}}>Résultats:</Text>
                {loading ? <ActivityIndicator color='#f26619' style={{flex: 1}}/> :
                <ScrollView automaticallyAdjustKeyboardInsets showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    {allEvents.length != 0 ? allEvents.map((event) => <TouchableOpacity onPress={() => getEventDetails(event._id)} key={event._id}>
                                                <Event
                                                     activityIcon={event.activity.icon}
                                                     activityIconColor={event.activity.iconColor}
                                                     activity={event.activity.name}
                                                     city={event.city.name}
                                                     date={event.start}
                                                     title={event.title}
                                                     adminId={event.adminId}/>
                                              </TouchableOpacity>) : <Text style={{textAlign: 'center', color: '#f26619', fontWeight:'bold', fontSize: 18}}>Aucun événement</Text>}
                </ScrollView>}
                <DefaultButton title='Créer un événement' onPress={() => {setModalCreateVisible(!modalCreateVisible)}}/>
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
        marginBottom: 10,
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
    creditsSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    credits: {
        fontSize: 16,
        fontWeight: 'bold'
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

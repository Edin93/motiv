import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stats from '../../components/general/Stats';
import Activity from '../../components/general/Activity';
import { Snackbar } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, ScrollView, SafeAreaView, Image, Text, ActivityIndicator, Pressable, View, Modal } from 'react-native';

export default function Profile(props) {
    const {user, navigation} = props;

    const [loading, setLoading] = useState(true);
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [recommendation, setRecommendation] = useState(0);
    const [origanizedEvents, setOriganizedEvents] = useState(0);
    const [participations, setParticipations] = useState(0);
    const [userActivities, setUserActivities] = useState([]);
    const [allActivities, setAllActivities] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [credits, setCredits] = useState(0);
    const [userEvents, setUserEvents] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [update, setUpdate] = useState(false);
    const [picture, setPicture] = useState('');

    useEffect(() => {
        const getLoggedUser = async () => {
            try {
                const userObject = await axios.get(`http://192.168.1.36:3000/api/users/${user}`);
                setUsername(userObject.data.username);
                setRecommendation(userObject.data.recommandations.length);
                setOriganizedEvents(userObject.data.organized_events.length);
                setParticipations(userObject.data.participations.length);
                setCredits(userObject.data.credits);
                setPicture(userObject.data.picture);
                const activities = [];
                for (const activity of userObject.data.activities) {
                    const res = await axios.get(`http://192.168.1.36:3000/api/activities/${activity}`);
                    activities.push(res.data);
                }
                setUserActivities(activities);
                setLoading(false);
            } catch (e) {
                console.log('Profile page: ' + e);
            }
        };
        setLoading(true);
        getLoggedUser();
    }, [update]);

    const handleOpenModal = async () => {
        axios.get('http://192.168.1.36:3000/api/activities/')
        .then((res) => {
            setAllActivities(res.data);
        })
        .catch((e) => console.log('Select activities page' + e));
        setModalVisible(!modalVisible);
    };

    const updateActivities = async () => {
        try {
            if (selectedActivities.length < 1) {
                setSnackBarVisible(true);
                setErrorMessage('Vous devez selectionner au moins une activité');
            } else {
                await axios.put(`http://192.168.1.36:3000/api/users/${user}`, {activities: selectedActivities});
                setSnackBarVisible(false);
                setUpdate(!update);
                setModalVisible(!modalVisible);
                setSelectedActivities([]);
            }
        } catch (e) {
            console.log('Profile page | cannot update activities: ' + e);
        }
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sélectionne tes activités</Text>
                    <ScrollView horizontal style={styles.activities} showsHorizontalScrollIndicator={false}>
                        <View style={{marginLeft: 20}}>
                           {allActivities.slice(0, 3).map((activity) => <Activity
                                                                        key={activity._id}
                                                                        icon={activity.icon}
                                                                        iconColor={activity.iconColor}
                                                                        activity={activity.name}
                                                                        select={() => {
                                                                            setSelectedActivities([...selectedActivities, activity._id]);
                                                                            setSnackBarVisible(false);
                                                                        }}
                                                                        unselect={() => setSelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                        </View>
                        <View>
                           {allActivities.slice(3, 6).map((activity) => <Activity
                                                                        key={activity.name}
                                                                        icon={activity.icon}
                                                                        iconColor={activity.iconColor}
                                                                        activity={activity.name}
                                                                        select={() => {
                                                                            setSelectedActivities([...selectedActivities, activity._id]);
                                                                            setSnackBarVisible(false);
                                                                        }}
                                                                        unselect={() => setSelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                        </View>
                        <View>
                           {allActivities.slice(6, 9).map((activity) => <Activity
                                                                        key={activity._id}
                                                                        icon={activity.icon}
                                                                        iconColor={activity.iconColor}
                                                                        activity={activity.name}
                                                                        select={() => {
                                                                            setSelectedActivities([...selectedActivities, activity._id]);
                                                                            setSnackBarVisible(false);
                                                                        }}
                                                                        unselect={() => setSelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                        </View>
                        <View>
                           {allActivities.slice(9, 12).map((activity) => <Activity
                                                                        key={activity._id}
                                                                        icon={activity.icon}
                                                                        iconColor={activity.iconColor}
                                                                        activity={activity.name}
                                                                        select={() => {
                                                                            setSelectedActivities([...selectedActivities, activity._id]);
                                                                            setSnackBarVisible(false);
                                                                        }}
                                                                        unselect={() => setSelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                        </View>
                        <View style={{marginRight: 20}}>
                           {allActivities.slice(12,).map((activity) => <Activity
                                                                        key={activity._id}
                                                                        icon={activity.icon}
                                                                        iconColor={activity.iconColor}
                                                                        activity={activity.name}
                                                                        select={() => {
                                                                            setSelectedActivities([...selectedActivities, activity._id]);
                                                                            setSnackBarVisible(false);
                                                                        }}
                                                                        unselect={() => setSelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                        </View>
                    </ScrollView>
                    {snackBarVisible && <Snackbar message={errorMessage} style={styles.snackBar}/>}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={updateActivities}>
                        <Text style={{color: '#ffffff', fontSize: 16}}>Tout est bon !</Text>
                    </Pressable>
                  </View>
                </View>
            </Modal>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', top: 45, zIndex: 10, paddingHorizontal: 10}}>
                <View style={styles.creditsSection}>
                    <Icon name='attach-money' size={25} color='gold' style={{paddingRight: 5}}/>
                    {loading ? <ActivityIndicator color='black'/> : <Text style={styles.credits}>{credits}</Text> }
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name='edit' color='#FFFFFF' size={30} style={styles.icon}/>
                    <Icon name='settings' color='#FFFFFF' size={30} style={styles.icon}  onPress={() => navigation.navigate('Paramètres')}/>
                </View>
            </View>
            {loading ? <ActivityIndicator style={styles.activityIndicator} color='#f26619'/> :
            <View style={{marginTop: 50, zIndex: 10}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Image
                        source={{uri: `http://qz1b49y.anonymous.19000.exp.direct/assets/uploads/${picture}`}}
                        style={styles.imageStyle}
                    />
                    <View style={styles.usernameSection}>
                        <Text style={styles.username} numberOfLines={1}>{username}</Text>
                    </View>
                </View>
            </View>
            }
            <ScrollView automaticallyAdjustKeyboardInsets showsVerticalScrollIndicator={false} style={styles.mainContainer}>
                {loading ? <ActivityIndicator style={styles.activityIndicator} color='#f26619'/> :
                <View>
                    <Text style={styles.level}>🎯 Débutant 🎯</Text>
                    <View>
                        <View style={styles.section}>
                            <Text style={styles.info}>Mes stats 🔥</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingTop: 30}}>
                                <Stats number={recommendation} title='Likes'/>
                                <Stats number={origanizedEvents} title='Événements créés'/>
                                <Stats number={participations} title='Événements rejoins'/>
                            </ScrollView>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.info}>Mes activités 🏃</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingTop: 30}}>
                                {userActivities.map((activity) => 
                                    <Activity
                                        key={activity._id}
                                        icon={activity.icon}
                                        iconColor={activity.iconColor}
                                        activity={activity.name}
                                        select={() => {
                                        }}
                                        unselect={() => {}}
                                        selected={true}/>
                                )}
                                <Pressable onPress={handleOpenModal}>
                                    <View style={styles.editActivities}>
                                        <Text style={styles.iconStyle}>
                                            <Icon name='add' size={40} color='#FFFFFF'/>
                                        </Text>
                                    </View>
                                </Pressable>
                            </ScrollView>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.info}>Mes Événements 📅</Text>
                            <Text>Comming soon...</Text>
                        </View>
                    </View>
                </View>
            }
            </ScrollView>
        </View>
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
    container: {
        flex: 1,
        backgroundColor: '#F26619'
    },
    mainContainer: {
        flex: 1,
        marginTop: 70,
        paddingTop: 70,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
    info: {
        textAlign: 'left',
        marginTop: 15,
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
    usernameSection: {
        alignItems: 'center',
        backgroundColor: '#F26619',
        marginTop: -40,
        borderColor: '#F26619',
        borderWidth: 5,
        borderRadius: 50,
    },
    username: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        marginTop: -8,
        maxWidth: 110,
    },
    level: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingTop: 15
    },
    imageStyle: {
        width: 150,
        height: 150,
        borderColor: '#F26619',
        borderWidth: 5,
        borderRadius: 100,
        backgroundColor: '#a62c37'
    },
    icon: {
        zIndex: 10,
        textAlign: 'right',
        marginTop: 10,
        marginRight: 5,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 5
    },
    section: {
        width: '100%',
    },
    editActivities: {
        marginHorizontal: 15,
        marginBottom: 10,
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f26619',
        borderWidth: 2,
        borderColor: '#F26619',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    snackBar: {
        backgroundColor: 'red',
        marginVertical: 10
        
    },
    activityIndicator: {
        marginVertical: 30
    }
});

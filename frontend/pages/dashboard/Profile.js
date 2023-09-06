import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stats from '../../components/general/Stats';
import Activity from '../../components/general/Activity'
import EditProfileModal from '../../components/modals/EditProfileModal';
import EditActivityModal from '../../components/modals/EditActivityModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, ScrollView, Image, Text, ActivityIndicator, Pressable, View } from 'react-native';

export default function Profile(props) {
    const {user, navigation} = props;

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [recommendation, setRecommendation] = useState(0);
    const [origanizedEvents, setOriganizedEvents] = useState(0);
    const [participations, setParticipations] = useState(0);
    const [userActivities, setUserActivities] = useState([]);
    const [allActivities, setAllActivities] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [credits, setCredits] = useState(0);
    const [userEvents, setUserEvents] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [modalActivitiesVisible, setModalActivitiesVisible] = useState(false);
    const [update, setUpdate] = useState(false);
    const [picture, setPicture] = useState('');

    useEffect(() => {
        const getLoggedUser = async () => {
            try {
                const userObject = await axios.get(`http://192.168.1.17:3000/api/users/${user}`);
                setUsername(userObject.data.username);
                setRecommendation(userObject.data.recommandations.length);
                setOriganizedEvents(userObject.data.organized_events.length);
                setParticipations(userObject.data.participations.length);
                setCredits(userObject.data.credits);
                setPicture(userObject.data.picture);
                const activities = [];
                for (const activity of userObject.data.activities) {
                    const res = await axios.get(`http://192.168.1.17:3000/api/activities/${activity}`);
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

    const handleOpenActivitiesModal = async () => {
        axios.get('http://192.168.1.17:3000/api/activities/')
        .then((res) => {
            setAllActivities(res.data);
        })
        .catch((e) => console.log('Select activities page' + e));
        setModalActivitiesVisible(!modalActivitiesVisible);
    };

    const handleProfileModal = async () => {
        setEditModalVisible(!editModalVisible);
    };

    return (
        <View style={styles.container}>
            <EditProfileModal
                modalVisible={editModalVisible}
                setModalVisible={setEditModalVisible}
                update={update}
                setUpdate={setUpdate}
                user={user}
                picture={picture}
                setPicture={setPicture} />
            <EditActivityModal
                modalVisible={modalActivitiesVisible}
                update={update}
                setUpdate={setUpdate}
                setModalVisible={setModalActivitiesVisible}
                allActivities={allActivities}
                selectedActivities={selectedActivities}
                setSelectedActivities={setSelectedActivities}
                user={user}/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', top: 45, zIndex: 10, paddingHorizontal: 10}}>
                <View style={styles.creditsSection}>
                    <Icon name='attach-money' size={25} color='gold' style={{paddingRight: 5}}/>
                    {loading ? <ActivityIndicator color='black'/> : <Text style={styles.credits}>{credits}</Text> }
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name='edit' color='#FFFFFF' size={30} style={styles.icon} onPress={handleProfileModal}/>
                    <Icon name='settings' color='#FFFFFF' size={30} style={styles.icon}  onPress={() => navigation.navigate('Paramètres')}/>
                </View>
            </View>
            {loading ? <ActivityIndicator style={styles.activityIndicator} color='#f26619'/> :
            <View style={{marginTop: 50, zIndex: 10}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Pressable onPress={handleProfileModal}>
                        <Image
                            source={{uri: `http://0yiqgak.rmarcais.19000.exp.direct/assets/uploads/${picture}`}}
                            style={styles.imageStyle}
                        />
                    </Pressable>
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
                                <Pressable onPress={handleOpenActivitiesModal}>
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
        marginTop: -50,
        borderColor: '#F26619',
        borderWidth: 5,
        borderRadius: 50,
    },
    username: {
        color: '#FFFFFF',
        fontSize: 20,
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
        paddingTop: 30
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
    activityIndicator: {
        marginVertical: 30
    }
});

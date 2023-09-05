import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar } from '@react-native-material/core';
import Activity from '../../components/general/Activity';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, SafeAreaView, ScrollView, View, Image, Text, ActivityIndicator } from 'react-native';

const MAIN_TITLE = "Tu y es presque...";
const SUBTITLE = "Choisis tes activités";

export default function SignUpActivities({route, navigation}) {
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [allActivities, setAllActivities] = useState([]);
    const [selectedActivities, setelectedActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('http://192.168.1.36:3000/api/activities/')
        .then((res) => {
            setAllActivities(res.data);
            setLoading(false);
        })
        .catch((e) => console.log('Select activities page' + e));
    }, []);

    const handleSubmit = () => {
        if (selectedActivities.length < 1) {
            setSnackBarVisible(true);
            setErrorMessage('Vous devez selectionner au moins une activité');
        } else {
            setSnackBarVisible(false);
            const newUser = {
                ...route.params.newUser,
                activities: selectedActivities
            }
            navigation.navigate('Dernière étape', {newUser});
        }
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
                {loading ? <ActivityIndicator color='#f26619' style={styles.activityIndicator}/> :
                <ScrollView horizontal style={styles.activities} showsHorizontalScrollIndicator={false}>
                    <View style={{marginLeft: 20}}>
                       {allActivities.slice(0, 3).map((activity) => <Activity
                                                                    key={activity._id}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.name}
                                                                    select={() => {
                                                                        setelectedActivities([...selectedActivities, activity._id]);
                                                                        setSnackBarVisible(false);
                                                                    }}
                                                                    unselect={() => setelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                    </View>
                    <View>
                       {allActivities.slice(3, 6).map((activity) => <Activity
                                                                    key={activity.name}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.name}
                                                                    select={() => {
                                                                        setelectedActivities([...selectedActivities, activity._id]);
                                                                        setSnackBarVisible(false);
                                                                    }}
                                                                    unselect={() => setelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                    </View>
                    <View>
                       {allActivities.slice(6, 9).map((activity) => <Activity
                                                                    key={activity._id}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.name}
                                                                    select={() => {
                                                                        setelectedActivities([...selectedActivities, activity._id]);
                                                                        setSnackBarVisible(false);
                                                                    }}
                                                                    unselect={() => setelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                    </View>
                    <View>
                       {allActivities.slice(9, 12).map((activity) => <Activity
                                                                    key={activity._id}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.name}
                                                                    select={() => {
                                                                        setelectedActivities([...selectedActivities, activity._id]);
                                                                        setSnackBarVisible(false);
                                                                    }}
                                                                    unselect={() => setelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                    </View>
                    <View style={{marginRight: 20}}>
                       {allActivities.slice(12,).map((activity) => <Activity
                                                                    key={activity._id}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.name}
                                                                    select={() => {
                                                                        setelectedActivities([...selectedActivities, activity._id]);
                                                                        setSnackBarVisible(false);
                                                                    }}
                                                                    unselect={() => setelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                    </View>
                </ScrollView>
                }
                <DefaultButton title="Suivant" onPress={handleSubmit}/>
            </ScrollView>
            {snackBarVisible && <Snackbar message={errorMessage} style={styles.snackBar}/>}
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
    activities: {
        paddingTop: 30,
        paddingBottom: 10
    },
    snackBar: {
        backgroundColor: 'red',
        marginHorizontal: 10
    },
    activityIndicator: {
        marginVertical: 40
    }
});

import React, { useState } from 'react';
import Activity from '../../components/general/Activity';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, SafeAreaView, ScrollView, View, Image, Text } from 'react-native';

const activities = [
    {icon: 'basketball', iconColor: '#f26619', activity: 'Basket'},
    {icon: 'volleyball', iconColor: '#e8e4d8', activity: 'Volley'},
    {icon: 'soccer', iconColor: '#000000', activity: 'Football'},
    {icon: 'bike-fast', iconColor: '#1f5980', activity: 'Cyclisme'},
    {icon: 'walk', iconColor: '#4486b3', activity: 'Randonnée'},
    {icon: 'table-tennis', iconColor: '#cc3b1b', activity: 'Ping-pong'},
    {icon: 'tennis', iconColor: '#fcba03', activity: 'Tennis'},
    {icon: 'tennis-ball', iconColor: '#5d6361', activity: 'Pétanque'},
    {icon: 'cards-playing-outline', iconColor: '#c90a0a', activity: 'Bridge'},
    {icon: 'badminton', iconColor: '#e0d2ce', activity: 'Badminton'},
    {icon: 'run-fast', iconColor: '#3ebd8e', activity: 'Running'},
    {icon: 'dumbbell', iconColor: '#000000', activity: 'Fitness'},
    {icon: 'dance-ballroom', iconColor: '#6a0ac9', activity: 'Danse'},
];

export default function SignUpActivities({navigation}) {
    return (
        <SafeAreaView style={[StyleSheet.container, {flex: 1}]}>
            <ScrollView automaticallyAdjustKeyboardInsets>
                <Image
                source={require('../../assets/enlarge_logomotiv.png')}
                style={styles.imageStyle}
                />
                <Text style={styles.mainTitle}>Tu y es presque...</Text>
                <Text style={styles.subTitle}>Choisis tes activités</Text>
                <ScrollView horizontal style={styles.activities} showsHorizontalScrollIndicator={false}>
                    <View style={{marginLeft: 20}}>
                       {activities.slice(0, 3).map((activity) => <Activity
                                                                    key={activity.activity}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.activity}/>)} 
                    </View>
                    <View>
                       {activities.slice(3, 6).map((activity) => <Activity
                                                                    key={activity.activity}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.activity}/>)} 
                    </View>
                    <View>
                       {activities.slice(6, 9).map((activity) => <Activity
                                                                    key={activity.activity}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.activity}/>)} 
                    </View>
                    <View>
                       {activities.slice(9, 12).map((activity) => <Activity
                                                                    key={activity.activity}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.activity}/>)} 
                    </View>
                    <View style={{marginRight: 20}}>
                       {activities.slice(12,).map((activity) => <Activity
                                                                    key={activity.activity}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.activity}/>)} 
                    </View>
                </ScrollView>
                
                <DefaultButton title="Suivant" onPress={() => navigation.navigate('Dernière étape')}/>
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
    activities: {
        paddingTop: 30,
        paddingBottom: 10
    }
});

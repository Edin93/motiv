import React from 'react';
import Setting from '../../components/general/Setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, Pressable, View } from 'react-native';

export default function Settings(props) {
    const {setIsLoggedIn, user} = props;

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView automaticallyAdjustKeyboardInsets showsVerticalScrollIndicator={false} style={{marginBottom: 100}}>
                <Setting icon='person' title='Compte'/>
                <Setting icon='language' title='Préférences'/>
                <Setting icon='info' title='Général'/>
                <Setting icon='edit' title='Personnalisation'/>
                <Setting icon='notifications' title='Notifications'/>
                <Setting icon='lock' title='Sécurité'/>
                <Setting icon='settings' title="Paramètres de l'application"/>
                <Setting icon='share' title='Partage et intégrations'/>
                <Setting icon='map' title='Paramètres de navigation'/>
                <Setting icon='assistant' title='Assistance'/>
                <Setting icon='gps-fixed' title='Paramètres de localisation '/>
                <Setting icon='sports-basketball' title="Autres paramètres spécifiques à l'application"/>
                <View style={styles.settings}>
                    <Icon name='logout' size={25} color='#F26619' style={styles.icon}/>
                    <TouchableOpacity style={styles.touchable} onPress={async () => {AsyncStorage.removeItem('authToken'); setIsLoggedIn(false);}}>
                        <Text style={styles.logout}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
    settings: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    touchable: {
        flex: 1,
        paddingVertical: 15,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    },
    settingTitle: {
        fontSize: 16,
    },
    logout: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    },
    icon: {
        paddingVertical: 15,
        marginHorizontal: 10
    },
});

import axios from 'axios';
import React, { useState } from 'react';
import { Snackbar } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, SafeAreaView, ScrollView, Image, Text, ActivityIndicator, View, Pressable } from 'react-native';

const MAINTITLE = "Confirme ton adresse email";
const SUBTITLE = "Entre le code à 4 chiffres reçu à l'adresse ";
const IP_ADDRESS="192.168.1.17";

export default function ConfirmEmail(props) {
    const {setIsLoggedIn, navigation, route} = props;

    const userId = route.params.userId;
    const email = route.params.email;

    const [code, onChangeCode] = useState('');
    const [userEmail, setUserEmail] = useState(email);
    const [newMail, onChangeNewMail] = useState('');
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [successSnackBarVisible, setSuccessSnackBarVisible] = useState(route.params.success);
    const [snackBarMessage, setSnackBarMessage] = useState(route.params?.message ?? '');
    const [showNewMailInput, setShowNewMailInput] = useState(false);
    const [loading, setLoading] = useState(false);

    const customOnFocus = () => {
        setSnackBarVisible(false);
        setSuccessSnackBarVisible(false);
    };

    const sendNewCode = async () => {
        setLoading(true);
        try {
            await axios.get(`http://${IP_ADDRESS}:3000/api/users/send-email-lost/${userId}`);
            setSuccessSnackBarVisible(true);
            setSnackBarMessage('Un nouveau code à été envoyé');
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const sendCodeNewAddress = async () => {
        setLoading(true);
        try {
            await axios.patch(`http://${IP_ADDRESS}:3000/api/users/change-email`, {email: userEmail, newEmail: newMail});
            setUserEmail(newMail);
            setSnackBarVisible(false);
            setSuccessSnackBarVisible(true);
            setSnackBarMessage(`Un code à été envoyé à l'adresse ${newMail}`);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!code) {
            setSnackBarVisible(true);
            setSnackBarMessage('Vous devez renseigner un code pour continuer');
        }
        try {
            const response = await axios.post(`http://${IP_ADDRESS}:3000/api/users/confirm-email/${userId}`, {tmp_code: Number(code)});
            const message = response.data.errors.message;
            if (message) {
                setSuccessSnackBarVisible(false);
                setSnackBarVisible(true);
                setSnackBarMessage(message);
            } else {
                setSnackBarVisible(false);
                await AsyncStorage.setItem('authToken', response.data.token);
                setIsLoggedIn(true);
            }
        } catch (e) {
            console.log('Confirm email page' + e);
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
                <Text style={styles.mainTitle}>{MAINTITLE}</Text>
                <Text style={styles.subTitle}>{SUBTITLE + route.params.email}</Text>
                <DefaultInput 
                    customPlaceholder="Code à 4 chiffres"
                    isPassword={false}
                    icon="lock"
                    text={code}
                    onChangeText={onChangeCode}
                    margin={20}
                    onFocus={customOnFocus}
                    isNumeric={true}
                />
                <Pressable onPressIn={sendNewCode}>
                   <Text style={styles.subTitle}>Envoyer un nouveau code</Text> 
                </Pressable>
                {loading ? <ActivityIndicator color='#f26619' style={styles.activityIndicator}/> : <DefaultButton title="Confirmer" onPress={handleSubmit}/>}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black', marginLeft: 50}} />
                <View>
                    <Text style={{width: 50, textAlign: 'center'}}>Ou</Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'black', marginRight: 50}} />
                </View>
                <Pressable onPressIn={() => setShowNewMailInput(!showNewMailInput)}>
                    <Text style={[styles.subTitle, {marginVertical: 20}]}>Envoyer le code sur une autre adresse</Text>
                </Pressable>
                {showNewMailInput &&
                <>
                    <DefaultInput 
                        customPlaceholder="Nouvel email"
                        isPassword={false}
                        icon="mail"
                        text={newMail}
                        onChangeText={onChangeNewMail}
                        margin={20}
                        onFocus={customOnFocus}
                    />
                    {loading ? <ActivityIndicator color='#f26619' style={styles.activityIndicator}/> : <DefaultButton title="Envoyer" onPress={sendCodeNewAddress}/>}
                </>
                }  
            </ScrollView>
            {snackBarVisible && <Snackbar message={snackBarMessage} style={styles.snackBar}/>}
            {successSnackBarVisible && <Snackbar message={snackBarMessage} style={styles.successSnackBar}/>}
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
        marginVertical: 10,
        marginHorizontal: 45,
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
    snackBar: {
        backgroundColor: 'red',
        marginHorizontal: 10
    },
    successSnackBar: {
        backgroundColor: 'green',
        marginHorizontal: 10
    },
    activityIndicator: {
        marginVertical: 40
    }
});

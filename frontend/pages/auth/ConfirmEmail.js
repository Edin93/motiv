import axios from 'axios';
import React, { useState } from 'react';
import { Snackbar } from '@react-native-material/core';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, SafeAreaView, ScrollView, Image, Text, ActivityIndicator, View, Pressable } from 'react-native';

const MAINTITLE = "Confirme ton adresse email";
const SUBTITLE = "Entre le code à 4 chiffres reçu à l'adresse ";
const IP_ADDRESS="128.53.5.198";

export default function ConfirmEmail({route, navigation}) {
    const {_id, email} = route.params.user;

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
        try {
            await axios.get(`http://${IP_ADDRESS}:3000/api/users/send-email-lost/${_id}`);
            setSuccessSnackBarVisible(true);
            setSnackBarMessage('Un nouveau code à été envoyé');
        } catch (e) {
            console.log(e);
        }
    };

    const sendCodeNewAddress = async () => {
        try {
            await axios.patch(`http://${IP_ADDRESS}:3000/api/users/change-email`, {email: userEmail, newEmail: newMail});
            setUserEmail(newMail);
            setSuccessSnackBarVisible(true);
            setSnackBarMessage(`Un code à été envoyé à l'adresse ${newMail}`);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async () => {
        try {
            await axios.post(`http://${IP_ADDRESS}:3000/api/users/confirm-email/${_id}`, {tmp_code: Number(code)});
            setSuccessSnackBarVisible(true);
            setSnackBarMessage(`Tout est bon !`);
            console.log('Tout est bon !');
        } catch (e) {
            console.log(e);
        }
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

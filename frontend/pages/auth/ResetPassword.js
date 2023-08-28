import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar } from '@react-native-material/core';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, ScrollView, SafeAreaView, Image, Text, ActivityIndicator } from 'react-native';

const MAIN_TITLE = "Nouveau mot de passe";
const SUBTITLE = "Définis ton nouveau mot de passe";

export default function ResetPassword({route, navigation}) {
    const [password, onChangePassword] = useState('');
    const [confirmPassword, onChangeConfirmPassword] = useState('');
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const userId = route.params.userId;
    const email = route.params.email;
    const emailConfirm = route.params.emailConfirm;

    const customOnFocus = () => {
        setSnackBarVisible(false);
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!password || !confirmPassword) {
            setSnackBarVisible(true);
            setErrorMessage('Tous les champs doivent être remplis pour continuer');
        } else if (password != confirmPassword) {
            setSnackBarVisible(true);
            setErrorMessage('Les deux mots de passe ne correspondent pas');
        }
        try {
            const response = await axios.post(`http://192.168.1.17:3000/api/users/reset-password/${userId}`, {password, confirmPassword});
            if ('user' in response.data) {
                if (!emailConfirm) {
                    navigation.navigate('Confirmation email', {userId, email});
                }
                console.log('On est tout bon !');
            } else if ('errors' in response.data) {
                setSnackBarVisible(true);
                setErrorMessage(response.data.errors);
            }
        } catch (e) {
            console.log('Reset password page: ' + e);
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView automaticallyAdjustKeyboardInsets>
                <Image
                    source={require('../../assets/enlarge_logomotiv.png')}
                    style={styles.imageStyle}
                />
                <Text style={styles.mainTitle}>{MAIN_TITLE}</Text>
                    <Text style={styles.subTitle}>{SUBTITLE}</Text>
                    <DefaultInput 
                        customPlaceholder="Nouveau mot de passe"
                        isPassword={true}
                        icon="lock"
                        text={password}
                        onChangeText={onChangePassword}
                        margin={20}
                        onFocus={customOnFocus}
                    />
                    <DefaultInput 
                        customPlaceholder="Confirmation du mot de passe"
                        isPassword={true}
                        icon="lock"
                        text={confirmPassword}
                        onChangeText={onChangeConfirmPassword}
                        margin={20}
                        onFocus={customOnFocus}
                    />
                    {loading ? <ActivityIndicator style={styles.activityIndicator} color='#f26619'/> :
                    <DefaultButton title="Confirmer" onPress={handleSubmit}/>}
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
        marginHorizontal: 60,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
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
    }
});

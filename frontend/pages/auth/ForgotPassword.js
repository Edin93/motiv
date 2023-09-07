import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar } from '@react-native-material/core';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, ScrollView, SafeAreaView, Image, Text, ActivityIndicator } from 'react-native';

const MAIN_TITLE = "Mot de passe oublié";
const SUBTITLE = "Renseigne ton mail pour pouvoir réinitialiser ton mot de passe";
const SUBTITLE_CONFIRMATION = "Un mot de passe à usage unique a été envoyé par mail. Renseigne-le lors de ta prochaine connexion. Tu pourras ensuite définir ton nouveau mot de passe.";

export default function ForgotPassword({navigation}) {
    const [email, onChangeEmail] = useState('');
    const [isMailSent, setIsMailSent] = useState(false);
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const customOnFocus = () => {
        setSnackBarVisible(false);
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!email) {
            setSnackBarVisible(true);
            setErrorMessage('Un email doit être renseigné pour pouvoir continuer');
        }
        try {
            const response = await axios.post('http://172.20.10.2:3000/api/users/forgot-password', {email});
            if ('errors' in response.data) {
                setSnackBarVisible(true);
                setErrorMessage(response.data.errors);
            } else {
                setIsMailSent(true);
            }
        } catch (e) {
            console.log('Forgot password page: ' + e);
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
                
                {isMailSent ? 
                <Text style={styles.subTitle}>{SUBTITLE_CONFIRMATION}</Text> :
                <>
                    <Text style={styles.subTitle}>{SUBTITLE}</Text>
                    <DefaultInput 
                        customPlaceholder="Email"
                        isPassword={false}
                        icon="mail"
                        text={email}
                        onChangeText={onChangeEmail}
                        margin={20}
                        onFocus={customOnFocus}
                    />
                    {loading ? <ActivityIndicator style={styles.activityIndicator} color='#f26619'/> :
                    <DefaultButton title="Envoyer" onPress={handleSubmit}/>}
                </>
                }
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

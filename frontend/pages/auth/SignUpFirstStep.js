import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar } from '@react-native-material/core';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, SafeAreaView, ScrollView, Image, Text, ActivityIndicator } from 'react-native';

const MAINTITLE = "Bienvenue sur Motiv !";
const SUBTITLE = "Crée ton comtpe";

export default function SignUpFirstStep({navigation}) {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [confirmPassword, onChangeConfirmPassword] = useState('');
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        if (!email || !password || !confirmPassword) {
            setSnackBarVisible(true);
            setErrorMessage('Tous les champs doivent être remplis');
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setSnackBarVisible(true);
            setErrorMessage('Adresse email invalide');
        } else if (password !== confirmPassword) {
            setSnackBarVisible(true);
            setErrorMessage('Les deux mots de passe sont différents');
        } else {
            try {
                const response = await axios.post('http://192.168.1.17:3000/api/users/check-email-password', {email: email, password: password});
                const error = response.data.errors.message;

                if (error) {
                    setSnackBarVisible(true);
                    setErrorMessage(error);
                } else {
                    setSnackBarVisible(false);
                    const newUser = {
                        email,
                        password
                    }
                    navigation.navigate('Seconde étape', { newUser });
                }
            } catch (e) {
                console.log(e);
            }
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
                <Text style={styles.subTitle}>{SUBTITLE}</Text>
                <DefaultInput 
                    customPlaceholder="Email"
                    isPassword={false}
                    icon="mail"
                    text={email}
                    onChangeText={onChangeEmail}
                    margin={20}
                />
                <DefaultInput 
                    customPlaceholder="Mot de passe"
                    isPassword={true}
                    icon="lock"
                    text={password}
                    onChangeText={onChangePassword}
                    margin={20}
                />
                <DefaultInput 
                    customPlaceholder="Confirmer le mot de passe"
                    isPassword={true}
                    icon="check"
                    text={confirmPassword}
                    onChangeText={onChangeConfirmPassword}
                    margin={20}
                />
                {loading ? <ActivityIndicator color='#f26619' style={styles.activityIndicator}/> : <DefaultButton title="Suivant" onPress={handleSubmit}/>}
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
    snackBar: {
        backgroundColor: 'red',
        marginHorizontal: 10
    },
    activityIndicator: {
        marginVertical: 40
    }
});

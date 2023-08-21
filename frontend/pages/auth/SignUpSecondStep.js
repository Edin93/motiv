import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar } from '@react-native-material/core';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, SafeAreaView, ScrollView, Image, Text, ActivityIndicator } from 'react-native';

const MAINTITLE = "Encore un petit effort";
const SUBTITLE = "Qui es-tu ?";

function  isOver15YearsOld(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    const differenceInMillis = currentDate - birthDate;
    const differenceInYears = differenceInMillis / (1000 * 60 * 60 * 24 * 365.25);
    return differenceInYears > 15;
}

export default function SignUpSecondStep({route, navigation}) {
    const [lastName, onChangeLastName] = useState('');
    const [firstName, onChangeFirstName] = useState('');
    const [username, onChangeUsername] = useState('');
    const [birthday, onChangeBirthday] = useState('');
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        if (!lastName || !firstName || !username || !birthday) {
            setSnackBarVisible(true);
            setErrorMessage('Tous les champs doivent être remplis');
        } else if (username.length < 5) {
            setSnackBarVisible(true);
            setErrorMessage('Le nom d\'utilisateur doit comporter au moins 5 caractères');
        } else if (!isOver15YearsOld(birthday)) {
            setSnackBarVisible(true);
            setErrorMessage('Vous devez avoir plus de 15 ans pour continuer');
        } else {
            try {
                const response = await axios.post('http://192.168.1.17:3000/api/users/check-username', {username});
                const error = response.data.errors.message;

                if (error) {
                    setSnackBarVisible(true);
                    setErrorMessage(error);
                } else {
                    setSnackBarVisible(false);
                    const newUser = {
                        ...route.params.newUser,
                        lastName,
                        firstName,
                        username,
                        birthday
                    }
                    navigation.navigate('Troisième étape', {newUser});
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
                    customPlaceholder="Nom"
                    isPassword={false}
                    icon="user"
                    text={lastName}
                    onChangeText={onChangeLastName}
                    margin={20}
                />
                <DefaultInput 
                    customPlaceholder="Prénom"
                    isPassword={false}
                    icon="user"
                    text={firstName}
                    onChangeText={onChangeFirstName}
                    margin={20}
                />
                <DefaultInput 
                    customPlaceholder="Nom d'utilisateur"
                    isPassword={false}
                    icon="user"
                    text={username}
                    onChangeText={onChangeUsername}
                    margin={20}
                />
                <DefaultInput 
                    customPlaceholder="Date de naissance JJ/MM/AAAA"
                    isPassword={false}
                    icon="calendar"
                    text={birthday}
                    onChangeText={onChangeBirthday}
                    margin={20}
                    isNumeric={true}
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

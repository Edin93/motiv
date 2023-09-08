import axios from 'axios';
import React, { useState } from 'react';
import { Snackbar } from '@react-native-material/core';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Pressable,
    View,
    Image,
    Text
} from 'react-native';

const MAIN_TITLE = "Content de te revoir !";
const SUBTITLE = "Identifie-toi";

export default function SignIn(props) {
    const {setIsLoggedIn, setUser, navigation} = props;

    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const customOnFocus = () => {
        setSnackBarVisible(false);
    };

    const checkCredentials = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const response = await axios.post('http://128.53.5.198:3000/api/users/login', {email, password});
            if ('user' in response.data) {
                const user = await axios.get(`http://128.53.5.198:3000/api/users/${response.data.user}`);
                if (user.data.hasToUpdatePassword) {
                    setSnackBarVisible(false);
                    navigation.navigate('Nouveau mot de passe', {userId: user.data._id, emailConfirm: user.data.emailConfirm, email: user.data.email});
                } else if (!user.data.emailConfirm) {
                    setSnackBarVisible(false);
                    navigation.navigate('Confirmation email', {userId: user.data._id, email});
                } else {
                    console.log('L\'utilisateur est bien connecté !');
                    await AsyncStorage.setItem('authToken', response.data.token);
                    setUser(user.data._id);
                    setIsLoggedIn(true);
                }
            } else if ('errors' in response.data) {
                setSnackBarVisible(true);
                setErrorMessage(response.data.errors.message);
            }
        } catch (e) {
            console.log('Sign in page: ' + e);
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
                    customPlaceholder="Email"
                    isPassword={false}
                    icon="mail"
                    text={email}
                    onChangeText={onChangeEmail}
                    margin={20}
                    onFocus={customOnFocus}
                />
                <DefaultInput 
                    customPlaceholder="Mot de passe"
                    isPassword={true}
                    icon="lock"
                    text={password}
                    onChangeText={onChangePassword}
                    margin={20}
                    onFocus={customOnFocus}
                />
                <Pressable onPressIn={() => navigation.navigate('Mot de passe oublié')}>
                    <Text style={styles.subTitle}>Mot de passe oublié</Text>
                </Pressable>
                {loading ? <ActivityIndicator style={styles.activityIndicator} color='#f26619'/> :
                <DefaultButton title="S'identifier" onPress={checkCredentials}/>}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black', marginLeft: 50}} />
                <View>
                    <Text style={{width: 50, textAlign: 'center'}}>Ou</Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'black', marginRight: 50}} />
                </View>
                <Text style={styles.subTitle}>Tu n'as pas de compte ?</Text>
                <DefaultButton title="Créer un compte" onPress={() => navigation.navigate('Première étape')}/>
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

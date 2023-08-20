import React, { useState } from 'react';
import { Snackbar } from '@react-native-material/core';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
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

export default function SignIn({navigation}) {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const checkCredentials = () => {
        setLoading(true);
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
                />
                <DefaultInput 
                    customPlaceholder="Mot de passe"
                    isPassword={true}
                    icon="lock"
                    text={password}
                    onChangeText={onChangePassword}
                    margin={20}
                />
                <Pressable onPressIn={() => navigation.navigate('Mot de passe oublié')}>
                    <Text style={styles.subTitle}>Mot de passe oublié</Text>
                </Pressable>
                {loading ? <ActivityIndicator color='#f26619'/> : <DefaultButton title="S'identifier" onPress={checkCredentials}/>}
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
            {snackBarVisible && <Snackbar message='hello' style={styles.snackBar}/>}
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
    }
});

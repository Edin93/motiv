import React, { useState } from 'react';
import DefaultInput from '../components/general/DefaultInput';
import DefaultButton from '../components/general/DefaultButton';
import { StyleSheet, SafeAreaView, ScrollView, Image, Text } from 'react-native';

export default function SignUpFirstStep({navigation}) {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [confirmPassword, onChangeConfirmPassword] = useState('');

    return (
        <SafeAreaView style={[StyleSheet.container, {flex: 1}]}>
            <ScrollView automaticallyAdjustKeyboardInsets>
                <Image
                    source={require('../assets/enlarge_logomotiv.png')}
                    style={styles.imageStyle}
                />
                <Text style={styles.mainTitle}>Bienvenue sur Motiv !</Text>
                <Text style={styles.subTitle}>Crée ton compte</Text>
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
                <DefaultButton title="Suivant" onPress={() => navigation.navigate('Seconde étape')}/>
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
    }
});

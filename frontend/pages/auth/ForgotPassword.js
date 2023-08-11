import React, { useState } from 'react';
import DefaultInput from '../components/general/DefaultInput';
import DefaultButton from '../components/general/DefaultButton';
import { StyleSheet, ScrollView, SafeAreaView, View, Image, Text } from 'react-native';

export default function ForgotPassword({navigation}) {
    const [email, onChangeEmail] = useState('');

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView automaticallyAdjustKeyboardInsets>
                <Image
                    source={require('../assets/enlarge_logomotiv.png')}
                    style={styles.imageStyle}
                />
                <Text style={styles.mainTitle}>Mot de passe oublié</Text>
                <Text style={styles.subTitle}>Renseigne ton mail pour pouvoir réinisialiser ton mot de passe</Text>
                <DefaultInput 
                    customPlaceholder="Email"
                    isPassword={false}
                    icon="mail"
                    text={email}
                    onChangeText={onChangeEmail}
                    margin={20}
                />
                <DefaultButton title="Envoyer"/>
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
    }
});

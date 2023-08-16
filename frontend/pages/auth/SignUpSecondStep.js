import React, { useState } from 'react';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, SafeAreaView, ScrollView, Image, Text } from 'react-native';

const MAINTITLE = "Encore un petit effort";
const SUBTITLE = "Qui es-tu ?";

export default function SignUpSecondStep({navigation}) {
    const [lastName, onChangeLastName] = useState('');
    const [firstName, onChangeFirstName] = useState('');
    const [birthday, onChangeBirthday] = useState('');

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
                    customPlaceholder="Date de naissance"
                    isPassword={false}
                    icon="calendar"
                    text={birthday}
                    onChangeText={onChangeBirthday}
                    margin={20}
                    isNumeric={true}
                />
                <DefaultButton title="Suivant" onPress={() => navigation.navigate("Troisième étape")}/>
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

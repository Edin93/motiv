import React, { useState } from 'react';
import DefaultInput from '../../components/general/DefaultInput';
import DefaultButton from '../../components/general/DefaultButton';
import { StyleSheet, ScrollView, SafeAreaView, Image, Text } from 'react-native';

const MAIN_TITLE = "Mot de passe oublié";
const SUBTITLE = "Renseigne ton mail pour pouvoir réinitialiser ton mot de passe";
const SUBTITLE_CONFIRMATION = "Un mot de passe temporaire a été envoyé par mail.Lors de votre prochaine connexion, renseignez ce mot de passe, et suivez les instructions pour en créer un nouveau.";

export default function ForgotPassword({navigation}) {
    const [email, onChangeEmail] = useState('');
    const [isMailSent, setIsMailSent] = useState(false);

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
                    />
                    <DefaultButton title="Envoyer" onPress={() => setIsMailSent(true)}/>
                </>
                }
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

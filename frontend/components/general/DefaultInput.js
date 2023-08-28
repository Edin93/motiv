import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, View, TextInput, Text } from 'react-native';

export default function DefaultInput(props) {
    const {
        customPlaceholder,
        isPassword,
        icon,
        text,
        onChangeText,
        margin,
        isNumeric,
        onFocus
    } = props;

    const [customBorderWidth, setBorderWidth] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const customOnFocus = () => {
        setBorderWidth(2);
        onFocus();
    };
    const customOnBlur = () => {setBorderWidth(0);};

    return (
        <View style={[styles.sectionStyle, {borderWidth: customBorderWidth, margin: margin}]}>
            <Text>
                <Icon name={icon} style={styles.iconStyle} size={20} color='#B6B6B6'/>
            </Text>
            <TextInput
                secureTextEntry={isPassword && !showPassword}
                onFocus={customOnFocus}
                onBlur={customOnBlur}
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={customPlaceholder}
                placeholderTextColor='#B6B6B6'
                underlineColorAndroid='transparent'
                maxLength={isNumeric ? 10 : 40}
                keyboardType={isNumeric ? 'numeric' : 'default'}
            />
            {isPassword && text != '' && <Text style={{marginRight: 20}} onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'eye-off' : 'eye'} style={styles.iconStyle} size={20} color='#B6B6B6'/>
            </Text>}
        </View>
        
    );
}

const styles = StyleSheet.create({
    sectionStyle: {
        marginHorizontal: 50,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#F26619',
        borderRadius: 20,
        paddingLeft: 15,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    input: {
        height: 45,
        flex: 1,
        fontSize: 16,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#F26619',
        padding: 10,
        borderRadius: 20,
    },
    iconStyle: {
        height: 25,
        width: 25,
    }
});

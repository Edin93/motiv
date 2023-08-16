import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Activity(props) {
    const {
        icon,
        iconColor,
        activity
    } = props;

    const [isSelected, setIsSelected] = useState(false);
    const [customBorderWidth, setBorderWidth] = useState(0);

    const selectActivity = (isSelected) => {
        if (isSelected) {
            setBorderWidth(2);
        } else {
            setBorderWidth(0);
        }
        setIsSelected(isSelected);
    }

    return (
        <Pressable onPress={() => selectActivity(!isSelected)}>
            <View style={[styles.sectionStyle, {borderWidth: customBorderWidth}]}>
                <Text style={styles.iconStyle}>
                    <Icon name={icon} size={40} color={iconColor}/>
                </Text>
                <Text style={styles.textStyle}>{activity}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    sectionStyle: {
        marginHorizontal: 15,
        marginBottom: 10,
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#F26619',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconStyle: {
        paddingBottom: 10
    }
});

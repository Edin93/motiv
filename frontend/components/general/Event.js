import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Pressable, Text, Image } from 'react-native';

export default function Event(props) {
    const {
        activityIcon,
        activityIconColor,
        activity,
        city,
        date
    } = props;

    return (
        <Pressable onPress={() => {}}>
            <View style={styles.sectionStyle}>
                <View style={styles.header}>
                    <Image
                        source={{uri: `http://0yiqgak.rmarcais.19000.exp.direct/assets/uploads/default.png`}}
                        style={styles.image}
                    />
                    <Text style={{color: '#ffffff', fontSize: 14, fontWeight: 'bold'}}>Alice propose: Tournois five</Text>
                </View>
                <View style={styles.eventInfo}>
                    <View style={{alignItems: 'center', maxWidth: '30%'}}>
                        <Text style={styles.iconStyle}>
                            <Icon name='map-marker' size={40} color='red'/>
                        </Text>
                        <Text style={styles.textStyle}>{city}</Text>
                    </View>
                    <View style={{alignItems: 'center', maxWidth: '30%'}}>
                        <Text style={styles.iconStyle}>
                            <Icon name={activityIcon} size={40} color={activityIconColor}/>
                        </Text>
                        <Text style={styles.textStyle}>{activity}</Text>
                    </View>
                    <View style={{alignItems: 'center', maxWidth: '30%'}}>
                        <Text style={styles.iconStyle} numberOfLines={1}>
                            <Icon name='calendar-month' size={40} color='#4c667d'/>
                        </Text>
                        <Text style={styles.textStyle}>{date}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 15,
        paddingLeft: 5,
        paddingRight: 60,
        backgroundColor: '#f26619',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 100,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    sectionStyle: {
        flex: 1,
        marginHorizontal: 15,
        marginBottom: 30,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    eventInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingVertical: 20
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconStyle: {
        paddingBottom: 10,
    }
});

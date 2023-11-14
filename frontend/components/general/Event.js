import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Pressable, Text, Image, ActivityIndicator } from 'react-native';

export default function Event(props) {
    const {
        activityIcon,
        activityIconColor,
        activity,
        city,
        date,
        title,
        adminId
    } = props;

    const [loading, setLoading] = useState(true);
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPicture, setAdminPicture] = useState('');

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const jour = String(formattedDate.getDate()).padStart(2, '0');
        const mois = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const annee = formattedDate.getFullYear();

        return `${jour}/${mois}/${annee}`;
    }

    useEffect(() => {
        const getAdminInfo = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://192.168.1.19:3000/api/users/${adminId}`);
                setAdminUsername(response.data.username);
                setAdminPicture(response.data.picture);
                setLoading(false);
            } catch (e) {
                console.log('Cannot get Admin info: ' + e);
                setLoading(false);
            }
        };
        getAdminInfo();
    }, []);

    return (
        <View style={styles.sectionStyle}>
            <View style={styles.header}>
            {loading ? <ActivityIndicator color='#ffffff' style={{marginLeft: 15}}/> :
                <>
                <Image
                    source={{uri: `http://qz1b49y.anonymous.19000.exp.direct/assets/uploads/${adminPicture}`}}
                    style={styles.image}
                />
                <Text style={{color: '#ffffff', fontSize: 14, fontWeight: 'bold'}}>{adminUsername} propose: {title}</Text></>}
            </View>
            <View style={styles.eventInfo}>
                <View style={{alignItems: 'center', maxWidth: '30%'}}>
                    <Text style={styles.iconStyle}>
                        <Icon name='map-marker' size={40} color='red'/>
                    </Text>
                    <Text style={styles.textStyle}>{city}</Text>
                </View>
                <View style={{alignItems: 'center', maxWidth: '30%'}}>
                    <Text style={styles.iconStyle} numberOfLines={1}>
                        <Icon name='calendar-month' size={40} color='#4c667d'/>
                    </Text>
                    <Text style={styles.textStyle}>{formatDate(date)}</Text>
                </View>
                <View style={{alignItems: 'center', maxWidth: '30%'}}>
                    <Text style={styles.iconStyle}>
                        <Icon name={activityIcon} size={40} color={activityIconColor}/>
                    </Text>
                    <Text style={styles.textStyle}>{activity}</Text>
                </View>
            </View>
        </View>
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
        minWidth: 320,
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

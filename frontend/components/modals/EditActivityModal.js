import React, { useState } from 'react';
import axios from 'axios';
import Activity from '../general/Activity';
import { Snackbar } from '@react-native-material/core';
import { StyleSheet, ScrollView, Text, Pressable, View, Modal } from 'react-native';

export default function EditActivityModal(props) {
    const {
        modalVisible,
        update,
        setUpdate,
        setModalVisible,
        allActivities,
        selectedActivities,
        setSelectedActivities,
        user} = props;

    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const updateActivities = async () => {
        try {
            if (selectedActivities.length < 1) {
                setSnackBarVisible(true);
                setErrorMessage('Vous devez selectionner au moins une activité');
            } else {
                await axios.put(`http://128.53.5.198:3000/api/users/${user}`, {activities: selectedActivities});
                setSnackBarVisible(false);
                setUpdate(!update);
                setModalVisible(!modalVisible);
                setSelectedActivities([]);
            }
        } catch (e) {
            console.log('Profile page | cannot update activities: ' + e);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sélectionne tes activités</Text>
                <ScrollView horizontal style={styles.activities} showsHorizontalScrollIndicator={false}>
                    <View style={{marginLeft: 20}}>
                       {allActivities.slice(0, 3).map((activity) => <Activity
                                                                    key={activity._id}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.name}
                                                                    select={() => {
                                                                        setSelectedActivities([...selectedActivities, activity._id]);
                                                                        setSnackBarVisible(false);
                                                                    }}
                                                                    unselect={() => setSelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                    </View>
                    <View>
                       {allActivities.slice(3, 6).map((activity) => <Activity
                                                                    key={activity.name}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.name}
                                                                    select={() => {
                                                                        setSelectedActivities([...selectedActivities, activity._id]);
                                                                        setSnackBarVisible(false);
                                                                    }}
                                                                    unselect={() => setSelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                    </View>
                    <View>
                       {allActivities.slice(6, 9).map((activity) => <Activity
                                                                    key={activity._id}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.name}
                                                                    select={() => {
                                                                        setSelectedActivities([...selectedActivities, activity._id]);
                                                                        setSnackBarVisible(false);
                                                                    }}
                                                                    unselect={() => setSelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                    </View>
                    <View>
                       {allActivities.slice(9, 12).map((activity) => <Activity
                                                                    key={activity._id}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.name}
                                                                    select={() => {
                                                                        setSelectedActivities([...selectedActivities, activity._id]);
                                                                        setSnackBarVisible(false);
                                                                    }}
                                                                    unselect={() => setSelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                    </View>
                    <View style={{marginRight: 20}}>
                       {allActivities.slice(12,).map((activity) => <Activity
                                                                    key={activity._id}
                                                                    icon={activity.icon}
                                                                    iconColor={activity.iconColor}
                                                                    activity={activity.name}
                                                                    select={() => {
                                                                        setSelectedActivities([...selectedActivities, activity._id]);
                                                                        setSnackBarVisible(false);
                                                                    }}
                                                                    unselect={() => setSelectedActivities(selectedActivities.filter((id) => id != activity._id))}/>)} 
                    </View>
                </ScrollView>
                {snackBarVisible && <Snackbar message={errorMessage} style={styles.snackBar}/>}
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={updateActivities}>
                    <Text style={{color: '#ffffff', fontSize: 16}}>Tout est bon !</Text>
                </Pressable>
              </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
      },
      modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
          backgroundColor: '#f26619',
          borderRadius: 20,
          padding: 15,
          elevation: 5,
      },
      activities: {
        paddingTop: 30,
        paddingBottom: 10
    },
    snackBar: {
        backgroundColor: 'red',
        marginVertical: 10
        
    },
    activityIndicator: {
        marginVertical: 30
    }
});

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, Pressable, View, Modal, Image, ActivityIndicator, ScrollView} from 'react-native';

export default function EventModal(props) {
    const {
        modalVisible,
        setModalVisible,
        event,
        loggedUser,
        update,
        setUpdate} = props;

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [participants, setParticpants] = useState(event.participants ? event.participants.length : 0);

    const joinEvent = async () => {
      try {
        const response = await axios.post(`http://128.53.5.198:3000/api/events/join/${event._id}`, {userId: loggedUser});
        if ("message" in response.data) {
          setErrorMessage(response.data.message);
        } else if ("successMessage" in response.data) {
          setSuccessMessage(response.data.successMessage);
          setParticpants(participants + 1);
        }
      } catch (e) {
        console.log("Can't join event");
      }
    };

    const formatDate = (date) => {
      const formattedDate = new Date(date);
      const jour = String(formattedDate.getDate()).padStart(2, '0');
      const mois = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const annee = formattedDate.getFullYear();

      return `${jour}/${mois}/${annee}`;
  }

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
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{event.title}</Text>
                <ScrollView style={{width: '80%'}} showsVerticalScrollIndicator={false}>
                    <MapView style={styles.map} initialRegion={{latitude: event?.city?.latitude, longitude: event?.city?.longitude, latitudeDelta: 0.0222, longitudeDelta: 0.0521,}}>
                    <Marker coordinate={{latitude: event?.city?.latitude, longitude: event?.city?.longitude}}/>
                    </MapView>
                    <View style={styles.info}>
                      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Date: {formatDate(event.start)}</Text>
                    </View>
                    <View style={styles.info}>
                      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Description: {event.description ? event.description : 'pas de description'}</Text>
                    </View>
                    <View style={styles.info}>
                      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Activité: {event.activity?.name}</Text>
                    </View>
                    <View style={styles.info}>
                      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Participants: {participants}</Text>
                    </View>
                    <Pressable
                        style={styles.button}
                        onPress={joinEvent}>
                        <Text style={{color: '#ffffff', fontSize: 16, textAlign: 'center'}}>Participer</Text>
                    </Pressable>
                    {errorMessage && <Text style={{color: 'red', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 20}}>{errorMessage}</Text>}
                    {successMessage && <Text style={{color: 'green', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 20}}>{successMessage}</Text>}
                    <Pressable
                        style={{marginVertical: 15}}
                        onPress={() => {setModalVisible(!modalVisible); setErrorMessage(""), setSuccessMessage(""); setUpdate(!update)}}>
                        <Text style={{color: 'red', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Fermer</Text>
                    </Pressable>
                </ScrollView> 
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
        marginTop: 22,
      },
      modalView: {
        marginTop: 30,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 35,
        justifyContent: 'center',
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
          marginHorizontal: 50,
          backgroundColor: '#f26619',
          borderRadius: 20,
          padding: 15,
          elevation: 5,
          marginTop: 30,
      },
      activityIndicator: {
          marginVertical: 30
      },
      map: {
        height: 400,
        width: '100%',
        borderRadius: 20,
        marginVertical: 20,
      },
      info: {
        borderColor: '#f26619',
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 40
      }
});

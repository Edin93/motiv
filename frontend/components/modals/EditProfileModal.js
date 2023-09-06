import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import DefaultInput from '../../components/general/DefaultInput';
import { Snackbar } from '@react-native-material/core';
import { StyleSheet, Text, Pressable, View, Modal, Image } from 'react-native';

export default function EditProfileModal(props) {
    const {
        modalVisible,
        update,
        setUpdate,
        setModalVisible,
        user,
        picture,
        setPicture} = props;

    const [image, setImage] = useState(null);
    
    const updatePicture = async () => {
        try {
            if (image) {
                const formData = new FormData();
                formData.append("file", {
                  uri: image,
                  type: "image/jpg",
                  name: `newProfilePic.jpg`,
                });
                formData.append('Content-Type', 'image/jpeg');
                formData.append("userId", user);
                await axios.post('http://192.168.1.17:3000/api/users/upload', formData,
                {headers: {
                    'Content-Type': 'multipart/form-data'
                }});
                setUpdate(!update);
                setImage(null);
            }
            setModalVisible(!modalVisible);
        } catch (e) {
            console.log('Profile page | cannot update profile: ' + e);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        delete result.cancelled;
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    
    const takePicture = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("Nous avons besoin d'accéder à votre caméra pour prendre une photo");
          return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
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
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Modifie ta photo de profil</Text>
                <Image source={{ uri: image ? image : `http://0yiqgak.rmarcais.19000.exp.direct/assets/uploads/${picture}` }} style={styles.image} />
                <Pressable
                    style={{elevation: 5, paddingTop: 15}}
                    onPress={pickImage}>
                    <Text style={{color: '#f26619', fontSize: 16, fontWeight: 'bold'}}>Choisir une photo</Text>
                </Pressable>
                <Pressable
                    style={{elevation: 5, paddingVertical: 15}}
                    onPress={takePicture}>
                    <Text style={{color: '#f26619', fontSize: 16, fontWeight: 'bold'}}>Prendre une photo</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={updatePicture}>
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
      image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginTop: 20,
        backgroundColor: '#f26619',
        borderWidth: 5,
        borderColor: "#f26619"
      },
      button: {
          backgroundColor: '#f26619',
          borderRadius: 20,
          padding: 15,
          elevation: 5,
          marginTop: 0,
          margin: 10
      },
      snackBar: {
          backgroundColor: 'red',
          marginVertical: 10
          
      },
      activityIndicator: {
          marginVertical: 30
      }
});

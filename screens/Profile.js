import React, { useEffect, } from "react";
import { View, StyleSheet, Text ,TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {  useAtom } from "jotai";
import { userFirstNameAtom,userLastNameAtom,userEmailAtom } from "../store";
const Profile = () => {
  const [firstName, setFirstName] = useAtom(userFirstNameAtom);
  const [lastName, setLastName] = useAtom(userLastNameAtom);
  const [email, setEmail] = useAtom(userEmailAtom);

    const navigation = useNavigation();

  const handleUpdateProfilePress = () => {
    // Redirect to Update Profile page
    navigation.navigate('UpdateProfile');
  };
  const handleLogoutPress = () => {
    // Clear token from local storage
    AsyncStorage.removeItem("token")
      .then(() => {
        // Redirect to login page
        navigation.navigate("Login");
      })
      .catch(error => console.error("Logout failed:", error));
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://tht-api.nutech-integrasi.app/getProfile",
          config
        );
console.log(response.data);
        setFirstName(response.data.data.first_name)
setLastName(response.data.data.last_name)
setEmail(response.data.data.email)
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>

<View style={styles.container}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileImageContainer}>
          <MaterialCommunityIcons name="account" size={64} color="#42A5F5" />
        </View>
        <Text style={styles.profileUsername}>{firstName} {lastName}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateProfileButton}
          onPress={handleUpdateProfilePress}
        >
          <Text style={styles.updateProfileButtonText}>Update Profile</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleLogoutPress}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
        
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E6F1F6",
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileInfoContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    profileImageContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileUsername: {
      fontSize: 24,
      fontWeight: 'bold',
      // color: '#FFF',
      marginTop: 8,
    },
    profileEmail: {
      fontSize: 16,
      // color: '#FFF',
      marginTop: 4,
    },
    buttonContainer: {
      width: '100%',
      padding: 16,
    },
    updateProfileButton: {
      backgroundColor: '#FFF',
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
    },
    updateProfileButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2980B9',
    },
    button: {
        backgroundColor: "#333",
        borderRadius: 25,
        paddingVertical: 16,
        paddingHorizontal: 32,
      },
      buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
      },
  });
  

export default Profile;

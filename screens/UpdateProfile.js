import React, { useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { userFirstNameAtom, userLastNameAtom } from "../store";
const UpdateProfile = () => {
  const [firstName, setFirstName] = useAtom(userFirstNameAtom);
  const [lastName, setLastName] = useAtom(userLastNameAtom);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [updateStatus, setUpdateStatus] = useState(null);
  const navigation = useNavigation();
  const handleUpdatePress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        first_name: editFirstName,
        last_name: editLastName,
      };
      const response = await axios.post(
        "https://tht-api.nutech-integrasi.app/updateProfile",
        data,
        config
      );
      if (response.data.status == 0) {
        Alert.alert("Update Successful", "Profile updated successfully!!", [
          { text: "OK", onPress: () => navigation.navigate("Profile") },
        ]);
        setFirstName(editFirstName);
        setLastName(editLastName);
        console.log("Profile updated successfully:", response.data);
        setUpdateStatus("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      setUpdateStatus("Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Update Profile</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={editFirstName}
          onChangeText={setEditFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={editLastName}
          onChangeText={setEditLastName}
        />

        <TouchableOpacity
          style={styles.enabledButton}
          onPress={handleUpdatePress}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
        {updateStatus && (
          <Text style={styles.updateStatus}>{updateStatus}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F1F6",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 32,
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 16,
  },
  enabledButton: {
    backgroundColor: "#42A5F5",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignSelf: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default UpdateProfile;

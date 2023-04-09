import React, { useState } from "react";
import axios from "axios";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [updateStatus, setUpdateStatus] = useState(null);

  const handleUpdatePress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        first_name: firstName,
        last_name: lastName,
      };
      const response = await axios.post(
        "https://tht-api.nutech-integrasi.app/updateProfile",
        data,
        config
      );
        console.log("Profile updated successfully:", response.data);
      setUpdateStatus("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setUpdateStatus("Failed to update profile");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "peachpuff" }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Update Profile Page</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Button title="Update Profile" onPress={handleUpdatePress} />
        {updateStatus && <Text style={styles.updateStatus}>{updateStatus}</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  updateStatus: {
    marginTop: 16,
    color: "green",
  },
});

export default UpdateProfile;

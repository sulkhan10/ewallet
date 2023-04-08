import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigation = useNavigation();

  const handleSignupPress = () => {
    // Perform signup action with the email, password, firstName, and lastName values
    // For example, you can send a POST request to your backend API to create a new user
    // You can customize this part to fit your specific use case
    const data = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };
    axios
      .post("https://tht-api.nutech-integrasi.app/registration", data)
      .then(response => {
        console.log("Signup successful:", response.data);
        // Handle successful signup, e.g., navigate to login screen
        navigation.navigate("Login");
      })
      .catch(error => {
        console.error("Signup failed:", error);
        // Handle signup error, e.g., display error message
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8EFEF",
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
    color: "#333",
  },
  button: {
    backgroundColor: "#ff7675",
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

export default SignUp;

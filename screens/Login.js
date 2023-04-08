import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // Check if token is present in local storage
    // If yes, redirect to home page
    AsyncStorage.getItem("token")
      .then(token => {
        if (token) {
          navigation.navigate("Home");
        }
      })
      .catch(error => console.error("Error checking token:", error));
  }, []);

  const handleLoginPress = () => {
    // Perform login action with the email and password values
    // For example, you can send a POST request to your backend API to authenticate the user
    // You can customize this part to fit your specific use case
    const data = {
      email,
      password,
    };
    axios
      .post("https://api.example.com/login", data)
      .then(response => {
        console.log("Login successful:", response.data);
        // Handle successful login, e.g., store user data and token in local storage
        const { email, first_name, last_name, token } = response.data.data;
        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("first_name", first_name);
        AsyncStorage.setItem("last_name", last_name);
        AsyncStorage.setItem("token", token);
        // Redirect to home page
        navigation.navigate("Home");
      })
      .catch(error => {
        console.error("Login failed:", error);
        // Handle login error, e.g., display error message
      });
  };

  const handleSignupPress = () => {
    // Redirect to registration page
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
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

export default Login;

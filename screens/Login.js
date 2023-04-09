import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleLoginPress = () => {
    const data = {
      email,
      password,
    };
    axios
      .post("https://tht-api.nutech-integrasi.app/login", data)
      .then((response) => {
        console.log(response);
        if (response.data.status == 0) {
          console.log("Login successful:", response.data);
        const { email, first_name, last_name, token } = response.data.data;
        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("first_name", first_name);
        AsyncStorage.setItem("last_name", last_name);
        AsyncStorage.setItem("token", token);
        navigation.navigate("MainTab");
        } else {
          Alert.alert('Login Failed', response.data.message);
        }
        
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const handleSignupPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.image}
      />
      <Text style={styles.pageTitle}>Login</Text>
      <Text style={styles.pageSubTitle}>Welcome to e-wallet app</Text>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text>or</Text>
          <TouchableOpacity onPress={handleSignupPress}>
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
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
      marginBottom: 2,
    },
    pageSubTitle: {
      fontSize: 16,
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
      backgroundColor: "#42A5F5", 
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
    signupButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 16,
      gap: 16,
    },
    image: {
      width: 75,
      height: 75,
      borderRadius: 75,
    },
  });

export default Login;

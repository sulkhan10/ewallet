import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
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
    const data = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };
    axios
      .post("https://tht-api.nutech-integrasi.app/registration", data)
      .then((response) => {
        if (response.data.status === 0) {
          Alert.alert('Signup successful', 'Your Account has been made, please log in!', [
            { text: 'OK', onPress: () => navigation.navigate('Login') }
          ]);
        } else {
          Alert.alert('Sign Up Failed', response.data.message);
        }
      })
      .catch((error) => {
        console.error("Signup failed:", error);
      });
  };
  const handleLoginPress = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
       <Image
        source={require('../assets/icon.png')}
        style={styles.image}
      />
      <Text style={styles.pageTitle}>Sign Up</Text>
      <Text style={styles.pageSubTitle}>Sign Up for an account to enjoy our features</Text>

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
            <Text>or</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    marginBottom: 2,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 16,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  pageSubTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 32,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75,
  },
});



export default SignUp;

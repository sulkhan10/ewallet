import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { atom,useAtom } from "jotai";
import { balanceAtom } from "../store";
const TopUp = () => {
  const [balance, setBalance] = useAtom(balanceAtom)

  const [topUpAmount, setTopUpAmount] = useState('');
  const navigation = useNavigation();

  const handleTopUpPress = async () => {
    try {
      // Get the bearer token from storage
      const token = await AsyncStorage.getItem("token");
  
      // Set the Authorization and Content-Type headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
  
      // Create the payload for the top-up request
      const payload = {
        amount: topUpAmount
      };
  
      // Make the POST request to perform the top-up action
      const response = await axios.post(
        "https://tht-api.nutech-integrasi.app/topup",
        payload,
        config
      );
  console.log(response.data);
      // Handle the response from the API
      if (response.data.status === 0) {
        // Top-up successful, show success message
        Alert.alert('Top-up Successful', 'Your account has been topped up successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
        setBalance(balance+ parseInt(topUpAmount))
      } else {
        // Top-up failed, show error message
        Alert.alert('Top-up Failed', 'Failed to top-up your account. Please try again later.');
      }
  
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Failed to perform top-up:", error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Top Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter top-up amount"
          keyboardType="numeric"
          value={topUpAmount}
          onChangeText={setTopUpAmount}
        />
        <TouchableOpacity style={styles.button} onPress={handleTopUpPress}>
          <AntDesign name="arrowright" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  button: {
    backgroundColor: "peachpuff",
    borderRadius: 4,
    padding: 12,
  },
});

export default TopUp;

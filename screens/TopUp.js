import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { atom,useAtom } from "jotai";
import { balanceAtom } from "../store";
const TopUp = () => {
  const [balance, setBalance] = useAtom(balanceAtom)
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigation = useNavigation();
  const handleInputChange = (text) => {
    setTopUpAmount(text);
    if (text !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };
  const handleTopUpPress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const payload = {
        amount: topUpAmount
      };
        const response = await axios.post(
        "https://tht-api.nutech-integrasi.app/topup",
        payload,
        config
      );
  console.log(response.data);
      if (response.data.status === 0) {
        Alert.alert('Top-up Successful', 'Your account has been topped up successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
        setBalance(balance+ parseInt(topUpAmount))
      } else {
        Alert.alert('Top-up Failed', 'Failed to top-up your account. Please try again later.');
      }
  
    } catch (error) {
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
          onChangeText={handleInputChange}
        />
        <TouchableOpacity
          style={[styles.button, isButtonDisabled ? styles.disabledButton : styles.enabledButton]}
          onPress={handleTopUpPress}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Top Up</Text>
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
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TopUp;

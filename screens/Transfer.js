import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { atom, useAtom } from "jotai";
import { balanceAtom } from "../store";

const Transfer = () => {
  const [balance, setBalance] = useAtom(balanceAtom)
  const [transferAmount, setTransferAmount] = useState('');
  const navigation = useNavigation();
  const handleTransferPress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
        const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
        const payload = {
        amount: transferAmount,
      };
        const response = await axios.post(
        "https://tht-api.nutech-integrasi.app/transfer",
        payload,
        config
      );
        if (response.data.status === 0) {
        Alert.alert('Transfer Successful', 'Your transfer was successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
        setBalance(balance - parseInt(transferAmount));
      } else {
        Alert.alert('Transfer Failed', 'Failed to transfer funds. Please try again later.');
      }
    } catch (error) {
      console.error("Failed to perform transfer:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Transfer Page</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter transfer amount"
          keyboardType="numeric"
          value={transferAmount}
          onChangeText={setTransferAmount}
        />
        <TouchableOpacity style={styles.button} onPress={handleTransferPress}>
          <Text style={styles.buttonText}>Transfer</Text>
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

export default Transfer;

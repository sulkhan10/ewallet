import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Transfer = () => {
  const [transferAmount, setTransferAmount] = useState("");

  const handleTransferPress = () => {
    // Perform transfer action with the transferAmount value
    // For example, you can send a request to your backend API to process the transfer
    // You can customize this part to fit your specific use case
    console.log("Transfer Amount:", transferAmount);
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

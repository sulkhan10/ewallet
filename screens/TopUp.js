import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';

const TopUp = () => {
  const [topUpAmount, setTopUpAmount] = useState('');

  const handleTopUpPress = () => {
    // Perform top-up action with the topUpAmount value
    // For example, you can send a request to your backend API to process the top-up
    // You can customize this part to fit your specific use case
    console.log('Top up amount:', topUpAmount);
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aqua',
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
  },
  inputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  button: {
    marginLeft: 16,
    backgroundColor: 'purple',
    borderRadius: 25,
    padding: 10,
  },
});

export default TopUp;

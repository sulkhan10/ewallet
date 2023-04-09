import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import {  useAtom } from "jotai";
import { balanceAtom, userFirstNameAtom, userLastNameAtom } from "../store";

const Home = () => {
  const [balance, setBalance] = useAtom(balanceAtom);
  const [firstName] = useAtom(userFirstNameAtom);
  const [lastName] = useAtom(userLastNameAtom);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleTopUpPress = () => {
    navigation.navigate("TopUp");
  };
  const handleTransferPress = () => {
    navigation.navigate("Transfer");
  };
  useEffect(() => {
    setLoading(true);
    const isLoggedIn = () => {
      AsyncStorage.getItem("token")
        .then((token) => {
          if (!token) {
            navigation.navigate("Login");
          }
        })
        .catch((error) => console.error("Error checking token:", error));
    };
    const fetchBalance = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://tht-api.nutech-integrasi.app/balance          ",
          config
        );
        console.log(response.data.data);
        response.data.data.balance == null
          ? setBalance(0)
          : setBalance(response.data.data.balance);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    isLoggedIn();
    fetchBalance();
    setLoading(false);
  }, [balance]);
  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.greetingText}>Hello {firstName} {lastName}!</Text>
        <Text style={styles.subGreetingText}>The Official App of E-Wallet Indonesia</Text>
        <View style={styles.balanceContainer}>
          <View style={styles.balanceImageContainer}>
            <MaterialCommunityIcons name="account" size={64} color="#42A5F5" />
          </View>
          <View style={styles.imageContainer}>
        <Text style={styles.balanceText}>Account Status:</Text>
        <Text style={[styles.statusAccontText]}>Active</Text>
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <View style={styles.balanceImageContainer}>
            <MaterialCommunityIcons name="wallet" size={64} color="#42A5F5" />
          </View>
          <View style={styles.imageContainer}>
        <Text style={styles.balanceText}>Your Balance:</Text>
        <Text style={styles.balanceAmount}>${balance}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleTopUpPress}>
            <MaterialCommunityIcons
              name="arrow-up-bold-circle"
              color="#fff"
              size={36}
            />
            <Text style={styles.buttonLabel}>Top Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTransferPress}>
            <MaterialCommunityIcons name="send-circle" color="#fff" size={36} />
            <Text style={styles.buttonLabel}>Transfer</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.noteText}>
          Start managing your funds with a single tap!
        </Text>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
    paddingVertical: 32,
    borderRadius: 8,
   
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subGreetingText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusAccontText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2980B9",
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2980B9",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 8,
    textAlign: "center",
  },
  noteText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 16,
  },
  spinnerTextStyle: {
    color: "#333",
    fontSize: 16,
    fontWeight: "normal",
  },
  bannerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 16,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginVertical: 16,
    paddingHorizontal: 36,
    paddingVertical: 16,
    gap: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowRadius: 5,
    textShadowOffset: { width: 4, height: 4 },
  },
  imageContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceImageContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#FFF",
    alignItems:"center",
    justifyContent: "center",
  },
});

export default Home;

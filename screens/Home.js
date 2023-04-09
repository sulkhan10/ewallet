import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet ,TouchableOpacity} from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { atom, useAtom } from "jotai";
import { balanceAtom } from "../store";

const Home = () => {
  const [balance, setBalance] = useAtom(balanceAtom);
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
    fetchBalance() 
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
        <Text style={styles.greetingText}>Hello!</Text>
        <Text style={styles.balanceText}>Saldo</Text>
        <Text style={styles.balanceAmount}>${balance}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleTopUpPress}>
            <MaterialCommunityIcons
              name="arrow-up-bold-circle"
              color="#fff"
              size={24}
            />
            <Text style={styles.buttonLabel}>Top Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleTransferPress}
          >
            <MaterialCommunityIcons
              name="send-circle"
              color="#fff"
              size={24}
            />
            <Text style={styles.buttonLabel}>Transfer</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 32,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#333",
  },
  buttonContainer: {
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
});



export default Home;



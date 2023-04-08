import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  const handleTopUpPress = () => {
    navigation.navigate("TopUp");
  };
  const handleTransferPress = () => {
    navigation.navigate("Transfer");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.balanceText}>Saldo</Text>
        <Text style={styles.balanceAmount}>$1000</Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            icon={({ color }) => (
              <MaterialCommunityIcons
                name="arrow-up-bold-circle"
                color={color}
                size={24}
              />
            )}
            onPress={handleTopUpPress}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Top Up
          </Button>
          <Button
            mode="contained"
            icon={({ color }) => (
              <MaterialCommunityIcons
                name="send-circle"
                color={color}
                size={24}
              />
            )}
            onPress={handleTransferPress}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Transfer
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
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
    marginVertical: 8,
    width: "40%",
    borderRadius: 8,
    backgroundColor: "#2980B9",
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default Home;

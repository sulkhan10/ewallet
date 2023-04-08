import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

let Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "aqua" }}>
      <View style={styles.container}>
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
            onPress={() => {
              // Handle top-up button press
            }}
            style={styles.button}
          >
            {/* <Text> */}

            Top Up
            {/* </Text> */}
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
            onPress={() => {
              // Handle transfer button press
            }}
            style={styles.button}
          >
            {/* <Text> */}

            Transfer
            {/* </Text> */}
          </Button>
        </View>
      </View>{" "}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    marginVertical: 8,
    width: "40%",
  },
});

export default Home;

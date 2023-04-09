import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { balanceAtom } from "../store";
import { useAtom } from "jotai";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
nav
  const [balance, setBalance] = useAtom(balanceAtom);
  const navigation = useNavigation();
  useEffect(() => {
    setLoading(true);

    const fetchHistory = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://tht-api.nutech-integrasi.app/transactionHistory",
          config
        );
        console.log(response.data);
        setHistoryData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        Alert.alert('No History Found', 'Please Top Up To Your Account First', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      }
    };

    fetchHistory();
    setLoading(false);

  }, [balance]);
 
  const renderTransactionItem = ({ item }) => {
    const transactionIcon =
      item.transaction_type === "transfer"
        ? "bank-transfer"
        : "credit-card-outline";
    const transactionColor =
      item.transaction_type === "transfer" ? "#FF6347" : "#66CDAA";

    return (
      <View style={styles.transactionItem}>
         <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
        <View
          style={[
            styles.transactionIconContainer,
            { backgroundColor: transactionColor },
          ]}
        >
          <MaterialCommunityIcons
            name={transactionIcon}
            size={32}
            color="#FFF"
          />
        </View>
        <View style={styles.transactionInfoContainer}>
          <Text style={styles.transactionType}>ID : {item.transaction_id}</Text>
          <Text style={styles.transactionType}>Type : {item.transaction_type}</Text>
          <Text style={styles.transactionTime}>
          {new Date(item.transaction_time).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>
        </View>
        <View style={styles.transactionAmountContainer}>
          <Text style={styles.transactionAmount}>{item.amount} USD</Text>
        </View>
      </View>
      
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Transaction History</Text>
        <FlatList
          data={historyData}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.transaction_id}
          style={styles.transactionList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  transactionList: {
    flex: 1,
  },
  transactionItem: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionInfoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  transactionTime: {
    fontSize: 14,
    color: "#777",
  },
  transactionAmountContainer: {
    justifyContent: "flex-end",
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

export default History;

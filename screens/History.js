import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from "react-native-safe-area-context";

const History = () => {
  const transactionData = [
    {
      transaction_id: "21",
      transaction_time: "2021-07-22 16:17:30",
      transaction_type: "Transfer",
      amount: 5
    },
    {
      transaction_id: "22",
      transaction_time: "2021-07-23 14:20:45",
      transaction_type: "Top Up",
      amount: 10
    }
    // Add more transaction data here
  ];

  const renderTransactionItem = ({ item }) => {
    const transactionIcon = item.transaction_type === 'Transfer' ? 'bank-transfer' : 'credit-card-outline';
    const transactionColor = item.transaction_type === 'Transfer' ? '#FF6347' : '#66CDAA';

    return (
      <View style={styles.transactionItem}>
        <View style={[styles.transactionIconContainer, { backgroundColor: transactionColor }]}>
          <MaterialCommunityIcons name={transactionIcon} size={32} color="#FFF" />
        </View>
        <View style={styles.transactionInfoContainer}>
          <Text style={styles.transactionType}>{item.transaction_type}</Text>
          <Text style={styles.transactionTime}>{item.transaction_time}</Text>
        </View>
        <View style={styles.transactionAmountContainer}>
          <Text style={styles.transactionAmount}>{item.amount} USD</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "aqua" }}>
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Transaction History</Text>
      <FlatList
        data={transactionData}
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
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  transactionList: {
    flex: 1,
  },
  transactionItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  transactionTime: {
    fontSize: 14,
    color: '#777',
  },
  transactionAmountContainer: {
    justifyContent: 'flex-end',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default History;

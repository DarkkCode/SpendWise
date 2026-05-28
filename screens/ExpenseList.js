import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ExpenseContext } from '../ExpenseContext';

const ExpenseList = () => {
  const { expenses, deleteExpense, editExpense } = useContext(ExpenseContext);

  const handleEdit = (item) => {
    // Humanized Note: Using basic Alert for mobile-only compatibility
    Alert.alert("Edit Feature", "To update this expense, please delete it and re-add with correct details.");
  };

  const confirmDelete = (id) => {
    // Mobile-native Alert (from Lecture 6/7 concepts)
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to remove this?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteExpense(id) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.amountText}>Rs. {item.amount}</Text>
              <View style={styles.actionRow}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Text style={styles.editLink}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <Text style={styles.deleteLink}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginBottom: 20 },
  historyCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  rightSection: { alignItems: 'flex-end' },
  actionRow: { flexDirection: 'row', marginTop: 5 },
  titleText: { fontSize: 16, fontWeight: '600', color: '#334155' },
  dateText: { fontSize: 12, color: '#64748b' },
  amountText: { fontSize: 16, fontWeight: 'bold', color: '#ef4444' },
  editLink: { color: '#0ea5e9', fontSize: 13, fontWeight: 'bold', marginRight: 15 },
  deleteLink: { color: '#ef4444', fontSize: 13, fontWeight: 'bold' }
});

export default ExpenseList;
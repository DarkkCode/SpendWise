import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ExpenseContext } from '../ExpenseContext';

const AddExpense = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const { addExpense } = useContext(ExpenseContext);

  const handleSave = async () => {
    if (!title || !amount) {
      Alert.alert("Error", "Fill in all details");
      return;
    }
    const newEntry = {
      title,
      amount: parseInt(amount), // Converts string to number
      cat: 'General',
      date: new Date().toLocaleDateString(),
    };
    await addExpense(newEntry);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} placeholder="e.g. Lunch" onChangeText={setTitle} />
      <Text style={styles.label}>Amount (Rs.)</Text>
      <TextInput 
        style={styles.input} 
        placeholder="00" 
        keyboardType="numeric" // Only numbers allowed
        onChangeText={setAmount} 
      />
      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>Save Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  btn: { backgroundColor: '#0ea5e9', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default AddExpense;
import React, { useContext } from 'react'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ExpenseContext } from '../ExpenseContext'; // Connects to Context

const Dashboard = ({ navigation }) => {
  // Pull data and budget from our Context "Brain"
  const { expenses, monthlyBudget } = useContext(ExpenseContext);

  // Calculates total spending dynamically
  const totalSpent = expenses.reduce((sum, item) => sum + parseInt(item.amount || 0), 0);
  
  // Calculates percentage of budget used for the progress bar
  const progress = Math.min(totalSpent / monthlyBudget, 1);

  return (
    <View style={styles.container}>
      {/* Monthly Summary Card */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total Spent: Rs. {totalSpent}</Text>
        <Text style={styles.cardAmount}>Budget: Rs. {monthlyBudget}</Text>
        
        {/* Progress Bar UI */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {Math.round(progress * 100)}% of budget used
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemCat}>{item.cat}</Text>
            </View>
            <Text style={styles.itemPrice}>- Rs. {item.amount}</Text>
          </View>
        )}
      />
      
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  card: {
    backgroundColor: '#1e293b',
    padding: 25,
    borderRadius: 20,
    marginBottom: 25,
    elevation: 5, 
  },
  cardLabel: { color: '#94a3b8', fontSize: 14 },
  cardAmount: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#475569',
    borderRadius: 5,
    marginTop: 20,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#38bdf8',
  },
  progressText: { color: '#fff', marginTop: 8, fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 15 },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  itemTitle: { fontSize: 16, fontWeight: '600', color: '#334155' },
  itemCat: { fontSize: 12, color: '#64748b' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#ef4444' },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0ea5e9',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  },
  fabText: { color: '#fff', fontSize: 30, fontWeight: 'bold' }
});

export default Dashboard;
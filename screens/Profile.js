import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { ExpenseContext } from '../ExpenseContext';
import { auth } from '../firebaseConfig';

const Profile = ({ navigation }) => {
  const { userName, monthlyBudget, updateBudget } = useContext(ExpenseContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectBudget = (value) => {
    updateBudget(value);
    setModalVisible(false);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Budget Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Monthly Limit</Text>
            
            {[10000, 50000, 80000, 100000].map((amount) => (
              <TouchableOpacity 
                key={amount} 
                style={styles.modalOption} 
                onPress={() => handleSelectBudget(amount)}
              >
                <Text style={styles.optionText}>Rs. {amount.toLocaleString()}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity 
              style={[styles.modalOption, { borderBottomWidth: 0 }]} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.optionText, { color: '#ef4444' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}><Text style={styles.avatarText}>V</Text></View>
        <Text style={styles.userNameText}>{userName}</Text>
        <Text style={styles.userEmail}>{auth.currentUser?.email}</Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible(true)}>
          <Text style={styles.menuText}>Current Budget: Rs. {monthlyBudget}</Text>
          <Text style={{color: '#0ea5e9', fontSize: 12}}>Tap to change limit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={[styles.menuText, { color: '#ef4444' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  profileHeader: { alignItems: 'center', marginVertical: 30 },
  avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#0ea5e9', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  userNameText: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  userEmail: { color: '#64748b' },
  menuSection: { backgroundColor: '#fff', borderRadius: 15, padding: 10, elevation: 3 },
  menuItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  menuText: { fontSize: 16 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', width: '80%', borderRadius: 20, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1e293b' },
  modalOption: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' },
  optionText: { fontSize: 16, fontWeight: '500', color: '#334155' }
});

export default Profile;
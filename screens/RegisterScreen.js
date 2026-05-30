import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (email === '' || password === '') {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    
    try {
      // Firebase function to create a new user
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join SpendWise today</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#94a3b8"
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password (Min 6 chars)" 
        placeholderTextColor="#94a3b8"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { fontSize: 16, color: '#64748b', marginBottom: 40 },
  input: { 
    width: '100%',
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#e2e8f0' 
  },
  registerBtn: { 
    width: '100%',
    backgroundColor: '#10b981',
    paddingVertical: 15, 
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3 
  },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  linkText: { marginTop: 20, color: '#0ea5e9', fontWeight: '500' }
});

export default RegisterScreen;
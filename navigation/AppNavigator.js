import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importing our screens
import LoginScreen from '../screens/LoginScreen';
import Dashboard from '../screens/Dashboard';
import ExpenseList from '../screens/ExpenseList';
import Profile from '../screens/Profile';
import AddExpense from '../screens/AddExpense';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// This handles the bottom menu after I log in
function MainTabs() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerStyle: { backgroundColor: '#1e293b' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#1e293b', height: 60 },
        tabBarActiveTintColor: '#38bdf8',
        tabBarInactiveTintColor: '#94a3b8'
      }}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="History" component={ExpenseList} />
      <Tab.Screen name="Settings" component={Profile} />
    </Tab.Navigator>
  );
}

// This is the root stack that is separating Login from the App
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
        name="AddExpense" component={AddExpense} options={{ title: 'New Expense' }}
         />
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
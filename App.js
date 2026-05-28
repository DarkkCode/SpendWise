import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { ExpenseProvider } from './ExpenseContext';

export default function App() {
  return (
    <ExpenseProvider>
      <AppNavigator />
    </ExpenseProvider>
  );
}
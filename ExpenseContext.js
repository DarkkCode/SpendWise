import React, { createContext, useState, useEffect } from 'react';
import { db, auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, addDoc, onSnapshot, query, where, 
  deleteDoc, doc, updateDoc, getDoc, setDoc 
} from 'firebase/firestore';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState(0); // Start at 0
  const [userName, setUserName] = useState("User");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setMonthlyBudget(0);
      return;
    }

    // 1. Fetch Expenses for this specific user
    const q = query(collection(db, "expenses"), where("userId", "==", user.uid));
    const unsubscribeData = onSnapshot(q, (snapshot) => {
      const expenseData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExpenses(expenseData);
    });

    // 2. Fetch User-Specific Settings (Budget)
    const fetchUserSettings = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setMonthlyBudget(userDoc.data().budget || 0);
      }
    };
    fetchUserSettings();

    return () => unsubscribeData();
  }, [user]);

  // Function to update budget in the cloud
  const updateBudget = async (newBudget) => {
    if (!user) return;
    setMonthlyBudget(newBudget);
    await setDoc(doc(db, "users", user.uid), { budget: newBudget }, { merge: true });
  };

  const addExpense = async (newExpense) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "expenses"), {
        ...newExpense,
        userId: user.uid 
      });
    } catch (e) {
      console.error("Add Error:", e);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
    } catch (e) {
      console.error("Delete Error:", e);
    }
  };

  const editExpense = async (id, updatedData) => {
    try {
      const expenseRef = doc(db, "expenses", id);
      await updateDoc(expenseRef, updatedData);
    } catch (e) {
      console.error("Edit Error:", e);
    }
  };

  return (
    <ExpenseContext.Provider value={{ 
      expenses, addExpense, deleteExpense, editExpense,
      monthlyBudget, updateBudget, userName, setUserName 
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};
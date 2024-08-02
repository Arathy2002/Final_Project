import { useState } from 'react';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Admin from './components/Admin'; // Import the Admin component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './components/User';
import UserDashboard from './components/UserDashboard';
import { ToastContainer } from 'react-toastify';
import UserExpensesPage from './components/UserExpensesPage';
import AddTransaction from './components/AddTransaction';
import TransactionHistory from './components/TransactionHistory';
import UserManagement from './components/UserManagement';
import ExpenseManagement from './components/ExpenseMangement';
import AdminProfile from './components/AdminProfile';



function App() {
  const [count, setCount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const user = { name: 'John Doe', profilePic: 'https://example.com/profile.jpg' };

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
  };
  return (
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route path='/admin' element={<Admin />} /> 
        <Route path='/user' element={<User />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/user-expenses" element={<UserExpensesPage />} />
        <Route path="/add-transaction" element={<AddTransaction onAddTransaction={handleAddTransaction} />} />
        <Route path="/transaction-history" element={<TransactionHistory transactions={transactions} />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/expense-management" element={<ExpenseManagement />} />
        <Route path='/adminprofile' element={<AdminProfile />} />
      </Routes>
  
  );
}

export default App;


